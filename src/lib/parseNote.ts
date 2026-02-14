/**
 * Plus/Minus notation mapping (e.g. "2+" → 1.7, "2-" → 2.3)
 */
const PLUS_MINUS_MAP: Record<string, number> = {
  "1+": 0.7, "1": 1.0, "1-": 1.3,
  "2+": 1.7, "2": 2.0, "2-": 2.3,
  "3+": 2.7, "3": 3.0, "3-": 3.3,
  "4+": 3.7, "4": 4.0, "4-": 4.3,
  "5+": 4.7, "5": 5.0, "5-": 5.3,
  "6": 6.0,
};

/**
 * Parse a grade string supporting:
 * - German comma notation ("2,5")
 * - Plus/Minus notation ("2+", "3-")
 * - Plain numbers ("2.5", "3")
 * Returns NaN if invalid.
 */
export const parseNote = (input: string): number => {
  if (!input || input.trim() === "") return NaN;
  const trimmed = input.trim();

  // Check plus/minus notation first
  if (PLUS_MINUS_MAP[trimmed] !== undefined) {
    return PLUS_MINUS_MAP[trimmed];
  }

  const normalized = trimmed.replace(",", ".");
  return parseFloat(normalized);
};

/**
 * Check if a grade string represents a valid German school grade (1-6).
 */
export const isValidNote = (input: string): boolean => {
  const n = parseNote(input);
  return !isNaN(n) && n >= 0.7 && n <= 6;
};

/**
 * Format a decimal grade as simplified school notation.
 * e.g. 1.7 → "2+", 2.0 → "2", 2.3 → "2-", 2.5 → "2-3"
 */
export const formatNoteSimple = (value: number): string => {
  // Find closest plus/minus match
  const rounded = Math.round(value * 10) / 10;
  const reverseMap: Record<number, string> = {};
  for (const [k, v] of Object.entries(PLUS_MINUS_MAP)) {
    reverseMap[v] = k;
  }
  if (reverseMap[rounded]) return reverseMap[rounded];

  // Between two whole grades
  const lower = Math.floor(value);
  const upper = Math.ceil(value);
  if (lower === upper) return `${lower}`;
  const frac = value - lower;
  if (frac <= 0.15) return `${lower}`;
  if (frac <= 0.4) return `${lower}-${upper}`;
  if (frac <= 0.6) return `${lower}-${upper}`;
  if (frac <= 0.85) return `${upper}+`;
  return `${upper}`;
};

/**
 * Format a decimal grade as precise decimal with comma.
 * e.g. 2.333 → "2,3"
 */
export const formatNoteDetail = (value: number): string => {
  return value.toFixed(1).replace(".", ",");
};
