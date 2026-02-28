import { serializeMd } from '@platejs/markdown';
import { createTPlatePlugin } from 'platejs/react';
import { AutocompleteSuggestionPluginConfig } from '../models/plugin';
import { GhostText } from '../ui/ghost-text';

export const AutocompleteSuggestionPlugin =
  createTPlatePlugin<AutocompleteSuggestionPluginConfig>({
    key: 'autocompleteSuggestion',
    options: {
      suggestion: null,
      error: null,
      isLoading: false,
      abortController: null,
      suggestionNodeId: null,
      shouldAbort: true,
      suggestions: [],
      suggestionIndex: 0,
      fetchedPrefix: '',
    },
  })
    .extendApi<
      AutocompleteSuggestionPluginConfig['api']['autocompleteSuggestion']
    >(({ setOptions, getOptions, editor }) => ({
      trigger: async () => {
        const { abortController } = getOptions();

        if (abortController) abortController.abort();

        const contextEntry = editor.api.block({ highest: true });

        if (!contextEntry) return;

        const currentText = serializeMd(editor, {
          value: [contextEntry[0]],
        });

        if (!currentText.trim()) return;

        const newAbortController = new AbortController();

        setOptions({
          isLoading: true,
          error: null,
          abortController: newAbortController,
        });

        try {
          const { suggestionOptions } = getOptions();

          if (!suggestionOptions?.fetch) return;

          const prefix = currentText.trim().replace(/&#x20;/g, ' ');
          const fullSentences = await suggestionOptions.fetch(prefix);

          if (newAbortController.signal.aborted) return;

          const nodeId = contextEntry[0].id as string;

          const suggestion = fullSentences[0]?.slice(prefix.length) ?? null;

          setOptions({
            suggestion: suggestion,
            suggestions: fullSentences,
            suggestionIndex: 0,
            fetchedPrefix: prefix,
            isLoading: false,
            abortController: null,
            suggestionNodeId: suggestion ? nodeId : null,
          });
        } catch (error) {
          if (newAbortController.signal.aborted) return;

          setOptions({
            error: error as Error,
            isLoading: false,
            suggestion: null,
            abortController: null,
          });
        }
      },

      reject: () => {
        setOptions({
          suggestion: null,
          error: null,
          suggestionNodeId: null,
          suggestions: [],
          suggestionIndex: 0,
          fetchedPrefix: '',
        });
      },
    }))
    .extendSelectors<AutocompleteSuggestionPluginConfig['selectors']>(
      ({ getOptions }) => ({
        isSuggested: (id) => getOptions().suggestionNodeId === id,
      })
    )
    .overrideEditor(
      ({
        api,
        editor,
        getOptions,
        setOptions,
        tf: { apply, setSelection, insertText },
      }) => {
        let prevSelection: typeof editor.selection = null;

        const withoutAbort = (fn: () => void) => {
          setOptions({ shouldAbort: false });
          fn();
          setOptions({ shouldAbort: true });
        };

        return {
          transforms: {
            apply(operation) {
              const { shouldAbort, suggestion: completion } = getOptions();

              if (shouldAbort && completion) {
                api.autocompleteSuggestion.reject();
              }

              apply(operation);
            },
            insertText(text, options) {
              const { suggestion: completion, fetchedPrefix } = getOptions();

              if (completion?.startsWith(text)) {
                withoutAbort(() => {
                  const remaining = completion.slice(text.length);

                  setOptions({
                    suggestion: remaining.length > 0 ? remaining : null,
                    suggestionNodeId:
                      remaining.length > 0
                        ? getOptions().suggestionNodeId
                        : null,
                    fetchedPrefix: (fetchedPrefix || '') + text,
                  });

                  insertText(text, options);
                });

                return;
              }

              insertText(text, options);
            },
            setSelection(props) {
              setSelection(props);

              const { suggestion: completion, isLoading } = getOptions();

              if (
                completion ||
                isLoading ||
                !editor.selection ||
                (prevSelection &&
                  JSON.stringify(prevSelection) ===
                    JSON.stringify(editor.selection)) ||
                !editor.api.isFocused()
              ) {
                prevSelection = editor.selection;

                return;
              }

              prevSelection = editor.selection;

              api.autocompleteSuggestion.trigger();
            },
          },
        };
      }
    )
    .extendTransforms(({ api, editor, getOptions, setOptions }) => ({
      accept: () => {
        const { suggestion: completion } = getOptions();

        if (!completion) return;

        editor.tf.insertText(completion);

        setOptions({
          suggestion: null,
          error: null,
          suggestionNodeId: null,
          suggestions: [],
          suggestionIndex: 0,
          fetchedPrefix: '',
        });
      },
      acceptNextWord: () => {
        const {
          suggestion: completion,
          suggestions,
          suggestionIndex,
          fetchedPrefix,
        } = getOptions();

        if (!completion) return;

        const match = /^\S+\s?/.exec(completion);

        if (!match) return;

        const nextWord = match[0];

        editor.tf.insertText(nextWord);

        const newPrefix = (fetchedPrefix || '') + nextWord;
        const nextIndex = (suggestionIndex || 0) + 1;
        const nextFullSentence = suggestions?.[nextIndex];

        if (
          nextFullSentence &&
          nextFullSentence.toLowerCase().startsWith(newPrefix.toLowerCase())
        ) {
          const remainingCompletion = nextFullSentence.slice(newPrefix.length);

          setOptions({
            suggestionIndex: nextIndex,
            fetchedPrefix: newPrefix,
            suggestion:
              remainingCompletion.length > 0 ? remainingCompletion : null,
            suggestionNodeId:
              remainingCompletion.length > 0
                ? getOptions().suggestionNodeId
                : null,
          });
        } else {
          setOptions({
            suggestion: null,
            suggestionNodeId: null,
            suggestions: [],
            suggestionIndex: 0,
            fetchedPrefix: '',
          });

          api.autocompleteSuggestion.trigger();
        }
      },
    }))
    .extend({
      handlers: {
        onBlur: ({ api }) => {
          api.autocompleteSuggestion.reject();
        },
        onMouseDown: ({ api }) => {
          api.autocompleteSuggestion.reject();
        },
      },
      render: {
        belowNodes: () => {
          return ({ children }) => (
            <>
              {children}
              <GhostText />
            </>
          );
        },
      },
      shortcuts: {
        accept: { keys: 'tab' },
        reject: { keys: 'escape' },
        acceptNextWord: { keys: 'mod+right' },
        trigger: { keys: 'alt+space' },
      },
    });
