export const PATHS = {
  HOME: "/",
  LOGIN: "/login",
  REGISTER: "/register",
  ADMIN: {
    ROOT: "/admin",
    DASHBOARD: "/admin/dashboard",
    DOCTORS: "/admin/doctors",
    PATIENTS: "/admin/patients",
    PATIENT_DATA: "/admin/patients/:id/data",
    APPOINTMENTS: "/admin/appointments",
    CALENDAR: "/admin/calendar",
  },
  PATIENT: {
    ROOT: "/patient",
    DASHBOARD: "/patient/dashboard",
    HISTORY: "/patient/history",
    TASKS: "/patient/tasks",
    APPOINTMENTS: "/patient/appointments",
  },
  USER_PROFILE: "/profile",
} as const;

export type AppPaths = typeof PATHS;
