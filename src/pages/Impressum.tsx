import { motion } from "framer-motion";
import { Scale } from "lucide-react";

const Impressum = () => (
  <div className="min-h-[calc(100vh-60px)] px-4 py-10">
    <div className="container mx-auto max-w-2xl">
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-3xl font-black text-foreground mb-6 flex items-center gap-2">
          <Scale className="w-7 h-7 text-primary" /> Impressum
        </h1>
        <div className="bg-card rounded-2xl border border-border p-6 shadow-sm space-y-4">
          <p className="text-muted-foreground text-sm italic">
            ⚠️ Platzhalter – Bitte ersetze diesen Inhalt mit deinem echten Impressum.
          </p>
          <div className="space-y-2 text-foreground">
            <h2 className="font-bold text-lg">Angaben gemäß § 5 TMG</h2>
            <p>Max Mustermann<br />Musterstraße 1<br />12345 Musterstadt</p>
            <h2 className="font-bold text-lg mt-4">Kontakt</h2>
            <p>E-Mail: info@example.com</p>
            <h2 className="font-bold text-lg mt-4">Haftungsausschluss</h2>
            <p className="text-muted-foreground text-sm">
              Platzhaltertext – bitte durch rechtlich geprüften Inhalt ersetzen.
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  </div>
);

export default Impressum;
