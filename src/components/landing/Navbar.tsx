import { useState, useEffect } from "react";
import { NavLink } from "react-router";
import { Button } from "../ui/button/Button";
import { Menu, X, Brain, Calendar } from "lucide-react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Inicio", href: "#top" },
    { name: "Servicios", href: "#servicios" },
    { name: "Profesionales", href: "#profesionales" },
    { name: "Contacto", href: "#contacto" },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-white border-b-2 border-border shadow-lg ${
        scrolled ? "py-2" : "py-4"
      }`}
    >
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between">
          <NavLink to="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl gradient-primary flex items-center justify-center shadow-lg shadow-primary/30 group-hover:rotate-12 transition-transform duration-300">
              <Brain className="w-6 h-6 text-white" />
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-black text-foreground tracking-tight leading-none">
                PsiAgenda
              </span>
              <span className="text-[9px] text-primary font-bold uppercase tracking-[0.2em]">
                Bienestar Mental
              </span>
            </div>
          </NavLink>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-10">
            <div className="flex items-center gap-8">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="text-sm font-bold text-muted-foreground hover:text-primary transition-colors relative group py-2"
                >
                  {link.name}
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full" />
                </a>
              ))}
            </div>

            <div className="flex items-center gap-4 border-l-2 border-border pl-8">
              <NavLink to="/login">
                <Button
                  variant="ghost"
                  size="sm"
                  className="font-bold text-foreground hover:text-primary"
                >
                  Ingresar
                </Button>
              </NavLink>
              <NavLink to="/register">
                <Button
                  size="sm"
                  className="rounded-xl px-6 gradient-primary font-bold shadow-md hover:shadow-primary/30"
                >
                  <Calendar className="w-4 h-4 mr-2" />
                  Agendar Cita
                </Button>
              </NavLink>
            </div>
          </div>

          {/* Mobile toggle */}
          <button
            className="md:hidden w-10 h-10 flex items-center justify-center rounded-xl bg-muted text-foreground border-2 border-border shadow-sm"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile menu */}
        {isOpen && (
          <div className="md:hidden absolute top-full left-0 right-0 bg-white border-b-2 border-border p-6 animate-in slide-in-from-top-4 duration-300 shadow-2xl">
            <div className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="text-lg font-bold text-foreground border-b border-border/50 pb-2"
                  onClick={() => setIsOpen(false)}
                >
                  {link.name}
                </a>
              ))}
              <div className="pt-4 flex flex-col gap-3">
                <NavLink to="/login" onClick={() => setIsOpen(false)}>
                  <Button
                    variant="outline"
                    className="w-full h-12 rounded-xl font-bold border-2"
                  >
                    Iniciar Sesión
                  </Button>
                </NavLink>
                <NavLink to="/register" onClick={() => setIsOpen(false)}>
                  <Button className="w-full h-12 rounded-xl gradient-primary font-bold">
                    <Calendar className="w-5 h-5 mr-2" />
                    Agendar Cita
                  </Button>
                </NavLink>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
