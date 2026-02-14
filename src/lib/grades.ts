export const getGradeColor = (note: number): string => {
  if (note <= 1.5) return "grade-color-1";
  if (note <= 2.5) return "grade-color-2";
  if (note <= 3.5) return "grade-color-3";
  if (note <= 4.5) return "grade-color-4";
  if (note <= 5.5) return "grade-color-5";
  return "grade-color-6";
};

export const getGradeBg = (note: number): string => {
  if (note <= 1.5) return "grade-bg-1";
  if (note <= 2.5) return "grade-bg-2";
  if (note <= 3.5) return "grade-bg-3";
  if (note <= 4.5) return "grade-bg-4";
  if (note <= 5.5) return "grade-bg-5";
  return "grade-bg-6";
};

export const getGradeEmoji = (note: number): string => {
  if (note <= 1.5) return "🔥";
  if (note <= 2.5) return "💪";
  if (note <= 3.5) return "👍";
  if (note <= 4.5) return "😐";
  if (note <= 5.5) return "😬";
  return "💀";
};

export const getGradeText = (note: number): string => {
  const rounded = Math.round(note);
  const map: Record<number, string> = {
    1: "Sehr gut",
    2: "Gut",
    3: "Befriedigend",
    4: "Ausreichend",
    5: "Mangelhaft",
    6: "Ungenügend",
  };
  return map[rounded] || "–";
};
