import type { ReactNode } from "react";
import { SidebarLayout } from "../../components/sidebar/Sidebar";
import {
  Calendar,
  LayoutDashboard,
  Settings,
  Stethoscope,
  Users,
} from "lucide-react";
import { Outlet } from "react-router";

export function AdminLayout(): ReactNode {
  return (
    <SidebarLayout
      appName="PsicoAgenda"
      items={[
        {
          name: "Dashboard",
          path: "/admin/dashboard",
          icon: <LayoutDashboard size={16} />,
          roles: ["ADMIN", "DOCTOR"],
        },
        {
          name: "Gestion",
          icon: <Settings size={18} />,
          roles: ["ADMIN"],
          subRoutes: [
            {
              name: "Dashboard",
              path: "/admin/dashboard",
              icon: <LayoutDashboard size={16} />,
              roles: ["ADMIN", "DOCTOR"],
            },
            {
              name: "Clientes",
              path: "/admin/clients",
              icon: <Users size={16} />,
              roles: ["ADMIN"],
            },
            {
              name: "Doctores",
              path: "/admin/doctors",
              icon: <Stethoscope size={16} />,
            },
          ],
        },
        {
          name: "Citas",
          path: "/admin/appointments",
          icon: <Calendar size={18} />,
        },
      ]}
      dataUser={{
        name: "Dr. Camilo Sánchez",
        email: "contacto@psicoagenda.com",
        role: "ADMIN",
        avatarUrl:
          "https://ui-avatars.com/api/?name=Camilo+Sanchez&background=0D8ABC&color=fff",
      }}
      onLogout={() => alert("Sesión cerrada")}
      childrenClassName="bg-white w-full h-full"
    >
      <Outlet />
    </SidebarLayout>
  );
}
