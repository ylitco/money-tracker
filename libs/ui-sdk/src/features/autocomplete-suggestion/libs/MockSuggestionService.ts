import lorem from '../../../lib/lorem';
import { getRandomNumber } from '../../../lib/getRandomNumber';

interface Range {
  min: number;
  max: number;
}

interface PrefixGroupsOptions {
  percentage: number;
  sharedWordCount: Range;
  groupSize: Range;
}

interface GenerateOptions {
  count?: Range;
  prefixGroups?: PrefixGroupsOptions;
}

const DEFAULT_GENERATE_OPTIONS: Required<GenerateOptions> = {
  count: { min: 10, max: 20 },
  prefixGroups: {
    percentage: 0.4,
    sharedWordCount: { min: 3, max: 5 },
    groupSize: { min: 2, max: 4 },
  },
};

export class MockSuggestionService {
  suggestions: Record<string, number>;

  private constructor(suggestions: Record<string, number>) {
    this.suggestions = suggestions;
  }

  static fromData(data: Record<string, number>): MockSuggestionService {
    return new MockSuggestionService(data);
  }

  static generate(options: GenerateOptions = {}): MockSuggestionService {
    const suggestions: Record<string, number> = {};

    const config = {
      count: options.count ?? DEFAULT_GENERATE_OPTIONS.count,
      prefixGroups:
        options.prefixGroups ?? DEFAULT_GENERATE_OPTIONS.prefixGroups,
    };

    const totalCount = getRandomNumber(config.count.min, config.count.max);
    const prefixGroupCount = Math.floor(
      totalCount * config.prefixGroups.percentage
    );
    const randomCount = totalCount - prefixGroupCount;

    let generatedInGroups = 0;

    while (generatedInGroups < prefixGroupCount) {
      const groupSize = Math.min(
        getRandomNumber(
          config.prefixGroups.groupSize.min,
          config.prefixGroups.groupSize.max
        ),
        prefixGroupCount - generatedInGroups
      );
      const sharedWordCount = getRandomNumber(
        config.prefixGroups.sharedWordCount.min,
        config.prefixGroups.sharedWordCount.max
      );

      const sharedPrefix = lorem.generateWords(sharedWordCount);

      for (let j = 0; j < groupSize; j++) {
        const suffix = lorem.generateWords(getRandomNumber(2, 5));
        const comment = `${sharedPrefix} ${suffix}.`;
        const frequency = getRandomNumber(1, 100);
        suggestions[comment] = frequency;
      }

      generatedInGroups += groupSize;
    }

    for (let i = 0; i < randomCount; i++) {
      const comment = lorem.generateSentences(1);
      const frequency = getRandomNumber(1, 100);
      suggestions[comment] = frequency;
    }

    return new MockSuggestionService(suggestions);
  }

  async fetch(prefix: string): Promise<string[]> {
    if (prefix === '') return [];

    return Object.entries(this.suggestions)
      .filter(([note]) => note.toLowerCase().startsWith(prefix.toLowerCase()))
      .sort((a, b) => b[1] - a[1])
      .map(([note]) => note);
  }
}
