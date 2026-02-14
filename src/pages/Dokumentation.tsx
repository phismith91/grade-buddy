import { motion } from "framer-motion";
import { BookOpen, Settings, Globe, Code, Calculator, FileText } from "lucide-react";

const sections = [
  {
    icon: Calculator,
    emoji: "🧮",
    title: "Einzelnotenrechner",
    content: [
      "Trage deine Arbeiten, Tests und mündlichen Noten ein.",
      "Stelle das Verhältnis ein (z.B. 60% schriftlich, 40% mündlich).",
      "Jede Leistung kann verschieden gewichtet werden (z.B. Klassenarbeit 2×, Test 1×).",
      "Die Note wird live berechnet – kein Klick nötig!",
    ],
  },
  {
    icon: FileText,
    emoji: "📋",
    title: "Zeugnisrechner",
    content: [
      "Trage alle Fächer mit Noten ein.",
      "Markiere Hauptfächer mit dem ⭐ – die zählen doppelt.",
      "Sieh sofort deinen Durchschnitt für Haupt- und Nebenfächer.",
      "Fächer hinzufügen oder löschen – passt sich deinem Stundenplan an.",
    ],
  },
  {
    icon: Settings,
    emoji: "🔧",
    title: "Bundesland-Anpassung",
    content: [
      "Notenberechnung unterscheidet sich je nach Bundesland.",
      "Aktuell: Standard-Modell (Hauptfächer zählen doppelt).",
      "Geplant: Bayern, NRW, BW etc. mit eigenen Regeln.",
      "Oberstufen-Punktesystem (0-15) kommt auch noch!",
    ],
  },
  {
    icon: Globe,
    emoji: "🌍",
    title: "International",
    content: [
      "Erweiterbar für andere Länder (Österreich 1-5, Schweiz 6-1).",
      "Modulare Berechnungslogik für verschiedene Systeme.",
      "Mehrsprachigkeit über i18n möglich.",
    ],
  },
  {
    icon: Code,
    emoji: "💻",
    title: "Für Entwickler",
    content: [
      "React + TypeScript + Tailwind CSS + Framer Motion",
      "Seiten: /src/pages · Komponenten: /src/components",
      "Design-Tokens zentral in index.css + tailwind.config.ts",
      "Berechnungslogik in den Calc-Komponenten – leicht erweiterbar.",
    ],
  },
];

const Dokumentation = () => {
  return (
    <div className="min-h-[calc(100vh-60px)] px-4 py-8">
      <div className="container mx-auto max-w-2xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-card rounded-2xl border border-border p-6 sm:p-8"
        >
          <div className="text-center mb-8">
            <h1 className="text-2xl sm:text-3xl font-black text-foreground mb-2">
              So geht's 📖
            </h1>
            <p className="text-sm text-muted-foreground">
              Alles was du wissen musst – und wie man die App anpassen kann.
            </p>
          </div>

          <div className="space-y-8">
            {sections.map((section, index) => (
              <motion.div
                key={section.title}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.06 }}
              >
                <h2 className="text-lg font-bold text-foreground flex items-center gap-2 mb-3">
                  <span className="text-xl">{section.emoji}</span>
                  {section.title}
                </h2>
                <ul className="space-y-2 ml-8">
                  {section.content.map((item, i) => (
                    <li key={i} className="text-sm text-muted-foreground leading-relaxed flex gap-2">
                      <span className="text-primary shrink-0">→</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>

          <div className="mt-10 pt-6 border-t border-border text-center">
            <p className="text-xs text-muted-foreground">
              v1.0 · Made with ❤️ für Schüler
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Dokumentation;
