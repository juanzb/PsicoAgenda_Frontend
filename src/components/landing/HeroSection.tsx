import { NavLink } from "react-router";
import { Button } from "../ui/button/Button";
import { CalendarPlus, Shield, Star, CheckCircle2 } from "lucide-react";
import heroImage from "../../assets/hero-therapy.jpg";

const HeroSection = () => {
  return (
    <section className="relative pt-24 pb-12 overflow-hidden bg-background">
      {/* Decorative background elements */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-primary/5 rounded-l-[100px] -z-10" />

      <div className="container mx-auto px-6 grid lg:grid-cols-2 gap-10 items-center">
        <div className="animate-in fade-in slide-in-from-left-6 duration-700">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 mb-6">
            <Shield className="w-4 h-4 text-primary" />
            <span className="text-[10px] font-black text-primary uppercase tracking-[0.15em]">
              Centro Certificado 2026
            </span>
          </div>

          <h1 className="text-5xl md:text-6xl font-black text-foreground mb-6 leading-[1.1] tracking-tight">
            Prioriza tu <span className="text-primary">Salud Mental</span> con
            Expertos
          </h1>

          <p className="text-lg text-muted-foreground mb-8 leading-relaxed max-w-xl">
            Gestiona tus citas de forma sencilla y segura. Conecta con los
            mejores profesionales en psicología desde cualquier lugar.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 mb-10">
            <NavLink to="/register">
              <Button
                size="lg"
                className="rounded-md px-10 shadow-xl shadow-primary/20 gradient-primary font-bold h-14"
              >
                <CalendarPlus className="w-5 h-5 mr-2" />
                Agendar Mi Cita
              </Button>
            </NavLink>
            <a href="#servicios">
              <Button
                variant="outline"
                size="lg"
                className="rounded-md px-10 font-bold h-14 border-2 border-border hover:border-primary hover:text-primary transition-all"
              >
                Ver Especialidades
              </Button>
            </a>
          </div>

          <div className="flex flex-wrap items-center gap-8 border-t border-border pt-8">
            <div className="flex items-center gap-3">
              <div className="flex -space-x-3">
                {[1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className="w-10 h-10 rounded-full border-2 border-background bg-muted flex items-center justify-center overflow-hidden"
                  >
                    <img
                      src={`https://i.pravatar.cc/100?img=${i + 15}`}
                      alt="Patient"
                    />
                  </div>
                ))}
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-0.5">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <Star
                      key={i}
                      className="w-3 h-3 fill-primary text-primary"
                    />
                  ))}
                </div>
                <p className="text-xs font-bold text-foreground">
                  +2.5k Reseñas
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-md bg-primary/10 flex items-center justify-center">
                <CheckCircle2 className="w-6 h-6 text-primary" />
              </div>
              <div>
                <p className="text-xs font-black text-foreground uppercase tracking-wider leading-none">
                  Confidencial
                </p>
                <p className="text-[10px] text-muted-foreground font-bold mt-1">
                  Privacidad 100%
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="relative hidden lg:block animate-in fade-in slide-in-from-right-6 duration-700 delay-200">
          <div className="relative z-10 rounded-[2.5rem] overflow-hidden shadow-[0_30px_60px_-15px_rgba(13,138,188,0.3)] border-8 border-white">
            <img
              src={heroImage}
              alt="Psicóloga profesional"
              className="w-full h-137.5 object-cover"
            />
            {/* Floating glass card */}
            <div className="absolute bottom-6 left-6 right-6 bg-white/80 backdrop-blur-xl p-5 rounded-lg shadow-xl border border-white/40">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 rounded-md bg-primary flex items-center justify-center shadow-lg shadow-primary/30">
                  <Brain className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h4 className="font-black text-foreground text-sm">
                    Dra. Elena Martínez
                  </h4>
                  <p className="text-[10px] text-primary font-bold uppercase tracking-widest">
                    Especialista Senior
                  </p>
                </div>
              </div>
              <p className="text-xs text-foreground/80 leading-relaxed italic font-medium">
                "Tu bienestar es mi prioridad. Juntos encontraremos las
                herramientas para tu crecimiento personal."
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// Internal icon import for consistency
const Brain = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96.44 2.5 2.5 0 0 1-2.96-3.08 3 3 0 0 1-.34-5.58 2.5 2.5 0 0 1 1.32-4.24 2.5 2.5 0 0 1 4.44-2.04Z" />
    <path d="M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96.44 2.5 2.5 0 0 0 2.96-3.08 3 3 0 0 0 .34-5.58 2.5 2.5 0 0 0-1.32-4.24 2.5 2.5 0 0 0-4.44-2.04Z" />
  </svg>
);

export default HeroSection;
