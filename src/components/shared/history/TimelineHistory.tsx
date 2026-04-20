import { 
  Calendar, 
  Clock, 
  User, 
  FileText, 
  CheckSquare, 
  ChevronRight,
  MoreVertical,
  AlertCircle
} from "lucide-react";
import type { ReactNode } from "react";

export interface IHistoryItem {
  id: string;
  date: string;
  time: string;
  doctorName: string;
  type: string;
  notes?: string;
  tasks?: string[];
  status: "completed" | "cancelled" | "missed";
}

interface TimelineHistoryProps {
  items: IHistoryItem[];
  showPrivateNotes?: boolean;
}

export function TimelineHistory({
  items,
  showPrivateNotes = false
}: TimelineHistoryProps): ReactNode {
  return (
    <div className="relative space-y-8 before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-border before:to-transparent">
      {items.map((item, index) => (
        <div key={item.id} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active animate-in fade-in slide-in-from-bottom-4 duration-500" style={{ animationDelay: `${index * 100}ms` }}>
          {/* Dot Icon */}
          <div className="flex items-center justify-center w-10 h-10 rounded-full border border-white bg-primary text-white shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10 transition-transform group-hover:scale-110">
            <Calendar size={18} />
          </div>

          {/* Card Content */}
          <div className="w-[calc(100%-4rem)] md:w-[45%] bg-white p-6 rounded-3xl border border-border/40 shadow-sm transition-all hover:shadow-xl hover:border-primary/20 relative">
            <div className="flex items-center justify-between mb-4">
              <div className="flex flex-col">
                 <time className="text-xs font-black text-primary uppercase tracking-widest">{item.date}</time>
                 <div className="flex items-center gap-1.5 text-[10px] font-bold text-muted-foreground mt-0.5">
                    <Clock size={10} /> {item.time}
                 </div>
              </div>
              <div className={`px-2 py-1 rounded-lg text-[9px] font-black uppercase ${item.status === 'completed' ? 'bg-emerald-50 text-emerald-600' : 'bg-destructive/5 text-destructive'}`}>
                {item.status === 'completed' ? 'Realizada' : 'Cancelada'}
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-black text-foreground flex items-center gap-2">
                  {item.type}
                </h3>
                <p className="text-xs font-bold text-muted-foreground flex items-center gap-1.5 mt-1">
                  <User size={12} className="text-primary/50" /> {item.doctorName}
                </p>
              </div>

              {/* Notas (Solo si showPrivateNotes es true) */}
              {showPrivateNotes && item.notes && (
                <div className="p-4 bg-muted/20 rounded-2xl border border-dashed border-border/60">
                  <div className="flex items-center gap-2 mb-2">
                    <FileText size={12} className="text-primary" />
                    <span className="text-[10px] font-black uppercase text-primary/70 tracking-widest">Notas Clínicas</span>
                  </div>
                  <p className="text-xs text-muted-foreground leading-relaxed italic">
                    "{item.notes}"
                  </p>
                </div>
              )}

              {/* Tareas Post-Cita (Visible para todos) */}
              {item.tasks && item.tasks.length > 0 && (
                <div className="space-y-3 pt-2">
                  <div className="flex items-center gap-2">
                    <CheckSquare size={12} className="text-primary" />
                    <span className="text-[10px] font-black uppercase text-foreground/70 tracking-widest">Tareas Asignadas</span>
                  </div>
                  <div className="space-y-1.5">
                    {item.tasks.map((task, i) => (
                      <div key={i} className="flex items-center gap-2 text-xs font-bold text-muted-foreground bg-primary/2 p-2 rounded-xl border border-primary/10">
                        <ChevronRight size={14} className="text-primary/40" />
                        {task}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {item.status === 'cancelled' && (
                <div className="flex items-center gap-2 text-destructive/70 bg-destructive/5 p-3 rounded-xl border border-destructive/10">
                  <AlertCircle size={14} />
                  <p className="text-[10px] font-bold uppercase tracking-wider">Cita cancelada por el paciente</p>
                </div>
              )}
            </div>

            {/* Acciones (Opcional) */}
            <button className="absolute top-4 right-4 p-2 text-muted-foreground/30 hover:text-foreground hover:bg-muted rounded-xl transition-all opacity-0 group-hover:opacity-100">
              <MoreVertical size={16} />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
