import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, X, Star } from "lucide-react";
import GradeResult from "@/components/GradeResult";
import { parseNote, isValidNote } from "@/lib/parseNote";

interface Fach {
  id: string;
  name: string;
  note: string;
  hauptfach: boolean;
  gewichtung: number;
}

const INITIAL: Fach[] = [
  { id: "1", name: "Deutsch", note: "2", hauptfach: true, gewichtung: 2 },
  { id: "2", name: "Mathe", note: "3", hauptfach: true, gewichtung: 2 },
  { id: "3", name: "Englisch", note: "2", hauptfach: true, gewichtung: 2 },
  { id: "4", name: "Geschichte", note: "1", hauptfach: false, gewichtung: 1 },
  { id: "5", name: "Bio", note: "2", hauptfach: false, gewichtung: 1 },
  { id: "6", name: "Sport", note: "1", hauptfach: false, gewichtung: 1 },
  { id: "7", name: "Kunst", note: "3", hauptfach: false, gewichtung: 1 },
  { id: "8", name: "Musik", note: "2", hauptfach: false, gewichtung: 1 },
];

const ZeugnisCalc = () => {
  const [name, setName] = useState("Max M.");
  const [klasse, setKlasse] = useState("8a");
  const [faecher, setFaecher] = useState<Fach[]>(INITIAL);

  const add = () => {
    setFaecher((p) => [
      ...p,
      { id: `${Date.now()}`, name: "", note: "", hauptfach: false, gewichtung: 1 },
    ]);
  };

  const remove = (id: string) => {
    setFaecher((p) => p.filter((f) => f.id !== id));
  };

  const update = (id: string, field: keyof Fach, value: string | boolean | number) => {
    setFaecher((p) =>
      p.map((f) => (f.id === id ? { ...f, [field]: value } : f))
    );
  };

  // Live calculation – jedes Fach hat seine eigene Gewichtung
  const valid = faecher.filter((f) => isValidNote(f.note));
  const haupt = valid.filter((f) => f.hauptfach);
  const neben = valid.filter((f) => !f.hauptfach);

  const weightedAvg = (arr: Fach[]) => {
    const tw = arr.reduce((s, f) => s + f.gewichtung, 0);
    return tw > 0
      ? arr.reduce((s, f) => s + parseNote(f.note) * f.gewichtung, 0) / tw
      : null;
  };

  const hauptSchnitt = weightedAvg(haupt);
  const nebenSchnitt = weightedAvg(neben);

  // Gesamt: alle Fächer gewichtet
  const totalWeight = valid.reduce((s, f) => s + f.gewichtung, 0);
  const gesamt = totalWeight > 0
    ? valid.reduce((s, f) => s + parseNote(f.note) * f.gewichtung, 0) / totalWeight
    : null;

  const hauptFaecher = faecher.filter((f) => f.hauptfach);
  const nebenFaecher = faecher.filter((f) => !f.hauptfach);

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex flex-wrap items-center gap-4">
        <div>
          <label className="text-xs font-medium text-muted-foreground">Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="block font-handwriting text-xl font-bold text-foreground bg-transparent border-b-2 border-dashed border-border focus:border-primary focus:outline-none transition-colors px-1 w-40"
          />
        </div>
        <div>
          <label className="text-xs font-medium text-muted-foreground">Klasse</label>
          <input
            type="text"
            value={klasse}
            onChange={(e) => setKlasse(e.target.value)}
            className="block font-handwriting text-xl font-bold text-foreground bg-transparent border-b-2 border-dashed border-border focus:border-primary focus:outline-none transition-colors px-1 w-20"
          />
        </div>
      </div>

      <p className="text-xs text-muted-foreground flex items-center gap-1">
        <Star className="w-3 h-3 text-primary" fill="currentColor" /> = Hauptfach · Gewichtung pro Fach einstellbar (1×, 1½×, 2×, 3×)
      </p>

      {/* Hauptfächer */}
      {hauptFaecher.length > 0 && (
        <div>
          <h3 className="text-xs font-bold text-primary uppercase tracking-wider mb-2">
            ⭐ Hauptfächer
          </h3>
          <FachList faecher={hauptFaecher} onUpdate={update} onRemove={remove} />
        </div>
      )}

      {/* Nebenfächer */}
      {nebenFaecher.length > 0 && (
        <div>
          <h3 className="text-xs font-bold text-secondary uppercase tracking-wider mb-2">
            📚 Nebenfächer
          </h3>
          <FachList faecher={nebenFaecher} onUpdate={update} onRemove={remove} />
        </div>
      )}

      <button
        onClick={add}
        className="w-full py-3 border-2 border-dashed border-border rounded-xl text-muted-foreground hover:text-primary hover:border-primary transition-colors flex items-center justify-center gap-2 text-sm font-medium"
      >
        <Plus className="w-4 h-4" /> Fach hinzufügen
      </button>

      {/* Live Results */}
      {gesamt !== null && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="grid grid-cols-1 sm:grid-cols-3 gap-3"
        >
          {hauptSchnitt !== null && (
            <GradeResult value={hauptSchnitt} label="Hauptfächer" size="sm" />
          )}
          {nebenSchnitt !== null && (
            <GradeResult value={nebenSchnitt} label="Nebenfächer" size="sm" />
          )}
          <GradeResult value={gesamt} label="Zeugnis ⌀" size="lg" />
        </motion.div>
      )}
    </div>
  );
};

interface FachListProps {
  faecher: Fach[];
  onUpdate: (id: string, field: keyof Fach, value: string | boolean | number) => void;
  onRemove: (id: string) => void;
}

const FachList = ({ faecher, onUpdate, onRemove }: FachListProps) => (
  <div className="space-y-2">
    <AnimatePresence>
      {faecher.map((f, i) => (
        <motion.div
          key={f.id}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 20, height: 0 }}
          transition={{ delay: i * 0.02 }}
          className="flex items-center gap-2 glass-card p-3"
        >
          <button
            onClick={() => onUpdate(f.id, "hauptfach", !f.hauptfach)}
            className={`p-1.5 rounded-lg transition-all ${
              f.hauptfach
                ? "text-primary bg-primary/10"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <Star className="w-4 h-4" fill={f.hauptfach ? "currentColor" : "none"} />
          </button>

          <input
            type="text"
            value={f.name}
            onChange={(e) => onUpdate(f.id, "name", e.target.value)}
            placeholder="Fach"
            className="flex-1 bg-transparent text-foreground font-medium focus:outline-none min-w-0 text-sm"
          />

          <input
            type="text"
            inputMode="decimal"
            value={f.note}
            onChange={(e) => onUpdate(f.id, "note", e.target.value)}
            className="note-input"
            placeholder="?"
          />

          <select
            value={f.gewichtung}
            onChange={(e) => onUpdate(f.id, "gewichtung", Number(e.target.value))}
            className="bg-muted text-foreground rounded-lg px-2 py-2 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-primary/20"
          >
            <option value={0.5}>½×</option>
            <option value={1}>1×</option>
            <option value={1.5}>1½×</option>
            <option value={2}>2×</option>
            <option value={3}>3×</option>
          </select>

          <button
            onClick={() => onRemove(f.id)}
            className="text-muted-foreground hover:text-destructive transition-colors p-1 rounded-lg hover:bg-destructive/10"
          >
            <X className="w-4 h-4" />
          </button>
        </motion.div>
      ))}
    </AnimatePresence>
  </div>
);

export default ZeugnisCalc;
