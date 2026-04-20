import type { ReactNode } from "react";

export function PatientDashboardPage(): ReactNode {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Mi Panel de Paciente</h1>
      <p className="text-muted-foreground">Bienvenido a tu portal de salud emocional.</p>
    </div>
  );
}
