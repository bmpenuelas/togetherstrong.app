export const supportedLocales = ['en', 'es'];

export const baseUrl =
  process.env.NODE_ENV == 'development'
    ? 'https://localhost:8080'
    : 'https://togetherstrong.app';
