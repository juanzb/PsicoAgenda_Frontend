import { type ReactNode, useState } from "react";
import { CheckSquare, Calendar, ChevronRight, Clock } from "lucide-react";

interface ITask {
  id: string;
  title: string;
  dateAssigned: string;
  completed: boolean;
  doctorName: string;
}

const MOCK_TASKS: ITask[] = [
  {
    id: "t1",
    title: "Leer capítulo 2 del libro de autoayuda",
    dateAssigned: "12 Abr, 2026",
    completed: false,
    doctorName: "Dr. Camilo Sánchez"
  },
  {
    id: "t2",
    title: "Realizar 5 min de meditación diaria",
    dateAssigned: "12 Abr, 2026",
    completed: false,
    doctorName: "Dr. Camilo Sánchez"
  },
  {
    id: "t3",
    title: "Completar cuestionario de hábitos",
    dateAssigned: "05 Abr, 2026",
    completed: true,
    doctorName: "Dr. Camilo Sánchez"
  }
];

export function PatientTasksPage(): ReactNode {
  const [tasks, setTasks] = useState(MOCK_TASKS);

  const toggleTask = (id: string) => {
    setTasks(tasks.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
  };

  return (
    <div className="h-full overflow-y-auto custom-scrollbar p-6 space-y-8 pb-20">
      <header className="flex items-center gap-4">
        <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary shadow-sm">
          <CheckSquare size={24} />
        </div>
        <div>
          <h1 className="text-2xl font-black text-foreground">Mis Tareas</h1>
          <p className="text-sm font-medium text-muted-foreground">Actividades recomendadas para tu proceso</p>
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-6xl">
        {/* Tareas Pendientes */}
        <div className="space-y-4">
          <h3 className="text-sm font-black text-foreground uppercase tracking-widest flex items-center gap-2 px-1">
            <Clock size={16} className="text-primary" /> Pendientes
          </h3>
          <div className="space-y-3">
            {tasks.filter(t => !t.completed).map(task => (
              <div 
                key={task.id}
                onClick={() => toggleTask(task.id)}
                className="group cursor-pointer bg-white p-5 rounded-lg border border-border/40 shadow-sm transition-all hover:shadow-md hover:border-primary/20 flex items-start gap-4"
              >
                <div className="w-6 h-6 rounded-lg border-2 border-primary/20 flex items-center justify-center group-hover:border-primary transition-colors mt-0.5 shrink-0">
                  <div className="w-2.5 h-2.5 rounded-sm bg-primary opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                <div className="flex-1">
                  <h4 className="text-sm font-bold text-foreground leading-tight mb-2">{task.title}</h4>
                  <div className="flex items-center gap-3">
                    <span className="text-[10px] font-black text-muted-foreground uppercase flex items-center gap-1">
                      <Calendar size={10} /> {task.dateAssigned}
                    </span>
                    <span className="text-[10px] font-bold text-primary/60 flex items-center gap-1">
                      <ChevronRight size={10} /> {task.doctorName}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Tareas Completadas */}
        <div className="space-y-4">
          <h3 className="text-sm font-black text-foreground uppercase tracking-widest flex items-center gap-2 px-1">
            <CheckSquare size={16} className="text-emerald-500" /> Completadas
          </h3>
          <div className="space-y-3">
            {tasks.filter(t => t.completed).map(task => (
              <div 
                key={task.id}
                onClick={() => toggleTask(task.id)}
                className="cursor-pointer bg-muted/20 p-5 rounded-lg border border-border/20 flex items-start gap-4 opacity-70 grayscale hover:grayscale-0 hover:opacity-100 transition-all"
              >
                <div className="w-6 h-6 rounded-lg bg-emerald-500 flex items-center justify-center mt-0.5 shrink-0">
                  <CheckSquare size={14} className="text-white" />
                </div>
                <div className="flex-1">
                  <h4 className="text-sm font-bold text-foreground line-through decoration-emerald-500/50">{task.title}</h4>
                  <p className="text-[10px] font-black text-muted-foreground uppercase mt-2">Completada el {task.dateAssigned}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
