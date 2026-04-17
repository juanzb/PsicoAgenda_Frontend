import { useState, useMemo, type ReactNode } from "react";
import {
  Calendar,
  Clock,
  User,
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  ShieldCheck,
  Search,
  Info,
} from "lucide-react";
import { Button } from "../../../components/ui/button/Button";
import {
  Card,
  CardContent,
  CardFooter,
} from "../../../components/ui/card/Card";

// Tipos
type TBookingStep = "specialist" | "schedule" | "summary" | "success";

interface ISpecialist {
  id: string;
  name: string;
  specialty: string;
  avatarUrl: string;
  description: string;
  rating: number;
}

// Mock de especialistas
const specialists: ISpecialist[] = [
  {
    id: "1",
    name: "Dra. Elena Martínez",
    specialty: "Terapia Cognitivo-Conductual",
    avatarUrl: "https://i.pravatar.cc/150?u=elena",
    description:
      "Especialista en ansiedad y depresión con más de 10 años de experiencia.",
    rating: 4.9,
  },
  {
    id: "2",
    name: "Dr. Roberto Silva",
    specialty: "Psicología Infantil y Adolescente",
    avatarUrl: "https://i.pravatar.cc/150?u=roberto",
    description:
      "Enfoque lúdico para el desarrollo emocional en las etapas tempranas.",
    rating: 4.8,
  },
  {
    id: "3",
    name: "Dra. Claudia Vargas",
    specialty: "Terapia de Pareja y Familia",
    avatarUrl: "https://i.pravatar.cc/150?u=claudia",
    description: "Experta en resolución de conflictos y comunicación asertiva.",
    rating: 5.0,
  },
];

// Horarios disponibles (Simulados)
const timeSlots = [
  "08:00",
  "09:00",
  "10:00",
  "11:00",
  "14:00",
  "15:00",
  "16:00",
  "17:00",
];

export function AppointmentsPage(): ReactNode {
  const [step, setStep] = useState<TBookingStep>("specialist");
  const [selectedSpecialist, setSelectedSpecialist] =
    useState<ISpecialist | null>(null);
  const [selectedDate, setSelectedDate] = useState<string>("");
  const [selectedTime, setSelectedTime] = useState<string>("");
  const [isBooking, setIsBooking] = useState(false);

  // Lógica para fechas (Máximo 30 días, no pasado)
  const availableDates = useMemo(() => {
    const dates = [];
    const today = new Date();
    for (let i = 0; i <= 30; i++) {
      const date = new Date();
      date.setDate(today.getDate() + i);
      // Ignorar domingos
      if (date.getDay() !== 0) {
        dates.push({
          full: date.toISOString().split("T")[0],
          day: date.toLocaleDateString("es-ES", { weekday: "short" }),
          num: date.getDate(),
          month: date.toLocaleDateString("es-ES", { month: "short" }),
        });
      }
    }
    return dates;
  }, []);

  const handleConfirm = () => {
    setIsBooking(true);
    setTimeout(() => {
      setIsBooking(false);
      setStep("success");
    }, 1500);
  };

  const handleReset = () => {
    setStep("specialist");
    setSelectedSpecialist(null);
    setSelectedDate("");
    setSelectedTime("");
  };

  return (
    <div className="max-w-4xl mx-auto pb-12">
      {/* Stepper Visual */}
      {step !== "success" && (
        <div className="flex items-center justify-between mb-8 px-4">
          {[
            { id: "specialist", label: "Especialista", icon: User },
            { id: "schedule", label: "Horario", icon: Calendar },
            { id: "summary", label: "Confirmación", icon: ShieldCheck },
          ].map((s, i) => {
            const Icon = s.icon;
            const isActive = step === s.id;
            const isDone =
              (i === 0 && (step === "schedule" || step === "summary")) ||
              (i === 1 && step === "summary");

            return (
              <div
                key={s.id}
                className="flex items-center flex-1 last:flex-none"
              >
                <div className="flex flex-col items-center gap-2">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${
                      isActive
                        ? "bg-primary text-white scale-110 shadow-lg shadow-primary/20"
                        : isDone
                          ? "bg-primary/20 text-primary"
                          : "bg-muted text-muted-foreground"
                    }`}
                  >
                    {isDone ? <CheckCircle2 size={20} /> : <Icon size={20} />}
                  </div>
                  <span
                    className={`text-[10px] font-bold uppercase tracking-widest ${isActive ? "text-primary" : "text-muted-foreground"}`}
                  >
                    {s.label}
                  </span>
                </div>
                {i < 2 && (
                  <div
                    className={`flex-1 h-0.5 mx-4 ${isDone ? "bg-primary/30" : "bg-muted"}`}
                  />
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* PASO 1: SELECCIÓN DE ESPECIALISTA */}
      {step === "specialist" && (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 px-1">
            <div>
              <h1 className="text-2xl font-bold text-foreground">
                Elige a tu especialista
              </h1>
              <p className="text-muted-foreground">
                Selecciona el profesional que mejor se adapte a tus necesidades
              </p>
            </div>
            <div className="relative w-full md:w-64">
              <Search
                className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                size={18}
              />
              <input
                placeholder="Buscar por nombre..."
                className="w-full pl-10 pr-4 py-2 bg-white border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {specialists.map((doc) => (
              <Card
                key={doc.id}
                className={`cursor-pointer group transition-all duration-300 border-2 hover:shadow-xl ${
                  selectedSpecialist?.id === doc.id
                    ? "border-primary bg-primary/5 shadow-lg"
                    : "border-transparent"
                }`}
                // onClick={() => setSelectedSpecialist(doc)}
              >
                <CardContent className="p-6">
                  <div className="flex gap-4">
                    <div className="w-20 h-20 rounded-2xl overflow-hidden shrink-0 border-2 border-white shadow-sm">
                      <img
                        src={doc.avatarUrl}
                        alt={doc.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between items-start">
                        <h3 className="font-bold text-lg text-foreground group-hover:text-primary transition-colors">
                          {doc.name}
                        </h3>
                        <div className="flex items-center gap-1 bg-amber-50 px-2 py-0.5 rounded-lg border border-amber-100">
                          <span className="text-xs font-bold text-amber-700">
                            {doc.rating}
                          </span>
                        </div>
                      </div>
                      <p className="text-sm font-semibold text-primary/80 mb-2">
                        {doc.specialty}
                      </p>
                      <p className="text-xs text-muted-foreground line-clamp-2">
                        {doc.description}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="flex justify-end pt-4">
            <Button
              size="lg"
              className="rounded-2xl px-10 gradient-primary"
              disabled={!selectedSpecialist}
              onClick={() => setStep("schedule")}
              icon={<ArrowRight size={20} />}
              iconPosition="right"
            >
              Continuar
            </Button>
          </div>
        </div>
      )}

      {/* PASO 2: SELECCIÓN DE HORARIO */}
      {step === "schedule" && (
        <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-500">
          <div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setStep("specialist")}
              className="mb-4"
            >
              <ArrowLeft size={16} className="mr-2" /> Volver a especialistas
            </Button>
            <h1 className="text-2xl font-bold text-foreground">
              Elige fecha y hora
            </h1>
            <p className="text-muted-foreground text-sm">
              Próximos 30 días disponibles con {selectedSpecialist?.name}
            </p>
          </div>

          <Card className="border-none shadow-elevated rounded-3xl">
            <CardContent className="p-8 space-y-8">
              {/* Selector de Fecha */}
              <div className="space-y-4">
                <h3 className="text-sm font-bold uppercase tracking-widest text-muted-foreground flex items-center gap-2">
                  <Calendar size={16} /> Selecciona el día
                </h3>
                <div className="flex gap-3 overflow-x-auto pb-4 custom-scrollbar no-scrollbar-x">
                  {availableDates.map((d) => (
                    <button
                      key={d.full}
                      onClick={() => setSelectedDate(d.full)}
                      className={`flex flex-col items-center min-w-16 p-3 rounded-2xl border-2 transition-all cursor-pointer ${
                        selectedDate === d.full
                          ? "bg-primary border-primary text-white shadow-lg shadow-primary/20"
                          : "border-border hover:border-primary/40 bg-muted/30"
                      }`}
                    >
                      <span className="text-[10px] font-bold uppercase opacity-60 mb-1">
                        {d.day}
                      </span>
                      <span className="text-xl font-bold leading-none">
                        {d.num}
                      </span>
                      <span className="text-[10px] font-bold mt-1">
                        {d.month}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Selector de Hora */}
              <div className="space-y-4">
                <h3 className="text-sm font-bold uppercase tracking-widest text-muted-foreground flex items-center gap-2">
                  <Clock size={16} /> Horas disponibles
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {timeSlots.map((time) => (
                    <button
                      key={time}
                      onClick={() => setSelectedTime(time)}
                      className={`py-3 px-4 rounded-xl border-2 font-bold text-sm transition-all cursor-pointer ${
                        selectedTime === time
                          ? "bg-primary border-primary text-white"
                          : "border-border hover:border-primary/40"
                      }`}
                    >
                      {time}
                    </button>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="flex justify-end pt-4">
            <Button
              size="lg"
              className="rounded-2xl px-10 gradient-primary"
              disabled={!selectedDate || !selectedTime}
              onClick={() => setStep("summary")}
              icon={<ArrowRight size={20} />}
              iconPosition="right"
            >
              Revisar cita
            </Button>
          </div>
        </div>
      )}

      {/* PASO 3: RESUMEN Y CONFIRMACIÓN */}
      {step === "summary" && (
        <div className="space-y-8 animate-in fade-in zoom-in-95 duration-500">
          <div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setStep("schedule")}
              className="mb-4"
            >
              <ArrowLeft size={16} className="mr-2" /> Corregir horario
            </Button>
            <h1 className="text-2xl font-bold text-foreground">
              Confirma tu reserva
            </h1>
            <p className="text-muted-foreground text-sm">
              Revisa los detalles antes de agendar
            </p>
          </div>

          <Card className="border-none shadow-elevated rounded-3xl overflow-hidden">
            <div className="gradient-primary p-6 text-white flex items-center gap-4">
              <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center">
                <ShieldCheck size={32} />
              </div>
              <div>
                <h3 className="text-xl font-bold">Resumen de Consulta</h3>
                <p className="text-white/80 text-sm">Todo está casi listo</p>
              </div>
            </div>

            <CardContent className="p-8 space-y-6">
              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-6">
                  <div className="flex gap-4 items-center">
                    <div className="w-12 h-12 rounded-xl bg-muted flex items-center justify-center shrink-0">
                      <User className="text-primary" size={24} />
                    </div>
                    <div>
                      <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">
                        Especialista
                      </p>
                      <p className="font-bold text-foreground">
                        {selectedSpecialist?.name}
                      </p>
                      <p className="text-xs text-primary font-medium">
                        {selectedSpecialist?.specialty}
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-4 items-center">
                    <div className="w-12 h-12 rounded-xl bg-muted flex items-center justify-center shrink-0">
                      <Calendar className="text-primary" size={24} />
                    </div>
                    <div>
                      <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">
                        Fecha y Hora
                      </p>
                      <p className="font-bold text-foreground">
                        {selectedDate}
                      </p>
                      <p className="text-sm font-medium text-foreground/80">
                        {selectedTime} Horas
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-muted/30 rounded-2xl p-6 border border-dashed border-border flex flex-col justify-center gap-3">
                  <div className="flex items-center gap-2 text-primary">
                    <Info size={18} />
                    <span className="text-sm font-bold">
                      Información Importante
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    Recuerda llegar 5 minutos antes. Puedes cancelar o
                    reprogramar hasta 24 horas antes sin costo adicional.
                  </p>
                </div>
              </div>
            </CardContent>

            <CardFooter className="p-8 pt-0">
              <Button
                size="lg"
                className="w-full rounded-2xl h-14 text-lg font-bold gradient-primary shadow-xl shadow-primary/20"
                onClick={handleConfirm}
                isLoading={isBooking}
              >
                Confirmar y Agendar Cita
              </Button>
            </CardFooter>
          </Card>
        </div>
      )}

      {/* PASO FINAL: ÉXITO */}
      {step === "success" && (
        <div className="text-center py-12 animate-in fade-in zoom-in-95 duration-700">
          <div className="w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-8 border-4 border-primary/20 shadow-lg animate-bounce">
            <CheckCircle2 size={48} className="text-primary" />
          </div>

          <h1 className="text-4xl font-bold text-foreground mb-4">
            ¡Cita Agendada con Éxito!
          </h1>
          <p className="text-muted-foreground text-lg mb-10 max-w-md mx-auto">
            Hemos enviado un comprobante y los detalles de tu cita con la
            <span className="text-primary font-bold">
              {" "}
              {selectedSpecialist?.name}
            </span>{" "}
            a tu correo y WhatsApp.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="rounded-2xl px-10"
              onClick={handleReset}
            >
              Agendar otra cita
            </Button>
            <Button variant="outline" size="lg" className="rounded-2xl px-10">
              Ir a mis citas
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
