import { motion } from "framer-motion";
import { Shield } from "lucide-react";

const Datenschutz = () => (
  <div className="min-h-[calc(100vh-60px)] px-4 py-10">
    <div className="container mx-auto max-w-2xl">
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-3xl font-black text-foreground mb-6 flex items-center gap-2">
          <Shield className="w-7 h-7 text-primary" /> Datenschutzerklärung
        </h1>
        <div className="bg-card rounded-2xl border border-border p-6 shadow-sm space-y-4">
          <p className="text-muted-foreground text-sm italic">
            ⚠️ Platzhalter – Bitte ersetze diesen Inhalt mit deiner echten Datenschutzerklärung.
          </p>
          <div className="space-y-2 text-foreground">
            <h2 className="font-bold text-lg">1. Datenschutz auf einen Blick</h2>
            <p className="text-sm text-muted-foreground">
              Die folgenden Hinweise geben einen einfachen Überblick darüber, was mit Ihren
              personenbezogenen Daten passiert, wenn Sie diese Website besuchen.
            </p>
            <h2 className="font-bold text-lg mt-4">2. Hosting</h2>
            <p className="text-sm text-muted-foreground">
              Platzhaltertext – bitte durch rechtlich geprüften Inhalt ersetzen.
            </p>
            <h2 className="font-bold text-lg mt-4">3. Allgemeine Hinweise und Pflichtinformationen</h2>
            <p className="text-sm text-muted-foreground">
              Platzhaltertext – bitte durch rechtlich geprüften Inhalt ersetzen.
            </p>
            <h2 className="font-bold text-lg mt-4">4. Datenerfassung auf dieser Website</h2>
            <p className="text-sm text-muted-foreground">
              Diese Website verwendet keine Cookies und erfasst keine personenbezogenen Daten.
              Platzhaltertext – bitte prüfen und anpassen.
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  </div>
);

export default Datenschutz;
