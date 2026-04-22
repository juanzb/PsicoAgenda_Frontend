import { useState, useMemo, type ReactNode } from "react";
import { useOutletContext } from "react-router";
import { 
  Search, 
  Filter, 
  Calendar as CalendarIcon, 
  Clock, 
  MoreVertical, 
  Play, 
  Plus,
  Activity
} from "lucide-react";
import { Button } from "../../../components/ui/button/Button";
import { Pagination } from "../../../components/ui/pagination/Pagination";

interface ContextType {
  handleStartSession: (id: string, name: string) => void;
}

interface IAppointment {
  id: string;
  patientName: string;
  patientId: string;
  time: string;
  date: string;
  type: string;
  status: "pending" | "confirmed" | "completed";
  avatar: string;
}

const mockAppointments: IAppointment[] = [
  { id: "1", patientName: "Carlos Rodríguez", patientId: "P-001", time: "09:00 AM", date: "22 Abr 2026", type: "Sesión Individual", status: "pending", avatar: "https://i.pravatar.cc/150?u=carlos" },
  { id: "2", patientName: "Ana María Silva", patientId: "P-002", time: "10:30 AM", date: "22 Abr 2026", type: "Terapia de Pareja", status: "confirmed", avatar: "https://i.pravatar.cc/150?u=ana" },
  { id: "3", patientName: "Juan Pablo Duarte", patientId: "P-003", time: "02:00 PM", date: "22 Abr 2026", type: "Evaluación Inicial", status: "pending", avatar: "https://i.pravatar.cc/150?u=juan" },
  { id: "4", patientName: "Lucía Méndez", patientId: "P-004", time: "04:30 PM", date: "22 Abr 2026", type: "Seguimiento", status: "completed", avatar: "https://i.pravatar.cc/150?u=lucia" },
  { id: "5", patientName: "Roberto Gómez", patientId: "P-005", time: "08:00 AM", date: "23 Abr 2026", type: "Sesión Individual", status: "confirmed", avatar: "https://i.pravatar.cc/150?u=roberto" },
];

export function AppointmentsPage(): ReactNode {
  const { handleStartSession } = useOutletContext<ContextType>();
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  const filteredAppointments = useMemo(() => {
    return mockAppointments.filter(app => 
      app.patientName.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm]);

  const paginatedAppointments = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredAppointments.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredAppointments, currentPage, itemsPerPage]);

  return (
    <div className="h-full w-full max-w-400 mx-auto grid grid-rows-[auto_1fr_auto] overflow-hidden relative p-1 animate-in fade-in duration-500">
      
      {/* 1. SECCIÓN SUPERIOR: FILTROS (COHERENTE CON DOCTORS/PATIENTS) */}
      <div className="pb-3 shrink-0">
        <div className="flex flex-col md:flex-row gap-2 items-stretch md:items-center bg-white p-2 rounded-md border border-border/40 shadow-sm">
          <div className="flex gap-2 flex-1">
            <Button
              size="sm"
              className="rounded-md px-3 font-black text-[10px] uppercase gradient-primary h-9 whitespace-nowrap"
            >
              <Plus size={14} className="mr-1.5" /> Nueva Cita
            </Button>

            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground/50" size={14} />
              <input
                type="text"
                placeholder="Buscar por paciente..."
                value={searchTerm}
                onChange={(e) => { setSearchTerm(e.target.value); setCurrentPage(1); }}
                className="w-full pl-9 pr-4 py-1.5 bg-muted/20 border-none rounded-md focus:outline-none focus:ring-1 focus:ring-primary/20 focus:bg-white transition-all font-bold text-xs h-9"
              />
            </div>
          </div>

          <Button
            variant="ghost"
            size="sm"
            className="rounded-md px-3 font-black text-[10px] uppercase h-9 border border-border/40 text-muted-foreground hover:bg-muted"
          >
            <Filter className="w-3.5 h-3.5 mr-1.5" /> Filtros
          </Button>
        </div>
      </div>

      {/* 2. SECCIÓN CENTRAL: LISTADO DE TARJETAS */}
      <div className="overflow-y-auto custom-scrollbar pr-1 min-h-0">
        {paginatedAppointments.length > 0 ? (
          <div className="flex flex-col gap-1.5 pb-2">
            {paginatedAppointments.map((app) => (
              <div 
                key={app.id} 
                className="bg-white border border-border/40 p-3 rounded-md hover:border-primary/20 hover:shadow-md transition-all group flex items-center justify-between"
              >
                <div className="flex items-center gap-4">
                  <div className="w-11 h-11 rounded-md overflow-hidden border border-border/40 shadow-sm shrink-0">
                    <img src={app.avatar} alt={app.patientName} className="w-full h-full object-cover" />
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-2 mb-0.5">
                      <h4 className="text-sm font-black text-foreground truncate group-hover:text-primary transition-colors">
                        {app.patientName}
                      </h4>
                      <span className={`px-2 py-0.5 rounded-sm text-[8px] font-black uppercase border ${
                        app.status === 'completed' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' : 
                        app.status === 'confirmed' ? 'bg-blue-50 text-blue-600 border-blue-100' : 'bg-amber-50 text-amber-600 border-amber-100'
                      }`}>
                        {app.status === 'completed' ? 'Atendida' : app.status === 'confirmed' ? 'Confirmada' : 'Pendiente'}
                      </span>
                    </div>
                    <div className="flex items-center gap-3 text-[9px] font-bold text-muted-foreground uppercase tracking-widest">
                      <span className="flex items-center gap-1"><CalendarIcon size={10} className="text-primary" /> {app.date}</span>
                      <span className="flex items-center gap-1"><Clock size={10} className="text-primary" /> {app.time}</span>
                      <span className="opacity-40">|</span>
                      <span>{app.type}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <Button 
                    size="sm" 
                    className={`h-8 rounded-sm text-[9px] font-black uppercase tracking-widest px-4 transition-all duration-300 ${
                      app.status === 'completed' 
                        ? "bg-muted text-muted-foreground border-border/40 cursor-not-allowed opacity-60" 
                        : "gradient-primary shadow-md shadow-primary/10"
                    }`}
                    onClick={() => app.status !== 'completed' && handleStartSession(app.patientId, app.patientName)}
                    disabled={app.status === 'completed'}
                    icon={<Play size={10} className={app.status === 'completed' ? "text-muted-foreground" : "fill-white"} />}
                  >
                    {app.status === 'completed' ? "Atendida" : "Atender"}
                  </Button>
                  <button className="p-2 text-muted-foreground hover:bg-muted rounded-md transition-all">
                    <MoreVertical size={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="h-full flex flex-col items-center justify-center bg-white rounded-lg border border-dashed border-border/60">
            <Activity size={24} className="text-muted-foreground/20 mb-3" />
            <h3 className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">
              Sin citas programadas
            </h3>
          </div>
        )}
      </div>

      {/* 3. SECCIÓN INFERIOR: PAGINACIÓN */}
      <div className="pt-3 shrink-0">
        <div className="bg-white p-1 rounded-md border border-border/40 shadow-sm">
          <Pagination
            currentPage={currentPage}
            totalItems={filteredAppointments.length}
            itemsPerPage={itemsPerPage}
            onPageChange={setCurrentPage}
            onItemsPerPageChange={(items) => { setItemsPerPage(items); setCurrentPage(1); }}
            itemsPerPageOptions={[10, 20, 50]}
          />
        </div>
      </div>
    </div>
  );
}
