import type { ReactNode } from "react";
import { CradItemDashboard } from "../../../components/admin/dashboard/CradItemDashboard";
import { Users, Calendar, UserCheck, Activity } from "lucide-react";

export function DashboardPage(): ReactNode {
  return (
    <div className="space-y-6 animate-fade-in">
      {/* Grid de Tarjetas Compactas y Autoajustables */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-3">
        <CradItemDashboard
          name="Pacientes"
          icon={<Users size={18} />}
          value="1,284"
          trend={{ value: 12, isUp: true }}
        />
        <CradItemDashboard
          name="Citas Hoy"
          icon={<Calendar size={18} />}
          value="18"
          trend={{ value: 5, isUp: false }}
        />
        <CradItemDashboard
          name="Nuevos"
          icon={<UserCheck size={18} />}
          value="45"
          trend={{ value: 8, isUp: true }}
        />
        <CradItemDashboard
          name="Rendimiento"
          icon={<Activity size={18} />}
          value="94%"
        />
      </div>

      {/* Secciones de Contenido Secundario más discretas */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2 bg-card/40 border border-border/30 p-5 rounded-lg min-h-55 flex items-center justify-center text-muted-foreground/30 text-xs font-bold tracking-widest uppercase border-dashed">
          Actividad Semanal
        </div>
        <div className="bg-card/40 border border-border/30 p-5 rounded-lg min-h-55 flex items-center justify-center text-muted-foreground/30 text-xs font-bold tracking-widest uppercase border-dashed text-center px-8">
          Próximas Citas
        </div>
      </div>
    </div>
  );
}
