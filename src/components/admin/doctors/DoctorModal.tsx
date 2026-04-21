import { useState } from "react";
import { Modal } from "../../ui/modal/Modal";
import { Button } from "../../ui/button/Button";
import { Stethoscope, Mail, Phone, Save } from "lucide-react";

interface DoctorModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: any) => void;
  initialData?: any;
}

export function DoctorModal({
  isOpen,
  onClose,
  onSave,
  initialData,
}: DoctorModalProps) {
  const [formData, setFormData] = useState(
    initialData || {
      name: "",
      specialty: "",
      email: "",
      phone: "",
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
      title={initialData ? "Editar Especialista" : "Registrar Nuevo Especialista"}
      size="md"
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Nombre Completo */}
        <div>
          <label className="text-[10px] font-black text-muted-foreground uppercase tracking-widest mb-1.5 block ml-1">
            Nombre del Especialista
          </label>
          <div className="relative">
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full bg-muted/30 border border-border/40 rounded-md px-4 py-2.5 text-xs font-bold focus:ring-2 focus:ring-primary/20 outline-none transition-all pl-10"
              placeholder="Ej. Dr. Camilo Sánchez"
              required
            />
            <Stethoscope className="absolute left-3 top-1/2 -translate-y-1/2 text-primary/40" size={16} />
          </div>
        </div>

        {/* Especialidad */}
        <div>
          <label className="text-[10px] font-black text-muted-foreground uppercase tracking-widest mb-1.5 block ml-1">
            Especialidad
          </label>
          <input
            type="text"
            value={formData.specialty}
            onChange={(e) => setFormData({ ...formData, specialty: e.target.value })}
            className="w-full bg-muted/30 border border-border/40 rounded-md px-4 py-2.5 text-xs font-bold focus:ring-2 focus:ring-primary/20 outline-none transition-all"
            placeholder="Ej. Psicología Clínica"
            required
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Email */}
          <div>
            <label className="text-[10px] font-black text-muted-foreground uppercase tracking-widest mb-1.5 block ml-1">
              Correo Institucional
            </label>
            <div className="relative">
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full bg-muted/30 border border-border/40 rounded-md px-4 py-2.5 text-xs font-bold focus:ring-2 focus:ring-primary/20 outline-none transition-all pl-10"
                placeholder="doctor@psicoagenda.com"
                required
              />
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-primary/40" size={16} />
            </div>
          </div>

          {/* Teléfono */}
          <div>
            <label className="text-[10px] font-black text-muted-foreground uppercase tracking-widest mb-1.5 block ml-1">
              Teléfono / WhatsApp
            </label>
            <div className="relative">
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full bg-muted/30 border border-border/40 rounded-md px-4 py-2.5 text-xs font-bold focus:ring-2 focus:ring-primary/20 outline-none transition-all pl-10"
                placeholder="311 ..."
                required
              />
              <Phone className="absolute left-3 top-1/2 -translate-y-1/2 text-primary/40" size={16} />
            </div>
          </div>
        </div>

        <div className="pt-4 flex justify-end gap-3 border-t border-border/40">
          <Button variant="ghost" type="button" onClick={onClose} className="rounded-md font-bold">
            Cancelar
          </Button>
          <Button type="submit" className="rounded-md font-bold gradient-primary px-8" icon={<Save size={16} />}>
            {initialData ? "Actualizar" : "Guardar Especialista"}
          </Button>
        </div>
      </form>
    </Modal>
  );
}
