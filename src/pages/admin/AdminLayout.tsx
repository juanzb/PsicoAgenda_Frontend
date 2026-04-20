import { useState, useMemo, type ReactNode } from "react";
import { Sidebar } from "../../components/ui/sidebar/Sidebar";
import {
  Calendar,
  LayoutDashboard,
  Settings,
  Stethoscope,
  Users,
} from "lucide-react";
import { Outlet, useNavigate, useLocation } from "react-router";
import { PATHS } from "../../app/router/paths";
import { ActionModal } from "../../components/ui/action-modal/ActionModal";

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
            name: "Pacientes",
            path: PATHS.ADMIN.PATIENTS,
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
      navigate(PATHS.LOGIN);
    }, 800);
  };

  return (
    <>
      <Sidebar
        appName="PsicoAgenda"
        items={menuItems}
        dataUser={{
          name: "Dr. Camilo Sánchez",
          email: "contacto@psicoagenda.com",
          role: "ADMIN",
          avatarUrl: "",
        }}
        onLogout={() => setIsLogoutModalOpen(true)}
        childrenClassName="bg-background w-full h-full flex flex-col overflow-hidden"
      >
        {/* HEADER DINÁMICO FIJO - Solo visible en Desktop */}
        <header className="hidden md:block sticky top-0 z-30 w-full p-4 bg-white/80 backdrop-blur-md border-b border-border/50 shadow-sm transition-all duration-300">
          <div className="flex md:flex-row md:items-center justify-between gap-4">
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-3">
                <div className="w-1.5 h-6 bg-primary rounded-full shadow-[0_0_10px_rgba(20,136,116,0.3)]" />
                <h2 className="text-xl md:text-2xl font-bold text-foreground tracking-tight">
                  {currentRouteName}
                </h2>
              </div>
            </div>

            {/* Fecha Actual */}
            <div className="hidden sm:flex items-center gap-3">
              <div className="px-3 py-1.5 bg-muted/50 border border-border/40 rounded-xl text-[10px] font-black text-primary uppercase tracking-widest">
                {new Date().toLocaleDateString("es-ES", {
                  weekday: "short",
                  day: "numeric",
                  month: "long",
                })}
              </div>
            </div>
          </div>
        </header>

        {/* ÁREA DE CONTENIDO - Flex container para permitir scroll interno en las vistas */}
        <div className="flex-1 flex flex-col overflow-hidden animate-in fade-in slide-in-from-bottom-2 duration-500">
          <div className="felx flex-1 overflow-hidden p-2 md:p-3 lg:p-3 flex-col">
            <Outlet />
          </div>
        </div>
      </Sidebar>

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
