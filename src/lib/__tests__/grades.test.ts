import { describe, it, expect } from "vitest";
import { getGradeColor, getGradeEmoji, getGradeText } from "@/lib/grades";

describe("getGradeColor", () => {
  it("returns correct color class for each range", () => {
    expect(getGradeColor(1)).toBe("grade-color-1");
    expect(getGradeColor(1.5)).toBe("grade-color-1");
    expect(getGradeColor(2)).toBe("grade-color-2");
    expect(getGradeColor(3)).toBe("grade-color-3");
    expect(getGradeColor(4)).toBe("grade-color-4");
    expect(getGradeColor(5)).toBe("grade-color-5");
    expect(getGradeColor(6)).toBe("grade-color-6");
  });
});

describe("getGradeEmoji", () => {
  it("returns fire for excellent grades", () => {
    expect(getGradeEmoji(1)).toBe("🔥");
  });
  it("returns skull for failing grades", () => {
    expect(getGradeEmoji(6)).toBe("💀");
  });
});

describe("getGradeText", () => {
  it("returns correct German grade text", () => {
    expect(getGradeText(1)).toBe("Sehr gut");
    expect(getGradeText(2.4)).toBe("Gut");
    expect(getGradeText(4)).toBe("Ausreichend");
    expect(getGradeText(5.6)).toBe("Ungenügend");
  });
});
