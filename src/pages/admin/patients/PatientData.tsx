import { type ReactNode, useState } from "react";
import { useParams, useNavigate, useOutletContext } from "react-router";
import {
  ArrowLeft,
  Phone,
  Play,
  Activity,
  Plus,
  Save,
  X,
  ClipboardList,
  Stethoscope,
  Heart,
  ShieldAlert,
  Archive,
  User,
  MapPin,
  Clock,
  Edit,
  MessageCircle,
  Droplets,
  Zap,
  Coffee,
  Moon,
  Pill,
  BrainCircuit,
} from "lucide-react";
import { Button } from "../../../components/ui/button/Button";
import {
  TimelineHistory,
  type IHistoryItem,
} from "../../../components/shared/history/TimelineHistory";

// Mock de historial
const MOCK_HISTORY: IHistoryItem[] = [
  {
    id: "h1",
    date: "12 Abr, 2026",
    time: "09:00 AM",
    doctorName: "Dr. Camilo Sánchez",
    type: "Sesión Individual",
    notes:
      "Paciente muestra avances en el manejo de la ansiedad social. Se recomienda continuar con técnicas de exposición gradual.",
    tasks: [
      "Leer capítulo 2 del libro de autoayuda",
      "Realizar 5 min de meditación diaria",
    ],
    status: "completed",
  },
  {
    id: "h2",
    date: "05 Abr, 2026",
    time: "10:30 AM",
    doctorName: "Dr. Camilo Sánchez",
    type: "Evaluación Inicial",
    notes:
      "Se identifican patrones de pensamiento recurrente. Se establece plan de trabajo para las próximas 8 semanas.",
    tasks: ["Completar cuestionario de hábitos"],
    status: "completed",
  },
];

export function PatientDataPage(): ReactNode {
  const { id } = useParams();
  const navigate = useNavigate();
  const { handleStartSession } = useOutletContext<{
    handleStartSession: (id: string, name: string) => void;
  }>();

  const [activeTab, setActiveTab] = useState<
    "sessions" | "base-history" | "patient-data"
  >("sessions");
  const [isAddingNote, setIsAddingNote] = useState(false);
  const [history, setHistory] = useState<IHistoryItem[]>(MOCK_HISTORY);
  const [newNote, setNewNote] = useState({
    type: "Nota de Evolución",
    notes: "",
    tasks: "",
  });

  const patient = {
    id: id || "1",
    name: "Carlos Andrés Mendoza",
    age: 34,
    phone: "+57 310 456 7890",
    email: "carlos.mendoza@email.com",
    address: "Calle 100 #15-20, Bogotá",
    emergencyContact: "Lucía Mendoza (Hermana) - 315 222 1100",
    lastVisit: "12 Abr, 2026",
    status: "active",
    occupation: "Ingeniero de Sistemas",
    bloodType: "O+",
    birthDate: "15 May, 1992",
    city: "Bogotá, Colombia",
  };

  const handleSaveNote = () => {
    if (!newNote.notes.trim()) return;
    const newItem: IHistoryItem = {
      id: Date.now().toString(),
      date: new Date().toLocaleDateString("es-ES", {
        day: "numeric",
        month: "short",
        year: "numeric",
      }),
      time: new Date().toLocaleTimeString("es-ES", {
        hour: "2-digit",
        minute: "2-digit",
      }),
      doctorName: "Dr. Camilo Sánchez",
      type: newNote.type,
      notes: newNote.notes,
      tasks: newNote.tasks
        ? newNote.tasks.split("\n").filter((t) => t.trim())
        : [],
      status: "completed",
    };
    setHistory([newItem, ...history]);
    setIsAddingNote(false);
    setNewNote({ type: "Nota de Evolución", notes: "", tasks: "" });
  };

  return (
    <div className="h-full flex flex-col overflow-hidden bg-background">
      {/* 1. HEADER INTEGRADO: IDENTIFICACIÓN Y ACCIONES */}
      <header className="shrink-0 p-4 bg-white border-b border-border/40 shadow-sm z-20">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate(-1)}
              className="rounded-md border border-border/40 bg-white shrink-0"
            >
              <ArrowLeft size={18} />
            </Button>
            <div className="min-w-0">
              <div className="flex items-center gap-2 mb-0.5">
                <span className="text-[10px] font-black text-primary uppercase tracking-widest bg-primary/5 px-2 py-0.5 rounded">
                  Paciente
                </span>
                <span className="text-[10px] font-bold text-muted-foreground">
                  ID: PA-2026-{id}
                </span>
              </div>
              <h1 className="text-xl font-black text-foreground truncate">
                {patient.name}
              </h1>
            </div>
          </div>

          <div className="flex items-center gap-2 overflow-x-auto pb-1 md:pb-0 no-scrollbar">
            <Button
              variant="outline"
              onClick={() => setIsAddingNote(true)}
              className="rounded-md font-bold border-primary/20 text-primary hover:bg-primary/5 h-10 whitespace-nowrap"
              icon={<Plus size={16} />}
            >
              Nueva Evolución
            </Button>
            <Button
              onClick={() => handleStartSession(patient.id, patient.name)}
              className="rounded-md font-bold gradient-primary shadow-lg shadow-primary/20 h-10 px-6 whitespace-nowrap"
              icon={<Play size={16} />}
            >
              Iniciar Sesión
            </Button>
          </div>
        </div>

        {/* NAVEGACIÓN DE PESTAÑAS (DEBAJO DEL NOMBRE) */}
        <div className="flex items-center gap-1 p-1 bg-muted/40 rounded-lg w-full md:w-fit mt-6 border border-border/40 overflow-x-auto no-scrollbar">
          <button
            onClick={() => setActiveTab("sessions")}
            className={`flex items-center gap-2 px-5 py-2 rounded-md text-[11px] font-black uppercase tracking-widest transition-all whitespace-nowrap ${activeTab === "sessions" ? "bg-primary text-white shadow-md shadow-primary/20" : "text-muted-foreground hover:bg-white/60"}`}
          >
            <Clock size={14} /> Sesiones y Citas
          </button>
          <button
            onClick={() => setActiveTab("base-history")}
            className={`flex items-center gap-2 px-5 py-2 rounded-md text-[11px] font-black uppercase tracking-widest transition-all whitespace-nowrap ${activeTab === "base-history" ? "bg-primary text-white shadow-md shadow-primary/20" : "text-muted-foreground hover:bg-white/60"}`}
          >
            <ClipboardList size={14} /> Historia Base
          </button>
          <button
            onClick={() => setActiveTab("patient-data")}
            className={`flex items-center gap-2 px-5 py-2 rounded-md text-[11px] font-black uppercase tracking-widest transition-all whitespace-nowrap ${activeTab === "patient-data" ? "bg-primary text-white shadow-md shadow-primary/20" : "text-muted-foreground hover:bg-white/60"}`}
          >
            <User size={14} /> Datos del Paciente
          </button>
        </div>
      </header>

      {/* 2. ÁREA DE CONTENIDO (SCROLL ÚNICO) */}
      <div className="flex-1 overflow-y-auto custom-scrollbar bg-muted/5">
        <div className="max-w-6xl mx-auto p-4 md:p-8">
          {/* CONTENIDO 1: SESIONES */}
          {activeTab === "sessions" && (
            <div className="animate-in fade-in slide-in-from-bottom-2 duration-500 pb-10">
              {isAddingNote && (
                <div className="mb-8 p-6 bg-white rounded-lg border-2 border-primary/20 shadow-xl animate-in zoom-in-95">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-sm font-black text-primary uppercase tracking-widest flex items-center gap-2">
                      <Plus size={18} /> Nueva Evolución Clínica
                    </h3>
                    <button
                      onClick={() => setIsAddingNote(false)}
                      className="p-2 hover:bg-muted rounded-md transition-all"
                    >
                      <X size={20} className="text-muted-foreground" />
                    </button>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div>
                        <label className="text-[10px] font-black text-muted-foreground uppercase mb-1.5 block ml-1">
                          Tipo de Entrada
                        </label>
                        <select
                          value={newNote.type}
                          onChange={(e) =>
                            setNewNote({ ...newNote, type: e.target.value })
                          }
                          className="w-full bg-muted/30 border border-border/40 rounded-md px-4 py-3 text-xs font-bold focus:ring-2 focus:ring-primary/20 outline-none"
                        >
                          <option>Nota de Evolución</option>
                          <option>Evaluación Clínica</option>
                          <option>Ajuste de Tratamiento</option>
                        </select>
                      </div>
                      <div>
                        <label className="text-[10px] font-black text-muted-foreground uppercase mb-1.5 block ml-1">
                          Observaciones
                        </label>
                        <textarea
                          value={newNote.notes}
                          onChange={(e) =>
                            setNewNote({ ...newNote, notes: e.target.value })
                          }
                          placeholder="Escribe aquí los detalles clínicos..."
                          className="w-full h-32 bg-muted/30 border border-border/40 rounded-md px-4 py-3 text-xs font-bold focus:ring-2 focus:ring-primary/20 outline-none resize-none"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="text-[10px] font-black text-muted-foreground uppercase mb-1.5 block ml-1">
                        Tareas (Una por línea)
                      </label>
                      <textarea
                        value={newNote.tasks}
                        onChange={(e) =>
                          setNewNote({ ...newNote, tasks: e.target.value })
                        }
                        placeholder="Ej: Realizar ejercicio de respiración..."
                        className="w-full h-44 bg-muted/30 border border-border/40 rounded-md px-4 py-3 text-xs font-bold focus:ring-2 focus:ring-primary/20 outline-none resize-none"
                      />
                    </div>
                  </div>
                  <div className="flex justify-end gap-3 mt-6 pt-6 border-t border-border/40">
                    <Button
                      variant="ghost"
                      onClick={() => setIsAddingNote(false)}
                      className="rounded-md font-bold"
                    >
                      Cancelar
                    </Button>
                    <Button
                      onClick={handleSaveNote}
                      className="rounded-md font-bold gradient-primary px-8"
                      icon={<Save size={16} />}
                    >
                      Guardar Entrada
                    </Button>
                  </div>
                </div>
              )}
              <div className="flex items-center justify-between mb-8 border-l-4 border-primary pl-4">
                <h3 className="text-base font-black text-foreground uppercase tracking-widest">
                  Línea de Tiempo de Sesiones
                </h3>
              </div>
              <TimelineHistory items={history} showPrivateNotes={true} />
            </div>
          )}

          {/* CONTENIDO 2: HISTORIA BASE (EXPANDIDA) */}
          {activeTab === "base-history" && (
            <div className="animate-in fade-in slide-in-from-bottom-2 duration-500 space-y-8 pb-10">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4 border-l-4 border-primary pl-4">
                <h3 className="text-base font-black text-foreground uppercase tracking-widest flex items-center gap-2">
                  <Archive size={20} className="text-primary" /> Expediente de
                  Antecedentes y Base
                </h3>
                <Button
                  variant="outline"
                  size="sm"
                  className="rounded-md font-bold border-border/60 bg-white"
                >
                  Actualizar Expediente
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Antecedentes Clínicos */}
                <section className="bg-white p-6 rounded-lg border border-border/40 shadow-sm space-y-4">
                  <h4 className="flex items-center gap-2 text-[10px] font-black text-muted-foreground uppercase tracking-widest border-b border-border/20 pb-3">
                    <Stethoscope size={14} className="text-primary" /> Clínicos
                    / Médicos
                  </h4>
                  <div className="space-y-4">
                    <div>
                      <p className="text-[9px] font-black text-muted-foreground uppercase mb-1">
                        Motivo Consulta Inicial
                      </p>
                      <p className="text-xs font-bold text-foreground">
                        Sintomatología ansiosa persistente con ataques de pánico
                        ocasionales.
                      </p>
                    </div>
                    <div>
                      <p className="text-[9px] font-black text-muted-foreground uppercase mb-1">
                        Medicamentos Actuales
                      </p>
                      <div className="flex items-center gap-2 text-xs font-bold text-foreground">
                        <Pill size={12} className="text-primary" /> Ninguno
                        reportado
                      </div>
                    </div>
                    <div>
                      <p className="text-[9px] font-black text-destructive uppercase mb-1">
                        Alergias Conocidas
                      </p>
                      <p className="text-xs font-black text-destructive">
                        Penicilina y derivados.
                      </p>
                    </div>
                  </div>
                </section>

                {/* Evaluación Inicial Mental */}
                <section className="bg-white p-6 rounded-lg border border-border/40 shadow-sm space-y-4">
                  <h4 className="flex items-center gap-2 text-[10px] font-black text-muted-foreground uppercase tracking-widest border-b border-border/20 pb-3">
                    <BrainCircuit size={14} className="text-primary" /> Estado
                    Mental Base
                  </h4>
                  <div className="space-y-4">
                    <div>
                      <p className="text-[9px] font-black text-muted-foreground uppercase mb-1">
                        Orientación
                      </p>
                      <p className="text-xs font-bold text-foreground">
                        Auto y alopsíquicamente orientado.
                      </p>
                    </div>
                    <div>
                      <p className="text-[9px] font-black text-muted-foreground uppercase mb-1">
                        Afecto
                      </p>
                      <p className="text-xs font-bold text-foreground">
                        Eutímico con tendencia a la ansiedad.
                      </p>
                    </div>
                    <div>
                      <p className="text-[9px] font-black text-muted-foreground uppercase mb-1">
                        Pensamiento
                      </p>
                      <p className="text-xs font-bold text-foreground">
                        Lógico, coherente, sin ideas delirantes.
                      </p>
                    </div>
                  </div>
                </section>

                {/* Hábitos de Vida */}
                <section className="bg-white p-6 rounded-lg border border-border/40 shadow-sm space-y-4">
                  <h4 className="flex items-center gap-2 text-[10px] font-black text-muted-foreground uppercase tracking-widest border-b border-border/20 pb-3">
                    <Zap size={14} className="text-primary" /> Estilo de Vida
                  </h4>
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <Moon size={16} className="text-primary/40" />
                      <div>
                        <p className="text-[9px] font-black text-muted-foreground uppercase leading-none">
                          Sueño
                        </p>
                        <p className="text-xs font-bold text-foreground">
                          6-7 horas, reparador.
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Coffee size={16} className="text-primary/40" />
                      <div>
                        <p className="text-[9px] font-black text-muted-foreground uppercase leading-none">
                          Hábitos
                        </p>
                        <p className="text-xs font-bold text-foreground">
                          Fumador social, café (2/día).
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Activity size={16} className="text-primary/40" />
                      <div>
                        <p className="text-[9px] font-black text-muted-foreground uppercase leading-none">
                          Ejercicio
                        </p>
                        <p className="text-xs font-bold text-foreground">
                          Frecuencia baja (1 vez/semana).
                        </p>
                      </div>
                    </div>
                  </div>
                </section>

                {/* Entorno Social y Familiar */}
                <section className="bg-white p-6 rounded-lg border border-border/40 shadow-sm space-y-4 lg:col-span-2">
                  <h4 className="flex items-center gap-2 text-[10px] font-black text-muted-foreground uppercase tracking-widest border-b border-border/20 pb-3">
                    <Heart size={14} className="text-primary" /> Red de Apoyo y
                    Familia
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <p className="text-[9px] font-black text-muted-foreground uppercase mb-2">
                        Composición Familiar
                      </p>
                      <p className="text-xs font-medium text-foreground leading-relaxed">
                        Núcleo primario estable. Padre con antecedentes de TDM.
                        Relación cercana con su hermana (contacto de
                        emergencia).
                      </p>
                    </div>
                    <div>
                      <p className="text-[9px] font-black text-muted-foreground uppercase mb-2">
                        Dinámica Social
                      </p>
                      <p className="text-xs font-medium text-foreground leading-relaxed">
                        Laboralmente exitoso pero bajo alta presión. Círculo
                        social reducido pero de alta calidad.
                      </p>
                    </div>
                  </div>
                </section>

                {/* Alertas Críticas */}
                <section className="bg-destructive/5 p-6 rounded-lg border border-dashed border-destructive/20 lg:col-span-1 flex flex-col justify-center">
                  <div className="flex items-center gap-4">
                    <ShieldAlert
                      size={32}
                      className="text-destructive shrink-0"
                    />
                    <div>
                      <h4 className="text-[10px] font-black text-destructive uppercase tracking-widest mb-1">
                        Riesgos / Alertas
                      </h4>
                      <p className="text-xs font-bold text-foreground">
                        Sin reporte de ideación suicida. Alergia severa a
                        penicilina confirmada.
                      </p>
                    </div>
                  </div>
                </section>
              </div>
            </div>
          )}

          {/* CONTENIDO 3: DATOS COMPLETOS DEL PACIENTE */}
          {activeTab === "patient-data" && (
            <div className="animate-in fade-in slide-in-from-bottom-2 duration-500 space-y-8 pb-10">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-l-4 border-primary pl-4">
                <h3 className="text-base font-black text-foreground uppercase tracking-widest flex items-center gap-2">
                  <User size={20} className="text-primary" /> Perfil y Contacto
                  Detallado
                </h3>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="rounded-md font-bold h-10 border-border/60 bg-white"
                  >
                    <Edit size={14} className="mr-2" /> Editar Perfil
                  </Button>
                  <Button className="rounded-md font-bold h-10 bg-[#25D366] text-white hover:bg-[#128C7E] border-none">
                    <MessageCircle size={14} className="mr-2" /> WhatsApp
                  </Button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Identidad */}
                <div className="bg-white p-6 rounded-lg border border-border/40 space-y-4">
                  <h4 className="text-[10px] font-black text-muted-foreground uppercase tracking-widest flex items-center gap-2 border-b border-border/20 pb-3">
                    <User size={14} /> Identidad
                  </h4>
                  <div className="space-y-4">
                    <div>
                      <p className="text-[9px] font-black text-muted-foreground uppercase mb-1">
                        Nombre Completo
                      </p>
                      <p className="text-xs font-black text-foreground">
                        {patient.name}
                      </p>
                    </div>
                    <div>
                      <p className="text-[9px] font-black text-muted-foreground uppercase mb-1">
                        Nacimiento
                      </p>
                      <p className="text-xs font-bold text-foreground">
                        {patient.birthDate} ({patient.age} años)
                      </p>
                    </div>
                    <div>
                      <p className="text-[9px] font-black text-muted-foreground uppercase mb-1">
                        Ocupación
                      </p>
                      <p className="text-xs font-bold text-foreground">
                        {patient.occupation}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Comunicación */}
                <div className="bg-white p-6 rounded-lg border border-border/40 space-y-4">
                  <h4 className="text-[10px] font-black text-muted-foreground uppercase tracking-widest flex items-center gap-2 border-b border-border/20 pb-3">
                    <Phone size={14} /> Comunicación
                  </h4>
                  <div className="space-y-4">
                    <div>
                      <p className="text-[9px] font-black text-muted-foreground uppercase mb-1">
                        WhatsApp
                      </p>
                      <p className="text-xs font-bold text-foreground">
                        {patient.phone}
                      </p>
                    </div>
                    <div>
                      <p className="text-[9px] font-black text-muted-foreground uppercase mb-1">
                        Email
                      </p>
                      <p className="text-xs font-bold text-foreground">
                        {patient.email}
                      </p>
                    </div>
                    <div>
                      <p className="text-[9px] font-black text-muted-foreground uppercase mb-1">
                        Localidad
                      </p>
                      <p className="text-xs font-bold text-foreground">
                        {patient.city}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Información General */}
                <div className="bg-white p-6 rounded-lg border border-border/40 space-y-4">
                  <h4 className="text-[10px] font-black text-muted-foreground uppercase tracking-widest flex items-center gap-2 border-b border-border/20 pb-3">
                    <Droplets size={14} /> Otros Datos
                  </h4>
                  <div className="space-y-4">
                    <div>
                      <p className="text-[9px] font-black text-muted-foreground uppercase mb-1">
                        Grupo Sanguíneo
                      </p>
                      <span className="px-2 py-0.5 bg-primary/10 text-primary text-[10px] font-black rounded-md">
                        {patient.bloodType}
                      </span>
                    </div>
                    <div>
                      <p className="text-[9px] font-black text-muted-foreground uppercase mb-1">
                        Emergencia
                      </p>
                      <p className="text-xs font-bold text-foreground">
                        {patient.emergencyContact}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Dirección Completa */}
              <div className="bg-white p-6 rounded-lg border border-border/40 flex items-center gap-4">
                <div className="w-12 h-12 rounded-md bg-muted flex items-center justify-center text-primary shadow-inner">
                  <MapPin size={24} />
                </div>
                <div>
                  <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest mb-1">
                    Dirección de Residencia
                  </p>
                  <p className="text-xs font-black text-foreground">
                    {patient.address}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
