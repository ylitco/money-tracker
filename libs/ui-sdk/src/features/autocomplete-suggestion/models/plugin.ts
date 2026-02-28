import { PluginConfig } from 'platejs';
import { SuggestionState } from './state';
import { Api } from './api';
import { Transforms } from './transforms';
import { Selectors } from './selectors';

type Options = SuggestionState;

export type AutocompleteSuggestionPluginConfig = PluginConfig<
  'autocompleteSuggestion',
  Options,
  Api,
  Transforms,
  Selectors
>;
