import { useState, type ReactNode, useMemo, useEffect } from "react";
import { NavLink, useLocation } from "react-router";
import {
  Menu,
  X,
  ChevronDown,
  LogOut,
  ShieldCheck,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

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

const SidebarNavItem = ({
  item,
  depth = 0,
  userRole,
  isCollapsed,
  expandSidebar,
  closeMobile,
}: {
  item: TSidebarItem;
  depth?: number;
  userRole: string;
  isCollapsed: boolean;
  expandSidebar: () => void;
  closeMobile?: () => void;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const visibleSubRoutes = useMemo(() => {
    return (
      item.subRoutes?.filter(
        (sub) => !sub.roles || sub.roles.includes(userRole),
      ) || []
    );
  }, [item.subRoutes, userRole]);

  const hasSubRoutes = visibleSubRoutes.length > 0;

  const isAnySubRouteActive = useMemo(() => {
    const checkActive = (routes: TSidebarItem[]): boolean => {
      return routes.some(
        (r) =>
          (r.path && location.pathname === r.path) ||
          (r.subRoutes && checkActive(r.subRoutes)),
      );
    };
    return hasSubRoutes && checkActive(visibleSubRoutes);
  }, [visibleSubRoutes, location.pathname, hasSubRoutes]);

  useEffect(() => {
    if (isAnySubRouteActive && !isCollapsed) {
      setIsOpen(() => true);
    }
  }, [isAnySubRouteActive, isCollapsed]);

  const handleClick = () => {
    if (isCollapsed && hasSubRoutes) {
      expandSidebar();
      setIsOpen(true);
      return;
    }
    if (hasSubRoutes) {
      setIsOpen(!isOpen);
    } else if (item.path && closeMobile) {
      closeMobile();
    }
  };

  const activeClass = "bg-blue-600 text-white shadow-md shadow-blue-900/20";
  const inactiveClass = "text-slate-400 hover:bg-slate-800/50 hover:text-white";

  return (
    <div className="relative group/item w-full px-2">
      {/* Botón Principal / Link */}
      {item.path && !hasSubRoutes ? (
        <NavLink
          to={item.path}
          onClick={closeMobile}
          className={({ isActive: linkActive }) => `
            flex items-center gap-3 px-3 py-3 rounded-xl transition-all duration-200 mb-1
            ${linkActive ? activeClass : inactiveClass}
            ${isCollapsed ? "justify-center" : ""}
          `}
        >
          <div
            className={`${isCollapsed ? "" : "min-w-5.5"} flex items-center justify-center`}
          >
            {item.icon}
          </div>
          {!isCollapsed && (
            <span className="truncate font-medium animate-in fade-in duration-300">
              {item.name}
            </span>
          )}

          {/* Tooltip simple */}
          {isCollapsed && (
            <div className="fixed left-17.5 ml-2 px-3 py-2 bg-slate-800 text-white text-xs font-bold rounded-lg opacity-0 invisible group-hover/item:opacity-100 group-hover/item:visible transition-all whitespace-nowrap z-999 border border-slate-700 shadow-2xl pointer-events-none">
              {item.name}
              <div className="absolute top-1/2 -left-1 -translate-y-1/2 w-2 h-2 bg-slate-800 rotate-45 border-l border-b border-slate-700" />
            </div>
          )}
        </NavLink>
      ) : (
        <button
          onClick={handleClick}
          className={`
            w-full flex items-center gap-3 px-3 py-3 rounded-xl transition-all duration-200 mb-1
            ${(isOpen || isAnySubRouteActive) && !isCollapsed ? "text-blue-400 bg-slate-800/30" : inactiveClass}
            ${isCollapsed ? "justify-center" : ""}
          `}
        >
          <div
            className={`${isCollapsed ? "" : "min-w-5.5"} flex items-center justify-center`}
          >
            {item.icon}
          </div>
          {!isCollapsed && (
            <>
              <span className="flex-1 text-left truncate font-medium animate-in fade-in duration-300">
                {item.name}
              </span>
              <ChevronDown
                size={14}
                className={`transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
              />
            </>
          )}

          {/* Tooltip para items con subrutas */}
          {isCollapsed && (
            <div className="fixed left-17.5 ml-2 px-3 py-2 bg-blue-600 text-white text-xs font-bold rounded-lg opacity-0 invisible group-hover/item:opacity-100 group-hover/item:visible transition-all whitespace-nowrap z-999 shadow-2xl pointer-events-none">
              {item.name} (Click para expandir)
              <div className="absolute top-1/2 -left-1 -translate-y-1/2 w-2 h-2 bg-blue-600 rotate-45" />
            </div>
          )}
        </button>
      )}

      {/* Subrutas */}
      {!isCollapsed && isOpen && hasSubRoutes && (
        <div className="relative ml-6 pl-4 border-l border-slate-800 space-y-1 my-1 animate-in slide-in-from-top-1 duration-200">
          {visibleSubRoutes.map((sub) => (
            <SidebarNavItem
              key={sub.name}
              item={sub}
              depth={depth + 1}
              userRole={userRole}
              isCollapsed={false}
              expandSidebar={expandSidebar}
              closeMobile={closeMobile}
            />
          ))}
        </div>
      )}
    </div>
  );
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
    <div className="flex h-screen w-full bg-slate-950 font-sans overflow-hidden">
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
        fixed inset-y-0 left-0 z-50 bg-slate-900 text-white shadow-2xl transition-all duration-300 ease-in-out flex flex-col border-r border-slate-800
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
            <div className="min-w-11 h-11 bg-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-900/40 border border-blue-400/20">
              <ShieldCheck className="text-white" size={26} />
            </div>
            {!isCollapsed && (
              <div className="animate-in fade-in slide-in-from-left-4 duration-500">
                <h1 className="text-lg font-bold tracking-tight leading-tight whitespace-nowrap">
                  {appName}
                </h1>
                <span className="text-[10px] text-blue-400 font-bold uppercase tracking-widest bg-blue-400/10 px-1.5 py-0.5 rounded">
                  {dataUser.role}
                </span>
              </div>
            )}
          </div>
          <button
            onClick={toggleMobile}
            className="md:hidden text-slate-500 hover:text-white"
          >
            <X size={24} />
          </button>
        </div>

        {/* Botón de Colapso (Desktop) */}
        <button
          onClick={toggleCollapse}
          className="hidden md:flex absolute -right-3 top-20 w-7 h-7 bg-blue-600 rounded-full items-center justify-center border-4 border-slate-950 hover:scale-110 transition-transform z-60 shadow-lg"
          title={isCollapsed ? "Expandir" : "Colapsar"}
        >
          {isCollapsed ? <ChevronRight size={14} /> : <ChevronLeft size={14} />}
        </button>

        {/* Navegación Principal */}
        <nav className="flex-1 overflow-y-auto py-2 custom-scrollbar no-scrollbar-x">
          {!isCollapsed && (
            <div className="px-6 mb-4 text-[11px] font-bold text-slate-500 uppercase tracking-[0.2em]">
              Menú Principal
            </div>
          )}
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
        <div className="p-4 mt-auto border-t border-slate-800 bg-slate-900/50">
          {!isCollapsed ? (
            <div className="animate-in fade-in duration-500">
              <div className="flex items-center gap-3 mb-4 p-2.5 rounded-xl bg-slate-800/30 border border-slate-800/50">
                <div className="w-10 h-10 rounded-lg bg-blue-600/20 flex items-center justify-center text-blue-400 font-bold border border-blue-500/20 overflow-hidden shadow-inner">
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
                  <p className="text-sm font-bold text-white truncate">
                    {dataUser.name}
                  </p>
                  <p className="text-[10px] text-slate-500 truncate">
                    {dataUser.email}
                  </p>
                </div>
              </div>
              <button
                onClick={onLogout}
                className="w-full flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-semibold text-red-400 rounded-xl hover:bg-red-500/10 transition-all border border-transparent hover:border-red-500/20 group"
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
              className="w-full flex items-center justify-center p-3 text-red-400 hover:bg-red-500/10 rounded-xl transition-colors relative group/logout"
            >
              <LogOut size={22} />
              <div className="fixed left-17.5 ml-2 px-3 py-2 bg-red-600 text-white text-xs font-bold rounded-lg opacity-0 invisible group-hover/logout:opacity-100 group-hover/logout:visible transition-all whitespace-nowrap z-999 shadow-2xl">
                Cerrar sesión
                <div className="absolute top-1/2 -left-1 -translate-y-1/2 w-2 h-2 bg-red-600 rotate-45" />
              </div>
            </button>
          )}
        </div>
      </aside>
      <div className={childrenClassName}>{children}</div>
    </div>
  );
}
