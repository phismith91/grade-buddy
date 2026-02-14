import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Trash2, FileText, Star } from "lucide-react";

interface Fach {
  id: string;
  name: string;
  note: string;
  istHauptfach: boolean;
}

const DEFAULT_FAECHER: Fach[] = [
  { id: "1", name: "Deutsch", note: "", istHauptfach: true },
  { id: "2", name: "Mathematik", note: "", istHauptfach: true },
  { id: "3", name: "Englisch", note: "", istHauptfach: true },
  { id: "4", name: "Geschichte", note: "", istHauptfach: false },
  { id: "5", name: "Biologie", note: "", istHauptfach: false },
  { id: "6", name: "Sport", note: "", istHauptfach: false },
  { id: "7", name: "Kunst", note: "", istHauptfach: false },
  { id: "8", name: "Musik", note: "", istHauptfach: false },
];

const notenText: Record<number, string> = {
  1: "sehr gut",
  2: "gut",
  3: "befriedigend",
  4: "ausreichend",
  5: "mangelhaft",
  6: "ungenügend",
};

const Zeugnis = () => {
  const [schuelerName, setSchuelerName] = useState("");
  const [klasse, setKlasse] = useState("");
  const [schuljahr, setSchuljahr] = useState("2025/26");
  const [faecher, setFaecher] = useState<Fach[]>(DEFAULT_FAECHER);
  const [ergebnis, setErgebnis] = useState<{
    schnitt: number;
    hauptfach: number | null;
    nebenfach: number | null;
  } | null>(null);

  const addFach = () => {
    setFaecher((prev) => [
      ...prev,
      { id: `f${Date.now()}`, name: "", note: "", istHauptfach: false },
    ]);
  };

  const removeFach = (id: string) => {
    setFaecher((prev) => prev.filter((f) => f.id !== id));
  };

  const updateFach = (id: string, field: keyof Fach, value: string | boolean) => {
    setFaecher((prev) =>
      prev.map((f) => (f.id === id ? { ...f, [field]: value } : f))
    );
  };

  const berechnen = () => {
    const valid = faecher.filter((f) => f.note !== "" && !isNaN(Number(f.note)));
    if (valid.length === 0) return;

    const haupt = valid.filter((f) => f.istHauptfach);
    const neben = valid.filter((f) => !f.istHauptfach);

    const avg = (arr: Fach[]) => {
      if (arr.length === 0) return null;
      return arr.reduce((s, f) => s + Number(f.note), 0) / arr.length;
    };

    const hauptSchnitt = avg(haupt);
    const nebenSchnitt = avg(neben);

    // Gesamtschnitt: Hauptfächer zählen doppelt
    let gesamt: number;
    const hauptGewicht = haupt.length * 2;
    const nebenGewicht = neben.length;
    const totalGewicht = hauptGewicht + nebenGewicht;

    if (totalGewicht === 0) return;

    const hauptSumme = haupt.reduce((s, f) => s + Number(f.note) * 2, 0);
    const nebenSumme = neben.reduce((s, f) => s + Number(f.note), 0);
    gesamt = (hauptSumme + nebenSumme) / totalGewicht;

    setErgebnis({
      schnitt: Math.round(gesamt * 100) / 100,
      hauptfach: hauptSchnitt !== null ? Math.round(hauptSchnitt * 100) / 100 : null,
      nebenfach: nebenSchnitt !== null ? Math.round(nebenSchnitt * 100) / 100 : null,
    });
  };

  const hauptfaecher = faecher.filter((f) => f.istHauptfach);
  const nebenfaecher = faecher.filter((f) => !f.istHauptfach);

  return (
    <div className="min-h-[calc(100vh-60px)] px-4 py-8">
      <div className="container mx-auto max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="paper-texture paper-border rounded p-6 sm:p-10"
        >
          {/* Zeugnis Header */}
          <div className="text-center border-b-2 border-foreground/20 pb-6 mb-6">
            <p className="text-xs text-muted-foreground font-sans-ui uppercase tracking-widest mb-1">
              Bundesrepublik Deutschland
            </p>
            <h1 className="text-2xl sm:text-3xl font-bold text-foreground tracking-tight mb-4">
              ZEUGNIS
            </h1>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-left mt-6">
              <div>
                <label className="text-xs text-muted-foreground font-sans-ui block mb-1">
                  Name des Schülers / der Schülerin
                </label>
                <input
                  type="text"
                  value={schuelerName}
                  onChange={(e) => setSchuelerName(e.target.value)}
                  className="w-full bg-transparent border-b border-dashed border-ink-light/40 font-handwriting text-xl text-foreground py-1 focus:outline-none focus:border-primary"
                  placeholder="Max Mustermann"
                />
              </div>
              <div>
                <label className="text-xs text-muted-foreground font-sans-ui block mb-1">
                  Klasse
                </label>
                <input
                  type="text"
                  value={klasse}
                  onChange={(e) => setKlasse(e.target.value)}
                  className="w-full bg-transparent border-b border-dashed border-ink-light/40 font-handwriting text-xl text-foreground py-1 focus:outline-none focus:border-primary"
                  placeholder="8a"
                />
              </div>
              <div>
                <label className="text-xs text-muted-foreground font-sans-ui block mb-1">
                  Schuljahr
                </label>
                <input
                  type="text"
                  value={schuljahr}
                  onChange={(e) => setSchuljahr(e.target.value)}
                  className="w-full bg-transparent border-b border-dashed border-ink-light/40 font-handwriting text-xl text-foreground py-1 focus:outline-none focus:border-primary"
                />
              </div>
            </div>
          </div>

          {/* Leistungen */}
          <div className="mb-4">
            <p className="text-xs text-muted-foreground font-sans-ui mb-1 flex items-center gap-1">
              <Star className="w-3 h-3 text-grade-red" /> = Hauptfach (zählt doppelt)
            </p>
          </div>

          {/* Hauptfächer */}
          {hauptfaecher.length > 0 && (
            <FachGruppe
              title="Hauptfächer"
              faecher={hauptfaecher}
              onRemove={removeFach}
              onUpdate={updateFach}
            />
          )}

          {/* Nebenfächer */}
          {nebenfaecher.length > 0 && (
            <FachGruppe
              title="Nebenfächer"
              faecher={nebenfaecher}
              onRemove={removeFach}
              onUpdate={updateFach}
            />
          )}

          <button
            onClick={addFach}
            className="mt-4 flex items-center gap-1 text-sm text-primary font-sans-ui hover:underline"
          >
            <Plus className="w-4 h-4" /> Fach hinzufügen
          </button>

          {/* Berechnen */}
          <div className="mt-8 flex justify-center">
            <button
              onClick={berechnen}
              className="flex items-center gap-2 bg-primary text-primary-foreground px-8 py-3 rounded font-sans-ui font-medium hover:opacity-90 transition-opacity"
            >
              <FileText className="w-5 h-5" />
              Zeugnis berechnen
            </button>
          </div>

          {/* Ergebnis */}
          <AnimatePresence>
            {ergebnis && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                className="mt-8 border-t-2 border-foreground/20 pt-6"
              >
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
                  {ergebnis.hauptfach !== null && (
                    <div>
                      <p className="text-xs text-muted-foreground font-sans-ui mb-1">Hauptfächer ⌀</p>
                      <p className="grade-display text-4xl">{ergebnis.hauptfach.toFixed(2)}</p>
                    </div>
                  )}
                  {ergebnis.nebenfach !== null && (
                    <div>
                      <p className="text-xs text-muted-foreground font-sans-ui mb-1">Nebenfächer ⌀</p>
                      <p className="grade-display text-4xl">{ergebnis.nebenfach.toFixed(2)}</p>
                    </div>
                  )}
                  <div>
                    <p className="text-xs text-muted-foreground font-sans-ui mb-1">Gesamtschnitt</p>
                    <p className="grade-display text-5xl">{ergebnis.schnitt.toFixed(2)}</p>
                    <p className="text-sm text-foreground mt-1">
                      Note: <span className="font-bold">{Math.round(ergebnis.schnitt)}</span>
                      <span className="text-muted-foreground ml-1">
                        ({notenText[Math.round(ergebnis.schnitt)] || "–"})
                      </span>
                    </p>
                  </div>
                </div>

                <div className="mt-6 flex justify-center">
                  <div className="stamp-effect animate-stamp-in font-bold text-xs tracking-wider uppercase">
                    Berechnet
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  );
};

interface FachGruppeProps {
  title: string;
  faecher: Fach[];
  onRemove: (id: string) => void;
  onUpdate: (id: string, field: keyof Fach, value: string | boolean) => void;
}

const FachGruppe = ({ title, faecher, onRemove, onUpdate }: FachGruppeProps) => (
  <div className="mb-6">
    <h3 className="text-sm font-sans-ui font-semibold text-foreground mb-3 uppercase tracking-wide">
      {title}
    </h3>
    <div className="space-y-2">
      <AnimatePresence>
        {faecher.map((f) => (
          <motion.div
            key={f.id}
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="flex items-center gap-2 sm:gap-3"
          >
            <button
              onClick={() => onUpdate(f.id, "istHauptfach", !f.istHauptfach)}
              className={`p-1 rounded transition-colors ${
                f.istHauptfach ? "text-grade-red" : "text-muted-foreground hover:text-foreground"
              }`}
              title={f.istHauptfach ? "Als Nebenfach setzen" : "Als Hauptfach setzen"}
            >
              <Star className="w-4 h-4" fill={f.istHauptfach ? "currentColor" : "none"} />
            </button>
            <input
              type="text"
              value={f.name}
              onChange={(e) => onUpdate(f.id, "name", e.target.value)}
              className="flex-1 bg-transparent border-b border-dashed border-ink-light/30 text-foreground font-handwriting text-lg py-1 focus:outline-none focus:border-primary min-w-0"
              placeholder="Fach"
            />
            <div className="flex items-center gap-1">
              <input
                type="number"
                min={1}
                max={6}
                value={f.note}
                onChange={(e) => onUpdate(f.id, "note", e.target.value)}
                className="w-16 text-center bg-secondary/50 border border-border rounded py-1 font-handwriting text-xl text-grade-red focus:outline-none focus:ring-1 focus:ring-primary"
                placeholder="–"
              />
            </div>
            <button
              onClick={() => onRemove(f.id)}
              className="text-muted-foreground hover:text-accent transition-colors p-1"
              title="Entfernen"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  </div>
);

export default Zeugnis;
