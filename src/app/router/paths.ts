export const PATHS = {
  HOME: "/",
  AUTH: {
    ROOT: "/auth",
    LOGIN: "/auth/login",
    REGISTER: "/auth/register",
  },
  ADMIN: {
    ROOT: "/admin",
    DASHBOARD: "/admin/dashboard",
    DOCTORS: "/admin/doctors",
    CLIENTS: "/admin/clients",
    APPOINTMENTS: "/admin/appointments",
  },
  USER_PROFILE: "/profile",
} as const;

export type AppPaths = typeof PATHS;
