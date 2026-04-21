import { useState } from "react";
import { Modal } from "../../ui/modal/Modal";
import { Button } from "../../ui/button/Button";
import { User, Mail, Phone, Calendar, Briefcase, Save } from "lucide-react";

interface PatientModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: any) => void;
  initialData?: any;
}

export function PatientModal({
  isOpen,
  onClose,
  onSave,
  initialData,
}: PatientModalProps) {
  const [formData, setFormData] = useState(
    initialData || {
      name: "",
      email: "",
      phone: "",
      age: "",
      occupation: "",
      status: "active",
    },
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({ ...formData, age: Number(formData.age), lastVisit: "Hoy" });
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={initialData ? "Editar Paciente" : "Registrar Nuevo Paciente"}
      size="md"
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Nombre Completo */}
        <div>
          <label className="text-[10px] font-black text-muted-foreground uppercase tracking-widest mb-1.5 block ml-1">
            <User size={12} className="inline mr-1 text-primary" /> Nombre Completo
          </label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="w-full bg-muted/30 border border-border/40 rounded-md px-4 py-2.5 text-xs font-bold focus:ring-2 focus:ring-primary/20 outline-none transition-all"
            placeholder="Ej. Juan Pérez"
            required
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Email */}
          <div>
            <label className="text-[10px] font-black text-muted-foreground uppercase tracking-widest mb-1.5 block ml-1">
              <Mail size={12} className="inline mr-1 text-primary" /> Correo Electrónico
            </label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full bg-muted/30 border border-border/40 rounded-md px-4 py-2.5 text-xs font-bold focus:ring-2 focus:ring-primary/20 outline-none transition-all"
              placeholder="juan@correo.com"
              required
            />
          </div>

          {/* Teléfono */}
          <div>
            <label className="text-[10px] font-black text-muted-foreground uppercase tracking-widest mb-1.5 block ml-1">
              <Phone size={12} className="inline mr-1 text-primary" /> Teléfono / WhatsApp
            </label>
            <input
              type="tel"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              className="w-full bg-muted/30 border border-border/40 rounded-md px-4 py-2.5 text-xs font-bold focus:ring-2 focus:ring-primary/20 outline-none transition-all"
              placeholder="+57 ..."
              required
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          {/* Edad */}
          <div>
            <label className="text-[10px] font-black text-muted-foreground uppercase tracking-widest mb-1.5 block ml-1">
              <Calendar size={12} className="inline mr-1 text-primary" /> Edad
            </label>
            <input
              type="number"
              value={formData.age}
              onChange={(e) => setFormData({ ...formData, age: e.target.value })}
              className="w-full bg-muted/30 border border-border/40 rounded-md px-4 py-2.5 text-xs font-bold focus:ring-2 focus:ring-primary/20 outline-none transition-all"
              placeholder="00"
              required
            />
          </div>

          {/* Ocupación */}
          <div>
            <label className="text-[10px] font-black text-muted-foreground uppercase tracking-widest mb-1.5 block ml-1">
              <Briefcase size={12} className="inline mr-1 text-primary" /> Ocupación
            </label>
            <input
              type="text"
              value={formData.occupation}
              onChange={(e) => setFormData({ ...formData, occupation: e.target.value })}
              className="w-full bg-muted/30 border border-border/40 rounded-md px-4 py-2.5 text-xs font-bold focus:ring-2 focus:ring-primary/20 outline-none transition-all"
              placeholder="Ej. Estudiante"
            />
          </div>
        </div>

        <div className="pt-4 flex justify-end gap-3 border-t border-border/40">
          <Button variant="ghost" type="button" onClick={onClose} className="rounded-md font-bold">
            Cancelar
          </Button>
          <Button type="submit" className="rounded-md font-bold gradient-primary px-8" icon={<Save size={16} />}>
            Guardar Paciente
          </Button>
        </div>
      </form>
    </Modal>
  );
}
