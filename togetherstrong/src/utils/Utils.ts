import { supportedLocales } from '@/utils/Constants';

export default function getBrowserLocale(options = {}): string {
  const defaultOptions = { countryCodeOnly: false };
  const opt = { ...defaultOptions, ...options };
  const navigatorLocale =
    navigator.languages !== undefined
      ? navigator.languages[0]
      : navigator.language;
  if (!navigatorLocale) {
    return '';
  }
  const trimmedLocale = opt.countryCodeOnly
    ? navigatorLocale.trim().split(/-|_/)[0]
    : navigatorLocale.trim();
  return trimmedLocale;
}

export function getStartingLocale(options = {}) {
  const defaultOptions = { countryCodeOnly: false };
  const browserLocale = getBrowserLocale({ ...defaultOptions, ...options });

  if (browserLocale in supportedLocales) {
    return browserLocale;
  } else {
    return process.env.VUE_APP_I18N_LOCALE || 'en';
  }
}

export interface UrlParameters {
  [key: string]: string | number | boolean;
}

export function objToUrl(params: UrlParameters): string {
  return Object.keys(params)
    .map(key => encodeURIComponent(key) + '=' + encodeURIComponent(params[key]))
    .join('&');
}
