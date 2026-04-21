// Sistema de almacenamiento temporal (JSON Storage) para PsicoAgenda
// Este archivo simula una API para persistencia de datos durante la sesión

export interface IMockPatient {
  id: string;
  name: string;
  email: string;
  phone: string;
  age: number;
  lastVisit: string;
  status: "active" | "completed" | "on-hold";
  occupation?: string;
}

export interface IDoctorSchedule {
  day: string;
  start: string;
  end: string;
  enabled: boolean;
}

export interface IMockDoctor {
  id: string;
  name: string;
  specialty: string;
  email: string;
  phone: string;
  bio?: string;
  birthDate?: string;
  city?: string;
  schedule?: IDoctorSchedule[];
}

export interface IMockAppointment {
  id: string;
  patientId: string;
  doctorId: string;
  date: string;
  time: string;
  type: string;
  status: "pending" | "confirmed" | "completed" | "cancelled";
  notes?: string;
}

// DATA INICIAL
const INITIAL_PATIENTS: IMockPatient[] = [
  { id: "1", name: "Carlos Andrés Mendoza", email: "carlos.mendoza@email.com", phone: "+57 310 456 7890", age: 34, lastVisit: "12 Abr, 2026", status: "active", occupation: "Ingeniero" },
  { id: "2", name: "María Fernanda Ríos", email: "mafe.rios@email.com", phone: "+57 300 123 4567", age: 28, lastVisit: "05 Abr, 2026", status: "active", occupation: "Docente" },
];

const DEFAULT_SCHEDULE: IDoctorSchedule[] = [
  { day: "Lunes", start: "08:00", end: "17:00", enabled: true },
  { day: "Martes", start: "08:00", end: "17:00", enabled: true },
  { day: "Miércoles", start: "08:00", end: "17:00", enabled: true },
  { day: "Jueves", start: "08:00", end: "17:00", enabled: true },
  { day: "Viernes", start: "08:00", end: "17:00", enabled: true },
  { day: "Sábado", start: "09:00", end: "13:00", enabled: false },
  { day: "Domingo", start: "09:00", end: "13:00", enabled: false },
];

const INITIAL_DOCTORS: IMockDoctor[] = [
  { 
    id: "DOC_1", 
    name: "Dr. Camilo Sánchez", 
    specialty: "Psicología Clínica", 
    email: "camilo@psicoagenda.com", 
    phone: "311 000 0001",
    bio: "Especialista en terapia cognitivo-conductual con más de 10 años de experiencia.",
    birthDate: "12 Mar, 1985",
    city: "Bogotá",
    schedule: DEFAULT_SCHEDULE
  },
  { 
    id: "DOC_2", 
    name: "Dra. Elena Balvin", 
    specialty: "Terapia Cognitiva", 
    email: "elena@psicoagenda.com", 
    phone: "311 000 0002",
    bio: "Experta en manejo de ansiedad y depresión en adultos.",
    birthDate: "25 Jul, 1990",
    city: "Medellín",
    schedule: DEFAULT_SCHEDULE
  },
];

const INITIAL_APPOINTMENTS: IMockAppointment[] = [
  { id: "a1", patientId: "1", doctorId: "DOC_1", date: "2026-04-12", time: "09:00", type: "Sesión Individual", status: "completed", notes: "Paciente muestra avances en el manejo de la ansiedad social." },
  { id: "a2", patientId: "2", doctorId: "DOC_1", date: "2026-04-05", time: "10:30", type: "Evaluación Inicial", status: "completed", notes: "Se establecen objetivos terapéuticos." },
  { id: "a3", patientId: "1", doctorId: "DOC_2", date: "2026-04-15", time: "14:00", type: "Seguimiento", status: "pending" },
];

// Helper para localStorage
const storage = {
  get: (key: string) => JSON.parse(localStorage.getItem(`pa_${key}`) || "null"),
  set: (key: string, data: any) => localStorage.setItem(`pa_${key}`, JSON.stringify(data)),
};

export const mockStorage = {
  // PACIENTES
  getPatients: (): IMockPatient[] => {
    let data = storage.get("patients");
    if (!data) {
      data = INITIAL_PATIENTS;
      storage.set("patients", data);
    }
    return data;
  },
  addPatient: (patient: Omit<IMockPatient, "id">) => {
    const patients = mockStorage.getPatients();
    const newPatient = { ...patient, id: Date.now().toString() };
    storage.set("patients", [newPatient, ...patients]);
    return newPatient;
  },

  // DOCTORES
  getDoctors: (): IMockDoctor[] => {
    let data = storage.get("doctors");
    if (!data) {
      data = INITIAL_DOCTORS;
      storage.set("doctors", data);
    }
    return data;
  },
  getDoctorById: (id: string): IMockDoctor | undefined => {
    return mockStorage.getDoctors().find(d => d.id === id);
  },
  addDoctor: (doctor: Omit<IMockDoctor, "id">) => {
    const doctors = mockStorage.getDoctors();
    const newDoctor = { ...doctor, id: `DOC_${Date.now()}`, schedule: DEFAULT_SCHEDULE };
    storage.set("doctors", [newDoctor, ...doctors]);
    return newDoctor;
  },
  updateDoctorSchedule: (doctorId: string, schedule: IDoctorSchedule[]) => {
    const doctors = mockStorage.getDoctors();
    const index = doctors.findIndex(d => d.id === doctorId);
    if (index !== -1) {
      doctors[index].schedule = schedule;
      storage.set("doctors", doctors);
      return doctors[index];
    }
  },

  // CITAS
  getAppointments: (): IMockAppointment[] => {
    let data = storage.get("appointments");
    if (!data) {
      data = INITIAL_APPOINTMENTS;
      storage.set("appointments", data);
    }
    return data;
  },
  getAppointmentsByDoctor: (doctorId: string): IMockAppointment[] => {
    return mockStorage.getAppointments().filter(a => a.doctorId === doctorId);
  },
  addAppointment: (appt: Omit<IMockAppointment, "id" | "status">) => {
    const appts = mockStorage.getAppointments();
    const newAppt = { ...appt, id: Date.now().toString(), status: "pending" as const };
    storage.set("appointments", [newAppt, ...appts]);
    window.dispatchEvent(new Event("pa_storage_update")); // Notificar cambios
    return newAppt;
  },
};
