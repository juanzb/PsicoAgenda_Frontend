export const PATHS = {
  HOME: "/",
  LOGIN: "/login",
  REGISTER: "/register",
  ADMIN: {
    ROOT: "/admin",
    DASHBOARD: "/admin/dashboard",
    DOCTORS: "/admin/doctors",
    PATIENTS: "/admin/patients",
    APPOINTMENTS: "/admin/appointments",
  },
  USER_PROFILE: "/profile",
} as const;

export type AppPaths = typeof PATHS;
