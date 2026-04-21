import type { ReactNode } from "react";
import { TrendingUp, TrendingDown } from "lucide-react";

type TCradItemDashboardProps = {
  name: string;
  icon: ReactNode;
  value: number | string;
  trend?: {
    value: number;
    isUp: boolean;
  };
  description?: string;
};

export function CradItemDashboard({
  name,
  icon,
  value,
  trend,
  description = "vs. mes anterior",
}: TCradItemDashboardProps): ReactNode {
  return (
    <div className="bg-card p-4 rounded-lg border border-border shadow-card hover:shadow-elevated transition-all duration-300 group ">
      <div className="flex items-start justify-between mb-4">
        <div className="flex flex-col gap-1">
          <span className="text-xs font-bold uppercase tracking-widest text-primary group-hover:text-primary transition-colors">
            {name}
          </span>
          <h3 className="text-3xl font-bold text-foreground tracking-tight">
            {value}
          </h3>
        </div>
        <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary border border-primary/10 group-hover:scale-110 transition-transform">
          {icon}
        </div>
      </div>

      {trend && (
        <div className="flex items-center gap-2 mt-4">
          <div
            className={`flex items-center gap-1 px-2 py-1 rounded-lg text-[10px] font-bold ${
              trend.isUp
                ? "bg-emerald-500/10 text-emerald-600"
                : "bg-destructive/10 text-destructive"
            }`}
          >
            {trend.isUp ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
            {trend.value}%
          </div>
          <span className="text-[14px] font-medium text-muted-foreground/60">
            {description}
          </span>
        </div>
      )}
    </div>
  );
}
