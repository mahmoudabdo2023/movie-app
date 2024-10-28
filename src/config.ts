// config.ts file
export const defaultLocale = "en" as const;
export const locales = ["en", "ar"] as const;
export type Locale = (typeof locales)[number];

export const pathnames = {
  "/": "/",
} as const;

export const localePrefix = "always" as const;

export const port = process.env.PORT || 3000;
export const host = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : `http://localhost:${port}`;
