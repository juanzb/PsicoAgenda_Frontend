import { useState, useMemo, type ReactNode, useEffect } from "react";
import { useSearchParams } from "react-router";
import {
  CustomCalendar,
  type ICalendarEvent,
} from "../../../components/admin/calendar/CustomCalendar";
import { Filter, UserCircle, Calendar as CalendarIcon } from "lucide-react";
import { AppointmentDetailModal } from "../../../components/admin/appointments/AppointmentDetailModal";
import { mockStorage } from "../../../services/mockStorage";

import { ViewHeader } from "../../../components/ui/view-header/ViewHeader";

export function CalendarPage(): ReactNode {
  const [searchParams] = useSearchParams();
  const [selectedDoctorId, setSelectedDoctorId] = useState("ALL");
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<any>(null);
  const [searchTerm, setSearchTerm] = useState("");

  const [tick, setTick] = useState(0);
  useEffect(() => {
    const handler = () => setTick((t) => t + 1);
    window.addEventListener("pa_storage_update", handler);
    return () => window.removeEventListener("pa_storage_update", handler);
  }, []);

  const doctors = mockStorage.getDoctors();
  const appointments = mockStorage.getAppointments();

  const events: ICalendarEvent[] = useMemo(() => {
    return appointments.map((appt) => {
      const patient = mockStorage
        .getPatients()
        .find((p) => p.id === appt.patientId);
      const [year, month, day] = appt.date.split("-").map(Number);
      const [hour, min] = appt.time.split(":").map(Number);

      const startDate = new Date(year, month - 1, day, hour, min);
      const endDate = new Date(year, month - 1, day, hour + 1, min);

      return {
        id: appt.id,
        title: `Cita: ${patient?.name || "Desconocido"}`,
        start: startDate,
        end: endDate,
        doctorId: appt.doctorId,
        patientName: patient?.name || "Desconocido",
        status: appt.status,
      };
    });
  }, [appointments, tick]);

  const currentUser = { id: "DOC_1", role: "ADMIN", canViewAllCalendar: true };
  const isViewAllParam = searchParams.get("view") === "all";
  const shouldShowAll =
    currentUser.role === "ADMIN" ||
    (currentUser.role === "DOCTOR" && isViewAllParam);

  const filteredEvents = useMemo(() => {
    let baseEvents = events;
    if (!shouldShowAll)
      baseEvents = events.filter((e) => e.doctorId === currentUser.id);
    else if (selectedDoctorId !== "ALL")
      baseEvents = events.filter((e) => e.doctorId === selectedDoctorId);

    if (searchTerm) {
      baseEvents = baseEvents.filter((e) =>
        e.patientName.toLowerCase().includes(searchTerm.toLowerCase()),
      );
    }

    return baseEvents;
  }, [events, shouldShowAll, selectedDoctorId, searchTerm]);

  return (
    <div className="h-full w-full max-w-400 mx-auto grid grid-rows-[auto_1fr] overflow-hidden relative p-1 animate-in fade-in duration-500">
      <ViewHeader
        title="Agenda de Citas"
        description="Visualización de consultas y horarios"
        icon={CalendarIcon}
        searchTerm={searchTerm}
        onSearch={setSearchTerm}
        showSearch={false}
        showFilter={false}
        extraActions={
          shouldShowAll && (
            <div className="flex items-center gap-2">
              <Filter size={14} className="text-muted-foreground/50" />
              <select
                value={selectedDoctorId}
                onChange={(e) => setSelectedDoctorId(e.target.value)}
                className="bg-muted/20 border-none rounded-md px-3 py-1.5 text-[10px] font-black uppercase focus:ring-1 focus:ring-primary/20 outline-none h-9 min-w-40"
              >
                <option value="ALL">Todos los Especialistas</option>
                {doctors.map((doc) => (
                  <option key={doc.id} value={doc.id}>
                    {doc.name}
                  </option>
                ))}
              </select>
            </div>
          )
        }
      />

      <div className="flex flex-col min-h-0 gap-3">
        {!shouldShowAll && (
          <div className="px-4 py-2 bg-primary/5 rounded-md border border-primary/10 text-[10px] font-black text-primary uppercase tracking-widest flex items-center gap-2 shrink-0">
            <UserCircle size={14} /> Solo visualizando tus citas asignadas
          </div>
        )}

        <div className="flex-1 bg-white p-4 rounded-lg border border-border/40 shadow-sm overflow-hidden">
          <CustomCalendar
            events={filteredEvents}
            onSelectEvent={(e) => {
              setSelectedEvent(e);
              setIsDetailModalOpen(true);
            }}
          />
        </div>
      </div>

      <AppointmentDetailModal
        isOpen={isDetailModalOpen}
        onClose={() => setIsDetailModalOpen(false)}
        event={selectedEvent}
      />
    </div>
  );
}
