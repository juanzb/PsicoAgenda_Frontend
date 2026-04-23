import { useState, useMemo, type ReactNode } from "react";
import { UserPlus, Search } from "lucide-react";
import { Pagination } from "../../../components/ui/pagination/Pagination";
import { CardDoctors } from "../../../components/admin/doctors/CardDoctors";
import { DoctorDetail } from "../../../components/admin/doctors/DoctorDetail";
import { DoctorModal } from "../../../components/admin/doctors/DoctorModal";
import { mockStorage } from "../../../services/mockStorage";
import { ViewHeader } from "../../../components/ui/view-header/ViewHeader";

export function DoctorsPage(): ReactNode {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [selectedDoctor, setSelectedDoctor] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Cargar desde storage
  const doctors = mockStorage.getDoctors();

  const filteredDoctors = useMemo(() => {
    return doctors.filter(
      (d) =>
        d.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        d.specialty.toLowerCase().includes(searchTerm.toLowerCase()),
    );
  }, [doctors, searchTerm]);

  const paginatedDoctors = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredDoctors.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredDoctors, currentPage, itemsPerPage]);

  const handleSaveDoctor = (data: any) => {
    mockStorage.addDoctor(data);
    setIsModalOpen(false);
  };

  return (
    <div className="h-full w-full max-w-400 mx-auto grid grid-rows-[auto_1fr_auto] overflow-hidden relative p-1 animate-in fade-in duration-500">
      <ViewHeader
        actionLabel="Nuevo Especialista"
        actionIcon={UserPlus}
        onActionClick={() => setIsModalOpen(true)}
        searchTerm={searchTerm}
        onSearch={(val) => {
          setSearchTerm(val);
          setCurrentPage(1);
        }}
        searchPlaceholder="Buscar por nombre o especialidad..."
      />

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
