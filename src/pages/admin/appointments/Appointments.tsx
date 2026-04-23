import { useState, useMemo, type ReactNode, useEffect } from "react";
import { useOutletContext } from "react-router";
import { Plus, Activity } from "lucide-react";
import { Pagination } from "../../../components/ui/pagination/Pagination";
import {
  CardAppointment,
  type IAppointment,
} from "../../../components/admin/appointments/CardAppointment";
import { AppointmentModal } from "../../../components/admin/appointments/AppointmentModal";
import { AppointmentDetailModal } from "../../../components/admin/appointments/AppointmentDetailModal";
import { mockStorage } from "../../../services/mockStorage";

interface ContextType {
  handleStartSession: (id: string, name: string) => void;
}

import { ViewHeader } from "../../../components/ui/view-header/ViewHeader";

export function AppointmentsPage(): ReactNode {
  const { handleStartSession } = useOutletContext<ContextType>();
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [selectedAppointment, setSelectedAppointment] =
    useState<IAppointment | null>(null);

  const [tick, setTick] = useState(0);
  useEffect(() => {
    const handler = () => setTick((t) => t + 1);
    window.addEventListener("pa_storage_update", handler);
    return () => window.removeEventListener("pa_storage_update", handler);
  }, []);

  const appointments = mockStorage.getAppointments();
  const patients = mockStorage.getPatients();

  const appointmentsWithData = useMemo(() => {
    return appointments.map((app) => {
      const patient = patients.find((p) => p.id === app.patientId);
      return {
        ...app,
        patientName: patient?.name || "Paciente Desconocido",
      };
    });
  }, [appointments, patients, tick]);

  const filteredAppointments = useMemo(() => {
    return appointmentsWithData.filter((app) =>
      app.patientName?.toLowerCase().includes(searchTerm.toLowerCase()),
    );
  }, [appointmentsWithData, searchTerm]);

  const paginatedAppointments = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredAppointments.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredAppointments, currentPage, itemsPerPage]);

  const handleSaveAppointment = (data: any) => {
    mockStorage.addAppointment(data);
    setIsModalOpen(false);
  };

  const handleOpenDetail = (app: IAppointment) => {
    setSelectedAppointment(app);
    setIsDetailModalOpen(true);
  };

  return (
    <div className="h-full w-full max-w-400 mx-auto grid grid-rows-[auto_1fr_auto] overflow-hidden relative p-1 animate-in fade-in duration-500">
      <ViewHeader
        actionLabel="Nueva Cita"
        actionIcon={Plus}
        onActionClick={() => setIsModalOpen(true)}
        searchTerm={searchTerm}
        onSearch={(val) => {
          setSearchTerm(val);
          setCurrentPage(1);
        }}
        searchPlaceholder="Buscar por paciente..."
      />

      {/* 2. SECCIÓN CENTRAL: LISTADO DE TARJETAS */}
      <div className="overflow-y-auto custom-scrollbar pr-1 min-h-0">
        {paginatedAppointments.length > 0 ? (
          <div className="flex flex-col gap-1.5 pb-2">
            {paginatedAppointments.map((app) => (
              <CardAppointment
                key={app.id}
                appointment={app as any}
                onStartSession={handleStartSession}
                onOpenDetail={handleOpenDetail}
              />
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
            onItemsPerPageChange={(items) => {
              setItemsPerPage(items);
              setCurrentPage(1);
            }}
            itemsPerPageOptions={[10, 20, 50]}
          />
        </div>
      </div>

      <AppointmentModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveAppointment}
      />

      <AppointmentDetailModal
        isOpen={isDetailModalOpen}
        onClose={() => setIsDetailModalOpen(false)}
        event={selectedAppointment}
      />
    </div>
  );
}
