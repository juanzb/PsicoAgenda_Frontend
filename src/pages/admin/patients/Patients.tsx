import { useState, useMemo, type ReactNode } from "react";
import { UserPlus, Search, Filter } from "lucide-react";
import { Button } from "../../../components/ui/button/Button";
import { Pagination } from "../../../components/ui/pagination/Pagination";
import {
  CardPatients,
} from "../../../components/admin/patients/CardPatients";
import { PatientDetail } from "../../../components/admin/patients/PatientDetail";
import { PatientModal } from "../../../components/admin/patients/PatientModal";
import { mockStorage, type IMockPatient } from "../../../services/mockStorage";

export function PatientsPage(): ReactNode {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [selectedPatient, setSelectedPatient] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Cargar desde storage
  const patients = mockStorage.getPatients();

  const filteredPatients = useMemo(() => {
    return patients.filter((p) =>
      p.name.toLowerCase().includes(searchTerm.toLowerCase()),
    );
  }, [patients, searchTerm]);

  const paginatedPatients = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredPatients.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredPatients, currentPage, itemsPerPage]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  const handleSavePatient = (data: any) => {
    mockStorage.addPatient(data);
    setIsModalOpen(false);
  };

  return (
    <div className="h-full w-full max-w-400 mx-auto grid grid-rows-[auto_1fr_auto] overflow-hidden relative p-1">
      {/* 1. SECCIÓN SUPERIOR: FILTROS */}
      <div className="pb-3 shrink-0">
        <div className="flex flex-col md:flex-row gap-2 items-stretch md:items-center bg-white p-2 rounded-md border border-border/40 shadow-sm">
          <div className="flex gap-2 flex-1">
            <Button
              size="sm"
              onClick={() => setIsModalOpen(true)}
              className="rounded-md px-3 font-black text-[10px] uppercase gradient-primary h-9 whitespace-nowrap"
            >
              <UserPlus size={14} className="mr-1.5" /> Nuevo Paciente
            </Button>

            <div className="relative flex-1">
              <Search
                className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground/50"
                size={14}
              />
              <input
                type="text"
                placeholder="Buscar por nombre..."
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
        {paginatedPatients.length > 0 ? (
          <div className="flex flex-col gap-1.5 pb-2">
            {paginatedPatients.map((patient) => (
              <CardPatients
                key={patient.id}
                patient={patient as any}
                isSelected={selectedPatient?.id === patient.id}
                onOpenDetail={setSelectedPatient}
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
            totalItems={filteredPatients.length}
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
      {selectedPatient && (
        <PatientDetail
          patient={selectedPatient}
          onClose={() => setSelectedPatient(null)}
        />
      )}

      <PatientModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSavePatient}
      />
    </div>
  );
}
