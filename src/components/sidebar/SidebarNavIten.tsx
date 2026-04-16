import { useEffect, useMemo, useState } from "react";
import type { TSidebarItem } from "./Sidebar";
import { useLocation } from "react-router";
import { ChevronDown } from "lucide-react";
import { NavLink } from "react-router";

type TSidebarNavItem = {
  item: TSidebarItem;
  depth?: number;
  userRole: string;
  isCollapsed: boolean;
  expandSidebar: () => void;
  closeMobile?: () => void;
};

export function SidebarNavItem({
  item,
  depth = 0,
  userRole,
  isCollapsed,
  expandSidebar,
  closeMobile,
}: TSidebarNavItem) {
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
      setIsOpen(() => true);
      return;
    }
    if (hasSubRoutes) {
      setIsOpen(() => !isOpen);
    } else if (item.path && closeMobile) {
      closeMobile();
    }
  };

  const activeClass = "bg-sidebar-accent text-sidebar-primary shadow-sm";
  const inactiveClass =
    "text-sidebar-foreground opacity-70 hover:opacity-100 hover:bg-sidebar-accent hover:text-sidebar-foreground";

  return (
    <div className="relative group/item w-full px-2 text-[14px]">
      {/* Botón Principal / Link */}
      {!hasSubRoutes ? (
        <NavLink
          to={item.path}
          onClick={closeMobile}
          className={({ isActive: linkActive }) => `
            flex items-center gap-3 p-2 rounded-xl transition-all duration-200 mb-1
            ${linkActive ? activeClass : inactiveClass}
            ${isCollapsed ? "justify-center" : ""}
          `}
        >
          <div
            className={`${isCollapsed ? "" : "min-w-5.5"} flex items-center justify-center transition-colors`}
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
            <div className="fixed left-17.5 ml-2 px-3 py-2 bg-sidebar text-sidebar-foreground text-xs font-bold rounded-lg opacity-0 invisible group-hover/item:opacity-100 group-hover/item:visible transition-all whitespace-nowrap z-999 border border-sidebar-border shadow-2xl pointer-events-none">
              {item.name}
              <div className="absolute top-1/2 -left-1 -translate-y-1/2 w-2 h-2 bg-sidebar rotate-45 border-l border-b border-sidebar-border" />
            </div>
          )}
        </NavLink>
      ) : (
        <button
          onClick={handleClick}
          className={`
            w-full flex items-center gap-3 p-2 rounded-xl transition-all duration-200 mb-1
            ${(isOpen || isAnySubRouteActive) && !isCollapsed ? "text-sidebar-primary bg-sidebar-accent" : inactiveClass}
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
            <div className="fixed left-17.5 ml-2 px-3 py-2 bg-sidebar-primary text-white text-xs font-bold rounded-lg opacity-0 invisible group-hover/item:opacity-100 group-hover/item:visible transition-all whitespace-nowrap z-999 shadow-2xl pointer-events-none">
              {item.name}
              <div className="absolute top-1/2 -left-1 -translate-y-1/2 w-2 h-2 bg-sidebar-primary rotate-45" />
            </div>
          )}
        </button>
      )}

      {/* Subrutas */}
      {!isCollapsed && isOpen && hasSubRoutes && (
        <div className="relative ml-4 border-l border-sidebar-border space-y-1 my-1 animate-in slide-in-from-top-1 duration-200">
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
}
