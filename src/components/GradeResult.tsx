import { motion, AnimatePresence } from "framer-motion";
import { getGradeColor, getGradeBg, getGradeEmoji, getGradeText } from "@/lib/grades";

interface GradeResultProps {
  value: number;
  label?: string;
  size?: "sm" | "lg";
}

const GradeResult = ({ value, label, size = "lg" }: GradeResultProps) => {
  const colorClass = getGradeColor(value);
  const bgClass = getGradeBg(value);
  const emoji = getGradeEmoji(value);
  const text = getGradeText(value);
  const rounded = Math.round(value);

  return (
    <motion.div
      initial={{ scale: 0.5, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className={`flex flex-col items-center gap-1 p-4 rounded-2xl ${bgClass}`}
    >
      {label && (
        <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">{label}</p>
      )}
      <div className="flex items-center gap-2">
        <span className={`${size === "lg" ? "text-5xl" : "text-3xl"} font-black ${colorClass}`}>
          {value.toFixed(1)}
        </span>
        <span className={`${size === "lg" ? "text-3xl" : "text-xl"}`}>{emoji}</span>
      </div>
      <div className="flex items-center gap-2">
        <span className={`text-sm font-semibold ${colorClass}`}>
          Note {rounded} · {text}
        </span>
      </div>
    </motion.div>
  );
};

export default GradeResult;
