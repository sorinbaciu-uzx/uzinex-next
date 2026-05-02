"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import roMessages from "./messages/ro.json";
import enMessages from "./messages/en.json";

export type Lang = "ro" | "en";
type Messages = Record<string, string>;

const DICTIONARIES: Record<Lang, Messages> = {
  ro: roMessages as Messages,
  en: enMessages as Messages,
};

const STORAGE_KEY = "uzx_lang";

type I18nContextValue = {
  lang: Lang;
  setLang: (l: Lang) => void;
  t: (key: string, fallback?: string) => string;
};

const I18nContext = createContext<I18nContextValue | null>(null);

export function I18nProvider({
  children,
  initialLang = "ro",
}: {
  children: ReactNode;
  initialLang?: Lang;
}) {
  const [lang, setLangState] = useState<Lang>(initialLang);

  // Hydrate from localStorage on first client render so the user's last
  // choice persists across pages and reloads.
  useEffect(() => {
    try {
      const stored = window.localStorage.getItem(STORAGE_KEY);
      if (stored === "ro" || stored === "en") {
        setLangState(stored);
      }
    } catch {
      // ignore (private mode, etc.)
    }
  }, []);

  // Keep <html lang="..."> in sync for accessibility / SEO.
  useEffect(() => {
    try {
      document.documentElement.lang = lang;
    } catch {
      // noop
    }
  }, [lang]);

  const setLang = useCallback((next: Lang) => {
    setLangState(next);
    try {
      window.localStorage.setItem(STORAGE_KEY, next);
    } catch {
      // noop
    }
  }, []);

  const t = useCallback(
    (key: string, fallback?: string) => {
      const dict = DICTIONARIES[lang];
      const value = dict?.[key];
      if (value) return value;
      // For EN, fall back to RO so missing keys don't break the UI.
      if (lang === "en") {
        const ro = DICTIONARIES.ro[key];
        if (ro) return ro;
      }
      return fallback ?? key;
    },
    [lang],
  );

  return (
    <I18nContext.Provider value={{ lang, setLang, t }}>
      {children}
    </I18nContext.Provider>
  );
}

export function useI18n(): I18nContextValue {
  const ctx = useContext(I18nContext);
  if (ctx) return ctx;
  // Fail-soft outside provider: return RO directly so isolated previews
  // (Storybook, MDX) don't crash.
  return {
    lang: "ro",
    setLang: () => {},
    t: (key, fallback) =>
      DICTIONARIES.ro[key] ?? fallback ?? key,
  };
}
