import {
  X,
  Clock,
  MessageSquare,
  Edit,
  ArrowRight,
  Search,
  History,
  GraduationCap,
  CalendarDays,
  CheckCircle2,
} from "lucide-react";
import type { ReactNode } from "react";
import { useState } from "react";
import { type IDoctor } from "./CardDoctors";
import { Button } from "../../ui/button/Button";

interface DoctorDetailProps {
  doctor: IDoctor;
  onClose: () => void;
}

type TabType = "schedule" | "appointments";

export function DoctorDetail({
  doctor,
  onClose,
}: DoctorDetailProps): ReactNode {
  const [activeTab, setActiveTab] = useState<TabType>("schedule");
  const initial = doctor.name.charAt(0).toUpperCase();

  const statusLabels = {
    active: "Activo",
    inactive: "Inactivo",
    "on-vacation": "En Vacaciones",
  };

  const statusColors = {
    active: "bg-emerald-500",
    inactive: "bg-rose-500",
    "on-vacation": "bg-amber-500",
  };

  // Mock de horarios disponibles
  const availableSchedules = [
    { day: "Lunes", hours: "08:00 AM - 12:00 PM", status: "Disponible" },
    { day: "Miércoles", hours: "02:00 PM - 06:00 PM", status: "Disponible" },
    { day: "Viernes", hours: "09:00 AM - 01:00 PM", status: "Pocos cupos" },
  ];

  // Mock de historial de citas (Pacientes atendidos)
  const appointmentHistory = [
    {
      patient: "Carlos Mendoza",
      date: "12 Abr, 2026",
      time: "09:00 AM",
      status: "Realizada",
    },
    {
      patient: "María Ríos",
      date: "10 Abr, 2026",
      time: "11:30 AM",
      status: "Realizada",
    },
    {
      patient: "Jorge Holguín",
      date: "05 Abr, 2026",
      time: "04:00 PM",
      status: "Cancelada",
    },
  ];

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      <div
        className="absolute inset-0 bg-sidebar/20 backdrop-blur-[2px] animate-in fade-in duration-300"
        onClick={onClose}
      />

      <div className="relative w-full max-w-115 h-full bg-white shadow-2xl flex flex-col animate-in slide-in-from-right duration-500 ease-out border-l border-border/40">
        {/* HEADER */}
        <div className="shrink-0 p-4 px-6 border-b border-border/40 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center border border-primary/10">
              <span className="text-xs font-black text-primary">{initial}</span>
            </div>
            <div>
              <h2 className="text-sm font-black text-foreground leading-none">
                {doctor.name}
              </h2>
              <div className="flex items-center gap-2 mt-1">
                <div
                  className={`w-1.5 h-1.5 rounded-full ${statusColors[doctor.status]}`}
                />
                <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">
                  {statusLabels[doctor.status]}
                </span>
              </div>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-muted-foreground hover:bg-muted rounded-lg transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        {/* CONTENIDO SCROLLABLE */}
        <div className="flex-1 overflow-y-auto custom-scrollbar p-6 space-y-6">
          {/* Info Rápida */}
          <div className="grid grid-cols-2 gap-2">
            <div className="p-2.5 rounded-xl bg-muted/30 border border-border/40">
              <p className="text-[8px] font-black text-muted-foreground uppercase mb-1">
                Especialidad
              </p>
              <div className="flex items-center gap-2 text-xs font-bold text-foreground">
                <GraduationCap size={12} className="text-primary/50" />{" "}
                {doctor.specialty}
              </div>
            </div>
            <div className="p-2.5 rounded-xl bg-muted/30 border border-border/40">
              <p className="text-[8px] font-black text-muted-foreground uppercase mb-1">
                Experiencia
              </p>
              <div className="flex items-center gap-2 text-xs font-bold text-foreground truncate">
                <Clock size={12} className="text-primary/50" />{" "}
                {doctor.experience} años
              </div>
            </div>
          </div>

          {/* TABS SELECTOR */}
          <div className="flex p-1 bg-muted/30 rounded-xl border border-border/40">
            <button
              onClick={() => setActiveTab("schedule")}
              className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-lg text-[10px] font-black uppercase transition-all ${
                activeTab === "schedule"
                  ? "bg-white text-primary shadow-sm border border-border/20"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <CalendarDays size={14} /> Horarios
            </button>
            <button
              onClick={() => setActiveTab("appointments")}
              className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-lg text-[10px] font-black uppercase transition-all ${
                activeTab === "appointments"
                  ? "bg-white text-primary shadow-sm border border-border/20"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <History size={14} /> Historial
            </button>
          </div>

          {/* CONTENIDO DE TABS */}
          <div className="space-y-4">
            {activeTab === "schedule" ? (
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-muted-foreground mb-1">
                  <Clock size={14} className="text-primary/60" />
                  <h4 className="text-[10px] font-black uppercase tracking-[0.15em]">
                    Disponibilidad Semanal
                  </h4>
                </div>
                {availableSchedules.map((item, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between p-3 bg-white border border-border/40 rounded-xl hover:border-primary/20 transition-all"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-emerald-50 flex items-center justify-center border border-emerald-100">
                        <CheckCircle2 size={14} className="text-emerald-500" />
                      </div>
                      <div>
                        <p className="text-xs font-black text-foreground">
                          {item.day}
                        </p>
                        <p className="text-[10px] font-bold text-muted-foreground">
                          {item.hours}
                        </p>
                      </div>
                    </div>
                    <span
                      className={`text-[8px] font-black px-2 py-1 rounded-lg ${
                        item.status === "Disponible"
                          ? "bg-emerald-50 text-emerald-600"
                          : "bg-amber-50 text-amber-600"
                      }`}
                    >
                      {item.status}
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-muted-foreground mb-1">
                  <History size={14} className="text-primary/60" />
                  <h4 className="text-[10px] font-black uppercase tracking-[0.15em]">
                    Últimas Citas Atendidas
                  </h4>
                </div>

                {/* Filtro de historial dentro del tab */}
                <div className="flex items-end gap-2 bg-muted/30 p-2.5 rounded-xl border border-border/40 mb-2">
                  <div className="flex-1 space-y-1">
                    <div className="flex items-center gap-2 bg-white px-2.5 py-1.5 rounded-lg border border-border/60">
                      <input
                        type="date"
                        className="text-[10px] font-bold bg-transparent border-none focus:ring-0 p-0 w-full"
                      />
                      <ArrowRight
                        size={10}
                        className="text-muted-foreground/30"
                      />
                      <input
                        type="date"
                        className="text-[10px] font-bold bg-transparent border-none focus:ring-0 p-0 w-full"
                      />
                    </div>
                  </div>
                  <Button
                    size="icon"
                    className="w-8 h-8 rounded-lg gradient-primary shadow-sm shrink-0"
                  >
                    <Search size={12} strokeWidth={3} />
                  </Button>
                </div>

                {appointmentHistory.map((appt, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-4 p-3 bg-white border border-border/40 rounded-xl hover:border-primary/20 transition-all"
                  >
                    <div className="w-9 h-9 rounded-lg bg-primary/5 flex flex-col items-center justify-center shrink-0 border border-primary/5">
                      <span className="text-[8px] font-black text-primary uppercase">
                        {appt.date.split(" ")[1]}
                      </span>
                      <span className="text-xs font-black text-primary leading-none">
                        {appt.date.split(" ")[0]}
                      </span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-black text-foreground truncate">
                        {appt.patient}
                      </p>
                      <p className="text-[10px] font-bold text-muted-foreground flex items-center gap-1.5 mt-0.5">
                        <Clock size={10} /> {appt.time}
                      </p>
                    </div>
                    <span
                      className={`text-[9px] font-black px-2 py-1 rounded-lg ${
                        appt.status === "Realizada"
                          ? "bg-emerald-50 text-emerald-600"
                          : "bg-destructive/5 text-destructive"
                      }`}
                    >
                      {appt.status}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* PERFIL PROFESIONAL */}
          <div className="p-4 rounded-2xl bg-primary/1 border border-dashed border-primary/20">
            <h4 className="text-[9px] font-black text-primary uppercase tracking-widest mb-2">
              Perfil Profesional
            </h4>
            <p className="text-xs text-muted-foreground leading-relaxed italic">
              "Especialista en psicología clínica con enfoque
              cognitivo-conductual. Amplia experiencia en el tratamiento de
              trastornos de ansiedad y depresión."
            </p>
          </div>
        </div>

        {/* ACCIONES */}
        <div className="shrink-0 p-4 border-t border-border/40 grid grid-cols-2 gap-2 bg-white">
          <Button
            variant="outline"
            size="sm"
            className="rounded-xl font-bold h-10 border-border/60"
          >
            <Edit size={14} className="mr-2" /> Editar
          </Button>
          <Button
            size="sm"
            className="rounded-xl font-bold h-10 gradient-primary shadow-md"
          >
            <MessageSquare size={14} className="mr-2" /> Mensaje
          </Button>
        </div>
      </div>
    </div>
  );
}
