import { useElement, usePluginOption } from 'platejs/react';
import { AutocompleteSuggestionPlugin } from '../libs/plugin';

export function GhostText() {
  const element = useElement();

  const isSuggested = usePluginOption(
    AutocompleteSuggestionPlugin,
    'isSuggested',
    element.id as string
  );

  if (!isSuggested) return null;

  return <GhostTextContent />;
}

function GhostTextContent() {
  const suggestionText = usePluginOption(
    AutocompleteSuggestionPlugin,
    'suggestion'
  );

  return (
    <span
      className="text-muted-foreground/70 pointer-events-none max-sm:hidden"
      contentEditable={false}
    >
      {suggestionText && suggestionText}
    </span>
  );
}
