import { useState, useEffect } from "react";
import { NavLink } from "react-router";
import { Button } from "../ui/button/Button";
import {
  CalendarPlus,
  Shield,
  Star,
  CheckCircle2,
  Brain,
  Users,
  Video,
  Sparkles,
} from "lucide-react";
import heroImage from "../../assets/hero-therapy.jpg";

const slides = [
  {
    id: 1,
    image: heroImage,
    icon: <Brain className="w-5 h-5 text-white" />,
    title: "Dra. Elena Martínez",
    subtitle: "Especialista Senior",
    description:
      "\"Tu bienestar es mi prioridad. Juntos encontraremos las herramientas para tu crecimiento personal.\"",
  },
  {
    id: 2,
    image:
      "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?q=80&w=1000&auto=format&fit=crop",
    icon: <Users className="w-5 h-5 text-white" />,
    title: "Terapia de Pareja",
    subtitle: "Fortalece vínculos",
    description:
      "Sesiones especializadas para mejorar la comunicación y resolver conflictos en la relación.",
  },
  {
    id: 3,
    image:
      "https://images.unsplash.com/photo-1516302752625-fbb3c5eca1d4?q=80&w=1000&auto=format&fit=crop",
    icon: <Video className="w-5 h-5 text-white" />,
    title: "Consulta Online",
    subtitle: "Donde estés",
    description:
      "Atención profesional desde la comodidad de tu hogar, con la misma calidez y privacidad.",
  },
  {
    id: 4,
    image:
      "https://images.unsplash.com/photo-1527137342181-19aab11a8ee8?q=80&w=1000&auto=format&fit=crop",
    icon: <Sparkles className="w-5 h-5 text-white" />,
    title: "Terapia Infantil",
    subtitle: "Cuidado especializado",
    description:
      "Acompañamos el desarrollo emocional de los más pequeños en un ambiente seguro y lúdico.",
  },
];

const HeroSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    }, 5000);
    return () => clearInterval(timer);
  }, []);

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

        <div className="relative hidden lg:block">
          <div className="relative z-10 rounded-[2.5rem] overflow-hidden shadow-[0_30px_60px_-15px_rgba(13,138,188,0.3)] border-8 border-white group">
            {/* Main Image Slider */}
            <div className="relative h-137.5 w-full overflow-hidden bg-muted">
              {slides.map((slide, index) => (
                <div
                  key={slide.id}
                  className={`absolute inset-0 transition-all duration-1000 ease-in-out ${
                    index === currentSlide
                      ? "opacity-100 scale-100 translate-x-0"
                      : "opacity-0 scale-110 translate-x-full"
                  }`}
                >
                  <img
                    src={slide.image}
                    alt={slide.title}
                    className="w-full h-full object-cover"
                  />
                  
                  {/* Floating glass card - dynamic content */}
                  <div 
                    className={`absolute bottom-6 left-6 right-6 bg-white/80 backdrop-blur-xl p-5 rounded-lg shadow-xl border border-white/40 transition-all duration-700 delay-300 ${
                      index === currentSlide ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
                    }`}
                  >
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-10 h-10 rounded-md bg-primary flex items-center justify-center shadow-lg shadow-primary/30">
                        {slide.icon}
                      </div>
                      <div>
                        <h4 className="font-black text-foreground text-sm">
                          {slide.title}
                        </h4>
                        <p className="text-[10px] text-primary font-bold uppercase tracking-widest">
                          {slide.subtitle}
                        </p>
                      </div>
                    </div>
                    <p className="text-xs text-foreground/80 leading-relaxed italic font-medium">
                      {slide.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination Dots */}
            <div className="absolute top-6 right-6 z-20 flex gap-2">
              {slides.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    index === currentSlide 
                      ? "w-8 bg-primary" 
                      : "w-2 bg-white/50 hover:bg-white"
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          </div>
          
          {/* Decorative element behind slider */}
          <div className="absolute -bottom-6 -right-6 w-full h-full border-2 border-primary/20 rounded-[2.5rem] -z-10" />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
