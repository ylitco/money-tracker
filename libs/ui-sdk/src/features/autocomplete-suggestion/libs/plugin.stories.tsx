import type { Meta, StoryObj } from '@storybook/react-vite';
import { Plate, usePlateEditor } from 'platejs/react';
import { Editor, EditorContainer } from '../ui/editor';
import { AutocompleteSuggestionPlugin } from './plugin';
import { MockSuggestionService } from './MockSuggestionService';

const mockService = MockSuggestionService.generate({
  count: { min: 15, max: 20 },
  prefixGroups: {
    percentage: 0.5,
    sharedWordCount: { min: 4, max: 5 },
    groupSize: { min: 4, max: 6 },
  },
});

function AutocompleteSuggestionEditor() {
  const editor = usePlateEditor({
    plugins: [
      AutocompleteSuggestionPlugin.configure({
        options: {
          suggestionOptions: {
            fetch: (prefix) => mockService.fetch(prefix),
          },
        },
      }),
    ],
  });

  return (
    <div className="space-y-4">
      <div className="text-muted-foreground text-sm">
        <p>
          <strong>How to test:</strong>
        </p>
        <ol className="mt-2 list-inside list-decimal space-y-1">
          <li>Type some text in the editor below</li>
          <li>Open browser DevTools (F12) → Console tab</li>
          <li>
            Watch for logs showing trigger calls and suggestion state changes
          </li>
          <li>
            The suggestion will appear after 300ms (mock delay from
            fetchSuggestion)
          </li>
        </ol>
      </div>

      <Plate editor={editor}>
        <EditorContainer>
          <Editor placeholder="Start typing to trigger suggestions..." />
        </EditorContainer>
      </Plate>

      <div className="bg-muted rounded-lg p-4 font-mono text-sm">
        <p className="mb-4 font-bold">Available suggestions:</p>
        <pre className="bg-background max-h-48 overflow-auto rounded p-2 text-xs">
          {JSON.stringify(mockService.suggestions, null, 2)}
        </pre>
      </div>
    </div>
  );
}

const meta = {
  title: 'Plugins/AutocompleteSuggestion',
  component: AutocompleteSuggestionEditor,
  parameters: {
    layout: 'padded',
  },
} satisfies Meta<typeof AutocompleteSuggestionEditor>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
