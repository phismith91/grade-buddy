import { Link, useLocation } from "react-router-dom";
import { BookOpen, Calculator, FileText, Home } from "lucide-react";

const navItems = [
  { path: "/", label: "Startseite", icon: Home },
  { path: "/einzelnoten", label: "Einzelnoten", icon: Calculator },
  { path: "/zeugnis", label: "Zeugnis", icon: FileText },
  { path: "/dokumentation", label: "Doku", icon: BookOpen },
];

const Navigation = () => {
  const location = useLocation();

  return (
    <nav className="paper-texture border-b border-border">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between py-3">
          <Link to="/" className="flex items-center gap-2">
            <span className="text-xl font-bold text-foreground tracking-tight">
              📝 Notenrechner
            </span>
          </Link>
          <div className="flex items-center gap-1 sm:gap-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center gap-1.5 px-3 py-2 rounded text-sm transition-colors font-sans-ui ${
                    isActive
                      ? "bg-primary text-primary-foreground font-medium"
                      : "text-muted-foreground hover:text-foreground hover:bg-secondary"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span className="hidden sm:inline">{item.label}</span>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
