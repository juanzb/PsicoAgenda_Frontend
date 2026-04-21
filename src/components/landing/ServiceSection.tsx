import {
  Brain,
  Heart,
  Users,
  Baby,
  Briefcase,
  Sparkles,
  ArrowRight,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "../ui/card/Card";
import { Button } from "../ui/button/Button";

const services = [
  {
    icon: Brain,
    title: "Terapia Individual",
    description:
      "Un espacio seguro para explorar tus emociones y superar miedos con acompañamiento experto.",
  },
  {
    icon: Users,
    title: "Terapia de Pareja",
    description:
      "Herramientas efectivas para mejorar la comunicación y resolver conflictos en tu relación.",
  },
  {
    icon: Heart,
    title: "Terapia Familiar",
    description:
      "Acompañamiento integral para sanar dinámicas y mejorar la convivencia en el hogar.",
  },
  {
    icon: Baby,
    title: "Psicología Infantil",
    description:
      "Especialistas en el desarrollo emocional de los más pequeños para un crecimiento sano.",
  },
  {
    icon: Briefcase,
    title: "Psicología Organizacional",
    description:
      "Mejoramos el clima laboral y potenciamos el desarrollo humano en tu organización.",
  },
  {
    icon: Sparkles,
    title: "Evaluación Diagnóstica",
    description:
      "Pruebas psicométricas y clínicas para diagnósticos precisos de salud mental.",
  },
];

const ServicesSection = () => {
  return (
    <section
      id="servicios"
      className="py-16 bg-white relative overflow-hidden border-y border-border/50"
    >
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-12 max-w-3xl mx-auto">
          <span className="text-[10px] font-black text-primary uppercase tracking-[0.2em] mb-4 block">
            Nuestra Especialidad
          </span>
          <h2 className="text-3xl md:text-4xl font-black text-foreground mb-4 leading-tight">
            Atención Integral para tu Bienestar
          </h2>
          <p className="text-base text-muted-foreground max-w-2xl mx-auto font-medium">
            Contamos con especialistas altamente calificados para brindarte una
            atención ética, profesional y humana.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <Card
              key={service.title}
              className="group border border-border/60 hover:border-primary/40 transition-all duration-300 shadow-sm hover:shadow-xl"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <CardHeader className="p-6">
                <div className="w-12 h-12 rounded-md bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary transition-colors duration-300">
                  <service.icon className="w-6 h-6 text-primary group-hover:text-white transition-colors duration-300" />
                </div>
                <CardTitle className="text-lg font-black group-hover:text-primary transition-colors">
                  {service.title}
                </CardTitle>
                <CardDescription className="text-sm leading-relaxed mt-2 font-medium">
                  {service.description}
                </CardDescription>
              </CardHeader>
              <CardContent className="p-6 pt-0">
                <Button
                  variant="ghost"
                  size="sm"
                  className="p-0 text-primary font-bold hover:bg-transparent group/btn"
                >
                  Más información
                  <ArrowRight className="w-4 h-4 ml-1 group-hover/btn:translate-x-1 transition-transform" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
