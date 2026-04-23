import { Search, Filter, Plus, type LucideIcon } from "lucide-react";
import { type ReactNode, useState, useEffect } from "react";
import { Button } from "../button/Button";

interface ViewHeaderProps {
  // Action Mode (Nuevo Paciente, etc)
  actionLabel?: string;
  actionIcon?: LucideIcon;
  onActionClick?: () => void;
  
  // Title Mode (Agenda de Citas, etc)
  title?: string;
  description?: string;
  icon?: LucideIcon;

  // Search
  searchTerm: string;
  onSearch: (value: string) => void;
  searchPlaceholder?: string;
  showSearch?: boolean;

  // Filters & Extra
  showFilter?: boolean;
  onFilterClick?: () => void;
  extraActions?: ReactNode;
}

export function ViewHeader({
  actionLabel,
  actionIcon: ActionIcon = Plus,
  onActionClick,
  title,
  description,
  icon: TitleIcon,
  searchTerm,
  onSearch,
  searchPlaceholder = "Buscar...",
  showSearch = true,
  showFilter = true,
  onFilterClick,
  extraActions,
}: ViewHeaderProps): ReactNode {
  const [localSearch, setLocalSearch] = useState(searchTerm);

  useEffect(() => {
    setLocalSearch(searchTerm);
  }, [searchTerm]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      onSearch(localSearch);
    }
  };

  return (
    <div className="pb-3 shrink-0">
      <div className="flex flex-col md:flex-row gap-2 items-stretch md:items-center bg-white p-2 rounded-md border border-border/40 shadow-sm">
        <div className="flex gap-4 flex-1 items-center">
          {/* MODO ACCIÓN */}
          {actionLabel && (
            <Button
              size="sm"
              onClick={onActionClick}
              className="rounded-md px-3 font-black text-[10px] uppercase gradient-primary h-9 whitespace-nowrap shrink-0"
            >
              <ActionIcon size={14} className="mr-1.5" /> {actionLabel}
            </Button>
          )}

          {/* MODO TÍTULO */}
          {title && (
            <div className="flex gap-2 items-center px-2 shrink-0">
              {TitleIcon && (
                <div className="w-8 h-8 rounded-md bg-primary/10 flex items-center justify-center text-primary shrink-0">
                  <TitleIcon size={16} />
                </div>
              )}
              <div className="min-w-0">
                <h3 className="text-xs font-black text-foreground uppercase tracking-widest leading-none">
                  {title}
                </h3>
                {description && (
                  <p className="text-[9px] font-bold text-muted-foreground uppercase tracking-tighter mt-0.5 truncate">
                    {description}
                  </p>
                )}
              </div>
            </div>
          )}

          {/* BUSCADOR */}
          {showSearch && (
            <div className="relative flex-1 flex gap-1">
              <div className="relative flex-1">
                <Search
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground/50"
                  size={14}
                />
                <input
                  type="text"
                  placeholder={searchPlaceholder}
                  value={localSearch}
                  onChange={(e) => setLocalSearch(e.target.value)}
                  onKeyDown={handleKeyDown}
                  className="w-full pl-9 pr-4 py-1.5 bg-muted/20 border-none rounded-md focus:outline-none focus:ring-1 focus:ring-primary/20 focus:bg-white transition-all font-bold text-xs h-9"
                />
              </div>
              <Button
                size="sm"
                variant="primary"
                onClick={() => onSearch(localSearch)}
                className="rounded-md h-9 px-4 font-black text-[10px] uppercase shrink-0 shadow-md shadow-primary/20"
                icon={<Search size={12} />}
              >
                Buscar
              </Button>
            </div>
          )}
        </div>

        <div className="flex items-center gap-2">
          {extraActions}
          
          {showFilter && (
            <Button
              variant="ghost"
              size="sm"
              onClick={onFilterClick}
              className="rounded-md px-3 font-black text-[10px] uppercase h-9 border border-border/40 text-muted-foreground hover:bg-muted"
            >
              <Filter className="w-3.5 h-3.5 mr-1.5" /> Filtros
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
