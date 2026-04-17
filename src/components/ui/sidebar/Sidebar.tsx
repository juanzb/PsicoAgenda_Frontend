import { useState, type ReactNode, useMemo } from "react";
import { SidebarNavItem } from "./SidebarNavIten";
import {
  X,
  LogOut,
  ShieldCheck,
  ChevronLeft,
  ChevronRight,
  Menu,
} from "lucide-react";
import "./sidebar.css";
import { NavLink } from "react-router";
import { PATHS } from "../../../app/router/paths";

export type TSidebarItem = {
  name: string;
  path: string;
  icon?: ReactNode;
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

export function Sidebar({
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
    return saved === "true";
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

  const effectiveCollapsed = isCollapsed && !isMobileOpen;

  const filteredItems = useMemo(() => {
    return items.filter(
      (item) => !item.roles || item.roles.includes(dataUser.role),
    );
  }, [items, dataUser.role]);

  return (
    <div className="flex h-screen w-full bg-background font-sans overflow-hidden">
      {/* Overlay Móvil - Mejorado con transición de opacidad */}
      <div
        className={`
          fixed inset-0 bg-sidebar/60 backdrop-blur-sm z-40 transition-opacity duration-300 md:hidden
          ${isMobileOpen ? "opacity-100 visible" : "opacity-0 invisible"}
        `}
        onClick={toggleMobile}
      />

      {/* SIDEBAR - Optimizado para fluidez */}
      <aside
        className={`
          fixed inset-y-0 left-0 z-50 bg-sidebar text-sidebar-foreground shadow-2xl flex flex-col border-r border-sidebar-border
          will-change-transform transition-[transform,width] duration-300 ease-out
          md:relative md:translate-x-0
          ${isMobileOpen ? "translate-x-0 w-72" : "-translate-x-full md:translate-x-0"}
          ${effectiveCollapsed ? "md:w-20" : "md:w-72"}
        `}
      >
        {/* Header con Logo */}
        <div
          className={`p-4 border-b border-sidebar-border flex items-center transition-all duration-300 ${effectiveCollapsed ? "justify-center" : "justify-between"}`}
        >
          <div className="flex items-center gap-3 overflow-hidden">
            <div className="min-w-11 h-11 bg-sidebar-primary rounded-xl flex items-center justify-center shadow-lg shadow-black/20 border border-white/10 shrink-0">
              <ShieldCheck className="text-white" size={26} />
            </div>
            <div
              className={`transition-all duration-300 origin-left ${effectiveCollapsed ? "opacity-0 w-0 scale-95" : "opacity-100 w-auto scale-100"}`}
            >
              <h1 className="text-lg font-bold tracking-tight leading-tight whitespace-nowrap text-sidebar-foreground">
                {appName}
              </h1>
              <span className="text-[10px] text-sidebar-foreground opacity-70 font-bold uppercase tracking-widest bg-white/10 px-1.5 py-0.5 rounded">
                {dataUser.role}
              </span>
            </div>
          </div>
          {!effectiveCollapsed && (
            <button
              onClick={toggleMobile}
              className="md:hidden text-sidebar-foreground opacity-70 hover:opacity-100 p-1"
            >
              <X size={24} />
            </button>
          )}
        </div>

        {/* Botón de Colapso (Desktop) */}
        <button
          onClick={toggleCollapse}
          className="hidden md:flex absolute -right-3 top-20 w-7 h-7 bg-primary rounded-full items-center justify-center border-4 border-background hover:scale-110 transition-transform z-60 shadow-lg"
          title={isCollapsed ? "Expandir" : "Colapsar"}
        >
          {isCollapsed ? (
            <ChevronRight size={14} className="text-white" />
          ) : (
            <ChevronLeft size={14} className="text-white" />
          )}
        </button>

        {/* Navegación Principal */}
        <nav className="flex-1 overflow-y-auto pt-8 custom-scrollbar no-scrollbar-x">
          <div className="space-y-1">
            {filteredItems.map((item) => (
              <SidebarNavItem
                key={item.name}
                item={item}
                userRole={dataUser.role}
                isCollapsed={effectiveCollapsed}
                expandSidebar={expandSidebar}
                closeMobile={() => setIsMobileOpen(false)}
              />
            ))}
          </div>
        </nav>

        {/* Footer de Usuario */}
        <div className="p-2 mt-auto border-t border-sidebar-border bg-black/10">
          <div className="flex items-center gap-1">
            <NavLink
              to={PATHS.USER_PROFILE}
              className={`
                flex items-center gap-2 p-1.5 rounded-xl bg-sidebar-accent/50 border border-sidebar-border hover:bg-sidebar-accent transition-all group/user overflow-hidden
                ${effectiveCollapsed ? "flex-1 justify-center p-1.5" : "flex-4"}
              `}
            >
              <div className="min-w-10 h-10 rounded-lg bg-sidebar-primary flex items-center justify-center text-white font-bold border border-white/10 overflow-hidden shadow-inner group-hover/user:scale-105 transition-transform shrink-0">
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
              {!effectiveCollapsed && (
                <div className="flex-1 min-w-0 transition-opacity duration-300">
                  <p className="text-sm font-bold text-sidebar-foreground truncate group-hover/user:text-white transition-colors">
                    {dataUser.name}
                  </p>
                  <p className="text-[10px] text-sidebar-foreground opacity-50 truncate">
                    {dataUser.email}
                  </p>
                </div>
              )}

              {/* Tooltip Collapsed */}
              {effectiveCollapsed && (
                <div className="fixed left-17.5 ml-2 px-3 py-2 bg-sidebar text-sidebar-foreground text-xs font-bold rounded-lg opacity-0 invisible group-hover/user:opacity-100 group-hover/user:visible transition-all whitespace-nowrap z-999 border border-sidebar-border shadow-2xl pointer-events-none">
                  Perfil / Configuración
                  <div className="absolute top-1/2 -left-1 -translate-y-1/2 w-2 h-2 bg-sidebar rotate-45 border-l border-b border-sidebar-border" />
                </div>
              )}
            </NavLink>

            {!effectiveCollapsed && (
              <button
                onClick={onLogout}
                className="flex items-center cursor-pointer p-2.5 h-full justify-center text-center text-sidebar-foreground opacity-50 hover:opacity-100 hover:text-destructive hover:bg-destructive/10 rounded-xl transition-all border border-transparent hover:border-destructive/20"
                title="Cerrar sesión"
              >
                <LogOut size={20} />
              </button>
            )}
          </div>

          {effectiveCollapsed && (
            <button
              onClick={onLogout}
              className="w-full mt-2 flex items-center justify-center p-3 text-sidebar-foreground opacity-50 hover:opacity-100 hover:text-destructive hover:bg-destructive/10 rounded-xl transition-colors relative group/logout"
            >
              <LogOut size={22} />
              <div className="fixed left-17.5 ml-2 px-3 py-2 bg-destructive text-white text-xs font-bold rounded-lg opacity-0 invisible group-hover/logout:opacity-100 group-hover/logout:visible transition-all whitespace-nowrap z-999 shadow-2xl">
                Cerrar sesión
                <div className="absolute top-1/2 -left-1 -translate-y-1/2 w-2 h-2 bg-destructive rotate-45" />
              </div>
            </button>
          )}
        </div>
      </aside>

      {/* CONTENIDO PRINCIPAL */}
      <main
        className={`flex-1 flex flex-col min-w-0 h-screen overflow-hidden ${childrenClassName}`}
      >
        <header className="flex md:hidden items-center p-4 bg-white border-b border-border gap-4 shrink-0">
          <button
            onClick={toggleMobile}
            className="p-2 text-muted-foreground hover:text-foreground hover:bg-muted rounded-lg transition-colors active:scale-90"
          >
            <Menu size={24} />
          </button>

          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center shadow-sm">
              <ShieldCheck className="text-white" size={18} />
            </div>
            <span className="font-bold text-foreground text-lg tracking-tight">
              {appName}
            </span>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto custom-scrollbar bg-background">
          {children}
        </div>
      </main>
    </div>
  );
}
