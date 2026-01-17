import accountingNotes from '../../data/accounting-notes.json' with { type: 'json' };

export async function findMatchingNotes(prefix: string): Promise<string[]> {
  if (prefix === '') return [];

  const matchingNotes = Object.entries(accountingNotes)
    .filter(([note]) => note.toLowerCase().startsWith(prefix.toLowerCase()))
    .sort((a, b) => b[1] - a[1])
    .map(([note]) => note.slice(prefix.length));

  return matchingNotes;
}
