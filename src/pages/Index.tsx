import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Calculator, FileText, BookOpen, ArrowRight } from "lucide-react";

const features = [
  {
    icon: Calculator,
    title: "Einzelnotenrechner",
    description: "Berechne deine Note aus Arbeiten, Tests und mündlichen Leistungen mit individueller Gewichtung.",
    link: "/einzelnoten",
  },
  {
    icon: FileText,
    title: "Zeugnisrechner",
    description: "Trage alle Fächer ein, markiere Haupt- und Nebenfächer und berechne deine Zeugnisnote.",
    link: "/zeugnis",
  },
  {
    icon: BookOpen,
    title: "Dokumentation",
    description: "Erfahre wie die App funktioniert und wie sie für verschiedene Bundesländer angepasst werden kann.",
    link: "/dokumentation",
  },
];

const Index = () => {
  return (
    <div className="min-h-[calc(100vh-60px)] flex flex-col items-center justify-center px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-3xl"
      >
        {/* Zeugnis-style header */}
        <div className="paper-texture paper-border rounded p-8 sm:p-12 mb-8 text-center">
          <div className="border-b-2 border-foreground/20 pb-6 mb-6">
            <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-2 tracking-tight">
              Zeugnis & Notenrechner
            </h1>
            <p className="text-ink-light text-sm sm:text-base mt-3">
              Bundesrepublik Deutschland
            </p>
          </div>
          
          <div className="space-y-2 text-ink-light">
            <p className="text-base sm:text-lg">
              Berechne deine Noten einfach und schnell – 
              <span className="font-handwriting text-2xl text-grade-red ml-2">wie echt!</span>
            </p>
            <p className="text-sm">
              Für Schüler aller Klassenstufen · Einfach zu bedienen
            </p>
          </div>

          <div className="mt-8 flex justify-center">
            <div className="stamp-effect animate-stamp-in font-bold text-sm tracking-wider uppercase">
              Schuljahr 2025/26
            </div>
          </div>
        </div>

        {/* Feature Cards */}
        <div className="grid gap-4 sm:grid-cols-3">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.2 + index * 0.1 }}
              >
                <Link
                  to={feature.link}
                  className="paper-texture rounded p-6 block group hover:shadow-lg transition-shadow h-full"
                >
                  <Icon className="w-8 h-8 text-primary mb-3" />
                  <h2 className="font-bold text-foreground mb-2 text-lg group-hover:text-primary transition-colors">
                    {feature.title}
                  </h2>
                  <p className="text-sm text-muted-foreground mb-4">
                    {feature.description}
                  </p>
                  <span className="text-primary text-sm font-sans-ui flex items-center gap-1 font-medium">
                    Öffnen <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                  </span>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </motion.div>
    </div>
  );
};

export default Index;
