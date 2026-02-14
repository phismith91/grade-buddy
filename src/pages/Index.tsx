import { useState } from "react";
import { motion } from "framer-motion";
import { Calculator, FileText, BookOpen, Sparkles } from "lucide-react";
import EinzelnotenCalc from "@/components/EinzelnotenCalc";
import ZeugnisCalc from "@/components/ZeugnisCalc";

const tabs = [
  { id: "einzel", label: "Einzelnoten", icon: Calculator, emoji: "🧮" },
  { id: "zeugnis", label: "Zeugnis", icon: FileText, emoji: "📋" },
] as const;

type TabId = (typeof tabs)[number]["id"];

const Index = () => {
  const [activeTab, setActiveTab] = useState<TabId>("einzel");

  return (
    <div className="min-h-[calc(100vh-60px)] px-4 py-6">
      <div className="container mx-auto max-w-2xl">
        {/* Hero */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-6"
        >
          <h1 className="text-3xl sm:text-4xl font-black text-foreground mb-1">
            Noten<span className="gradient-hero bg-clip-text text-transparent">rechner</span> ✨
          </h1>
          <p className="text-muted-foreground text-sm">
            Check deine Noten – easy & sofort.
          </p>
        </motion.div>

        {/* Tabs */}
        <div className="flex gap-2 mb-6">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl font-semibold text-sm transition-all duration-200 ${
                activeTab === tab.id
                  ? "gradient-hero text-primary-foreground shadow-lg shadow-primary/25 scale-[1.02]"
                  : "bg-card text-muted-foreground hover:text-foreground border border-border"
              }`}
            >
              <span className="text-lg">{tab.emoji}</span>
              {tab.label}
            </button>
          ))}
        </div>

        {/* Content */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
          className="bg-card rounded-2xl border border-border p-5 sm:p-6 shadow-sm"
        >
          {activeTab === "einzel" ? <EinzelnotenCalc /> : <ZeugnisCalc />}
        </motion.div>

        {/* Footer hint */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-center text-xs text-muted-foreground mt-6 flex items-center justify-center gap-1"
        >
          <BookOpen className="w-3 h-3" />
          <a href="/dokumentation" className="hover:text-primary transition-colors underline underline-offset-2">
            Wie funktioniert's?
          </a>
        </motion.p>
      </div>
    </div>
  );
};

export default Index;
