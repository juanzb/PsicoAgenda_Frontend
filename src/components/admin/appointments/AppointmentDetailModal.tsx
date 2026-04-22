import {
  Clock,
  User,
  Stethoscope,
  FileText,
  Calendar as CalendarIcon,
  ExternalLink,
  Play,
} from "lucide-react";
import type { ReactNode } from "react";
import { Modal } from "../../ui/modal/Modal";
import { Button } from "../../ui/button/Button";
import { useNavigate, useOutletContext } from "react-router";
import { PATHS } from "../../../app/router/paths";
import { mockStorage } from "../../../services/mockStorage";

interface AppointmentDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  event: any; // ICalendarEvent
}

export function AppointmentDetailModal({
  isOpen,
  onClose,
  event,
}: AppointmentDetailModalProps): ReactNode {
  const navigate = useNavigate();
  const { handleStartSession } = useOutletContext<{
    handleStartSession: (id: string, name: string) => void;
  }>();

  if (!event) return null;

  const doctor = mockStorage.getDoctors().find((d) => d.id === event.doctorId);
  const appointment = mockStorage
    .getAppointments()
    .find((a) => a.id === event.id);

  const statusConfig = {
    pending: {
      label: "Pendiente",
      color: "bg-amber-100 text-amber-700 border-amber-200",
    },
    confirmed: {
      label: "Confirmada",
      color: "bg-blue-100 text-blue-700 border-blue-200",
    },
    completed: {
      label: "Realizada",
      color: "bg-emerald-100 text-emerald-700 border-emerald-200",
    },
    cancelled: {
      label: "Cancelada",
      color: "bg-rose-100 text-rose-700 border-rose-200",
    },
  };

  const currentStatus =
    statusConfig[event.status as keyof typeof statusConfig] ||
    statusConfig.pending;

  const handleViewPatient = () => {
    if (appointment?.patientId) {
      onClose();
      navigate(PATHS.ADMIN.PATIENT_DATA.replace(":id", appointment.patientId));
    }
  };

  const handleAttend = () => {
    onClose();
    handleStartSession(appointment?.patientId || "", event.patientName);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Detalle de la Cita">
      <div className="space-y-6">
        {/* Badge de Estado */}
        <div className="flex justify-between items-start">
          <div
            className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border ${currentStatus.color}`}
          >
            {currentStatus.label}
          </div>
          <div className="text-[10px] font-bold text-muted-foreground uppercase">
            ID: {event.id}
          </div>
        </div>

        {/* Información Principal */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary shrink-0">
                <User size={20} />
              </div>
              <div>
                <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest leading-none mb-1">
                  Paciente
                </p>
                <h4 className="text-sm font-black text-foreground">
                  {event.patientName}
                </h4>
                <button
                  onClick={handleViewPatient}
                  className="text-[10px] font-bold text-primary hover:underline flex items-center gap-1 mt-1"
                >
                  Ver expediente <ExternalLink size={10} />
                </button>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center text-muted-foreground shrink-0">
                <Stethoscope size={20} />
              </div>
              <div>
                <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest leading-none mb-1">
                  Especialista
                </p>
                <h4 className="text-sm font-bold text-foreground">
                  {doctor?.name || "No asignado"}
                </h4>
                <p className="text-[10px] text-muted-foreground">
                  {doctor?.specialty}
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center text-muted-foreground shrink-0">
                <CalendarIcon size={20} />
              </div>
              <div>
                <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest leading-none mb-1">
                  Fecha
                </p>
                <h4 className="text-sm font-bold text-foreground">
                  {event.start.toLocaleDateString("es-ES", {
                    weekday: "long",
                    day: "numeric",
                    month: "long",
                  })}
                </h4>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center text-muted-foreground shrink-0">
                <Clock size={20} />
              </div>
              <div>
                <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest leading-none mb-1">
                  Horario
                </p>
                <h4 className="text-sm font-bold text-foreground">
                  {event.start.toLocaleTimeString("es-ES", {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}{" "}
                  -{" "}
                  {event.end.toLocaleTimeString("es-ES", {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </h4>
              </div>
            </div>
          </div>
        </div>

        {/* Descripción / Notas */}
        <div className="p-4 rounded-lg bg-muted/30 border border-border/40">
          <h4 className="text-[10px] font-black text-muted-foreground uppercase tracking-widest mb-2 flex items-center gap-2">
            <FileText size={14} /> Observaciones de la Cita
          </h4>
          <p className="text-xs text-foreground leading-relaxed">
            {appointment?.notes ||
              "No hay observaciones adicionales para esta cita."}
          </p>
        </div>

        {/* Footer Acciones */}
        <div className="flex justify-end gap-3 pt-4 border-t border-border/40">
          <Button
            variant="ghost"
            onClick={onClose}
            className="rounded-sm font-bold text-[10px] uppercase"
          >
            Cerrar
          </Button>
          <Button
            onClick={handleAttend}
            className="rounded-sm font-bold text-[10px] uppercase gradient-primary shadow-lg shadow-primary/20 px-6"
            icon={<Play size={14} />}
          >
            Atender Cita
          </Button>
        </div>
      </div>
    </Modal>
  );
}
