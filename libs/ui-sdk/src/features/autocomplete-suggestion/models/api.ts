export interface Api {
  autocompleteSuggestion: {
    trigger: () => Promise<void>;
    reject: () => void;
  };
}
