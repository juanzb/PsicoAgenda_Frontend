import { useState, useMemo, type ReactNode } from "react";
import { UserPlus, Search, Filter } from "lucide-react";
import { Button } from "../../../components/ui/button/Button";
import { Pagination } from "../../../components/ui/pagination/Pagination";
import {
  CardDoctors,
  type IDoctor,
} from "../../../components/admin/doctors/CardDoctors";
import { DoctorDetail } from "../../../components/admin/doctors/DoctorDetail";

// Mock de datos de doctores
const mockDoctors: IDoctor[] = [
  {
    id: "1",
    name: "Dr. Julián Arango",
    email: "julian.arango@psicoagenda.com",
    phone: "+57 310 111 2233",
    specialty: "Psicología Clínica",
    experience: 12,
    status: "active",
  },
  {
    id: "2",
    name: "Dra. Beatriz Pinzón",
    email: "beatriz.pinzon@psicoagenda.com",
    phone: "+57 300 444 5566",
    specialty: "Terapia Cognitiva",
    experience: 8,
    status: "active",
  },
  {
    id: "3",
    name: "Dr. Armando Mendoza",
    email: "armando.mendoza@psicoagenda.com",
    phone: "+57 315 777 8899",
    specialty: "Psicoanálisis",
    experience: 15,
    status: "on-vacation",
  },
  {
    id: "4",
    name: "Dra. Marcela Valencia",
    email: "marcela.v@psicoagenda.com",
    phone: "+57 320 000 1122",
    specialty: "Terapia de Pareja",
    experience: 10,
    status: "active",
  },
  {
    id: "5",
    name: "Dr. Mario Calderón",
    email: "mario.c@psicoagenda.com",
    phone: "+57 301 333 4455",
    specialty: "Psicología Organizacional",
    experience: 6,
    status: "inactive",
  },
  {
    id: "6",
    name: "Dra. Patricia Fernández",
    email: "patricia.f@psicoagenda.com",
    phone: "+57 311 666 7788",
    specialty: "Psicología Infantil",
    experience: 4,
    status: "active",
  },
];

export function DoctorsPage(): ReactNode {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [selectedDoctor, setSelectedDoctor] = useState<IDoctor | null>(null);

  const filteredDoctors = useMemo(() => {
    return mockDoctors.filter(
      (d) =>
        d.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        d.specialty.toLowerCase().includes(searchTerm.toLowerCase()),
    );
  }, [searchTerm]);

  const paginatedDoctors = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredDoctors.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredDoctors, currentPage, itemsPerPage]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  return (
    <div className="h-full w-full max-w-400 mx-auto grid grid-rows-[auto_1fr_auto] overflow-hidden relative">
      {/* 1. SECCIÓN SUPERIOR: FILTROS */}
      <div className="pb-3 shrink-0">
        <div className="flex flex-col md:flex-row gap-2 items-stretch md:items-center bg-white p-2 rounded-xl border border-border/40 shadow-sm">
          <div className="flex gap-2 flex-1">
            <Button
              size="sm"
              className="rounded-lg px-3 font-black text-[10px] uppercase gradient-primary h-9 whitespace-nowrap"
            >
              <UserPlus size={14} className="mr-1.5" /> Nuevo Doctor
            </Button>

            <div className="relative flex-1">
              <Search
                className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground/50"
                size={14}
              />
              <input
                type="text"
                placeholder="Buscar doctor o especialidad..."
                value={searchTerm}
                onChange={handleSearchChange}
                className="w-full pl-9 pr-4 py-1.5 bg-muted/20 border-none rounded-lg focus:outline-none focus:ring-1 focus:ring-primary/20 focus:bg-white transition-all font-bold text-xs h-9"
              />
            </div>
          </div>

          <Button
            variant="ghost"
            size="sm"
            className="rounded-lg px-3 font-black text-[10px] uppercase h-9 border border-border/40 text-muted-foreground hover:bg-muted"
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
                doctor={doctor}
                isSelected={selectedDoctor?.id === doctor.id}
                onOpenDetail={setSelectedDoctor}
              />
            ))}
          </div>
        ) : (
          <div className="h-full flex flex-col items-center justify-center bg-white rounded-2xl border border-dashed border-border/60">
            <Search size={24} className="text-muted-foreground/20 mb-3" />
            <h3 className="text-xs font-black text-muted-foreground uppercase tracking-widest">
              Sin resultados
            </h3>
          </div>
        )}
      </div>

      {/* 3. SECCIÓN INFERIOR: PAGINACIÓN */}
      <div className="pt-3 shrink-0">
        <div className="bg-white p-1 rounded-xl border border-border/40 shadow-sm">
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

      {/* 4. MODAL LATERAL */}

      {selectedDoctor && (
        <DoctorDetail
          doctor={selectedDoctor}
          onClose={() => setSelectedDoctor(null)}
        />
      )}
    </div>
  );
}
