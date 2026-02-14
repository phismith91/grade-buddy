import { Link, useLocation } from "react-router-dom";
import { Calculator, BookOpen } from "lucide-react";
import ThemeToggle from "./ThemeToggle";

const Navigation = () => {
  const location = useLocation();

  return (
    <nav className="border-b border-border bg-card/80 backdrop-blur-md sticky top-0 z-50">
      <div className="container mx-auto px-4 flex items-center justify-between h-14">
        <Link to="/" className="flex items-center gap-2 font-black text-lg text-foreground">
          <span className="gradient-hero text-primary-foreground w-8 h-8 rounded-lg flex items-center justify-center text-sm">
            📝
          </span>
          <span className="hidden sm:inline">Notenrechner</span>
        </Link>
        <div className="flex items-center gap-1">
          <Link
            to="/"
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
              location.pathname === "/"
                ? "bg-primary/10 text-primary"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <Calculator className="w-4 h-4" />
            <span className="hidden sm:inline">Rechner</span>
          </Link>
          <Link
            to="/dokumentation"
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
              location.pathname === "/dokumentation"
                ? "bg-primary/10 text-primary"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <BookOpen className="w-4 h-4" />
            <span className="hidden sm:inline">Doku</span>
          </Link>
          <ThemeToggle />
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
