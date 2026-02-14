import { motion } from "framer-motion";
import { BookOpen, Settings, Globe, Code, Calculator, FileText } from "lucide-react";

const sections = [
  {
    icon: Calculator,
    title: "Einzelnotenrechner",
    content: [
      "Gib deine schriftlichen und mündlichen Leistungen ein (z.B. Klassenarbeiten, Tests, mündliche Noten).",
      "Stelle das Verhältnis zwischen schriftlich und mündlich ein (z.B. 50/50 oder 60/40).",
      "Jede Leistung kann eine individuelle Gewichtung haben (z.B. eine Klassenarbeit zählt 2×, ein Test 1×).",
      "Klicke auf 'Note berechnen' um deine Fachnote zu sehen.",
    ],
  },
  {
    icon: FileText,
    title: "Zeugnisrechner",
    content: [
      "Trage alle deine Fächer ein und gib die jeweilige Note ein.",
      "Markiere Fächer als Hauptfach (⭐), damit sie doppelt gewichtet werden.",
      "Der Rechner berechnet automatisch den Durchschnitt für Haupt- und Nebenfächer sowie den Gesamtdurchschnitt.",
      "Du kannst jederzeit Fächer hinzufügen oder entfernen.",
    ],
  },
  {
    icon: Settings,
    title: "Anpassung für Bundesländer",
    content: [
      "Die Notenberechnung kann je nach Bundesland variieren.",
      "Aktuell wird das Standard-Berechnungsmodell verwendet (Hauptfächer zählen doppelt).",
      "Geplante Erweiterungen: Bundesland-spezifische Gewichtungen, unterschiedliche Notensysteme (1-6 vs. Punkte), und Oberstufen-Punktesystem.",
      "Entwickler können die Berechnungslogik in den jeweiligen Seiten-Komponenten anpassen.",
    ],
  },
  {
    icon: Globe,
    title: "Internationalisierung",
    content: [
      "Die App ist so aufgebaut, dass sie für verschiedene Länder angepasst werden kann.",
      "Geplant: Unterstützung für österreichische (1-5) und Schweizer Notensysteme (6-1).",
      "Die Berechnungslogik ist modular aufgebaut und kann für verschiedene Schulsysteme erweitert werden.",
      "Sprachunterstützung kann über i18n-Bibliotheken hinzugefügt werden.",
    ],
  },
  {
    icon: Code,
    title: "Technische Dokumentation",
    content: [
      "Technologie: React + TypeScript + Tailwind CSS + Framer Motion.",
      "Projektstruktur: Seiten liegen in /src/pages, Komponenten in /src/components.",
      "Design-System: Alle Farben und Stile sind zentral in index.css und tailwind.config.ts definiert.",
      "Erweiterung: Neue Berechnungsmodi können als separate Komponenten oder Konfigurationsdateien hinzugefügt werden.",
      "Daten werden aktuell nur lokal im Browser gespeichert – für Persistenz kann ein Backend angebunden werden.",
    ],
  },
];

const Dokumentation = () => {
  return (
    <div className="min-h-[calc(100vh-60px)] px-4 py-8">
      <div className="container mx-auto max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="paper-texture paper-border rounded p-6 sm:p-10"
        >
          <div className="text-center border-b-2 border-foreground/20 pb-6 mb-8">
            <BookOpen className="w-10 h-10 text-primary mx-auto mb-3" />
            <h1 className="text-2xl sm:text-3xl font-bold text-foreground tracking-tight">
              Dokumentation
            </h1>
            <p className="text-sm text-muted-foreground mt-2">
              So funktioniert der Notenrechner – und so kannst du ihn anpassen.
            </p>
          </div>

          <div className="space-y-8">
            {sections.map((section, index) => {
              const Icon = section.icon;
              return (
                <motion.div
                  key={section.title}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.08 }}
                >
                  <div className="flex items-start gap-3 mb-3">
                    <Icon className="w-5 h-5 text-primary mt-0.5 shrink-0" />
                    <h2 className="text-lg font-bold text-foreground">{section.title}</h2>
                  </div>
                  <ul className="space-y-2 ml-8">
                    {section.content.map((item, i) => (
                      <li key={i} className="text-sm text-ink-light leading-relaxed flex gap-2">
                        <span className="text-primary shrink-0">•</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              );
            })}
          </div>

          <div className="mt-10 pt-6 border-t border-border text-center">
            <p className="text-xs text-muted-foreground font-sans-ui">
              Version 1.0 · Für Schüler, von Schülern · Made with ❤️
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Dokumentation;
