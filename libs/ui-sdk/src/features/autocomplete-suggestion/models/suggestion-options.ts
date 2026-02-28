export type FetchSuggestions = (prefix: string) => Promise<string[]>;

export interface SuggestionOptions {
  fetch: FetchSuggestions;
}
