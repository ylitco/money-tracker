import {
  LocalizationProviderProps,
  LocalizationProvider as BaseLocalizationProvider,
} from '@mui/x-date-pickers';

export function LocalizationProvider<Locale>(
  props: LocalizationProviderProps<Locale>
) {
  return <BaseLocalizationProvider {...props} />;
}
