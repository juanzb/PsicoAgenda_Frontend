import { type ReactNode } from "react";
import { Clock, User, ArrowRight, Play, MoreHorizontal } from "lucide-react";
import { Button } from "../../ui/button/Button";

interface IAppointment {
  id: string;
  patientName: string;
  time: string;
  type: string;
  status: "pending" | "confirmed" | "completed";
  avatar?: string;
}

const mockAppointments: IAppointment[] = [
  {
    id: "1",
    patientName: "Carlos Rodríguez",
    time: "09:00 AM",
    type: "Sesión Individual",
    status: "pending",
    avatar: "https://i.pravatar.cc/150?u=carlos"
  },
  {
    id: "2",
    patientName: "Ana María Silva",
    time: "10:30 AM",
    type: "Terapia de Pareja",
    status: "confirmed",
    avatar: "https://i.pravatar.cc/150?u=ana"
  },
  {
    id: "3",
    patientName: "Juan Pablo Duarte",
    time: "02:00 PM",
    type: "Evaluación Inicial",
    status: "pending",
    avatar: "https://i.pravatar.cc/150?u=juan"
  },
  {
    id: "4",
    patientName: "Lucía Méndez",
    time: "04:30 PM",
    type: "Seguimiento",
    status: "pending",
    avatar: "https://i.pravatar.cc/150?u=lucia"
  }
];

interface DailyAgendaProps {
  onAttend: (id: string, name: string) => void;
}

export function DailyAgenda({ onAttend }: DailyAgendaProps): ReactNode {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-sm font-black text-foreground uppercase tracking-widest flex items-center gap-2">
          <Clock size={16} className="text-primary" /> Agenda del Día
        </h3>
        <button className="p-1.5 text-muted-foreground hover:bg-muted rounded-md transition-all">
          <MoreHorizontal size={18} />
        </button>
      </div>

      <div className="space-y-3">
        {mockAppointments.map((app) => (
          <div 
            key={app.id}
            className="group relative bg-white border border-border/40 p-4 rounded-lg hover:shadow-lg hover:shadow-primary/5 hover:border-primary/20 transition-all duration-300"
          >
            <div className="flex items-center gap-4">
              {/* Avatar / Time */}
              <div className="flex flex-col items-center gap-2">
                <div className="w-12 h-12 rounded-lg overflow-hidden border-2 border-white shadow-sm shrink-0">
                  <img src={app.avatar} alt={app.patientName} className="w-full h-full object-cover" />
                </div>
                <span className="text-[10px] font-black text-primary bg-primary/5 px-2 py-0.5 rounded-sm whitespace-nowrap">
                  {app.time}
                </span>
              </div>

              {/* Info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between">
                  <div>
                    <h4 className="font-bold text-foreground truncate group-hover:text-primary transition-colors">
                      {app.patientName}
                    </h4>
                    <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider mt-0.5">
                      {app.type}
                    </p>
                  </div>
                </div>

                {/* Actions Area */}
                <div className="flex items-center gap-2 mt-3 pt-3 border-t border-border/30">
                  <Button 
                    size="sm" 
                    className="h-8 rounded-sm text-[10px] font-black uppercase tracking-widest gradient-primary"
                    onClick={() => onAttend(app.id, app.patientName)}
                    icon={<Play size={12} />}
                  >
                    Atender Cita
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="h-8 rounded-sm text-[10px] font-black uppercase tracking-widest text-muted-foreground"
                  >
                    Ver Historia
                  </Button>
                </div>
              </div>

              {/* Arrow Indicator */}
              <div className="hidden sm:block opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all">
                <ArrowRight size={18} className="text-primary/40" />
              </div>
            </div>

            {/* Status indicator pill */}
            <div className={`absolute top-4 right-4 w-2 h-2 rounded-full ${app.status === 'confirmed' ? 'bg-emerald-500' : 'bg-amber-500'} shadow-sm`} />
          </div>
        ))}

        <button className="w-full py-4 border-2 border-dashed border-border/40 rounded-lg text-[10px] font-black text-muted-foreground uppercase tracking-[0.2em] hover:bg-muted/30 hover:text-primary hover:border-primary/20 transition-all mt-2">
          Ver Calendario Completo
        </button>
      </div>
    </div>
  );
}
