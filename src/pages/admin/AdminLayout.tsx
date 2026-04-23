import { useState, useMemo, type ReactNode } from "react";
import { Sidebar, type IUser } from "../../components/ui/sidebar/Sidebar";
import {
  Calendar,
  ExternalLink,
  LayoutDashboard,
  Settings,
  Stethoscope,
  Users,
  CheckSquare,
  BookOpen,
  ClipboardList,
  Clock,
  BrainCog,
} from "lucide-react";
import { Outlet, useNavigate, useLocation } from "react-router";
import { PATHS } from "../../app/router/paths";
import { ActionModal } from "../../components/ui/action-modal/ActionModal";
import {
  ActiveSessionDrawer,
  type ISessionData,
} from "../../components/admin/sessions/ActiveSessionDrawer";

// Mock de usuario actual (Simulando lo que vendría del Token)
const MOCK_USER: IUser & { id: string; canViewAllCalendar?: boolean } = {
  id: "USR_123",
  name: "Usuario de Prueba",
  email: "usuario@psicoagenda.com",
  role: "ADMIN", // CAMBIA ESTO PARA PROBAR: "ADMIN", "DOCTOR", "PACIENTE"
  avatarUrl: "",
  canViewAllCalendar: true,
};

export function AdminLayout(): ReactNode {
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  // ESTADO DE SESIÓN ACTIVA (MULTITASKING)
  const [activeSession, setActiveSession] = useState<ISessionData | null>(null);
  const [isSessionDrawerOpen, setIsSessionDrawerOpen] = useState(false);
  const [isSessionMinimized, setIsSessionMinimized] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  // Función para iniciar una sesión (se puede llamar desde cualquier vista)
  const handleStartSession = (patientId: string, patientName: string) => {
    setActiveSession({
      patientId,
      patientName,
      serviceType: "Sesión Individual",
      reason: "",
      goals: "",
      mood: 5,
      notes: "",
      tasks: [],
      status: "idle",
    });
    setIsSessionDrawerOpen(true);
    setIsSessionMinimized(false);
  };

  const handleFinishSession = () => {
    // Aquí se llamaría a la API para guardar la sesión
    console.log("Sesión finalizada y guardada:", activeSession);
    setActiveSession(null);
    setIsSessionDrawerOpen(false);
    // Podríamos redirigir a la historia clínica del paciente para ver el resultado
  };

  const menuItems = useMemo(() => {
    const baseItems = [
      {
        name: "Portada",
        path: PATHS.HOME,
        icon: <ExternalLink size={18} />,
        roles: ["ADMIN", "DOCTOR", "PACIENTE"],
      },
      // MENÚ PARA ADMIN Y DOCTOR
      {
        name: "Dashboard",
        path: PATHS.ADMIN.DASHBOARD,
        icon: <LayoutDashboard size={16} />,
        roles: ["ADMIN"],
      },
      {
        name: "Gestión",
        path: PATHS.ADMIN.ROOT,
        icon: <Settings size={18} />,
        roles: ["ADMIN"],
        subRoutes: [
          {
            name: "Pacientes",
            path: PATHS.ADMIN.PATIENTS,
            icon: <Users size={16} />,
          },
          {
            name: "Doctores",
            path: PATHS.ADMIN.DOCTORS,
            icon: <Stethoscope size={16} />,
          },
          {
            name: "Agenda",
            path: PATHS.ADMIN.CALENDAR,
            icon: <Calendar size={16} />,
          },
          {
            name: "Citas",
            path: PATHS.ADMIN.APPOINTMENTS,
            icon: <BrainCog size={18} />,
          },
        ],
      },
      {
        name: "Mi Calendario",
        path: PATHS.ADMIN.CALENDAR,
        icon: <Calendar size={18} />,
        roles: ["DOCTOR"],
        // Si el doctor tiene permiso, le mostramos también el acceso al calendario general
        subRoutes: MOCK_USER.canViewAllCalendar
          ? [
              {
                name: "Mis Citas",
                path: PATHS.ADMIN.CALENDAR,
                icon: <Calendar size={16} />,
              },
              {
                name: "Vista General",
                path: PATHS.ADMIN.CALENDAR + "?view=all",
                icon: <ClipboardList size={16} />,
              },
            ]
          : undefined,
      },
      {
        name: "Citas",
        path: PATHS.ADMIN.APPOINTMENTS,
        icon: <BrainCog size={18} />,
        roles: ["DOCTOR"],
      },
      {
        name: "Horarios",
        path: PATHS.ADMIN.DOCTOR_DATA.replace(":id", MOCK_USER.id),
        icon: <Clock size={18} />,
        roles: ["DOCTOR"],
      },

      // MENÚ PARA PACIENTE
      {
        name: "Mi Panel",
        path: PATHS.PATIENT.DASHBOARD,
        icon: <LayoutDashboard size={18} />,
        roles: ["PACIENTE"],
      },
      {
        name: "Mi Historia",
        path: PATHS.PATIENT.HISTORY,
        icon: <BookOpen size={18} />,
        roles: ["PACIENTE"],
      },
      {
        name: "Mis Tareas",
        path: PATHS.PATIENT.TASKS,
        icon: <CheckSquare size={18} />,
        roles: ["PACIENTE"],
      },
      {
        name: "Agendar Cita",
        path: PATHS.PATIENT.APPOINTMENTS,
        icon: <Calendar size={18} />,
        roles: ["PACIENTE"],
      },
    ];

    return baseItems;
  }, []);

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
        dataUser={MOCK_USER}
        onLogout={() => setIsLogoutModalOpen(true)}
        childrenClassName="bg-background w-full h-full flex flex-col overflow-hidden"
        currentPath={currentRouteName}
      >
        <main className="flex flex-1 flex-col overflow-hidden">
          {/* HEADER DINÁMICO FIJO - Solo visible en Desktop */}
          <header className="hidden md:flex sticky top-0 z-30 w-full h-17.5 px-4 bg-white/80 backdrop-blur-md border-b border-border/50 shadow-sm transition-all duration-300 ">
            <div className="flex w-full md:flex-row md:items-center justify-between gap-4">
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
                <div className="px-3 py-1.5 bg-muted/50 border border-border/40 rounded-md text-[10px] font-black text-primary uppercase tracking-widest">
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
            <div className="flex-1 overflow-y-auto custom-scrollbar p-2 md:p-3 lg:p-3">
              <div className="h-full w-full">
                <Outlet context={{ handleStartSession }} />
              </div>
            </div>
          </div>
        </main>
      </Sidebar>

      {/* DRAWER DE SESIÓN ACTIVA (MULTITASKING) */}
      {activeSession && (
        <ActiveSessionDrawer
          session={activeSession}
          isOpen={isSessionDrawerOpen}
          isMinimized={isSessionMinimized}
          onClose={() => {
            if (activeSession.status === "active") {
              setIsSessionMinimized(true);
            } else {
              setActiveSession(null);
              setIsSessionDrawerOpen(false);
            }
          }}
          onMinimize={setIsSessionMinimized}
          onUpdateSession={(data) =>
            setActiveSession((prev) => (prev ? { ...prev, ...data } : null))
          }
          onFinish={handleFinishSession}
        />
      )}

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
