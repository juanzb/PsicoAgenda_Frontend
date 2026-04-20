import { useState, useMemo, type ReactNode } from "react";
import { UserPlus, Search, Filter } from "lucide-react";
import { Button } from "../../../components/ui/button/Button";
import { Pagination } from "../../../components/ui/pagination/Pagination";
import {
  CardPatients,
  type IPatient,
} from "../../../components/admin/patients/CardPatients";
import { PatientDetail } from "../../../components/admin/patients/PatientDetail";

// Mock de datos de pacientes
const mockPatients: IPatient[] = [
  {
    id: "1",
    name: "Carlos Andrés Mendoza",
    email: "carlos.mendoza@email.com",
    phone: "+57 310 456 7890",
    age: 34,
    lastVisit: "12 Abr, 2026",
    status: "active",
  },
  {
    id: "2",
    name: "María Fernanda Ríos",
    email: "mafe.rios@email.com",
    phone: "+57 300 123 4567",
    age: 28,
    lastVisit: "05 Abr, 2026",
    status: "active",
  },
  {
    id: "3",
    name: "Jorge Luis Holguín",
    email: "jorge.holguin@email.com",
    phone: "+57 315 987 6543",
    age: 45,
    lastVisit: "28 Mar, 2026",
    status: "on-hold",
  },
  {
    id: "4",
    name: "Lucía Pineda",
    email: "lucia.pineda@email.com",
    phone: "+57 320 555 1234",
    age: 22,
    lastVisit: "10 Ene, 2026",
    status: "completed",
  },
  {
    id: "5",
    name: "Andrés Felipe Castro",
    email: "af.castro@email.com",
    phone: "+57 301 777 8899",
    age: 31,
    lastVisit: "15 Abr, 2026",
    status: "active",
  },
  {
    id: "6",
    name: "Sofía Martínez",
    email: "sofia.mtz@email.com",
    phone: "+57 311 222 3344",
    age: 26,
    lastVisit: "02 Abr, 2026",
    status: "on-hold",
  },
  {
    id: "7",
    name: "Roberto Gómez",
    email: "roberto.g@email.com",
    phone: "+57 300 444 5555",
    age: 40,
    lastVisit: "10 Abr, 2026",
    status: "active",
  },
  {
    id: "8",
    name: "Elena Balvin",
    email: "elena.b@email.com",
    phone: "+57 312 888 9900",
    age: 37,
    lastVisit: "08 Abr, 2026",
    status: "active",
  },
  {
    id: "9",
    name: "Ricardo Arjona",
    email: "ricardo.a@email.com",
    phone: "+57 315 000 1111",
    age: 50,
    lastVisit: "01 Abr, 2026",
    status: "completed",
  },
  {
    id: "10",
    name: "Diana Turbay",
    email: "diana.t@email.com",
    phone: "+57 300 999 8888",
    age: 29,
    lastVisit: "14 Abr, 2026",
    status: "active",
  },
];

export function PatientsPage(): ReactNode {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [selectedPatient, setSelectedPatient] = useState<IPatient | null>(null);

  const filteredPatients = useMemo(() => {
    return mockPatients.filter((p) =>
      p.name.toLowerCase().includes(searchTerm.toLowerCase()),
    );
  }, [searchTerm]);

  const paginatedPatients = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredPatients.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredPatients, currentPage, itemsPerPage]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  return (
    <div className="h-full w-full max-w-400 mx-auto grid grid-rows-[auto_1fr_auto] overflow-hidden relative">
      {/* 1. SECCIÓN SUPERIOR: FILTROS (MÁS COMPACTA) */}
      <div className="pb-3 shrink-0">
        <div className="flex flex-col md:flex-row gap-2 items-stretch md:items-center bg-white p-2 rounded-xl border border-border/40 shadow-sm">
          <div className="flex gap-2 flex-1">
            <Button
              size="sm"
              className="rounded-lg px-3 font-black text-[10px] uppercase gradient-primary h-9 whitespace-nowrap"
            >
              <UserPlus size={14} className="mr-1.5" /> Nuevo
            </Button>

            <div className="relative flex-1">
              <Search
                className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground/50"
                size={14}
              />
              <input
                type="text"
                placeholder="Buscar paciente..."
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

      {/* 2. SECCIÓN CENTRAL: LISTADO (SCROLL INTERNO) */}
      <div className="overflow-y-auto custom-scrollbar pr-1 min-h-0">
        {paginatedPatients.length > 0 ? (
          <div className="flex flex-col gap-1.5 pb-2">
            {paginatedPatients.map((patient) => (
              <CardPatients
                key={patient.id}
                patient={patient}
                isSelected={selectedPatient?.id === patient.id}
                onOpenDetail={setSelectedPatient}
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

      {/* 3. SECCIÓN INFERIOR: PAGINACIÓN (ESTANDARIZADA) */}
      <div className="pt-3 shrink-0">
        <div className="bg-white p-1 rounded-xl border border-border/40 shadow-sm">
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

      {/* 4. MODAL LATERAL (DRAWER) */}

      {selectedPatient && (
        <PatientDetail
          patient={selectedPatient}
          onClose={() => setSelectedPatient(null)}
        />
      )}
    </div>
  );
}
