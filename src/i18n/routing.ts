import { defineRouting } from "next-intl/routing";

export const locales = ["en", "zh-TW"] as const;
export type Locale = (typeof locales)[number];

export const routing = defineRouting({
  locales: [...locales],
  defaultLocale: "en",
  localePrefix: "always",
});

export const localeLabels: Record<Locale, { short: string; full: string }> = {
  en: { short: "EN", full: "English" },
  "zh-TW": { short: "繁", full: "繁體中文" },
};
