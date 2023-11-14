globalThis.splitStringByUpercase = (word: string): string => {
  return word
    .replace(/([A-Z])/g, " $1")
    .trim()
    .toLowerCase();
};
