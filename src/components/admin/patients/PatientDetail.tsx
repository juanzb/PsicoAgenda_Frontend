import {
  X,
  Clock,
  History,
  BookOpen,
  Play,
  FileText,
} from "lucide-react";
import type { ReactNode } from "react";
import { useNavigate, useOutletContext } from "react-router";
import { type IPatient } from "./CardPatients";
import { Button } from "../../ui/button/Button";
import { PATHS } from "../../../app/router/paths";

interface PatientDetailProps {
  patient: IPatient;
  onClose: () => void;
}

export function PatientDetail({
  patient,
  onClose,
}: PatientDetailProps): ReactNode {
  const navigate = useNavigate();
  const { handleStartSession } = useOutletContext<{ handleStartSession: (id: string, name: string) => void }>();
  const initial = patient.name.charAt(0).toUpperCase();

  const handleViewHistory = () => {
    onClose();
    navigate(PATHS.ADMIN.PATIENT_DATA.replace(":id", patient.id));
  };

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

      <div className="relative w-full max-w-100 h-full bg-white shadow-2xl flex flex-col animate-in slide-in-from-right duration-500 ease-out border-l border-border/40">
        {/* HEADER */}
        <div className="shrink-0 p-6 border-b border-border/40 flex items-center justify-between bg-muted/10">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center border border-primary/10 shadow-sm">
              <span className="text-lg font-black text-primary">{initial}</span>
            </div>
            <div>
              <h2 className="text-base font-black text-foreground leading-none">
                {patient.name}
              </h2>
              <div className="flex items-center gap-2 mt-1.5">
                <div className={`w-2 h-2 rounded-full ${statusColors[patient.status]}`} />
                <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">
                  {statusLabels[patient.status]}
                </span>
              </div>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-muted-foreground hover:bg-muted rounded-md transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* CONTENIDO SIMPLE */}
        <div className="flex-1 overflow-y-auto custom-scrollbar p-6 space-y-8">
          
          {/* ÚLTIMAS CITAS */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
                <h4 className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.15em] flex items-center gap-2">
                    <History size={14} className="text-primary" /> Actividad Reciente
                </h4>
                <span className="text-[9px] font-bold text-primary bg-primary/5 px-2 py-0.5 rounded-full">Últimas 3</span>
            </div>

            <div className="space-y-2">
              {appointmentHistory.map((appt, i) => (
                <div
                  key={i}
                  className="flex items-center gap-4 p-3 bg-white border border-border/40 rounded-md hover:border-primary/20 transition-all group"
                >
                  <div className="w-10 h-10 rounded-md bg-muted/30 flex flex-col items-center justify-center shrink-0 border border-border/40 group-hover:bg-primary/5 group-hover:border-primary/20 transition-colors">
                    <span className="text-[8px] font-black text-muted-foreground uppercase group-hover:text-primary">
                      {appt.date.split(" ")[1]}
                    </span>
                    <span className="text-sm font-black text-foreground leading-none group-hover:text-primary">
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
          </div>

          {/* NOVEDADES / ÚLTIMA NOTA */}
          <div className="p-5 rounded-lg bg-primary/5 border border-dashed border-primary/20 relative overflow-hidden group">
            <div className="relative z-10">
                <h4 className="text-[9px] font-black text-primary uppercase tracking-widest mb-3 flex items-center gap-2">
                    <FileText size={14} /> Nota Clínica Destacada
                </h4>
                <p className="text-xs text-foreground font-medium leading-relaxed italic">
                "Paciente muestra avances significativos en el control de impulsos. Se mantiene la estrategia de refuerzo positivo."
                </p>
                <p className="text-[9px] font-bold text-muted-foreground/60 mt-4 uppercase">Escrita por Dr. Camilo Sánchez • 12 Abr</p>
            </div>
            <FileText size={80} className="absolute -bottom-6 -right-6 text-primary/5 group-hover:scale-110 transition-transform duration-700" />
          </div>
        </div>

        {/* ACCIONES PIE DE PÁGINA */}
        <div className="shrink-0 p-6 border-t border-border/40 flex flex-col gap-3 bg-white">
          <Button
            onClick={() => {
              onClose();
              handleStartSession(patient.id, patient.name);
            }}
            className="w-full rounded-lg font-bold h-12 gradient-primary shadow-lg shadow-primary/20 text-sm"
          >
            <Play size={16} className="mr-2" /> Iniciar Sesión Ahora
          </Button>
          <Button
            onClick={handleViewHistory}
            variant="outline"
            className="w-full rounded-lg font-bold h-12 border-border/60 text-muted-foreground hover:text-primary hover:border-primary/20 transition-all"
          >
            <BookOpen size={16} className="mr-2" /> Ver Data Completa
          </Button>
        </div>
      </div>
    </div>
  );
}
