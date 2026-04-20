import { useState, useMemo, type ReactNode } from "react";
import { useSearchParams, useOutletContext } from "react-router";
import {
  CustomCalendar,
  type ICalendarEvent,
} from "../../../components/admin/calendar/CustomCalendar";
import { Filter, UserCircle, Users } from "lucide-react";

// Mock de eventos de prueba
const MOCK_EVENTS: ICalendarEvent[] = [
  {
    id: "1",
    title: "Cita: Carlos Mendoza",
    start: new Date(2026, 3, 20, 9, 0),
    end: new Date(2026, 3, 20, 10, 0),
    doctorId: "DOC_1",
    patientName: "Carlos Mendoza",
    status: "confirmed",
  },
  {
    id: "2",
    title: "Cita: María Ríos",
    start: new Date(2026, 3, 20, 10, 30),
    end: new Date(2026, 3, 20, 11, 30),
    doctorId: "DOC_1",
    patientName: "María Ríos",
    status: "pending",
  },
  {
    id: "3",
    title: "Cita: Jorge Holguín",
    start: new Date(2026, 3, 21, 14, 0),
    end: new Date(2026, 3, 21, 15, 0),
    doctorId: "DOC_2",
    patientName: "Jorge Holguín",
    status: "confirmed",
  },
];

// Mock de doctores (para el filtro de admin)
const MOCK_DOCTORS = [
  { id: "ALL", name: "Todos los Doctores" },
  { id: "DOC_1", name: "Dr. Camilo Sánchez" },
  { id: "DOC_2", name: "Dra. Elena Martínez" },
];

export function CalendarPage(): ReactNode {
  const [searchParams] = useSearchParams();
  const [selectedDoctorId, setSelectedDoctorId] = useState("ALL");
  const { handleStartSession } = useOutletContext<{ handleStartSession: (id: string, name: string) => void }>();
  
  // En una app real, esto vendría del AuthContext
  const currentUser = {
    id: "DOC_1",
    role: "ADMIN", // Cambiar a 'DOCTOR' para probar
    canViewAllCalendar: true
  };

  const isViewAllParam = searchParams.get("view") === "all";
  const shouldShowAll = currentUser.role === "ADMIN" || (currentUser.role === "DOCTOR" && isViewAllParam && currentUser.canViewAllCalendar);

  const filteredEvents = useMemo(() => {
    let events = MOCK_EVENTS;
    
    // Si no es admin y no está en modo 'ver todo', solo ve las suyas
    if (!shouldShowAll) {
      events = events.filter(e => e.doctorId === currentUser.id);
    } else if (selectedDoctorId !== "ALL") {
      // Si es admin o tiene permiso global y seleccionó un doctor específico
      events = events.filter(e => e.doctorId === selectedDoctorId);
    }
    
    return events;
  }, [shouldShowAll, selectedDoctorId, currentUser.id]);

  return (
    <div className="h-full flex flex-col gap-4 animate-in fade-in duration-500">
      {/* Barra de Filtros (Solo visible para Admin o Doctor con permiso) */}
      {shouldShowAll && (
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 p-4 bg-white rounded-2xl border border-border/40 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
              <Users size={20} />
            </div>
            <div>
              <h3 className="text-sm font-bold text-foreground">Vista de Cronograma</h3>
              <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Filtrado por Doctor</p>
            </div>
          </div>

          <div className="flex items-center gap-2 w-full md:w-auto">
            <Filter size={16} className="text-muted-foreground" />
            <select
              value={selectedDoctorId}
              onChange={(e) => setSelectedDoctorId(e.target.value)}
              className="flex-1 md:w-64 bg-muted/30 border-none rounded-xl px-4 py-2 text-xs font-bold focus:ring-2 focus:ring-primary/20 transition-all cursor-pointer"
            >
              {MOCK_DOCTORS.map(doc => (
                <option key={doc.id} value={doc.id}>{doc.name}</option>
              ))}
            </select>
          </div>
        </div>
      )}

      {/* Si es un doctor viendo su calendario, mostramos un indicador */}
      {!shouldShowAll && (
        <div className="p-4 bg-primary/5 rounded-2xl border border-primary/20 flex items-center gap-3">
          <UserCircle className="text-primary" size={20} />
          <div>
            <h3 className="text-sm font-bold text-primary">Mis Citas Personales</h3>
            <p className="text-[10px] font-medium text-primary/70 uppercase tracking-widest">Solo visualizas los pacientes asignados a ti</p>
          </div>
        </div>
      )}

      {/* Contenedor del Calendario */}
      <div className="flex-1 bg-white p-4 rounded-2xl border border-border/40 shadow-sm overflow-hidden">
        <CustomCalendar 
          events={filteredEvents} 
          onSelectEvent={(e) => handleStartSession(e.id, e.patientName)}
        />
      </div>
    </div>
  );
}
