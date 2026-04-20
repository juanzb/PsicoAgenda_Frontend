import { useState, useEffect, type ReactNode } from "react";
import { 
  X, 
  Play, 
  Square, 
  Clock, 
  FileText, 
  CheckSquare, 
  ChevronRight, 
  Maximize2, 
  Minimize2,
  Trash2,
  Plus
} from "lucide-react";
import { Button } from "../../ui/button/Button";

export interface ISessionData {
  patientId: string;
  patientName: string;
  startTime?: Date;
  notes: string;
  tasks: string[];
  status: "idle" | "active" | "completed";
}

interface ActiveSessionDrawerProps {
  session: ISessionData;
  isOpen: boolean;
  isMinimized: boolean;
  onClose: () => void;
  onMinimize: (minimized: boolean) => void;
  onUpdateSession: (data: Partial<ISessionData>) => void;
  onFinish: () => void;
}

export function ActiveSessionDrawer({
  session,
  isOpen,
  isMinimized,
  onClose,
  onMinimize,
  onUpdateSession,
  onFinish
}: ActiveSessionDrawerProps): ReactNode {
  const [seconds, setSeconds] = useState(0);
  const [newTask, setNewTask] = useState("");

  // Cronómetro
  useEffect(() => {
    let interval: number;
    if (session.status === "active" && !isMinimized) {
      interval = setInterval(() => {
        setSeconds(s => s + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [session.status, isMinimized]);

  const formatTime = (totalSeconds: number) => {
    const hrs = Math.floor(totalSeconds / 3600);
    const mins = Math.floor((totalSeconds % 3600) / 60);
    const secs = totalSeconds % 60;
    return `${hrs.toString().padStart(2, "0")}:${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  const addTask = () => {
    if (!newTask.trim()) return;
    onUpdateSession({ tasks: [...session.tasks, newTask.trim()] });
    setNewTask("");
  };

  const removeTask = (index: number) => {
    onUpdateSession({ tasks: session.tasks.filter((_, i) => i !== index) });
  };

  if (!isOpen) return null;

  // VISTA MINIMIZADA (Botón Flotante)
  if (isMinimized) {
    return (
      <div 
        className="fixed bottom-6 right-6 z-[60] bg-primary text-white p-4 rounded-2xl shadow-2xl flex items-center gap-4 cursor-pointer hover:scale-105 transition-all animate-in zoom-in-90"
        onClick={() => onMinimize(false)}
      >
        <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center animate-pulse">
          <Clock size={20} />
        </div>
        <div>
          <p className="text-[10px] font-black uppercase tracking-widest opacity-80">Sesión en Curso</p>
          <p className="text-sm font-bold truncate max-w-40">{session.patientName}</p>
        </div>
        <div className="bg-black/20 px-3 py-1 rounded-lg text-xs font-black">
          {formatTime(seconds)}
        </div>
        <Maximize2 size={18} className="ml-2" />
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Overlay */}
      <div className="absolute inset-0 bg-sidebar/20 backdrop-blur-[2px]" onClick={() => onMinimize(true)} />

      {/* Drawer */}
      <div className="relative w-full max-w-md h-full bg-white shadow-2xl flex flex-col animate-in slide-in-from-right duration-300">
        {/* Header */}
        <div className="p-6 border-b border-border/40 flex items-center justify-between bg-primary/5">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary">
              <Clock size={24} className={session.status === 'active' ? 'animate-spin-slow' : ''} />
            </div>
            <div>
              <h2 className="text-lg font-black text-foreground">{session.patientName}</h2>
              <div className="flex items-center gap-2">
                 <span className={`w-2 h-2 rounded-full ${session.status === 'active' ? 'bg-emerald-500 animate-pulse' : 'bg-muted-foreground'}`} />
                 <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">
                    {session.status === 'active' ? 'Sesión Iniciada' : 'Sesión en Espera'}
                 </span>
              </div>
            </div>
          </div>
          <div className="flex gap-2">
            <button onClick={() => onMinimize(true)} className="p-2 text-muted-foreground hover:bg-muted rounded-xl transition-all">
              <Minimize2 size={20} />
            </button>
            <button onClick={onClose} className="p-2 text-muted-foreground hover:text-destructive hover:bg-destructive/5 rounded-xl transition-all">
              <X size={20} />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-8 custom-scrollbar">
          {/* Cronómetro Visual */}
          <div className="bg-muted/30 rounded-3xl p-8 text-center border border-border/40 relative overflow-hidden group">
            <div className="relative z-10">
              <p className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.2em] mb-2">Tiempo Transcurrido</p>
              <h3 className="text-5xl font-black text-foreground tabular-nums tracking-tight">
                {formatTime(seconds)}
              </h3>
            </div>
            <div className="absolute -bottom-6 -right-6 text-primary/5 group-hover:scale-110 transition-transform duration-700">
              <Clock size={120} />
            </div>
          </div>

          {/* Controles de Sesión */}
          <div className="grid grid-cols-1 gap-3">
            {session.status === "idle" ? (
              <Button 
                onClick={() => onUpdateSession({ status: "active", startTime: new Date() })}
                className="w-full h-14 rounded-2xl text-lg font-bold gradient-primary shadow-lg shadow-primary/20"
                icon={<Play size={24} />}
              >
                Iniciar Sesión Ahora
              </Button>
            ) : (
              <Button 
                variant="destructive"
                onClick={onFinish}
                className="w-full h-14 rounded-2xl text-lg font-bold shadow-lg shadow-destructive/10"
                icon={<Square size={20} />}
              >
                Finalizar Sesión
              </Button>
            )}
          </div>

          {/* Notas de Evolución */}
          <div className="space-y-3">
            <label className="flex items-center gap-2 text-[10px] font-black text-muted-foreground uppercase tracking-widest">
              <FileText size={14} className="text-primary" /> Notas de Evolución
            </label>
            <textarea 
              value={session.notes}
              onChange={(e) => onUpdateSession({ notes: e.target.value })}
              placeholder="Registra los avances, observaciones y puntos clave de la sesión..."
              className="w-full h-48 bg-muted/20 border-border/40 rounded-2xl p-4 text-sm font-medium focus:ring-2 focus:ring-primary/10 focus:bg-white transition-all resize-none outline-none"
            />
          </div>

          {/* Tareas Post-Cita */}
          <div className="space-y-4">
            <label className="flex items-center gap-2 text-[10px] font-black text-muted-foreground uppercase tracking-widest">
              <CheckSquare size={14} className="text-primary" /> Tareas Post-Cita (Para el Paciente)
            </label>
            
            <div className="flex gap-2">
              <input 
                type="text"
                value={newTask}
                onChange={(e) => setNewTask(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && addTask()}
                placeholder="Ej. Ejercicio de respiración..."
                className="flex-1 bg-muted/20 border-border/40 rounded-xl px-4 py-3 text-xs font-bold outline-none focus:bg-white transition-all"
              />
              <Button onClick={addTask} className="rounded-xl w-12 h-12 gradient-primary">
                <Plus size={20} />
              </Button>
            </div>

            <div className="space-y-2">
              {session.tasks.map((task, i) => (
                <div key={i} className="flex items-center justify-between p-3 bg-muted/30 border border-border/40 rounded-xl group animate-in slide-in-from-left-2">
                  <span className="text-xs font-bold text-foreground flex items-center gap-2">
                    <ChevronRight size={14} className="text-primary" /> {task}
                  </span>
                  <button onClick={() => removeTask(i)} className="p-1.5 text-muted-foreground hover:text-destructive opacity-0 group-hover:opacity-100 transition-all">
                    <Trash2 size={14} />
                  </button>
                </div>
              ))}
              {session.tasks.length === 0 && (
                <p className="text-[10px] text-muted-foreground italic text-center py-4">No hay tareas asignadas aún.</p>
              )}
            </div>
          </div>
        </div>

        {/* Footer Info */}
        <div className="p-6 border-t border-border/40 bg-muted/10">
          <p className="text-[10px] text-muted-foreground font-medium leading-relaxed">
            * Al finalizar la sesión, las notas se guardarán automáticamente en la historia clínica del paciente y las tareas serán enviadas a su perfil.
          </p>
        </div>
      </div>
    </div>
  );
}
