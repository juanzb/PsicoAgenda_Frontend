import { type ReactNode } from "react";
import { useParams, useNavigate, useOutletContext } from "react-router";
import { 
  ArrowLeft, 
  History, 
  User, 
  Phone, 
  Mail, 
  Calendar, 
  Play, 
  FileText,
  Activity
} from "lucide-react";
import { Button } from "../../../components/ui/button/Button";
import { 
  TimelineHistory, 
  type IHistoryItem 
} from "../../../components/shared/history/TimelineHistory";

// Mock de historial para este paciente
const MOCK_HISTORY: IHistoryItem[] = [
  {
    id: "h1",
    date: "12 Abr, 2026",
    time: "09:00 AM",
    doctorName: "Dr. Camilo Sánchez",
    type: "Sesión Individual",
    notes: "Paciente muestra avances en el manejo de la ansiedad social. Se recomienda continuar con técnicas de exposición gradual.",
    tasks: ["Leer capítulo 2 del libro de autoayuda", "Realizar 5 min de meditación diaria"],
    status: "completed"
  },
  {
    id: "h2",
    date: "05 Abr, 2026",
    time: "10:30 AM",
    doctorName: "Dr. Camilo Sánchez",
    type: "Evaluación Inicial",
    notes: "Se identifican patrones de pensamiento recurrente. Se establece plan de trabajo para las próximas 8 semanas.",
    tasks: ["Completar cuestionario de hábitos"],
    status: "completed"
  },
  {
    id: "h3",
    date: "28 Mar, 2026",
    time: "04:00 PM",
    doctorName: "Dr. Camilo Sánchez",
    type: "Sesión Individual",
    status: "cancelled"
  }
];

export function ClinicalHistoryPage(): ReactNode {
  const { id } = useParams();
  const navigate = useNavigate();
  // Acceso a la función de iniciar sesión desde el layout
  const { handleStartSession } = useOutletContext<{ handleStartSession: (id: string, name: string) => void }>();

  // En una app real buscaríamos el paciente por ID
  const patient = {
    id: id || "1",
    name: "Carlos Andrés Mendoza",
    age: 34,
    phone: "+57 310 456 7890",
    email: "carlos.mendoza@email.com",
    lastVisit: "12 Abr, 2026",
    status: "active"
  };

  return (
    <div className="h-full overflow-y-auto custom-scrollbar pr-2 pb-12">
      {/* 1. HEADER Y NAVEGACIÓN */}
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="sm" onClick={() => navigate(-1)} className="rounded-xl border border-border/40 bg-white">
            <ArrowLeft size={18} />
          </Button>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
              <History size={20} />
            </div>
            <div>
              <h1 className="text-xl font-bold text-foreground">Historia Clínica</h1>
              <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Expediente #PA-2026-{id}</p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
           <Button 
            onClick={() => handleStartSession(patient.id, patient.name)}
            className="rounded-xl font-bold gradient-primary shadow-lg shadow-primary/20 px-6"
            icon={<Play size={16} />}
           >
             Iniciar Sesión de Hoy
           </Button>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* 2. PANEL LATERAL: INFORMACIÓN DEL PACIENTE */}
        <aside className="lg:col-span-1 space-y-6">
          <div className="bg-white p-6 rounded-3xl border border-border/40 shadow-sm">
            <div className="flex flex-col items-center text-center mb-6">
              <div className="w-20 h-20 rounded-2xl bg-primary/5 flex items-center justify-center text-3xl font-black text-primary border border-primary/10 mb-4">
                {patient.name.charAt(0)}
              </div>
              <h2 className="text-lg font-bold text-foreground leading-tight">{patient.name}</h2>
              <p className="text-xs font-medium text-muted-foreground mt-1">{patient.age} años • Paciente {patient.status === 'active' ? 'Activo' : 'Inactivo'}</p>
            </div>

            <div className="space-y-4 pt-4 border-t border-border/40">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-muted flex items-center justify-center text-muted-foreground">
                  <Phone size={14} />
                </div>
                <div>
                  <p className="text-[9px] font-black text-muted-foreground uppercase tracking-widest">WhatsApp</p>
                  <p className="text-xs font-bold text-foreground">{patient.phone}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-muted flex items-center justify-center text-muted-foreground">
                  <Mail size={14} />
                </div>
                <div className="truncate">
                  <p className="text-[9px] font-black text-muted-foreground uppercase tracking-widest">Email</p>
                  <p className="text-xs font-bold text-foreground truncate">{patient.email}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-muted flex items-center justify-center text-muted-foreground">
                  <Calendar size={14} />
                </div>
                <div>
                  <p className="text-[9px] font-black text-muted-foreground uppercase tracking-widest">Última Cita</p>
                  <p className="text-xs font-bold text-foreground">{patient.lastVisit}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Resumen Clínico / Diagnóstico Rápido */}
          <div className="bg-primary/5 p-6 rounded-3xl border border-dashed border-primary/20">
            <h4 className="flex items-center gap-2 text-[10px] font-black text-primary uppercase tracking-widest mb-4">
              <Activity size={14} /> Ficha de Diagnóstico
            </h4>
            <div className="space-y-3">
               <div className="p-3 bg-white rounded-xl border border-primary/10">
                  <p className="text-[9px] font-black text-muted-foreground uppercase mb-1">Motivo de consulta</p>
                  <p className="text-xs font-bold text-foreground">Trastorno de ansiedad generalizada leve.</p>
               </div>
               <div className="p-3 bg-white rounded-xl border border-primary/10">
                  <p className="text-[9px] font-black text-muted-foreground uppercase mb-1">Alertas / Alergias</p>
                  <p className="text-xs font-bold text-destructive">Ninguna reportada.</p>
               </div>
            </div>
          </div>
        </aside>

        {/* 3. CONTENIDO PRINCIPAL: LÍNEA DE TIEMPO */}
        <main className="lg:col-span-3">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-sm font-black text-foreground uppercase tracking-widest flex items-center gap-2">
              <FileText size={18} className="text-primary" /> Historial de Sesiones y Evolución
            </h3>
            <div className="flex gap-2">
              <Button variant="ghost" size="sm" className="text-[10px] font-bold uppercase tracking-widest">Todo</Button>
              <Button variant="ghost" size="sm" className="text-[10px] font-bold uppercase tracking-widest opacity-50">Citas</Button>
              <Button variant="ghost" size="sm" className="text-[10px] font-bold uppercase tracking-widest opacity-50">Tareas</Button>
            </div>
          </div>

          <TimelineHistory 
            items={MOCK_HISTORY} 
            showPrivateNotes={true} // El doctor puede ver las notas privadas
          />
        </main>
      </div>
    </div>
  );
}
