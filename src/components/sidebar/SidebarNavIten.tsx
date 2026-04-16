import { useEffect, useMemo, useState } from "react";
import type { TSidebarItem } from "./Sidebar";
import { useLocation } from "react-router";
import { ChevronDown } from "lucide-react";
import { NavLink } from "react-router";

export function SidebarNavItem({
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
}) {
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

  const activeClass =
    "bg-primary text-text-main shadow-md shadow-primary-dark/20";
  const inactiveClass =
    "text-text-muted hover:bg-surface-hover/50 hover:text-text-main";

  return (
    <div className="relative group/item w-full px-1 text-[14px]">
      {/* Botón Principal / Link */}
      {item.path && !hasSubRoutes ? (
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
            <div className="fixed left-17.5 ml-2 px-3 py-2 bg-surface text-text-main text-xs font-bold rounded-lg opacity-0 invisible group-hover/item:opacity-100 group-hover/item:visible transition-all whitespace-nowrap z-999 border border-border shadow-2xl pointer-events-none">
              {item.name}
              <div className="absolute top-1/2 -left-1 -translate-y-1/2 w-2 h-2 bg-surface rotate-45 border-l border-b border-border" />
            </div>
          )}
        </NavLink>
      ) : (
        <button
          onClick={handleClick}
          className={`
            w-full flex items-center gap-3 p-2 rounded-xl transition-all duration-200 mb-1
            ${(isOpen || isAnySubRouteActive) && !isCollapsed ? "text-primary-light bg-surface-hover/30" : inactiveClass}
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
            <div className="fixed left-17.5 ml-2 px-3 py-2 bg-primary text-text-main text-xs font-bold rounded-lg opacity-0 invisible group-hover/item:opacity-100 group-hover/item:visible transition-all whitespace-nowrap z-999 shadow-2xl pointer-events-none">
              {item.name} (Click para expandir)
              <div className="absolute top-1/2 -left-1 -translate-y-1/2 w-2 h-2 bg-primary rotate-45" />
            </div>
          )}
        </button>
      )}

      {/* Subrutas */}
      {!isCollapsed && isOpen && hasSubRoutes && (
        <div className="relative ml-6 border-l border-border space-y-1 my-1 animate-in slide-in-from-top-1 duration-200">
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
