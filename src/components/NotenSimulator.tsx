import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, X, Target } from "lucide-react";
import { parseNote, isValidNote, formatNoteSimple, formatNoteDetail } from "@/lib/parseNote";
import { getGradeColor, getGradeBg, getGradeEmoji } from "@/lib/grades";

interface Note {
  id: string;
  name: string;
  note: string;
  gewichtung: number;
}

const INITIAL: Note[] = [
  { id: "1", name: "Klassenarbeit 1", note: "4", gewichtung: 2 },
  { id: "2", name: "Klassenarbeit 2", note: "3", gewichtung: 2 },
  { id: "3", name: "Mündlich", note: "3", gewichtung: 1 },
];

const NotenSimulator = () => {
  const [fach, setFach] = useState("Mathe");
  const [noten, setNoten] = useState<Note[]>(INITIAL);
  const [zielNote, setZielNote] = useState("2");
  const [neueGewichtung, setNeueGewichtung] = useState(2);

  const add = () => {
    setNoten((p) => [
      ...p,
      { id: `${Date.now()}`, name: "", note: "", gewichtung: 1 },
    ]);
  };

  const remove = (id: string) => {
    setNoten((p) => p.filter((n) => n.id !== id));
  };

  const update = (id: string, field: keyof Note, value: string | number) => {
    setNoten((p) =>
      p.map((n) => (n.id === id ? { ...n, [field]: value } : n))
    );
  };

  // Berechnung: aktuelle gewichtete Summe
  const valid = noten.filter((n) => isValidNote(n.note));
  const totalWeight = valid.reduce((s, n) => s + n.gewichtung, 0);
  const currentSum = valid.reduce((s, n) => s + parseNote(n.note) * n.gewichtung, 0);
  const currentAvg = totalWeight > 0 ? currentSum / totalWeight : null;

  // Benötigte Note berechnen
  const zielValue = parseNote(zielNote);
  const zielValid = !isNaN(zielValue) && zielValue >= 0.7 && zielValue <= 6;

  let benoetigteNote: number | null = null;
  let machbar = false;
  let message = "";

  if (valid.length > 0 && zielValid) {
    // Formel: (currentSum + x * neueGewichtung) / (totalWeight + neueGewichtung) = zielValue
    // => x = (zielValue * (totalWeight + neueGewichtung) - currentSum) / neueGewichtung
    const newTotal = totalWeight + neueGewichtung;
    const needed = (zielValue * newTotal - currentSum) / neueGewichtung;
    benoetigteNote = Math.round(needed * 100) / 100;

    if (needed <= 0.7) {
      machbar = true;
      message = "Locker! Du hast das Ziel quasi schon erreicht! 🎉";
      benoetigteNote = 1;
    } else if (needed <= 1) {
      machbar = true;
      message = "Du brauchst eine 1 – voll machbar! 💪";
    } else if (needed <= 2) {
      machbar = true;
      message = "Eine gute Note reicht – du packst das! 🔥";
    } else if (needed <= 3) {
      machbar = true;
      message = "Befriedigend reicht – machbar mit Einsatz! 📚";
    } else if (needed <= 4) {
      machbar = true;
      message = "Wird eng, aber noch drin! Gib Gas! ⚡";
    } else if (needed <= 6) {
      machbar = true;
      message = "Sehr schwierig, aber nicht unmöglich! 😬";
    } else {
      machbar = false;
      message = "Leider mit einer Note allein nicht erreichbar 😔";
      benoetigteNote = null;
    }
  }

  // Wie viele Noten bräuchte man bei einer 1?
  let extraEinsen: number | null = null;
  if (!machbar && valid.length > 0 && zielValid) {
    // (currentSum + n * 1 * neueGewichtung) / (totalWeight + n * neueGewichtung) = zielValue
    // => n = (zielValue * totalWeight - currentSum) / (neueGewichtung * (1 - zielValue))
    if (zielValue > 1) {
      const n = (zielValue * totalWeight - currentSum) / (neueGewichtung * (1 - zielValue));
      extraEinsen = Math.abs(Math.ceil(n));
    }
  }

  return (
    <div className="space-y-4">
      {/* Fach */}
      <div className="flex items-center gap-3">
        <label className="text-sm font-medium text-muted-foreground">Fach:</label>
        <input
          type="text"
          value={fach}
          onChange={(e) => setFach(e.target.value)}
          className="font-handwriting text-2xl font-bold text-foreground bg-transparent border-b-2 border-dashed border-border focus:border-primary focus:outline-none transition-colors px-1"
        />
      </div>

      {/* Aktuelle Noten */}
      <div>
        <h3 className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-2">
          📝 Bisherige Noten
        </h3>
        <div className="space-y-2">
          <AnimatePresence>
            {noten.map((n, i) => (
              <motion.div
                key={n.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20, height: 0 }}
                transition={{ delay: i * 0.02 }}
                className="flex items-center gap-2 glass-card p-3"
              >
                <input
                  type="text"
                  value={n.name}
                  onChange={(e) => update(n.id, "name", e.target.value)}
                  placeholder="Was war's?"
                  className="flex-1 bg-transparent text-foreground font-medium focus:outline-none min-w-0 text-sm"
                />
                <input
                  type="text"
                  inputMode="decimal"
                  value={n.note}
                  onChange={(e) => update(n.id, "note", e.target.value)}
                  className="note-input"
                  placeholder="?"
                />
                <select
                  value={n.gewichtung}
                  onChange={(e) => update(n.id, "gewichtung", Number(e.target.value))}
                  className="bg-muted text-foreground rounded-lg px-2 py-2 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-primary/20"
                >
                  <option value={0.5}>½×</option>
                  <option value={1}>1×</option>
                  <option value={1.5}>1½×</option>
                  <option value={2}>2×</option>
                  <option value={3}>3×</option>
                </select>
                <button
                  onClick={() => remove(n.id)}
                  className="text-muted-foreground hover:text-destructive transition-colors p-1 rounded-lg hover:bg-destructive/10"
                >
                  <X className="w-4 h-4" />
                </button>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
        <button
          onClick={add}
          className="w-full py-3 mt-2 border-2 border-dashed border-border rounded-xl text-muted-foreground hover:text-primary hover:border-primary transition-colors flex items-center justify-center gap-2 text-sm font-medium"
        >
          <Plus className="w-4 h-4" /> Note hinzufügen
        </button>
      </div>

      {/* Aktueller Schnitt */}
      {currentAvg !== null && (
        <div className="glass-card p-3 flex items-center justify-between">
          <span className="text-sm text-muted-foreground">Aktueller Schnitt:</span>
          <span className={`text-lg font-black ${getGradeColor(currentAvg)}`}>
            {formatNoteDetail(currentAvg)} {getGradeEmoji(currentAvg)}
          </span>
        </div>
      )}

      {/* Ziel */}
      <div className="glass-card p-4 space-y-3">
        <h3 className="text-xs font-bold text-primary uppercase tracking-wider flex items-center gap-1">
          <Target className="w-3 h-3" /> Dein Ziel
        </h3>
        <div className="flex items-center gap-3">
          <span className="text-sm text-muted-foreground">Ich will mindestens eine</span>
          <input
            type="text"
            inputMode="decimal"
            value={zielNote}
            onChange={(e) => setZielNote(e.target.value)}
            className="note-input !w-16 !h-12 !text-xl"
            placeholder="?"
          />
          <span className="text-sm text-muted-foreground">schaffen.</span>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-sm text-muted-foreground">Nächste Arbeit zählt</span>
          <select
            value={neueGewichtung}
            onChange={(e) => setNeueGewichtung(Number(e.target.value))}
            className="bg-muted text-foreground rounded-lg px-2 py-2 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-primary/20"
          >
            <option value={0.5}>½×</option>
            <option value={1}>1×</option>
            <option value={1.5}>1½×</option>
            <option value={2}>2×</option>
            <option value={3}>3×</option>
          </select>
        </div>
      </div>

      {/* Ergebnis */}
      <AnimatePresence>
        {valid.length > 0 && zielValid && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className={`p-5 rounded-2xl text-center space-y-2 ${
              machbar
                ? benoetigteNote && benoetigteNote <= 2
                  ? "grade-bg-1"
                  : benoetigteNote && benoetigteNote <= 4
                  ? "grade-bg-3"
                  : "grade-bg-5"
                : "grade-bg-6"
            }`}
          >
            {benoetigteNote !== null ? (
              <>
                <p className="text-sm font-medium text-muted-foreground">
                  Du brauchst mindestens:
                </p>
                <p className={`text-5xl font-black ${getGradeColor(benoetigteNote)}`}>
                  {formatNoteSimple(benoetigteNote)} {getGradeEmoji(benoetigteNote)}
                </p>
                <p className="text-sm text-muted-foreground">
                  ({formatNoteDetail(benoetigteNote)})
                </p>
              </>
            ) : (
              <>
                <p className="text-4xl">😔</p>
              </>
            )}
            <p className="text-sm font-semibold text-foreground">{message}</p>
            {extraEinsen !== null && extraEinsen > 0 && (
              <p className="text-xs text-muted-foreground mt-1">
                💡 Tipp: Mit {extraEinsen}× Note 1 (je {neueGewichtung}×) wäre es möglich!
              </p>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default NotenSimulator;
