import { useState, useMemo, type ReactNode } from "react";
import { UserPlus, Search, Filter } from "lucide-react";
import { Button } from "../../../components/ui/button/Button";
import { Pagination } from "../../../components/ui/pagination/Pagination";
import { CardDoctors } from "../../../components/admin/doctors/CardDoctors";
import { DoctorDetail } from "../../../components/admin/doctors/DoctorDetail";
import { DoctorModal } from "../../../components/admin/doctors/DoctorModal";
import { mockStorage } from "../../../services/mockStorage";

export function DoctorsPage(): ReactNode {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [selectedDoctor, setSelectedDoctor] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Cargar desde storage
  const doctors = mockStorage.getDoctors();

  const filteredDoctors = useMemo(() => {
    return doctors.filter((d) =>
      d.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      d.specialty.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [doctors, searchTerm]);

  const paginatedDoctors = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredDoctors.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredDoctors, currentPage, itemsPerPage]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  const handleSaveDoctor = (data: any) => {
    mockStorage.addDoctor(data);
    setIsModalOpen(false);
  };

  return (
    <div className="h-full w-full max-w-400 mx-auto grid grid-rows-[auto_1fr_auto] overflow-hidden relative p-1 animate-in fade-in duration-500">
      {/* 1. SECCIÓN SUPERIOR: FILTROS */}
      <div className="pb-3 shrink-0">
        <div className="flex flex-col md:flex-row gap-2 items-stretch md:items-center bg-white p-2 rounded-md border border-border/40 shadow-sm">
          <div className="flex gap-2 flex-1">
            <Button
              size="sm"
              onClick={() => setIsModalOpen(true)}
              className="rounded-md px-3 font-black text-[10px] uppercase gradient-primary h-9 whitespace-nowrap"
            >
              <UserPlus size={14} className="mr-1.5" /> Nuevo Especialista
            </Button>

            <div className="relative flex-1">
              <Search
                className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground/50"
                size={14}
              />
              <input
                type="text"
                placeholder="Buscar por nombre o especialidad..."
                value={searchTerm}
                onChange={handleSearchChange}
                className="w-full pl-9 pr-4 py-1.5 bg-muted/20 border-none rounded-md focus:outline-none focus:ring-1 focus:ring-primary/20 focus:bg-white transition-all font-bold text-xs h-9"
              />
            </div>
          </div>

          <Button
            variant="ghost"
            size="sm"
            className="rounded-md px-3 font-black text-[10px] uppercase h-9 border border-border/40 text-muted-foreground hover:bg-muted"
          >
            <Filter className="w-3.5 h-3.5 mr-1.5" /> Filtros
          </Button>
        </div>
      </div>

      {/* 2. SECCIÓN CENTRAL: LISTADO */}
      <div className="overflow-y-auto custom-scrollbar pr-1 min-h-0">
        {paginatedDoctors.length > 0 ? (
          <div className="flex flex-col gap-1.5 pb-2">
            {paginatedDoctors.map((doctor) => (
              <CardDoctors
                key={doctor.id}
                doctor={doctor as any}
                isSelected={selectedDoctor?.id === doctor.id}
                onOpenDetail={() => setSelectedDoctor(doctor)}
              />
            ))}
          </div>
        ) : (
          <div className="h-full flex flex-col items-center justify-center bg-white rounded-lg border border-dashed border-border/60">
            <Search size={24} className="text-muted-foreground/20 mb-3" />
            <h3 className="text-xs font-black text-muted-foreground uppercase tracking-widest">
              Sin resultados
            </h3>
          </div>
        )}
      </div>

      {/* 3. SECCIÓN INFERIOR: PAGINACIÓN */}
      <div className="pt-3 shrink-0">
        <div className="bg-white p-1 rounded-md border border-border/40 shadow-sm">
          <Pagination
            currentPage={currentPage}
            totalItems={filteredDoctors.length}
            itemsPerPage={itemsPerPage}
            onPageChange={setCurrentPage}
            onItemsPerPageChange={(items) => {
              setItemsPerPage(items);
              setCurrentPage(1);
            }}
            itemsPerPageOptions={[10, 20, 50]}
          />
        </div>
      </div>

      {/* MODALES */}
      {selectedDoctor && (
        <DoctorDetail
          doctor={selectedDoctor}
          onClose={() => setSelectedDoctor(null)}
        />
      )}

      <DoctorModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveDoctor}
      />
    </div>
  );
}
