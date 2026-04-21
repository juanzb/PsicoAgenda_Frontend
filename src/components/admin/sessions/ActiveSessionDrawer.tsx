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
  Plus,
  Target,
  Smile,
  ClipboardList
} from "lucide-react";
import { Button } from "../../ui/button/Button";

export interface ISessionData {
  patientId: string;
  patientName: string;
  startTime?: Date;
  serviceType: string;
  reason: string;
  goals: string;
  mood: number;
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
        className="fixed bottom-6 right-6 z-[60] bg-primary text-white p-4 rounded-sm shadow-2xl flex items-center gap-4 cursor-pointer hover:scale-105 transition-all animate-in zoom-in-90"
        onClick={() => onMinimize(false)}
      >
        <div className="w-10 h-10 rounded-sm bg-white/20 flex items-center justify-center animate-pulse">
          <Clock size={20} />
        </div>
        <div>
          <p className="text-[10px] font-black uppercase tracking-widest opacity-80">Atendiendo a</p>
          <p className="text-sm font-bold truncate max-w-40">{session.patientName}</p>
        </div>
        <div className="bg-black/20 px-3 py-1 rounded-sm text-xs font-black">
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
      <div className="relative w-full max-w-md h-full bg-white shadow-2xl flex flex-col animate-in slide-in-from-right duration-300 border-l border-border/40">
        {/* Header */}
        <div className="p-6 border-b border-border/40 flex items-center justify-between bg-muted/10">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-sm bg-primary/10 flex items-center justify-center text-primary border border-primary/10">
              <Clock size={24} className={session.status === 'active' ? 'animate-spin-slow' : ''} />
            </div>
            <div>
              <h2 className="text-lg font-black text-foreground uppercase tracking-tight">{session.patientName}</h2>
              <div className="flex items-center gap-2">
                 <span className={`w-2 h-2 rounded-full ${session.status === 'active' ? 'bg-emerald-500 animate-pulse' : 'bg-muted-foreground'}`} />
                 <span className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">
                    {session.status === 'active' ? 'Sesión Iniciada' : 'Listo para atender'}
                 </span>
              </div>
            </div>
          </div>
          <div className="flex gap-2">
            <button onClick={() => onMinimize(true)} title="Minimizar" className="p-2 text-muted-foreground hover:bg-muted rounded-sm transition-all">
              <Minimize2 size={20} />
            </button>
            <button onClick={onClose} title="Cerrar (Sin guardar)" className="p-2 text-muted-foreground hover:text-destructive hover:bg-destructive/5 rounded-sm transition-all">
              <X size={20} />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-8 custom-scrollbar">
          
          {/* 1. TIPO DE SERVICIO Y CRONÓMETRO */}
          <div className="flex flex-col gap-4">
            <div className="bg-muted/30 rounded-sm p-6 text-center border border-border/40 relative overflow-hidden group">
              <div className="relative z-10">
                <p className="text-[9px] font-black text-muted-foreground uppercase tracking-[0.2em] mb-1">Tiempo de Consulta</p>
                <h3 className="text-4xl font-black text-foreground tabular-nums tracking-tight">
                  {formatTime(seconds)}
                </h3>
              </div>
              <div className="absolute -bottom-6 -right-6 text-primary/5 group-hover:scale-110 transition-transform duration-700">
                <Clock size={100} />
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4">
              <div>
                <label className="text-[9px] font-black text-muted-foreground uppercase tracking-widest mb-1.5 block">Tipo de Servicio</label>
                <select 
                  value={session.serviceType}
                  onChange={(e) => onUpdateSession({ serviceType: e.target.value })}
                  className="w-full bg-white border border-border/40 rounded-sm px-4 py-2.5 text-xs font-bold focus:ring-2 focus:ring-primary/10 outline-none"
                >
                  <option>Sesión Individual</option>
                  <option>Evaluación Inicial</option>
                  <option>Seguimiento</option>
                  <option>Terapia de Pareja</option>
                  <option>Crisis / Urgencia</option>
                </select>
              </div>
            </div>
          </div>

          {/* 2. FORMULARIO CLÍNICO */}
          <div className="space-y-6">
            <div className="space-y-3">
              <label className="flex items-center gap-2 text-[9px] font-black text-muted-foreground uppercase tracking-widest">
                <ClipboardList size={14} className="text-primary" /> Motivo de Consulta
              </label>
              <textarea 
                value={session.reason}
                onChange={(e) => onUpdateSession({ reason: e.target.value })}
                placeholder="¿Por qué acude el paciente hoy?"
                className="w-full h-24 bg-white border border-border/40 rounded-sm p-3 text-xs font-medium focus:border-primary/40 outline-none resize-none"
              />
            </div>

            <div className="space-y-3">
              <label className="flex items-center gap-2 text-[9px] font-black text-muted-foreground uppercase tracking-widest">
                <Target size={14} className="text-primary" /> Objetivos de la Sesión
              </label>
              <textarea 
                value={session.goals}
                onChange={(e) => onUpdateSession({ goals: e.target.value })}
                placeholder="Puntos clave a tratar en esta sesión..."
                className="w-full h-24 bg-white border border-border/40 rounded-sm p-3 text-xs font-medium focus:border-primary/40 outline-none resize-none"
              />
            </div>

            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <label className="flex items-center gap-2 text-[9px] font-black text-muted-foreground uppercase tracking-widest">
                  <Smile size={14} className="text-primary" /> Estado de Ánimo (1-10)
                </label>
                <span className="text-xs font-black text-primary bg-primary/5 px-2 py-0.5 rounded-sm">{session.mood}</span>
              </div>
              <input 
                type="range" 
                min="1" 
                max="10" 
                value={session.mood}
                onChange={(e) => onUpdateSession({ mood: parseInt(e.target.value) })}
                className="w-full h-1.5 bg-muted rounded-lg appearance-none cursor-pointer accent-primary"
              />
            </div>

            <div className="space-y-3">
              <label className="flex items-center gap-2 text-[9px] font-black text-muted-foreground uppercase tracking-widest">
                <FileText size={14} className="text-primary" /> Notas de Evolución / Hallazgos
              </label>
              <textarea 
                value={session.notes}
                onChange={(e) => onUpdateSession({ notes: e.target.value })}
                placeholder="Registra el desarrollo de la sesión, intervenciones realizadas y respuestas del paciente..."
                className="w-full h-40 bg-white border border-border/40 rounded-sm p-3 text-xs font-medium focus:border-primary/40 outline-none resize-none"
              />
            </div>
          </div>

          {/* 3. TAREAS POST-CITA */}
          <div className="space-y-4 pt-4 border-t border-border/40">
            <label className="flex items-center gap-2 text-[9px] font-black text-muted-foreground uppercase tracking-widest">
              <CheckSquare size={14} className="text-primary" /> Tareas para el Paciente
            </label>
            
            <div className="flex gap-2">
              <input 
                type="text"
                value={newTask}
                onChange={(e) => setNewTask(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && addTask()}
                placeholder="Ej. Diario de pensamientos..."
                className="flex-1 bg-white border border-border/40 rounded-sm px-4 py-2.5 text-xs font-bold outline-none focus:border-primary/40"
              />
              <Button onClick={addTask} className="rounded-sm w-10 h-10 gradient-primary">
                <Plus size={18} />
              </Button>
            </div>

            <div className="space-y-2">
              {session.tasks.map((task, i) => (
                <div key={i} className="flex items-center justify-between p-3 bg-muted/20 border border-border/40 rounded-sm group animate-in slide-in-from-left-2">
                  <span className="text-[10px] font-bold text-foreground flex items-center gap-2 uppercase tracking-tight">
                    <ChevronRight size={14} className="text-primary" /> {task}
                  </span>
                  <button onClick={() => removeTask(i)} className="p-1 text-muted-foreground hover:text-destructive opacity-0 group-hover:opacity-100 transition-all">
                    <Trash2 size={14} />
                  </button>
                </div>
              ))}
              {session.tasks.length === 0 && (
                <p className="text-[9px] font-bold text-muted-foreground italic text-center py-2 opacity-60 uppercase tracking-widest">Sin tareas asignadas</p>
              )}
            </div>
          </div>

          {/* Botones de Control Final */}
          <div className="pt-4">
            {session.status === "idle" ? (
              <Button 
                onClick={() => onUpdateSession({ status: "active", startTime: new Date() })}
                className="w-full h-12 rounded-sm text-xs font-black uppercase tracking-widest gradient-primary shadow-lg shadow-primary/20"
                icon={<Play size={18} />}
              >
                Iniciar Sesión Ahora
              </Button>
            ) : (
              <Button 
                variant="destructive"
                onClick={onFinish}
                className="w-full h-12 rounded-sm text-xs font-black uppercase tracking-widest shadow-lg shadow-destructive/10"
                icon={<Square size={16} />}
              >
                Finalizar y Guardar
              </Button>
            )}
          </div>
        </div>

        {/* Footer Info */}
        <div className="p-4 border-t border-border/40 bg-muted/10">
          <p className="text-[9px] font-bold text-muted-foreground uppercase tracking-tight text-center leading-relaxed">
            Las notas se guardarán automáticamente en la historia clínica al finalizar.
          </p>
        </div>
      </div>
    </div>
  );
}
