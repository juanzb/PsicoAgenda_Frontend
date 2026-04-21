import { Button } from "../ui/button/Button";
import { CalendarPlus, MessageCircle, Phone } from "lucide-react";
import { NavLink } from "react-router";

export default function ContactoSection() {
  return (
    <section id="contacto" className="py-16 bg-background">
      <div className="container mx-auto px-6">
        <div className="gradient-primary rounded-[3rem] p-10 md:p-16 text-center relative overflow-hidden shadow-[0_20px_50px_-10px_rgba(13,138,188,0.4)] border-4 border-white/20">
          {/* Decorative patterns */}
          <div className="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none select-none">
            <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <pattern
                  id="dots"
                  width="20"
                  height="20"
                  patternUnits="userSpaceOnUse"
                >
                  <circle cx="2" cy="2" r="1" fill="white" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#dots)" />
            </svg>
          </div>

          <div className="relative z-10 max-w-2xl mx-auto">
            <span className="inline-block px-4 py-1.5 rounded-full bg-white/20 text-white text-[10px] font-black uppercase tracking-widest mb-6 backdrop-blur-md border border-white/30">
              Empieza Hoy Mismo
            </span>
            <h2 className="text-3xl md:text-5xl font-black text-white mb-6 leading-tight">
              ¿Listo para dar el primer paso hacia tu bienestar?
            </h2>
            <p className="text-white/90 text-lg mb-10 max-w-xl mx-auto leading-relaxed font-medium">
              No dejes para mañana lo que puedes empezar hoy. Agenda tu consulta
              inicial y transforma tu vida con apoyo profesional.
            </p>

            <div className="flex flex-col sm:flex-row gap-5 justify-center items-center">
              <NavLink to="/register" className="w-full sm:w-auto">
                <Button
                  size="lg"
                  className="w-full sm:w-auto bg-primary/50 text-primary hover:bg-primary/10 hover:text-white rounded-lg px-12 font-black h-16 shadow-[0_15px_30px_-5px_rgba(0,0,0,0.15)] hover:scale-[1.03] transition-all"
                >
                  <CalendarPlus className="w-6 h-6 mr-3" />
                  Agendar Cita Ahora
                </Button>
              </NavLink>
              <Button
                variant="ghost"
                size="lg"
                className="w-full sm:w-auto text-white hover:bg-white/10 rounded-lg px-10 h-16 border-2 border-white/40 backdrop-blur-sm font-bold"
              >
                <MessageCircle className="w-5 h-5 mr-3" />
                WhatsApp
              </Button>
            </div>

            <p className="mt-8 text-white/70 text-[10px] font-black uppercase tracking-[0.2em] flex items-center justify-center gap-3">
              <Phone className="w-4 h-4" />
              Llámanos: +1 (555) 000-0000
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
