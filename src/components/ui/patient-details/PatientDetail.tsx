import {
  X,
  Clock,
  Mail,
  MessageSquare,
  Edit,
  ArrowRight,
  Phone,
  Search,
  History,
} from "lucide-react";
import type { ReactNode } from "react";
import { useState } from "react";
import { type IPatient } from "../card-patients/CardPatients";
import { Button } from "../button/Button";

interface PatientDetailProps {
  patient: IPatient;
  onClose: () => void;
}

export function PatientDetail({
  patient,
  onClose,
}: PatientDetailProps): ReactNode {
  const [dateRange, setDateRange] = useState({ from: "", to: "" });
  const initial = patient.name.charAt(0).toUpperCase();

  const statusLabels = {
    active: "Activo",
    completed: "Finalizado",
    "on-hold": "En Pausa",
  };

  const statusColors = {
    active: "bg-emerald-500",
    completed: "bg-blue-500",
    "on-hold": "bg-amber-500",
  };

  const appointmentHistory = [
    {
      date: "12 Abr, 2026",
      time: "09:00 AM",
      type: "Sesión Individual",
      status: "Realizada",
    },
    {
      date: "05 Abr, 2026",
      time: "10:30 AM",
      type: "Evaluación Inicial",
      status: "Realizada",
    },
    {
      date: "28 Mar, 2026",
      time: "04:00 PM",
      type: "Sesión Individual",
      status: "No asistió",
    },
  ];

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      <div
        className="absolute inset-0 bg-sidebar/20 backdrop-blur-[2px] animate-in fade-in duration-300"
        onClick={onClose}
      />

      <div className="relative w-full max-w-115 h-full bg-white shadow-2xl flex flex-col animate-in slide-in-from-right duration-500 ease-out border-l border-border/40">
        {/* HEADER COMPACTO Y ERGONÓMICO */}
        <div className="shrink-0 p-4 px-6 border-b border-border/40 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center border border-primary/10">
              <span className="text-xs font-black text-primary">{initial}</span>
            </div>
            <div>
              <h2 className="text-sm font-black text-foreground leading-none">
                {patient.name}
              </h2>
              <div className="flex items-center gap-2 mt-1">
                <div
                  className={`w-1.5 h-1.5 rounded-full ${statusColors[patient.status]}`}
                />
                <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">
                  {statusLabels[patient.status]}
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

        {/* CONTENIDO */}
        <div className="flex-1 overflow-y-auto custom-scrollbar p-6 space-y-6">
          {/* Info Rápida de Contacto */}
          <div className="grid grid-cols-2 gap-2">
            <div className="p-2.5 rounded-xl bg-muted/30 border border-border/40">
              <p className="text-[8px] font-black text-muted-foreground uppercase mb-1">
                WhatsApp
              </p>
              <div className="flex items-center gap-2 text-xs font-bold text-foreground">
                <Phone size={12} className="text-primary/50" /> {patient.phone}
              </div>
            </div>
            <div className="p-2.5 rounded-xl bg-muted/30 border border-border/40">
              <p className="text-[8px] font-black text-muted-foreground uppercase mb-1">
                Correo
              </p>
              <div className="flex items-center gap-2 text-xs font-bold text-foreground truncate">
                <Mail size={12} className="text-primary/50" /> {patient.email}
              </div>
            </div>
          </div>

          {/* SELECTOR DE RANGO CON BOTÓN DE BÚSQUEDA */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-muted-foreground">
              <History size={14} className="text-primary/60" />
              <h4 className="text-[10px] font-black uppercase tracking-[0.15em]">
                Filtrar Historial de Citas
              </h4>
            </div>

            <div className="flex items-end gap-2 bg-muted/30 p-3 rounded-2xl border border-border/40">
              <div className="flex-1 space-y-1.5">
                <label className="text-[9px] font-black text-muted-foreground/60 uppercase ml-1">
                  Desde - Hasta
                </label>
                <div className="flex items-center gap-2 bg-white px-3 py-2 rounded-xl border border-border/60">
                  <input
                    type="date"
                    className="text-xs font-bold bg-transparent border-none focus:ring-0 p-0 w-full"
                    onChange={(e) =>
                      setDateRange({ ...dateRange, from: e.target.value })
                    }
                  />
                  <ArrowRight size={12} className="text-muted-foreground/30" />
                  <input
                    type="date"
                    className="text-xs font-bold bg-transparent border-none focus:ring-0 p-0 w-full"
                    onChange={(e) =>
                      setDateRange({ ...dateRange, to: e.target.value })
                    }
                  />
                </div>
              </div>
              <Button
                size="icon"
                className="w-10 h-10 rounded-xl gradient-primary shadow-sm shrink-0"
              >
                <Search size={16} strokeWidth={3} />
              </Button>
            </div>
          </div>

          {/* LISTA DE CITAS */}
          <div className="space-y-2">
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
                    {appt.type}
                  </p>
                  <p className="text-[10px] font-bold text-muted-foreground flex items-center gap-1.5 mt-0.5">
                    <Clock size={10} /> {appt.time}
                  </p>
                </div>
                <span
                  className={`text-[9px] font-black px-2 py-1 rounded-lg ${appt.status === "Realizada" ? "bg-emerald-50 text-emerald-600" : "bg-destructive/5 text-destructive"}`}
                >
                  {appt.status}
                </span>
              </div>
            ))}
          </div>

          {/* OBSERVACIONES BREVES */}
          <div className="p-4 rounded-2xl bg-primary/1 border border-dashed border-primary/20">
            <h4 className="text-[9px] font-black text-primary uppercase tracking-widest mb-2">
              Nota Clínica Reciente
            </h4>
            <p className="text-xs text-muted-foreground leading-relaxed italic">
              "Avances positivos en autonomía. Se mantiene el plan terapéutico
              actual."
            </p>
          </div>
        </div>

        {/* ACCIONES PIE DE PÁGINA */}
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
            <MessageSquare size={14} className="mr-2" /> Chat
          </Button>
        </div>
      </div>
    </div>
  );
}
