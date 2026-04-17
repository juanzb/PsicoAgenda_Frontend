import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";
import type { ReactNode } from "react";
import { Button } from "../button/Button";
import { Select } from "../select/Select";

interface PaginationProps {
  currentPage: number;
  totalItems: number;
  itemsPerPage: number;
  onPageChange: (page: number) => void;
  onItemsPerPageChange: (items: number) => void;
  itemsPerPageOptions?: number[];
}

export function Pagination({
  currentPage,
  totalItems,
  itemsPerPage,
  onPageChange,
  onItemsPerPageChange,
  itemsPerPageOptions = [5, 10, 20, 50],
}: PaginationProps): ReactNode {
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const from = totalItems === 0 ? 0 : (currentPage - 1) * itemsPerPage + 1;
  const to = Math.min(currentPage * itemsPerPage, totalItems);

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-2">
      {/* 1. Indicador de registros */}
      <div className="text-[11px] font-black text-muted-foreground uppercase tracking-widest order-2 sm:order-1">
        Mostrando{" "}
        <span className="text-foreground">
          {from} - {to}
        </span>{" "}
        de <span className="text-foreground">{totalItems}</span> registros
      </div>

      <div className="flex items-center gap-6 order-1 sm:order-2">
        {/* 2. Selector de cantidad por página */}
        <div className="flex items-center gap-2">
          <span className="text-[10px] font-bold text-muted-foreground uppercase whitespace-nowrap">
            Filas por pág.
          </span>
          <Select
            options={itemsPerPageOptions.map((opt) => ({
              value: opt,
              label: opt.toString(),
            }))}
            value={itemsPerPage}
            onChange={(e) => onItemsPerPageChange(Number(e.target.value))}
            className="w-16"
          />
        </div>

        {/* 3. Controles de navegación */}
        <div className="flex items-center gap-1.5">
          <div className="flex items-center gap-1">
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 rounded-lg"
              disabled={currentPage === 1}
              onClick={() => onPageChange(1)}
            >
              <ChevronsLeft size={16} strokeWidth={3} />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 rounded-lg"
              disabled={currentPage === 1}
              onClick={() => onPageChange(currentPage - 1)}
            >
              <ChevronLeft size={16} strokeWidth={3} />
            </Button>
          </div>

          <div className="flex items-center px-3 min-w-24 justify-center">
            <span className="text-xs font-black text-foreground">
              Pág. {currentPage}{" "}
              <span className="text-muted-foreground font-medium">
                de {totalPages || 1}
              </span>
            </span>
          </div>

          <div className="flex items-center gap-1">
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 rounded-lg"
              disabled={currentPage === totalPages || totalPages === 0}
              onClick={() => onPageChange(currentPage + 1)}
            >
              <ChevronRight size={16} strokeWidth={3} />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 rounded-lg"
              disabled={currentPage === totalPages || totalPages === 0}
              onClick={() => onPageChange(totalPages)}
            >
              <ChevronsRight size={16} strokeWidth={3} />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
