import { type ReactNode } from "react";
import { 
  TimelineHistory, 
  type IHistoryItem 
} from "../../components/shared/history/TimelineHistory";
import { BookOpen, Search } from "lucide-react";

const MOCK_PATIENT_HISTORY: IHistoryItem[] = [
  {
    id: "h1",
    date: "12 Abr, 2026",
    time: "09:00 AM",
    doctorName: "Dr. Camilo Sánchez",
    type: "Sesión Individual",
    tasks: ["Leer capítulo 2 del libro de autoayuda", "Realizar 5 min de meditación diaria"],
    status: "completed"
  },
  {
    id: "h2",
    date: "05 Abr, 2026",
    time: "10:30 AM",
    doctorName: "Dr. Camilo Sánchez",
    type: "Evaluación Inicial",
    tasks: ["Completar cuestionario de hábitos"],
    status: "completed"
  }
];

export function PatientHistoryPage(): ReactNode {
  return (
    <div className="h-full overflow-y-auto custom-scrollbar p-6 space-y-8 pb-20">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary shadow-sm">
            <BookOpen size={24} />
          </div>
          <div>
            <h1 className="text-2xl font-black text-foreground">Mi Historial Clínico</h1>
            <p className="text-sm font-medium text-muted-foreground">Resumen de tus sesiones y evolución terapéutica</p>
          </div>
        </div>

        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={16} />
          <input 
            placeholder="Buscar por fecha..."
            className="pl-10 pr-4 py-2 bg-white border border-border/40 rounded-md text-xs font-bold outline-none focus:ring-2 focus:ring-primary/20 w-full md:w-64"
          />
        </div>
      </header>

      <div className="max-w-4xl mx-auto">
        <div className="bg-primary/5 p-4 rounded-lg border border-primary/10 mb-10 flex items-center gap-3">
          <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
          <p className="text-[10px] font-black text-primary uppercase tracking-widest">Las notas detalladas del doctor son para uso clínico profesional y no se muestran aquí.</p>
        </div>

        <TimelineHistory 
          items={MOCK_PATIENT_HISTORY} 
          showPrivateNotes={false} // El paciente NO ve las notas privadas
        />
      </div>
    </div>
  );
}
