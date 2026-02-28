import { SuggestionOptions } from './suggestion-options';

export interface SuggestionState {
  abortController?: AbortController | null;
  suggestion?: string | null;
  error?: Error | null;
  isLoading?: boolean;
  suggestionNodeId?: string | null;
  /**
   * When `true`, any editor operation will reject the suggestion
   * Set to `false` temporarily when performing operations that should not reject
   */
  shouldAbort?: boolean;
  suggestions?: string[];
  suggestionIndex?: number;
  fetchedPrefix?: string;
  suggestionOptions?: SuggestionOptions;
}
