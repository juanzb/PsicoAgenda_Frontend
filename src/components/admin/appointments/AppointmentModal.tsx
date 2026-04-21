import { useState } from "react";
import { Modal } from "../../ui/modal/Modal";
import { Button } from "../../ui/button/Button";
import { Select } from "../../ui/select/Select";
import { Calendar, Clock, User, Stethoscope, Save } from "lucide-react";

interface AppointmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: any) => void;
  initialData?: any;
}

export function AppointmentModal({
  isOpen,
  onClose,
  onSave,
  initialData,
}: AppointmentModalProps) {
  const [formData, setFormData] = useState(
    initialData || {
      patientId: "",
      doctorId: "",
      date: new Date().toISOString().split("T")[0],
      time: "09:00",
      type: "Individual",
    },
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={initialData ? "Editar Cita" : "Agendar Nueva Cita"}
      size="md"
    >
      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Paciente */}
        <div>
          <label className="text-[10px] font-black text-muted-foreground uppercase tracking-widest mb-1.5 block ml-1">
            <User size={12} className="inline mr-1 text-primary" /> Paciente
          </label>
          <Select
            options={[
              { value: "1", label: "Carlos Andrés Mendoza" },
              { value: "2", label: "María Fernanda Ríos" },
            ]}
            value={formData.patientId}
            onChange={(e) => setFormData({ ...formData, patientId: e.target.value })}
            placeholder="Seleccionar paciente..."
            required
          />
        </div>

        {/* Doctor */}
        <div>
          <label className="text-[10px] font-black text-muted-foreground uppercase tracking-widest mb-1.5 block ml-1">
            <Stethoscope size={12} className="inline mr-1 text-primary" /> Especialista
          </label>
          <Select
            options={[
              { value: "DOC_1", label: "Dr. Camilo Sánchez" },
              { value: "DOC_2", label: "Dra. Elena Balvin" },
            ]}
            value={formData.doctorId}
            onChange={(e) => setFormData({ ...formData, doctorId: e.target.value })}
            placeholder="Seleccionar doctor..."
            required
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          {/* Fecha */}
          <div>
            <label className="text-[10px] font-black text-muted-foreground uppercase tracking-widest mb-1.5 block ml-1">
              <Calendar size={12} className="inline mr-1 text-primary" /> Fecha
            </label>
            <input
              type="date"
              value={formData.date}
              onChange={(e) => setFormData({ ...formData, date: e.target.value })}
              className="w-full bg-muted/30 border border-border/40 rounded-md px-4 py-2.5 text-xs font-bold focus:ring-2 focus:ring-primary/20 outline-none transition-all"
              required
            />
          </div>

          {/* Hora */}
          <div>
            <label className="text-[10px] font-black text-muted-foreground uppercase tracking-widest mb-1.5 block ml-1">
              <Clock size={12} className="inline mr-1 text-primary" /> Hora
            </label>
            <input
              type="time"
              value={formData.time}
              onChange={(e) => setFormData({ ...formData, time: e.target.value })}
              className="w-full bg-muted/30 border border-border/40 rounded-md px-4 py-2.5 text-xs font-bold focus:ring-2 focus:ring-primary/20 outline-none transition-all"
              required
            />
          </div>
        </div>

        {/* Tipo de Cita */}
        <div>
          <label className="text-[10px] font-black text-muted-foreground uppercase tracking-widest mb-1.5 block ml-1">
            Tipo de Servicio
          </label>
          <Select
            options={[
              { value: "Individual", label: "Sesión Individual" },
              { value: "Evaluación", label: "Evaluación Inicial" },
              { value: "Pareja", label: "Terapia de Pareja" },
            ]}
            value={formData.type}
            onChange={(e) => setFormData({ ...formData, type: e.target.value })}
          />
        </div>

        <div className="pt-4 flex justify-end gap-3 border-t border-border/40">
          <Button variant="ghost" type="button" onClick={onClose} className="rounded-md font-bold">
            Cancelar
          </Button>
          <Button type="submit" className="rounded-md font-bold gradient-primary px-8" icon={<Save size={16} />}>
            {initialData ? "Actualizar Cita" : "Agendar Cita"}
          </Button>
        </div>
      </form>
    </Modal>
  );
}
