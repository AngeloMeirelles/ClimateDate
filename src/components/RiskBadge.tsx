import type { AlertSeverity } from "@/data/mockAlerts";

const config: Record<AlertSeverity, { label: string; classes: string }> = {
  baixo: { label: "Baixo", classes: "bg-emerald-100 text-emerald-700" },
  medio: { label: "Médio", classes: "bg-amber-100 text-amber-700" },
  alto: { label: "Alto", classes: "bg-orange-100 text-orange-700" },
  critico: { label: "Crítico", classes: "bg-red-100 text-red-700" },
};

export default function RiskBadge({ level }: { level: AlertSeverity }) {
  const c = config[level];
  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wide ${c.classes}`}>
      {c.label}
    </span>
  );
}
