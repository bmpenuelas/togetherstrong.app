export interface UrlParameters {
  [key: string]: string | number;
}

export function objToUrl(params: UrlParameters): string {
  return Object.keys(params)
    .map(key => encodeURIComponent(key) + '=' + encodeURIComponent(params[key]))
    .join('&');
}
