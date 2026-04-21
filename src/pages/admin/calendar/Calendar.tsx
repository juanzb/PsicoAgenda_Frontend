import { useState, useMemo, type ReactNode, useEffect } from "react";
import { useSearchParams } from "react-router";
import {
  CustomCalendar,
  type ICalendarEvent,
} from "../../../components/admin/calendar/CustomCalendar";
import { Filter, UserCircle, Users, Plus } from "lucide-react";
import { AppointmentModal } from "../../../components/admin/appointments/AppointmentModal";
import { AppointmentDetailModal } from "../../../components/admin/appointments/AppointmentDetailModal";
import { mockStorage } from "../../../services/mockStorage";
import { Button } from "../../../components/ui/button/Button";

export function CalendarPage(): ReactNode {
  const [searchParams] = useSearchParams();
  const [selectedDoctorId, setSelectedDoctorId] = useState("ALL");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState<any>(null);
  const [selectedEvent, setSelectedEvent] = useState<any>(null);

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
    if (!shouldShowAll)
      return events.filter((e) => e.doctorId === currentUser.id);
    if (selectedDoctorId !== "ALL")
      return events.filter((e) => e.doctorId === selectedDoctorId);
    return events;
  }, [events, shouldShowAll, selectedDoctorId]);

  const handleSaveAppointment = (data: any) => {
    mockStorage.addAppointment(data);
    setIsModalOpen(false);
  };

  return (
    <div className="h-full flex flex-col gap-4 animate-in fade-in duration-500 p-1">
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 p-4 bg-white rounded-lg border border-border/40 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-md bg-primary/10 flex items-center justify-center text-primary">
            <Users size={20} />
          </div>
          <div>
            <h3 className="text-sm font-bold text-foreground">
              Agenda de Citas
            </h3>
            <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">
              Gestiona tus consultas y horarios
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 w-full md:w-auto">
          {shouldShowAll && (
            <div className="flex items-center gap-2 flex-1 md:flex-none">
              <Filter size={14} className="text-muted-foreground" />
              <select
                value={selectedDoctorId}
                onChange={(e) => setSelectedDoctorId(e.target.value)}
                className="bg-muted/30 border-none rounded-md px-4 py-2 text-xs font-bold focus:ring-2 focus:ring-primary/20 outline-none"
              >
                <option value="ALL">Todos los Doctores</option>
                {doctors.map((doc) => (
                  <option key={doc.id} value={doc.id}>
                    {doc.name}
                  </option>
                ))}
              </select>
            </div>
          )}
          <Button
            size="sm"
            onClick={() => {
              setSelectedSlot(null);
              setIsModalOpen(true);
            }}
            className="rounded-md font-bold gradient-primary"
            icon={<Plus size={16} />}
          >
            Nueva Cita
          </Button>
        </div>
      </div>

      {!shouldShowAll && (
        <div className="px-4 py-2 bg-primary/5 rounded-md border border-primary/10 text-[10px] font-black text-primary uppercase tracking-widest flex items-center gap-2">
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
          onSelectSlot={(slot) => {
            const dateStr = slot.start.toISOString().split("T")[0];
            const timeStr = slot.start.toTimeString().substring(0, 5);
            setSelectedSlot({ date: dateStr, time: timeStr });
            setIsModalOpen(true);
          }}
        />
      </div>

      <AppointmentModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveAppointment}
        initialData={selectedSlot}
      />

      <AppointmentDetailModal
        isOpen={isDetailModalOpen}
        onClose={() => setIsDetailModalOpen(false)}
        event={selectedEvent}
      />
    </div>
  );
}
