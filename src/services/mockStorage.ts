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

export interface IMockDoctor {
  id: string;
  name: string;
  specialty: string;
  email: string;
  phone: string;
}

export interface IMockAppointment {
  id: string;
  patientId: string;
  doctorId: string;
  date: string;
  time: string;
  type: string;
  status: "pending" | "confirmed" | "completed" | "cancelled";
}

// DATA INICIAL
const INITIAL_PATIENTS: IMockPatient[] = [
  { id: "1", name: "Carlos Andrés Mendoza", email: "carlos.mendoza@email.com", phone: "+57 310 456 7890", age: 34, lastVisit: "12 Abr, 2026", status: "active", occupation: "Ingeniero" },
  { id: "2", name: "María Fernanda Ríos", email: "mafe.rios@email.com", phone: "+57 300 123 4567", age: 28, lastVisit: "05 Abr, 2026", status: "active", occupation: "Docente" },
];

const INITIAL_DOCTORS: IMockDoctor[] = [
  { id: "DOC_1", name: "Dr. Camilo Sánchez", specialty: "Psicología Clínica", email: "camilo@psicoagenda.com", phone: "311 000 0001" },
  { id: "DOC_2", name: "Dra. Elena Balvin", specialty: "Terapia Cognitiva", email: "elena@psicoagenda.com", phone: "311 000 0002" },
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
  addDoctor: (doctor: Omit<IMockDoctor, "id">) => {
    const doctors = mockStorage.getDoctors();
    const newDoctor = { ...doctor, id: `DOC_${Date.now()}` };
    storage.set("doctors", [newDoctor, ...doctors]);
    return newDoctor;
  },

  // CITAS
  getAppointments: (): IMockAppointment[] => {
    return storage.get("appointments") || [];
  },
  addAppointment: (appt: Omit<IMockAppointment, "id" | "status">) => {
    const appts = mockStorage.getAppointments();
    const newAppt = { ...appt, id: Date.now().toString(), status: "pending" as const };
    storage.set("appointments", [newAppt, ...appts]);
    window.dispatchEvent(new Event("pa_storage_update")); // Notificar cambios
    return newAppt;
  },
};
