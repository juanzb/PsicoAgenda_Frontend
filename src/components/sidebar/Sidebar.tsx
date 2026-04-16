import { useState, type ReactNode, useMemo } from "react";
import { SidebarNavItem } from "./SidebarNavIten";
import {
  X,
  LogOut,
  ShieldCheck,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import "./sidebar.css";

export type TSidebarItem = {
  name: string;
  path?: string;
  icon?: ReactNode; // Ahora es un ReactNode para máxima flexibilidad
  roles?: string[];
  subRoutes?: TSidebarItem[];
};

export interface IUser {
  name: string;
  email: string;
  role: string;
  avatarUrl?: string;
}

export type TSidebarProps = {
  items: TSidebarItem[];
  dataUser: IUser;
  onLogout: () => void;
  appName?: string;
  children?: ReactNode;
  childrenClassName?: string;
};

export function SidebarLayout({
  items,
  dataUser,
  onLogout,
  appName = "PsicoAgenda",
  children,
  childrenClassName,
}: TSidebarProps): ReactNode {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(() => {
    const saved = localStorage.getItem("sidebar-collapsed");
    return saved === "true"; // Por defecto false si no existe
  });

  const toggleMobile = () => setIsMobileOpen(!isMobileOpen);
  const toggleCollapse = () => {
    const newState = !isCollapsed;
    setIsCollapsed(newState);
    localStorage.setItem("sidebar-collapsed", String(newState));
  };

  const expandSidebar = () => {
    setIsCollapsed(false);
    localStorage.setItem("sidebar-collapsed", "false");
  };

  const filteredItems = useMemo(() => {
    return items.filter(
      (item) => !item.roles || item.roles.includes(dataUser.role),
    );
  }, [items, dataUser.role]);

  return (
    <div className="flex h-screen w-full bg-background font-sans overflow-hidden">
      {/* Overlay Móvil */}
      {isMobileOpen && (
        <div
          className="fixed inset-0 bg-black/60 z-40 md:hidden backdrop-blur-sm"
          onClick={toggleMobile}
        />
      )}
      {/* SIDEBAR */}
      <aside
        className={`
        fixed inset-y-0 left-0 z-50 bg-surface text-text-main shadow-2xl transition-all duration-300 ease-in-out flex flex-col border-r border-border
        md:relative md:translate-x-0
        ${isMobileOpen ? "translate-x-0 w-72" : "-translate-x-full md:translate-x-0"}
        ${isCollapsed ? "md:w-20" : "md:w-72"}
      `}
      >
        {/* Header con Logo */}
        <div
          className={`p-4 mb-6 flex items-center ${isCollapsed ? "justify-center" : "justify-between"}`}
        >
          <div className="flex items-center gap-3 overflow-hidden">
            <div className="min-w-11 h-11 bg-primary rounded-xl flex items-center justify-center shadow-lg shadow-primary-dark/40 border border-primary-light/20">
              <ShieldCheck className="text-text-main" size={26} />
            </div>
            {!isCollapsed && (
              <div className="animate-in fade-in slide-in-from-left-4 duration-500">
                <h1 className="text-lg font-bold tracking-tight leading-tight whitespace-nowrap">
                  {appName}
                </h1>
                <span className="text-[10px] text-primary-light font-bold uppercase tracking-widest bg-primary-light/10 px-1.5 py-0.5 rounded">
                  {dataUser.role}
                </span>
              </div>
            )}
          </div>
          <button
            onClick={toggleMobile}
            className="md:hidden text-text-muted hover:text-text-main"
          >
            <X size={24} />
          </button>
        </div>

        {/* Botón de Colapso (Desktop) */}
        <button
          onClick={toggleCollapse}
          className="hidden md:flex absolute -right-3 top-20 w-7 h-7 bg-primary rounded-full items-center justify-center border-4 border-background hover:scale-110 transition-transform z-60 shadow-lg"
          title={isCollapsed ? "Expandir" : "Colapsar"}
        >
          {isCollapsed ? <ChevronRight size={14} /> : <ChevronLeft size={14} />}
        </button>

        {/* Navegación Principal */}
        <nav className="flex-1 overflow-y-auto py-2 custom-scrollbar no-scrollbar-x">
          <div className="space-y-1">
            {filteredItems.map((item) => (
              <SidebarNavItem
                key={item.name}
                item={item}
                userRole={dataUser.role}
                isCollapsed={isCollapsed}
                expandSidebar={expandSidebar}
                closeMobile={() => setIsMobileOpen(false)}
              />
            ))}
          </div>
        </nav>

        {/* Footer de Usuario */}
        <div className="p-4 mt-auto border-t border-border bg-surface/50">
          {!isCollapsed ? (
            <div className="animate-in fade-in duration-500">
              <div className="flex items-center gap-3 mb-4 p-2.5 rounded-xl bg-surface-hover/30 border border-border/50">
                <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center text-primary-light font-bold border border-primary-light/20 overflow-hidden shadow-inner">
                  {dataUser.avatarUrl ? (
                    <img
                      src={dataUser.avatarUrl}
                      alt="Avatar"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    dataUser.name.charAt(0)
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-bold text-text-main truncate">
                    {dataUser.name}
                  </p>
                  <p className="text-[10px] text-text-muted truncate">
                    {dataUser.email}
                  </p>
                </div>
              </div>
              <button
                onClick={onLogout}
                className="w-full flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-semibold text-error rounded-xl hover:bg-error/10 transition-all border border-transparent hover:border-error/20 group"
              >
                <LogOut
                  size={18}
                  className="group-hover:-translate-x-1 transition-transform"
                />
                Cerrar sesión
              </button>
            </div>
          ) : (
            <button
              onClick={onLogout}
              className="w-full flex items-center justify-center p-3 text-error hover:bg-error/10 rounded-xl transition-colors relative group/logout"
            >
              <LogOut size={22} />
              <div className="fixed left-17.5 ml-2 px-3 py-2 bg-error text-text-main text-xs font-bold rounded-lg opacity-0 invisible group-hover/logout:opacity-100 group-hover/logout:visible transition-all whitespace-nowrap z-999 shadow-2xl">
                Cerrar sesión
                <div className="absolute top-1/2 -left-1 -translate-y-1/2 w-2 h-2 bg-error rotate-45" />
              </div>
            </button>
          )}
        </div>
      </aside>

      {/* CONTENIDO PRINCIPAL */}
      <main
        className={`flex-1 flex flex-col min-w-0 h-screen overflow-hidden ${childrenClassName}`}
      >
        {/* Header móvil (solo visible en < md) */}
        <header className="flex md:hidden items-center justify-between p-4 bg-surface border-b border-border">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <ShieldCheck className="text-white" size={18} />
            </div>
            <span className="font-bold text-text-main">{appName}</span>
          </div>
          <button
            onClick={toggleMobile}
            className="p-2 text-text-muted hover:text-text-main hover:bg-surface-hover rounded-lg transition-colors"
          >
            <ChevronRight size={24} />
          </button>
        </header>

        {/* Área de scroll para el contenido */}
        <div className="flex-1 overflow-y-auto custom-scrollbar">
          {children}
        </div>
      </main>
    </div>
  );
}
