import { useEffect, useState } from "react";

export const languageOptions = [
  { value: "en", label: "English" },
  { value: "fr", label: "French" },
  { value: "ar", label: "Arabic" },
];

export const languageLabels = languageOptions.reduce((labels, language) => {
  labels[language.value] = language.label;
  return labels;
}, {});

export const translations = {
  en: {
    account: "Account",
    cart: "Cart",
    catalog: "Catalog",
    categories: "Categories",
    favorites: "Favorites",
    language: "Language",
    search: "Search",
    searchPlaceholder: "Search for a product...",
    shop: "Shop",
  },
  fr: {
    account: "Compte",
    cart: "Panier",
    catalog: "Catalogue",
    categories: "Categories",
    favorites: "Favoris",
    language: "Langue",
    search: "Recherche",
    searchPlaceholder: "Rechercher un produit...",
    shop: "Boutique",
  },
  ar: {
    account: "الحساب",
    cart: "السلة",
    catalog: "الكتالوج",
    categories: "الأقسام",
    favorites: "المفضلة",
    language: "اللغة",
    search: "بحث",
    searchPlaceholder: "ابحث عن منتج...",
    shop: "المتجر",
  },
};

const storageKey = "matjari-language";
const languageEvent = "matjari-language-change";
const validLanguages = languageOptions.map((language) => language.value);

function getInitialLanguage() {
  if (typeof window === "undefined") {
    return "fr";
  }

  const storedLanguage = window.localStorage.getItem(storageKey);

  return validLanguages.includes(storedLanguage) ? storedLanguage : "fr";
}

function applyLanguageDirection(language) {
  if (typeof document === "undefined") return;

  document.documentElement.lang = language;
  document.documentElement.dir = language === "ar" ? "rtl" : "ltr";
}

export function useStorefrontLanguage() {
  const [currentLanguage, setCurrentLanguageState] = useState(getInitialLanguage);

  useEffect(() => {
    applyLanguageDirection(currentLanguage);
  }, [currentLanguage]);

  useEffect(() => {
    if (typeof window === "undefined") return undefined;

    const syncLanguage = (event) => {
      const nextLanguage = event.detail?.language || window.localStorage.getItem(storageKey);

      if (validLanguages.includes(nextLanguage)) {
        setCurrentLanguageState(nextLanguage);
      }
    };

    const syncStorage = (event) => {
      if (event.key === storageKey && validLanguages.includes(event.newValue)) {
        setCurrentLanguageState(event.newValue);
      }
    };

    window.addEventListener(languageEvent, syncLanguage);
    window.addEventListener("storage", syncStorage);

    return () => {
      window.removeEventListener(languageEvent, syncLanguage);
      window.removeEventListener("storage", syncStorage);
    };
  }, []);

  const setCurrentLanguage = (language) => {
    if (!validLanguages.includes(language)) return;

    setCurrentLanguageState(language);

    if (typeof window !== "undefined") {
      window.localStorage.setItem(storageKey, language);
      window.dispatchEvent(new CustomEvent(languageEvent, { detail: { language } }));
    }
  };

  return {
    currentLanguage,
    direction: currentLanguage === "ar" ? "rtl" : "ltr",
    languageLabel: languageLabels[currentLanguage] || languageLabels.fr,
    setCurrentLanguage,
    t: translations[currentLanguage] || translations.fr,
  };
}
