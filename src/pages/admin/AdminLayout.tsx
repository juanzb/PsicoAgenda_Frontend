import { useState, useMemo, type ReactNode } from "react";
import { SidebarLayout } from "../../components/sidebar/Sidebar";
import {
  Calendar,
  LayoutDashboard,
  Settings,
  Stethoscope,
  Users,
} from "lucide-react";
import { Outlet, useNavigate, useLocation } from "react-router";
import { PATHS } from "../../app/router/paths";
import { ActionModal } from "../../components/action-modal/ActionModal";

export function AdminLayout(): ReactNode {
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = useMemo(
    () => [
      {
        name: "Home",
        path: PATHS.HOME,
        icon: <LayoutDashboard size={18} />,
        roles: ["ADMIN", "DOCTOR"],
      },
      {
        name: "Gestión",
        path: PATHS.ADMIN.ROOT,
        icon: <Settings size={18} />,
        roles: ["ADMIN"],
        subRoutes: [
          {
            name: "Dashboard",
            path: PATHS.ADMIN.DASHBOARD,
            icon: <LayoutDashboard size={16} />,
            roles: ["ADMIN", "DOCTOR"],
          },
          {
            name: "Clientes",
            path: PATHS.ADMIN.CLIENTS,
            icon: <Users size={16} />,
            roles: ["ADMIN"],
          },
          {
            name: "Doctores",
            path: PATHS.ADMIN.DOCTORS,
            icon: <Stethoscope size={16} />,
          },
        ],
      },
      {
        name: "Citas",
        path: PATHS.ADMIN.APPOINTMENTS,
        icon: <Calendar size={18} />,
      },
    ],
    [],
  );

  const currentRouteName = useMemo(() => {
    interface MenuItem {
      name: string;
      path: string;
      subRoutes?: MenuItem[];
    }

    const findName = (items: MenuItem[]): string | null => {
      for (const item of items) {
        if (item.path === location.pathname) return item.name;
        if (item.subRoutes) {
          const subName = findName(item.subRoutes);
          if (subName) return subName;
        }
      }
      return null;
    };
    return findName(menuItems) || "Panel de Control";
  }, [location.pathname, menuItems]);

  const handleLogout = () => {
    setIsLoggingOut(true);
    setTimeout(() => {
      setIsLogoutModalOpen(false);
      setIsLoggingOut(false);
      navigate(PATHS.AUTH.LOGIN);
    }, 800);
  };

  return (
    <>
      <SidebarLayout
        appName="PsicoAgenda"
        items={menuItems}
        dataUser={{
          name: "Dr. Camilo Sánchez",
          email: "contacto@psicoagenda.com",
          role: "ADMIN",
          avatarUrl:
            "https://ui-avatars.com/api/?name=Camilo+Sanchez&background=0D8ABC&color=fff",
        }}
        onLogout={() => setIsLogoutModalOpen(true)}
        childrenClassName="bg-background w-full h-full"
      >
        {/* HEADER DINÁMICO PREMIUM */}
        <header className="relative p-3 px-4 md:px-4 bg-linear-to-b from-card/30 to-transparent">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div className="flex flex-col gap-2">
              {/* Título con indicador de marca */}
              <div className="flex items-center gap-4">
                <div className="w-1.5 h-8 bg-primary rounded-full shadow-[0_0_15px_rgba(20,136,116,0.3)]" />
                <h2 className="text-[28px] md:text-[28px] font-bold text-foreground tracking-tight">
                  {currentRouteName}
                </h2>
              </div>
            </div>

            {/* Fecha Actual (Derecha) */}
            <div className="hidden sm:flex items-center gap-3">
              <div className="px-4 py-2 bg-card border border-border/40 rounded-xl text-[10px] font-bold text-primary uppercase tracking-widest shadow-sm">
                {new Date().toLocaleDateString("es-ES", {
                  weekday: "long",
                  day: "numeric",
                  month: "long",
                })}
              </div>
            </div>
          </div>

          {/* Línea divisoria elegante */}
          <div className="absolute bottom-0 left-8 right-8 h-px bg-linear-to-r from-transparent via-border/60 to-transparent" />
        </header>

        {/* ÁREA DE CONTENIDO */}
        <div className="p-6 md:p-8 animate-slide-up">
          <Outlet />
        </div>
      </SidebarLayout>

      {/* Modal de Confirmación de Cierre de Sesión */}
      <ActionModal
        isOpen={isLogoutModalOpen}
        title="¿Cerrar sesión?"
        description="Estás a punto de salir de tu cuenta. Tendrás que volver a introducir tus credenciales para acceder de nuevo."
        variant="warning"
        actionLabel="Sí, cerrar sesión"
        onAction={handleLogout}
        onCancel={() => setIsLogoutModalOpen(false)}
        isLoading={isLoggingOut}
      />
    </>
  );
}
