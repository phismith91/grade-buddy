import { Link } from "react-router-dom";

const Footer = () => (
  <footer className="border-t border-border bg-card/50 py-4 mt-auto">
    <div className="container mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-muted-foreground">
      <span>© {new Date().getFullYear()} Notenrechner</span>
      <div className="flex items-center gap-3">
        <Link to="/impressum" className="hover:text-foreground transition-colors">
          Impressum
        </Link>
        <Link to="/datenschutz" className="hover:text-foreground transition-colors">
          Datenschutz
        </Link>
      </div>
    </div>
  </footer>
);

export default Footer;
