// LanguageDetector.jsx
const LanguageDetector = (msg) => {
  const langdic = {
    arabic: /[\u0600-\u06FF]/,
    persian: /[\u0750-\u077F]/,
    Hebrew: /[\u0590-\u05FF]/,
    Syriac: /[\u0700-\u074F]/,
    Bengali: /[\u0980-\u09FF]/,
    Ethiopic: /[\u1200-\u137F]/,
    "Greek and Coptic": /[\u0370-\u03FF]/,
    Georgian: /[\u10A0-\u10FF]/,
    Thai: /[\u0E00-\u0E7F]/,
    english: /^[a-zA-Z]+$/,
    // add other languages here
  };

  // Object.entries(langdic).forEach(([key, value]) => {
  //   if (value.test(msg)) {
  //     return key;
  //   }
  // });
  for (const key in langdic) {
    if (langdic[key].test(msg)) {
      return key;
    }
  }

  // If no language is detected, you might want to return a default value or handle it accordingly
  return "unknown";
};

export default LanguageDetector;
