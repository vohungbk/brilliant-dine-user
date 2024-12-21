/* eslint-disable no-var */
export {};

declare global {
  interface Window {
    google: {
      translate: {
        TranslateElement: new (
          options: { pageLanguage: string },
          elementId: string,
        ) => void;
      };
    };
    googleTranslateElementInit: () => void;
  }
  namespace globalThis {
    var __GOOGLE_TRANSLATION_CONFIG__: {
      languages: LanguageDescriptor[];
      defaultLanguage: string;
    };
  }
}
