import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, X } from "lucide-react";
import GradeResult from "@/components/GradeResult";
import { parseNote, isValidNote } from "@/lib/parseNote";

interface Leistung {
  id: string;
  name: string;
  note: string;
  gewichtung: number;
}

const INITIAL: Leistung[] = [
  { id: "1", name: "Klassenarbeit 1", note: "2", gewichtung: 2 },
  { id: "2", name: "Klassenarbeit 2", note: "3", gewichtung: 2 },
  { id: "3", name: "Test", note: "1", gewichtung: 1 },
  { id: "4", name: "Mündlich", note: "2", gewichtung: 1 },
];

const EinzelnotenCalc = () => {
  const [fach, setFach] = useState("Mathe");
  const [anteil, setAnteil] = useState(60);
  const [leistungen, setLeistungen] = useState<Leistung[]>(INITIAL);

  const add = () => {
    setLeistungen((p) => [
      ...p,
      { id: `${Date.now()}`, name: "", note: "", gewichtung: 1 },
    ]);
  };

  const remove = (id: string) => {
    setLeistungen((p) => p.filter((l) => l.id !== id));
  };

  const update = (id: string, field: keyof Leistung, value: string | number) => {
    setLeistungen((p) =>
      p.map((l) => (l.id === id ? { ...l, [field]: value } : l))
    );
  };

  // Live calculation – der Slider (anteil) beeinflusst die Gewichtung:
  // Leistungen mit gewichtung >= 2 gelten als "schriftlich", Rest als "mündlich"
  const valid = leistungen.filter((l) => isValidNote(l.note));

  const schriftlich = valid.filter((l) => l.gewichtung >= 2);
  const muendlich = valid.filter((l) => l.gewichtung < 2);

  const avg = (arr: typeof valid) => {
    const tw = arr.reduce((s, l) => s + l.gewichtung, 0);
    return tw > 0 ? arr.reduce((s, l) => s + parseNote(l.note) * l.gewichtung, 0) / tw : null;
  };

  const schriftlichAvg = avg(schriftlich);
  const muendlichAvg = avg(muendlich);

  let ergebnis: number | null = null;
  if (schriftlichAvg !== null && muendlichAvg !== null) {
    ergebnis = (schriftlichAvg * anteil + muendlichAvg * (100 - anteil)) / 100;
  } else if (schriftlichAvg !== null) {
    ergebnis = schriftlichAvg;
  } else if (muendlichAvg !== null) {
    ergebnis = muendlichAvg;
  }

  return (
    <div className="space-y-4">
      {/* Fach input */}
      <div className="flex items-center gap-3">
        <label className="text-sm font-medium text-muted-foreground">Fach:</label>
        <input
          type="text"
          value={fach}
          onChange={(e) => setFach(e.target.value)}
          className="font-handwriting text-2xl font-bold text-foreground bg-transparent border-b-2 border-dashed border-border focus:border-primary focus:outline-none transition-colors px-1"
        />
      </div>

      {/* Gewichtung slider */}
      <div className="glass-card p-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-muted-foreground">Gewichtung</span>
          <span className="text-sm font-bold text-foreground">
            {anteil}% schriftlich · {100 - anteil}% mündlich
          </span>
        </div>
        <input
          type="range"
          min={0}
          max={100}
          step={5}
          value={anteil}
          onChange={(e) => setAnteil(Number(e.target.value))}
          className="w-full accent-primary h-2 rounded-full"
        />
      </div>

      {/* Leistungen */}
      <div className="space-y-2">
        <AnimatePresence>
          {leistungen.map((l, i) => (
            <motion.div
              key={l.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20, height: 0 }}
              transition={{ delay: i * 0.03 }}
              className="flex items-center gap-2 glass-card p-3"
            >
              <input
                type="text"
                value={l.name}
                onChange={(e) => update(l.id, "name", e.target.value)}
                placeholder="Was war's?"
                className="flex-1 bg-transparent text-foreground font-medium focus:outline-none min-w-0 text-sm"
              />

              <input
                type="text"
                inputMode="decimal"
                value={l.note}
                onChange={(e) => update(l.id, "note", e.target.value)}
                className="note-input"
                placeholder="?"
              />

              <select
                value={l.gewichtung}
                onChange={(e) => update(l.id, "gewichtung", Number(e.target.value))}
                className="bg-muted text-foreground rounded-lg px-2 py-2 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-primary/20"
              >
                <option value={0.5}>½×</option>
                <option value={1}>1×</option>
                <option value={1.5}>1½×</option>
                <option value={2}>2×</option>
                <option value={3}>3×</option>
              </select>

              <button
                onClick={() => remove(l.id)}
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
        className="w-full py-3 border-2 border-dashed border-border rounded-xl text-muted-foreground hover:text-primary hover:border-primary transition-colors flex items-center justify-center gap-2 text-sm font-medium"
      >
        <Plus className="w-4 h-4" /> Neue Leistung
      </button>

      {/* Live Result */}
      <AnimatePresence>
        {ergebnis !== null && (
          <motion.div
            key={ergebnis.toFixed(1)}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <GradeResult value={ergebnis} label={fach} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default EinzelnotenCalc;
