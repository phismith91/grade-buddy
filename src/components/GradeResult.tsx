import { useState } from "react";
import { motion } from "framer-motion";
import { getGradeColor, getGradeBg, getGradeEmoji, getGradeText } from "@/lib/grades";
import { formatNoteSimple, formatNoteDetail } from "@/lib/parseNote";

interface GradeResultProps {
  value: number;
  label?: string;
  size?: "sm" | "lg";
}

const GradeResult = ({ value, label, size = "lg" }: GradeResultProps) => {
  const [detail, setDetail] = useState(false);
  const colorClass = getGradeColor(value);
  const bgClass = getGradeBg(value);
  const emoji = getGradeEmoji(value);
  const text = getGradeText(value);

  const display = detail ? formatNoteDetail(value) : formatNoteSimple(value);

  return (
    <motion.div
      initial={{ scale: 0.5, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className={`flex flex-col items-center gap-1 p-4 rounded-2xl ${bgClass} cursor-pointer select-none`}
      onClick={() => setDetail((d) => !d)}
      title="Tippe zum Umschalten: simpel ↔ detail"
    >
      {label && (
        <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">{label}</p>
      )}
      <div className="flex items-center gap-2">
        <span className={`${size === "lg" ? "text-5xl" : "text-3xl"} font-black ${colorClass}`}>
          {display}
        </span>
        <span className={`${size === "lg" ? "text-3xl" : "text-xl"}`}>{emoji}</span>
      </div>
      <div className="flex items-center gap-2">
        <span className={`text-sm font-semibold ${colorClass}`}>
          {text}
        </span>
        <span className="text-xs text-muted-foreground">
          {detail ? "simpel →" : "← detail"}
        </span>
      </div>
    </motion.div>
  );
};

export default GradeResult;
