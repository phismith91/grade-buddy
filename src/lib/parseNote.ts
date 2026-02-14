/**
 * Parse a grade string that may use German comma notation (e.g. "2,5")
 * Returns NaN if invalid.
 */
export const parseNote = (input: string): number => {
  if (!input || input.trim() === "") return NaN;
  const normalized = input.replace(",", ".");
  return parseFloat(normalized);
};

/**
 * Check if a grade string represents a valid German school grade (1-6).
 */
export const isValidNote = (input: string): boolean => {
  const n = parseNote(input);
  return !isNaN(n) && n >= 1 && n <= 6;
};
