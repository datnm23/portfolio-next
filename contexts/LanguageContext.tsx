"use client";

import React, { createContext, useState, useEffect, useCallback, ReactNode } from "react";
import { getTranslation, getSection, type Language } from "@/locales";
import vi from "@/locales/vi.json";

type Translations = typeof vi;

interface LanguageContextType {
  language: Language;
  changeLanguage: (lang: Language) => void;
  t: (key: string) => string;
  getSection: <K extends keyof Translations>(section: K) => Translations[K];
}

const defaultValue: LanguageContextType = {
  language: "vi",
  changeLanguage: () => { },
  t: (key: string) => key,
  getSection: <K extends keyof Translations>(section: K) => vi[section],
};

export const LanguageContext = createContext<LanguageContextType>(defaultValue);

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>("vi");
  const [isLoaded, setIsLoaded] = useState(true);

  useEffect(() => {
    // Load language from localStorage on mount
    const savedLanguage = localStorage.getItem("language") as Language | null;
    if (savedLanguage && (savedLanguage === "vi" || savedLanguage === "en")) {
      setLanguage(savedLanguage);
    }
  }, []);

  const changeLanguage = useCallback((lang: Language) => {
    setLanguage(lang);
    localStorage.setItem("language", lang);
  }, []);

  // Translation function using centralized translations
  const t = useCallback((key: string): string => {
    return getTranslation(key, language);
  }, [language]);

  // Get entire section of translations
  const getSectionFn = useCallback(<K extends keyof Translations>(section: K): Translations[K] => {
    return getSection(section, language);
  }, [language]);

  return (
    <LanguageContext.Provider value={{ language, changeLanguage, t, getSection: getSectionFn }}>
      {isLoaded ? children : null}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = React.useContext(LanguageContext);
  if (context === undefined) {
    // Return default value if not within provider
    return defaultValue;
  }
  return context;
};
