import { type ReactNode, useState, useEffect } from "react";
import { useParams, useNavigate, useOutletContext } from "react-router";
import {
  ArrowLeft,
  Phone,
  User,
  MapPin,
  Clock,
  Edit,
  MessageCircle,
  Mail,
  Calendar,
  Save,
  Check,
  X,
  Briefcase,
  History,
  Info,
  Play,
} from "lucide-react";
import { Button } from "../../../components/ui/button/Button";
import {
  TimelineHistory,
  type IHistoryItem,
} from "../../../components/shared/history/TimelineHistory";
import {
  mockStorage,
  type IMockDoctor,
  type IDoctorSchedule,
} from "../../../services/mockStorage";

export function DoctorDataPage(): ReactNode {
  const { id } = useParams();
  const navigate = useNavigate();
  const { handleStartSession } = useOutletContext<{
    handleStartSession: (id: string, name: string) => void;
  }>();
  const [activeTab, setActiveTab] = useState<
    "appointments" | "pending" | "doctor-data" | "schedule"
  >("pending");
  const [doctor, setDoctor] = useState<IMockDoctor | undefined>(undefined);
  const [schedule, setSchedule] = useState<IDoctorSchedule[]>([]);
  const [pendingAppointments, setPendingAppointments] = useState<any[]>([]);
  const [isSavingSchedule, setIsSavingSchedule] = useState(false);

  useEffect(() => {
    if (id) {
      const doc = mockStorage.getDoctorById(id);
      if (doc) {
        setDoctor(doc);
        setSchedule(doc.schedule || []);

        // Cargar citas pendientes
        const allAppts = mockStorage.getAppointmentsByDoctor(id);
        setPendingAppointments(
          allAppts.filter(
            (a) => a.status === "pending" || a.status === "confirmed",
          ),
        );
      }
    }
  }, [id]);

  if (!doctor) {
    return (
      <div className="flex items-center justify-center h-full">
        <p className="text-muted-foreground font-bold">
          Cargando datos del doctor...
        </p>
      </div>
    );
  }

  const appointments = mockStorage.getAppointmentsByDoctor(doctor.id);
  const historyItems: IHistoryItem[] = appointments.map((a) => {
    const patient = mockStorage.getPatients().find((p) => p.id === a.patientId);
    return {
      id: a.id,
      date: new Date(a.date).toLocaleDateString("es-ES", {
        day: "numeric",
        month: "short",
        year: "numeric",
      }),
      time: a.time,
      doctorName: patient?.name || "Paciente Desconocido",
      type: a.type,
      notes: a.notes,
      status: a.status === "completed" ? "completed" : "cancelled",
    };
  });

  const handleToggleDay = (index: number) => {
    const newSchedule = [...schedule];
    newSchedule[index].enabled = !newSchedule[index].enabled;
    setSchedule(newSchedule);
  };

  const handleChangeTime = (
    index: number,
    field: "start" | "end",
    value: string,
  ) => {
    const newSchedule = [...schedule];
    newSchedule[index][field] = value;
    setSchedule(newSchedule);
  };

  const handleSaveSchedule = () => {
    setIsSavingSchedule(true);
    setTimeout(() => {
      mockStorage.updateDoctorSchedule(doctor.id, schedule);
      setIsSavingSchedule(false);
    }, 800);
  };

  return (
    <div className="h-full flex flex-col overflow-hidden bg-background">
      {/* HEADER */}
      <header className="shrink-0 p-4 bg-white border-b border-border/40 shadow-sm z-20">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate(-1)}
              className="rounded-sm border border-border/40 bg-white shrink-0"
            >
              <ArrowLeft size={18} />
            </Button>
            <div className="min-w-0">
              <div className="flex items-center gap-2 mb-0.5">
                <span className="text-[10px] font-black text-primary uppercase tracking-widest bg-primary/5 px-2 py-0.5 rounded-sm">
                  Especialista
                </span>
                <span className="text-[10px] font-bold text-muted-foreground">
                  ID: {doctor.id}
                </span>
              </div>
              <h1 className="text-xl font-black text-foreground truncate">
                {doctor.name}
              </h1>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              className="rounded-sm font-bold border-primary/20 text-primary hover:bg-primary/5 h-10"
              icon={<Edit size={16} />}
            >
              Editar Perfil
            </Button>
          </div>
        </div>

        {/* NAVEGACIÓN DE PESTAÑAS */}
        <div className="flex items-center gap-1 p-1 bg-muted/40 rounded-md w-full md:w-fit mt-6 border border-border/40 overflow-x-auto no-scrollbar">
          <button
            onClick={() => setActiveTab("appointments")}
            className={`flex items-center gap-2 px-5 py-2 rounded-sm text-[11px] font-black uppercase tracking-widest transition-all whitespace-nowrap ${activeTab === "appointments" ? "bg-primary text-white shadow-md shadow-primary/20" : "text-muted-foreground hover:bg-white/60"}`}
          >
            <History size={14} /> Historial
          </button>
          <button
            onClick={() => setActiveTab("pending")}
            className={`flex items-center gap-2 px-5 py-2 rounded-sm text-[11px] font-black uppercase tracking-widest transition-all whitespace-nowrap ${activeTab === "pending" ? "bg-primary text-white shadow-md shadow-primary/20" : "text-muted-foreground hover:bg-white/60"}`}
          >
            <Calendar size={14} /> Agenda Pendiente
          </button>
          <button
            onClick={() => setActiveTab("doctor-data")}
            className={`flex items-center gap-2 px-5 py-2 rounded-sm text-[11px] font-black uppercase tracking-widest transition-all whitespace-nowrap ${activeTab === "doctor-data" ? "bg-primary text-white shadow-md shadow-primary/20" : "text-muted-foreground hover:bg-white/60"}`}
          >
            <Info size={14} /> Información Personal
          </button>
          <button
            onClick={() => setActiveTab("schedule")}
            className={`flex items-center gap-2 px-5 py-2 rounded-sm text-[11px] font-black uppercase tracking-widest transition-all whitespace-nowrap ${activeTab === "schedule" ? "bg-primary text-white shadow-md shadow-primary/20" : "text-muted-foreground hover:bg-white/60"}`}
          >
            <Clock size={14} /> Gestión de Horarios
          </button>
        </div>
      </header>

      {/* CONTENIDO */}
      <div className="flex-1 overflow-y-auto custom-scrollbar bg-muted/5">
        <div className="max-w-6xl mx-auto p-4 md:p-8">
          {/* TAB: HISTORIAL */}
          {activeTab === "appointments" && (
            <div className="animate-in fade-in slide-in-from-bottom-2 duration-500 pb-10">
              <div className="flex items-center justify-between mb-8 border-l-4 border-primary pl-4">
                <h3 className="text-base font-black text-foreground uppercase tracking-widest">
                  Citas Atendidas
                </h3>
              </div>
              {historyItems.length > 0 ? (
                <TimelineHistory items={historyItems} showPrivateNotes={true} />
              ) : (
                <div className="bg-white p-12 rounded-md border border-dashed border-border/60 text-center">
                  <div className="w-16 h-16 bg-muted rounded-md flex items-center justify-center mx-auto mb-4">
                    <History size={32} className="text-muted-foreground/40" />
                  </div>
                  <h4 className="text-sm font-black text-foreground uppercase">
                    Sin historial de citas
                  </h4>
                  <p className="text-xs font-bold text-muted-foreground mt-1">
                    Este especialista aún no tiene citas registradas.
                  </p>
                </div>
              )}
            </div>
          )}

          {/* TAB: AGENDA PENDIENTE */}
          {activeTab === "pending" && (
            <div className="animate-in fade-in slide-in-from-bottom-2 duration-500 pb-10 space-y-6">
              <div className="flex items-center justify-between mb-8 border-l-4 border-primary pl-4">
                <h3 className="text-base font-black text-foreground uppercase tracking-widest">
                  Citas Programadas (Pendientes)
                </h3>
              </div>

              {pendingAppointments.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {pendingAppointments.map((appt) => {
                    const patient = mockStorage
                      .getPatients()
                      .find((p) => p.id === appt.patientId);
                    return (
                      <div
                        key={appt.id}
                        className="bg-white p-5 rounded-md border border-border/40 shadow-sm flex items-center gap-5 group hover:border-primary/20 transition-all"
                      >
                        <div className="w-14 h-14 rounded-sm bg-primary/5 flex flex-col items-center justify-center border border-primary/10 shrink-0">
                          <span className="text-[10px] font-black text-primary uppercase">
                            {new Date(appt.date).toLocaleDateString("es-ES", {
                              month: "short",
                            })}
                          </span>
                          <span className="text-xl font-black text-primary leading-none">
                            {new Date(appt.date).getDate()}
                          </span>
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <span
                              className={`px-2 py-0.5 text-[8px] font-black uppercase rounded-sm border ${appt.status === "confirmed" ? "bg-blue-50 text-blue-600 border-blue-100" : "bg-amber-50 text-amber-600 border-amber-100"}`}
                            >
                              {appt.status === "confirmed"
                                ? "Confirmada"
                                : "Pendiente"}
                            </span>
                            <span className="text-[10px] font-bold text-muted-foreground">
                              {appt.time}
                            </span>
                          </div>
                          <h4 className="text-sm font-black text-foreground truncate">
                            {patient?.name}
                          </h4>
                          <p className="text-[10px] font-bold text-muted-foreground flex items-center gap-1.5 mt-1 uppercase tracking-wider">
                            {appt.type}
                          </p>
                        </div>
                        <div className="flex flex-col gap-2">
                          <Button
                            onClick={() =>
                              handleStartSession(
                                patient?.id || "",
                                patient?.name || "",
                              )
                            }
                            className="rounded-sm font-bold text-[10px] uppercase h-8 px-3 gradient-primary shadow-md"
                            icon={<Play size={12} />}
                          >
                            Atender Cita
                          </Button>
                          <div className="flex gap-2">
                            <Button
                              variant="ghost"
                              size="sm"
                              className="w-8 h-8 p-0 rounded-sm"
                              onClick={() =>
                                navigate(`/admin/patients/${patient?.id}/data`)
                              }
                            >
                              <User size={14} />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="w-8 h-8 p-0 rounded-sm"
                            >
                              <Edit size={14} />
                            </Button>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="bg-white p-12 rounded-md border border-dashed border-border/60 text-center">
                  <Calendar
                    size={40}
                    className="mx-auto text-muted-foreground/20 mb-4"
                  />
                  <h4 className="text-sm font-black text-foreground uppercase">
                    Agenda despejada
                  </h4>
                  <p className="text-xs font-bold text-muted-foreground mt-1">
                    No hay citas pendientes por atender para este especialista.
                  </p>
                </div>
              )}
            </div>
          )}

          {/* TAB: DATOS PERSONALES */}
          {activeTab === "doctor-data" && (
            <div className="animate-in fade-in slide-in-from-bottom-2 duration-500 space-y-8 pb-10">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Perfil Principal */}
                <div className="md:col-span-2 space-y-6">
                  <section className="bg-white p-6 rounded-md border border-border/40 shadow-sm space-y-6">
                    <div className="flex items-center gap-4 border-b border-border/20 pb-4">
                      <div className="w-20 h-20 rounded-md bg-primary/10 flex items-center justify-center text-primary">
                        <User size={40} />
                      </div>
                      <div>
                        <h2 className="text-xl font-black text-foreground">
                          {doctor.name}
                        </h2>
                        <p className="text-sm font-bold text-primary">
                          {doctor.specialty}
                        </p>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <h4 className="text-[10px] font-black text-muted-foreground uppercase tracking-widest mb-2 flex items-center gap-2">
                          <Briefcase size={12} /> Biografía Profesional
                        </h4>
                        <p className="text-xs font-medium text-foreground leading-relaxed">
                          {doctor.bio || "No hay biografía disponible."}
                        </p>
                      </div>
                    </div>
                  </section>

                  <section className="bg-white p-6 rounded-md border border-border/40 shadow-sm">
                    <h4 className="text-[10px] font-black text-muted-foreground uppercase tracking-widest mb-6 border-b border-border/20 pb-3">
                      Detalles Adicionales
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div className="space-y-4">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-sm bg-muted flex items-center justify-center text-muted-foreground">
                            <Calendar size={16} />
                          </div>
                          <div>
                            <p className="text-[9px] font-black text-muted-foreground uppercase leading-none">
                              Fecha de Nacimiento
                            </p>
                            <p className="text-xs font-bold text-foreground mt-1">
                              {doctor.birthDate || "No especificada"}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-sm bg-muted flex items-center justify-center text-muted-foreground">
                            <MapPin size={16} />
                          </div>
                          <div>
                            <p className="text-[9px] font-black text-muted-foreground uppercase leading-none">
                              Ciudad / Localidad
                            </p>
                            <p className="text-xs font-bold text-foreground mt-1">
                              {doctor.city || "No especificada"}
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="space-y-4">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-sm bg-muted flex items-center justify-center text-muted-foreground">
                            <Mail size={16} />
                          </div>
                          <div>
                            <p className="text-[9px] font-black text-muted-foreground uppercase leading-none">
                              Correo Electrónico
                            </p>
                            <p className="text-xs font-bold text-foreground mt-1">
                              {doctor.email}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-sm bg-muted flex items-center justify-center text-muted-foreground">
                            <Phone size={16} />
                          </div>
                          <div>
                            <p className="text-[9px] font-black text-muted-foreground uppercase leading-none">
                              Teléfono de Contacto
                            </p>
                            <p className="text-xs font-bold text-foreground mt-1">
                              {doctor.phone}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </section>
                </div>

                {/* Acciones Rápidas */}
                <div className="space-y-6">
                  <div className="bg-white p-6 rounded-md border border-border/40 shadow-sm space-y-4">
                    <h4 className="text-[10px] font-black text-muted-foreground uppercase tracking-widest border-b border-border/20 pb-3">
                      Contacto Directo
                    </h4>
                    <Button
                      className="w-full rounded-sm font-bold bg-[#25D366] text-white hover:bg-[#128C7E] border-none"
                      icon={<MessageCircle size={16} />}
                    >
                      WhatsApp
                    </Button>
                    <Button
                      variant="outline"
                      className="w-full rounded-sm font-bold"
                      icon={<Mail size={16} />}
                    >
                      Enviar Email
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB: HORARIOS */}
          {activeTab === "schedule" && (
            <div className="animate-in fade-in slide-in-from-bottom-2 duration-500 pb-10">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8 border-l-4 border-primary pl-4">
                <div>
                  <h3 className="text-base font-black text-foreground uppercase tracking-widest">
                    Disponibilidad en el Consultorio
                  </h3>
                  <p className="text-xs font-bold text-muted-foreground mt-1">
                    Define los días y rangos horarios en los que este doctor
                    atiende pacientes.
                  </p>
                </div>
                <Button
                  onClick={handleSaveSchedule}
                  disabled={isSavingSchedule}
                  className="rounded-sm font-bold gradient-primary shadow-lg shadow-primary/20 px-8"
                  icon={
                    isSavingSchedule ? (
                      <Clock className="animate-spin" size={16} />
                    ) : (
                      <Save size={16} />
                    )
                  }
                >
                  {isSavingSchedule ? "Guardando..." : "Guardar Horarios"}
                </Button>
              </div>

              <div className="bg-white rounded-md border border-border/40 shadow-sm overflow-hidden">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="bg-muted/30 border-b border-border/40">
                      <th className="px-6 py-4 text-left text-[10px] font-black text-muted-foreground uppercase tracking-widest">
                        Día
                      </th>
                      <th className="px-6 py-4 text-left text-[10px] font-black text-muted-foreground uppercase tracking-widest">
                        Estado
                      </th>
                      <th className="px-6 py-4 text-left text-[10px] font-black text-muted-foreground uppercase tracking-widest">
                        Hora Inicio
                      </th>
                      <th className="px-6 py-4 text-left text-[10px] font-black text-muted-foreground uppercase tracking-widest">
                        Hora Fin
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border/20">
                    {schedule.map((item, index) => (
                      <tr
                        key={item.day}
                        className={`transition-colors ${item.enabled ? "bg-transparent" : "bg-muted/10"}`}
                      >
                        <td className="px-6 py-4">
                          <span
                            className={`text-xs font-black uppercase tracking-wider ${item.enabled ? "text-foreground" : "text-muted-foreground"}`}
                          >
                            {item.day}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <button
                            onClick={() => handleToggleDay(index)}
                            className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-[10px] font-black uppercase transition-all ${
                              item.enabled
                                ? "bg-emerald-50 text-emerald-600 border border-emerald-100"
                                : "bg-muted text-muted-foreground border border-border/40"
                            }`}
                          >
                            {item.enabled ? (
                              <Check size={12} />
                            ) : (
                              <X size={12} />
                            )}
                            {item.enabled ? "Disponible" : "No Laboral"}
                          </button>
                        </td>
                        <td className="px-6 py-4">
                          <input
                            type="time"
                            value={item.start}
                            disabled={!item.enabled}
                            onChange={(e) =>
                              handleChangeTime(index, "start", e.target.value)
                            }
                            className="bg-muted/30 border border-border/40 rounded-sm px-3 py-1.5 text-xs font-bold focus:ring-2 focus:ring-primary/20 outline-none disabled:opacity-30"
                          />
                        </td>
                        <td className="px-6 py-4">
                          <input
                            type="time"
                            value={item.end}
                            disabled={!item.enabled}
                            onChange={(e) =>
                              handleChangeTime(index, "end", e.target.value)
                            }
                            className="bg-muted/30 border border-border/40 rounded-sm px-3 py-1.5 text-xs font-bold focus:ring-2 focus:ring-primary/20 outline-none disabled:opacity-30"
                          />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
