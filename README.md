# 🧮 Notenrechner

> Kostenloser Notenrechner für Schüler der Klassen 5–13. Berechne Einzelnoten, Zeugnis-Durchschnitte und simuliere deine Wunschnote – einfach, schnell und kostenlos.

🌐 **Live:** [notenrechner.lovable.app](https://notenrechner.lovable.app/)

---

## ✨ Features

| Feature | Beschreibung |
|---|---|
| **Einzelnoten-Rechner** | Noten eingeben, gewichten und Durchschnitt berechnen |
| **Zeugnis-Rechner** | Alle Fächer mit individueller Gewichtung (z. B. Hauptfächer ×2) |
| **Noten-Simulator** | „Was brauch ich noch?" – berechnet die nötige Note für deinen Wunschschnitt |
| **Dark / Light Mode** | Automatisch oder manuell umschaltbar |
| **Responsive Design** | Optimiert für Desktop, Tablet und Smartphone |

## 🛠 Tech-Stack

- **Framework:** [React 18](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/)
- **Build Tool:** [Vite](https://vitejs.dev/)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/) + [shadcn/ui](https://ui.shadcn.com/)
- **Animationen:** [Framer Motion](https://www.framer.com/motion/)
- **Routing:** [React Router v6](https://reactrouter.com/)
- **Analytics:** [Umami](https://umami.is/)
- **Deployment:** GitHub Pages (via GitHub Actions)

## 🚀 Lokale Entwicklung

Voraussetzung: [Node.js](https://nodejs.org/) (≥ 18)

```sh
# Repository klonen
git clone https://github.com/<DEIN-USERNAME>/notenrechner.git
cd notenrechner

# Abhängigkeiten installieren
npm install

# Entwicklungsserver starten
npm run dev
```

Die App läuft dann unter `http://localhost:5173`.

## 📁 Projektstruktur

```
src/
├── components/          # UI-Komponenten
│   ├── EinzelnotenCalc  # Einzelnoten-Rechner
│   ├── ZeugnisCalc      # Zeugnis-Rechner
│   ├── NotenSimulator   # Noten-Simulator
│   ├── Navigation       # Hauptnavigation
│   ├── Footer           # Footer mit rechtlichen Links
│   ├── ThemeToggle      # Dark/Light Mode Toggle
│   └── ui/              # shadcn/ui Basiskomponenten
├── pages/               # Seiten (Index, Impressum, Datenschutz, …)
├── lib/                 # Hilfsfunktionen (Notenberechnung, Parsing)
└── hooks/               # Custom React Hooks
```

## 🧪 Tests

```sh
npm run test
```

## 🌍 Deployment

Das Projekt wird automatisch über **GitHub Actions** auf **GitHub Pages** deployed, sobald Änderungen auf den `main`-Branch gepusht werden.

Workflow: `.github/workflows/deploy.yml`

## 📄 Rechtliches

- [Impressum](/impressum) – *Platzhalter, bitte eigene Daten einfügen*
- [Datenschutzerklärung](/datenschutz) – *Platzhalter, bitte eigene Daten einfügen*

## 📝 Lizenz

Dieses Projekt ist privat. Alle Rechte vorbehalten.

---

Erstellt mit ❤️ und [Lovable](https://lovable.dev/)
