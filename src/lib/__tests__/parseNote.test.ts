import { describe, it, expect } from "vitest";
import { parseNote, isValidNote } from "@/lib/parseNote";

describe("parseNote", () => {
  it("parses integer grades", () => {
    expect(parseNote("1")).toBe(1);
    expect(parseNote("6")).toBe(6);
  });

  it("parses dot decimals", () => {
    expect(parseNote("2.5")).toBe(2.5);
    expect(parseNote("1.3")).toBeCloseTo(1.3);
  });

  it("parses comma decimals (German format)", () => {
    expect(parseNote("2,5")).toBe(2.5);
    expect(parseNote("3,7")).toBeCloseTo(3.7);
  });

  it("returns NaN for empty or invalid input", () => {
    expect(parseNote("")).toBeNaN();
    expect(parseNote("  ")).toBeNaN();
    expect(parseNote("abc")).toBeNaN();
  });
});

describe("isValidNote", () => {
  it("accepts valid grades 1-6", () => {
    expect(isValidNote("1")).toBe(true);
    expect(isValidNote("3,5")).toBe(true);
    expect(isValidNote("6")).toBe(true);
  });

  it("rejects grades outside 1-6", () => {
    expect(isValidNote("0")).toBe(false);
    expect(isValidNote("7")).toBe(false);
    expect(isValidNote("0,5")).toBe(false);
  });

  it("rejects invalid input", () => {
    expect(isValidNote("")).toBe(false);
    expect(isValidNote("abc")).toBe(false);
  });
});
