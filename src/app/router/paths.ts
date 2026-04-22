export const PATHS = {
  HOME: "/",
  LOGIN: "/login",
  REGISTER: "/register",
  
  // PORTAL ADMINISTRATIVO
  ADMIN: {
    ROOT: "/admin",
    DASHBOARD: "/admin/dashboard",
    DOCTORS: "/admin/doctors",
    DOCTOR_DATA: "/admin/doctors/:id/data",
    PATIENTS: "/admin/patients",
    PATIENT_DATA: "/admin/patients/:id/data",
    APPOINTMENTS: "/admin/appointments",
    CALENDAR: "/admin/calendar",
  },

  // PORTAL DOCTOR
  DOCTOR: {
    ROOT: "/doctor",
    DASHBOARD: "/doctor/dashboard",
    MY_CALENDAR: "/doctor/calendar",
    MY_PATIENTS: "/doctor/patients",
    PATIENT_DETAIL: "/doctor/patients/:id/data",
    MY_PROFILE: "/doctor/profile/:id",
    APPOINTMENTS: "/doctor/appointments",
  },

  // PORTAL PACIENTE
  PATIENT: {
    ROOT: "/patient",
    DASHBOARD: "/patient/dashboard",
    HISTORY: "/patient/history",
    TASKS: "/patient/tasks",
    APPOINTMENTS: "/patient/appointments",
  },
} as const;

export type AppPaths = typeof PATHS;
