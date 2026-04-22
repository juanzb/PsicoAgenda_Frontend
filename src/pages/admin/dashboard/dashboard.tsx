import { useOutletContext } from "react-router";
import type { ReactNode } from "react";
import { CradItemDashboard } from "../../../components/admin/dashboard/CradItemDashboard";
import {
  Users,
  Calendar,
  TrendingUp,
  Activity,
  Clock,
  Brain,
  ArrowUpRight,
  ChevronRight,
  CheckCircle2,
  AlertTriangle,
  Play,
} from "lucide-react";
import { Button } from "../../../components/ui/button/Button";

interface ContextType {
  handleStartSession: (id: string, name: string) => void;
}

export function DashboardPage(): ReactNode {
  const { handleStartSession } = useOutletContext<ContextType>();

  return (
    <div className="space-y-6 animate-in fade-in duration-700">
      {/* 1. MÉTRICAS CLAVE (KPIs) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-3">
        <CradItemDashboard
          name="Pacientes Activos"
          icon={<Users size={18} />}
          value="1,284"
          trend={{ value: 12, isUp: true }}
        />
        <CradItemDashboard
          name="Tasa de Asistencia"
          icon={<TrendingUp size={18} />}
          value="92.4%"
          trend={{ value: 3.2, isUp: true }}
        />
        <CradItemDashboard
          name="Sesiones Mes"
          icon={<Calendar size={18} />}
          value="156"
          trend={{ value: 8, isUp: false }}
        />
        <CradItemDashboard
          name="Nivel de Carga"
          icon={<Activity size={18} />}
          value="78%"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* 2. ANALÍTICA DE CARGA DE TRABAJO */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white border border-border/40 p-6 rounded-xl shadow-sm">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h3 className="text-sm font-black text-foreground uppercase tracking-widest">
                  Actividad Semanal
                </h3>
                <p className="text-[10px] font-bold text-muted-foreground uppercase mt-1">
                  Volumen de sesiones por día
                </p>
              </div>
              <select className="text-[10px] font-black uppercase bg-muted/50 border-none rounded-sm px-2 py-1 outline-none">
                <option>Esta Semana</option>
                <option>Mes Pasado</option>
              </select>
            </div>

            {/* Gráfico Simulado Minimalista */}
            <div className="flex items-end justify-between h-48 gap-2 pt-4">
              {[
                { day: "Lun", val: 60 },
                { day: "Mar", val: 85 },
                { day: "Mie", val: 45 },
                { day: "Jue", val: 95 },
                { day: "Vie", val: 70 },
                { day: "Sab", val: 30 },
                { day: "Dom", val: 10 },
              ].map((d) => (
                <div
                  key={d.day}
                  className="flex-1 flex flex-col items-center gap-3 group"
                >
                  <div className="relative w-full flex justify-center">
                    <div
                      className="w-full max-w-8 bg-primary/10 rounded-t-sm group-hover:bg-primary/20 transition-all duration-500"
                      style={{ height: `${d.val}%` }}
                    />
                    <div
                      className="absolute bottom-0 w-full max-w-8 bg-primary rounded-t-sm transition-all duration-700 delay-100"
                      style={{ height: `${d.val * 0.7}%` }}
                    />
                  </div>
                  <span className="text-[9px] font-black text-muted-foreground uppercase">
                    {d.day}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* DISTRIBUCIÓN DE CONSULTAS */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-white border border-border/40 p-5 rounded-xl shadow-sm">
              <h4 className="text-[10px] font-black text-muted-foreground uppercase tracking-widest mb-4">
                Motivos de Consulta
              </h4>
              <div className="space-y-3">
                {[
                  { label: "Ansiedad / Estrés", perc: 45, color: "bg-primary" },
                  { label: "Depresión", perc: 25, color: "bg-blue-500" },
                  {
                    label: "Terapia de Pareja",
                    perc: 20,
                    color: "bg-amber-500",
                  },
                  { label: "Otros", perc: 10, color: "bg-slate-400" },
                ].map((item) => (
                  <div key={item.label} className="space-y-1">
                    <div className="flex justify-between text-[10px] font-bold uppercase">
                      <span>{item.label}</span>
                      <span>{item.perc}%</span>
                    </div>
                    <div className="h-1.5 w-full bg-muted rounded-full overflow-hidden">
                      <div
                        className={`${item.color} h-full rounded-full`}
                        style={{ width: `${item.perc}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-primary/5 border border-primary/10 p-5 rounded-xl flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 text-primary mb-2">
                  <Brain size={18} />
                  <span className="text-[10px] font-black uppercase tracking-widest">
                    IA Insights
                  </span>
                </div>
                <p className="text-xs font-bold text-foreground leading-relaxed">
                  Has tenido un incremento del 15% en consultas de{" "}
                  <span className="text-primary font-black">
                    ansiedad juvenil
                  </span>{" "}
                  este mes. Recomendamos revisar tus recursos didácticos sobre
                  este tema.
                </p>
              </div>
              <Button
                variant="ghost"
                size="sm"
                className="w-fit h-8 text-[9px] font-black uppercase tracking-widest p-0 text-primary hover:bg-transparent"
              >
                Ver reporte detallado{" "}
                <ArrowUpRight size={12} className="ml-1" />
              </Button>
            </div>
          </div>
        </div>

        {/* 3. PANEL DE CONTROL RÁPIDO (DERECHA) */}
        <div className="space-y-6">
          {/* PRÓXIMA ACCIÓN */}
          <div className="bg-white border border-border/40 p-5 rounded-xl shadow-sm">
            <h3 className="text-[10px] font-black text-muted-foreground uppercase tracking-widest mb-4">
              Siguiente Cita
            </h3>
            <div className="bg-muted/30 p-4 rounded-lg border border-border/20">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-md overflow-hidden">
                  <img src="https://i.pravatar.cc/100?img=12" alt="Patient" />
                </div>
                <div>
                  <h4 className="text-sm font-black text-foreground">
                    Carlos Rodríguez
                  </h4>
                  <p className="text-[9px] font-bold text-primary uppercase">
                    En 15 minutos (09:00 AM)
                  </p>
                </div>
              </div>
              <Button
                onClick={() => handleStartSession("P-001", "Carlos Rodríguez")}
                className="w-full h-10 rounded-md text-[10px] font-black uppercase tracking-widest gradient-primary"
                icon={<Play size={12} />}
              >
                Atender Ahora
              </Button>
            </div>
          </div>

          {/* TAREAS PENDIENTES DEL DOCTOR */}
          <div className="bg-white border border-border/40 p-5 rounded-xl shadow-sm">
            <h3 className="text-[10px] font-black text-muted-foreground uppercase tracking-widest mb-4 flex items-center justify-between">
              Pendientes
              <span className="bg-amber-500 text-white px-2 py-0.5 rounded-full text-[8px]">
                3
              </span>
            </h3>
            <div className="space-y-3">
              {[
                {
                  task: "Firmar nota de Ana Silva",
                  icon: <CheckCircle2 size={14} />,
                  status: "urgent",
                },
                {
                  task: "Revisar test de Roberto G.",
                  icon: <Clock size={14} />,
                  status: "normal",
                },
                {
                  task: "Cargar historial de Carlos R.",
                  icon: <AlertTriangle size={14} />,
                  status: "warning",
                },
              ].map((t, i) => (
                <div
                  key={i}
                  className="flex items-center gap-3 p-2 hover:bg-muted/30 rounded-md transition-all cursor-pointer group"
                >
                  <div
                    className={`shrink-0 ${t.status === "urgent" ? "text-rose-500" : t.status === "warning" ? "text-amber-500" : "text-primary"}`}
                  >
                    {t.icon}
                  </div>
                  <span className="text-[11px] font-bold text-foreground group-hover:translate-x-1 transition-transform">
                    {t.task}
                  </span>
                  <ChevronRight
                    size={12}
                    className="ml-auto text-muted-foreground/30"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* ACCESO RÁPIDO A AGENDA COMPLETA */}
          <div className="bg-slate-900 p-6 rounded-xl text-white relative overflow-hidden group">
            <div className="relative z-10">
              <h4 className="text-xs font-black uppercase tracking-widest mb-2">
                Agenda Completa
              </h4>
              <p className="text-[10px] text-white/60 mb-4 font-bold">
                Revisa todos tus compromisos para los próximos días.
              </p>
              <Button
                variant="outline"
                className="h-9 border-white/20 text-white hover:bg-white hover:text-slate-900 rounded-md text-[10px] font-black uppercase tracking-widest w-full"
              >
                Ir al Calendario
              </Button>
            </div>
            <Calendar
              size={80}
              className="absolute -bottom-4 -right-4 text-white/5 group-hover:scale-110 transition-transform duration-700"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
