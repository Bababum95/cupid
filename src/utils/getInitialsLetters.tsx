/**
 * Extracts the initials from the first two words with Latin letters in a given string.
 * Ignores any non-Latin characters or special symbols.
 *
 * @param {string} string - The input string from which initials are extracted.
 * @returns {string} - A string containing the initials of the first two words with Latin letters only.
 *
 * @example
 * getInitialsLetters("Emma & Leo.M");    // "EL"
 * getInitialsLetters("John D. O'Neill"); // "JO"
 * getInitialsLetters("Иван Иванов");     // ""
 * getInitialsLetters("Emma Иванов");     // "E"
 */
export function getInitialsLetters(string: string): string {
  return string
    .split(" ")
    .filter((word) => /[a-zA-Z]/.test(word))          // Keep only words with Latin letters
    .map((word) => word.replace(/[^a-zA-Z]/g, "")[0]) // Remove non-Latin characters, get first letter
    .slice(0, 2)
    .join("");
}
