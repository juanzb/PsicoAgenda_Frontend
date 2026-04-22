import { Navigate, useLocation } from "react-router";
import { PATHS } from "../../app/router/paths";
import type { ReactNode } from "react";

// Definición de roles permitidos
export type UserRole = "ADMIN" | "DOCTOR" | "PACIENTE";

interface RoleGuardProps {
  children: ReactNode;
  allowedRoles: UserRole[];
}

/**
 * RoleGuard: Protege rutas basándose en el rol del usuario.
 * En una implementación real, esto obtendría el usuario de un AuthContext que lee el Token.
 */
export function RoleGuard({ children, allowedRoles }: RoleGuardProps) {
  const location = useLocation();

  // SIMULACIÓN DE OBTENCIÓN DE USUARIO DESDE EL TOKEN/CONTEXTO
  // En el futuro, aquí usarás: const { user } = useAuth();
  const user = {
    role: "ADMIN" as UserRole, // Cambia esto para probar: "DOCTOR" o "PACIENTE"
    isAuthenticated: true,
  };

  if (!user.isAuthenticated) {
    // Si no está logueado, al login
    return <Navigate to={PATHS.LOGIN} state={{ from: location }} replace />;
  }

  if (!allowedRoles.includes(user.role)) {
    // Si el rol no está permitido para esta ruta, redirigir a su dashboard correspondiente
    const redirectPath =
      user.role === "ADMIN"
        ? PATHS.ADMIN.DASHBOARD
        : user.role === "DOCTOR"
          ? PATHS.DOCTOR.DASHBOARD
          : PATHS.PATIENT.DASHBOARD;

    return <Navigate to={redirectPath} replace />;
  }

  return <>{children}</>;
}
