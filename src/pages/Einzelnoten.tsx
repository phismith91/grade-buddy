import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Trash2, Calculator } from "lucide-react";

interface Leistung {
  id: string;
  name: string;
  note: string;
  gewichtung: number;
}

const DEFAULT_LEISTUNGEN: Leistung[] = [
  { id: "1", name: "Klassenarbeit 1", note: "", gewichtung: 2 },
  { id: "2", name: "Test 1", note: "", gewichtung: 1 },
];

const notenText: Record<number, string> = {
  1: "sehr gut",
  2: "gut",
  3: "befriedigend",
  4: "ausreichend",
  5: "mangelhaft",
  6: "ungenügend",
};

const Einzelnoten = () => {
  const [fachName, setFachName] = useState("Mathematik");
  const [schriftlichAnteil, setSchriftlichAnteil] = useState(50);
  const [schriftlich, setSchriftlich] = useState<Leistung[]>(DEFAULT_LEISTUNGEN);
  const [muendlich, setMuendlich] = useState<Leistung[]>([
    { id: "m1", name: "Mündliche Mitarbeit", note: "", gewichtung: 1 },
  ]);
  const [ergebnis, setErgebnis] = useState<number | null>(null);

  const addLeistung = (type: "schriftlich" | "muendlich") => {
    const setter = type === "schriftlich" ? setSchriftlich : setMuendlich;
    const prefix = type === "schriftlich" ? "s" : "m";
    const label = type === "schriftlich" ? "Arbeit" : "Mündlich";
    setter((prev) => [
      ...prev,
      {
        id: `${prefix}${Date.now()}`,
        name: `${label} ${prev.length + 1}`,
        note: "",
        gewichtung: 1,
      },
    ]);
  };

  const removeLeistung = (type: "schriftlich" | "muendlich", id: string) => {
    const setter = type === "schriftlich" ? setSchriftlich : setMuendlich;
    setter((prev) => prev.filter((l) => l.id !== id));
  };

  const updateLeistung = (
    type: "schriftlich" | "muendlich",
    id: string,
    field: keyof Leistung,
    value: string | number
  ) => {
    const setter = type === "schriftlich" ? setSchriftlich : setMuendlich;
    setter((prev) =>
      prev.map((l) => (l.id === id ? { ...l, [field]: value } : l))
    );
  };

  const berechneSchnitt = (leistungen: Leistung[]): number | null => {
    const valid = leistungen.filter(
      (l) => l.note !== "" && !isNaN(Number(l.note))
    );
    if (valid.length === 0) return null;
    const sumGewicht = valid.reduce((s, l) => s + l.gewichtung, 0);
    if (sumGewicht === 0) return null;
    const sumNoten = valid.reduce(
      (s, l) => s + Number(l.note) * l.gewichtung,
      0
    );
    return sumNoten / sumGewicht;
  };

  const berechnen = () => {
    const sSchnitt = berechneSchnitt(schriftlich);
    const mSchnitt = berechneSchnitt(muendlich);

    if (sSchnitt === null && mSchnitt === null) return;

    const sAnteil = schriftlichAnteil / 100;
    const mAnteil = 1 - sAnteil;

    let gesamt: number;
    if (sSchnitt !== null && mSchnitt !== null) {
      gesamt = sSchnitt * sAnteil + mSchnitt * mAnteil;
    } else if (sSchnitt !== null) {
      gesamt = sSchnitt;
    } else {
      gesamt = mSchnitt!;
    }

    setErgebnis(Math.round(gesamt * 100) / 100);
  };

  const gerundeteNote = ergebnis !== null ? Math.round(ergebnis) : null;

  return (
    <div className="min-h-[calc(100vh-60px)] px-4 py-8">
      <div className="container mx-auto max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="paper-texture paper-border rounded p-6 sm:p-10"
        >
          {/* Header like a test paper */}
          <div className="border-b-2 border-foreground/20 pb-4 mb-6">
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div className="flex-1">
                <label className="text-xs text-muted-foreground font-sans-ui block mb-1">Fach</label>
                <input
                  type="text"
                  value={fachName}
                  onChange={(e) => setFachName(e.target.value)}
                  className="font-handwriting text-2xl sm:text-3xl text-foreground bg-transparent border-b border-dashed border-ink-light/40 focus:outline-none focus:border-primary w-full"
                />
              </div>
              <div className="text-right">
                <p className="text-xs text-muted-foreground font-sans-ui">Einzelnotenrechner</p>
                <p className="text-sm text-ink-light">Schuljahr 2025/26</p>
              </div>
            </div>
          </div>

          {/* Gewichtung */}
          <div className="mb-6 p-4 bg-secondary/50 rounded">
            <label className="text-sm font-sans-ui text-muted-foreground block mb-2">
              Verhältnis schriftlich / mündlich
            </label>
            <div className="flex items-center gap-3">
              <span className="font-sans-ui text-sm font-medium text-foreground w-8">{schriftlichAnteil}%</span>
              <input
                type="range"
                min={0}
                max={100}
                step={5}
                value={schriftlichAnteil}
                onChange={(e) => setSchriftlichAnteil(Number(e.target.value))}
                className="flex-1 accent-primary"
              />
              <span className="font-sans-ui text-sm font-medium text-foreground w-8">{100 - schriftlichAnteil}%</span>
            </div>
            <div className="flex justify-between text-xs text-muted-foreground font-sans-ui mt-1">
              <span>Schriftlich</span>
              <span>Mündlich</span>
            </div>
          </div>

          {/* Schriftliche Leistungen */}
          <LeistungsBlock
            title="Schriftliche Leistungen"
            leistungen={schriftlich}
            type="schriftlich"
            onAdd={() => addLeistung("schriftlich")}
            onRemove={(id) => removeLeistung("schriftlich", id)}
            onUpdate={(id, field, value) => updateLeistung("schriftlich", id, field, value)}
          />

          {/* Mündliche Leistungen */}
          <LeistungsBlock
            title="Mündliche Leistungen"
            leistungen={muendlich}
            type="muendlich"
            onAdd={() => addLeistung("muendlich")}
            onRemove={(id) => removeLeistung("muendlich", id)}
            onUpdate={(id, field, value) => updateLeistung("muendlich", id, field, value)}
          />

          {/* Berechnen Button */}
          <div className="mt-8 flex justify-center">
            <button
              onClick={berechnen}
              className="flex items-center gap-2 bg-primary text-primary-foreground px-8 py-3 rounded font-sans-ui font-medium hover:opacity-90 transition-opacity"
            >
              <Calculator className="w-5 h-5" />
              Note berechnen
            </button>
          </div>

          {/* Ergebnis */}
          <AnimatePresence>
            {ergebnis !== null && gerundeteNote !== null && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                className="mt-8 border-t-2 border-foreground/20 pt-6 text-center"
              >
                <p className="text-sm text-muted-foreground font-sans-ui mb-2">Berechnete Note</p>
                <p className="grade-display text-6xl mb-2">{ergebnis.toFixed(2)}</p>
                <p className="text-lg text-foreground font-medium">
                  Note:{" "}
                  <span className="grade-display text-3xl">{gerundeteNote}</span>
                  <span className="text-muted-foreground ml-2">
                    ({notenText[gerundeteNote] || "–"})
                  </span>
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  );
};

interface LeistungsBlockProps {
  title: string;
  leistungen: Leistung[];
  type: "schriftlich" | "muendlich";
  onAdd: () => void;
  onRemove: (id: string) => void;
  onUpdate: (id: string, field: keyof Leistung, value: string | number) => void;
}

const LeistungsBlock = ({
  title,
  leistungen,
  type,
  onAdd,
  onRemove,
  onUpdate,
}: LeistungsBlockProps) => (
  <div className="mb-6">
    <h3 className="text-sm font-sans-ui font-semibold text-foreground mb-3 uppercase tracking-wide">
      {title}
    </h3>
    <div className="space-y-2">
      <AnimatePresence>
        {leistungen.map((l) => (
          <motion.div
            key={l.id}
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="flex items-center gap-2 sm:gap-3"
          >
            <input
              type="text"
              value={l.name}
              onChange={(e) => onUpdate(l.id, "name", e.target.value)}
              className="flex-1 bg-transparent border-b border-dashed border-ink-light/30 text-foreground font-handwriting text-lg py-1 focus:outline-none focus:border-primary min-w-0"
              placeholder="Bezeichnung"
            />
            <div className="flex items-center gap-1">
              <label className="text-xs text-muted-foreground font-sans-ui hidden sm:block">Note</label>
              <input
                type="number"
                min={1}
                max={6}
                step={0.1}
                value={l.note}
                onChange={(e) => onUpdate(l.id, "note", e.target.value)}
                className="w-16 text-center bg-secondary/50 border border-border rounded py-1 font-handwriting text-xl text-grade-red focus:outline-none focus:ring-1 focus:ring-primary"
                placeholder="–"
              />
            </div>
            <div className="flex items-center gap-1">
              <label className="text-xs text-muted-foreground font-sans-ui hidden sm:block">×</label>
              <select
                value={l.gewichtung}
                onChange={(e) => onUpdate(l.id, "gewichtung", Number(e.target.value))}
                className="bg-secondary/50 border border-border rounded py-1 px-2 text-sm font-sans-ui text-foreground focus:outline-none focus:ring-1 focus:ring-primary"
              >
                {[0.5, 1, 1.5, 2, 3].map((g) => (
                  <option key={g} value={g}>
                    {g}×
                  </option>
                ))}
              </select>
            </div>
            <button
              onClick={() => onRemove(l.id)}
              className="text-muted-foreground hover:text-accent transition-colors p-1"
              title="Entfernen"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
    <button
      onClick={onAdd}
      className="mt-3 flex items-center gap-1 text-sm text-primary font-sans-ui hover:underline"
    >
      <Plus className="w-4 h-4" /> Hinzufügen
    </button>
  </div>
);

export default Einzelnoten;
