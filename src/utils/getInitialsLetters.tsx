export function getInitialsLetters(string: string) {
  return string
    .split(" ")
    .map((word) => word[0])
    .slice(0, 2)
    .join("");
}
