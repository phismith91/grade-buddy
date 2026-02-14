import { describe, it, expect } from "vitest";
import { parseNote, isValidNote, formatNoteSimple, formatNoteDetail } from "@/lib/parseNote";

describe("parseNote", () => {
  it("parses integer grades", () => {
    expect(parseNote("1")).toBe(1);
    expect(parseNote("6")).toBe(6);
  });

  it("parses dot decimals", () => {
    expect(parseNote("2.5")).toBe(2.5);
  });

  it("parses comma decimals (German format)", () => {
    expect(parseNote("2,5")).toBe(2.5);
    expect(parseNote("3,7")).toBeCloseTo(3.7);
  });

  it("parses plus/minus notation", () => {
    expect(parseNote("2+")).toBe(1.7);
    expect(parseNote("2-")).toBe(2.3);
    expect(parseNote("1+")).toBe(0.7);
    expect(parseNote("3-")).toBe(3.3);
  });

  it("returns NaN for empty or invalid input", () => {
    expect(parseNote("")).toBeNaN();
    expect(parseNote("  ")).toBeNaN();
    expect(parseNote("abc")).toBeNaN();
  });
});

describe("isValidNote", () => {
  it("accepts valid grades 1-6 including plus/minus", () => {
    expect(isValidNote("1")).toBe(true);
    expect(isValidNote("2+")).toBe(true);
    expect(isValidNote("3,5")).toBe(true);
    expect(isValidNote("6")).toBe(true);
    expect(isValidNote("1+")).toBe(true); // 0.7 is valid
  });

  it("rejects grades outside range", () => {
    expect(isValidNote("7")).toBe(false);
  });

  it("rejects invalid input", () => {
    expect(isValidNote("")).toBe(false);
    expect(isValidNote("abc")).toBe(false);
  });
});

describe("formatNoteSimple", () => {
  it("formats exact plus/minus grades", () => {
    expect(formatNoteSimple(1.7)).toBe("2+");
    expect(formatNoteSimple(2.0)).toBe("2");
    expect(formatNoteSimple(2.3)).toBe("2-");
  });

  it("formats in-between grades", () => {
    expect(formatNoteSimple(2.5)).toBe("2-3");
  });
});

describe("formatNoteDetail", () => {
  it("formats with German comma", () => {
    expect(formatNoteDetail(2.333)).toBe("2,3");
    expect(formatNoteDetail(1.0)).toBe("1,0");
  });
});
