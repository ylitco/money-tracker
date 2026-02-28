export interface Transforms {
  autocompleteSuggestion: {
    // Accept the current suggestion and insert it into the editor
    // This is a Transform because it modifies editor content
    accept: () => void;
    // Accept only the next word from the suggestion
    acceptNextWord: () => void;
  };
}
