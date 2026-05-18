import type { AlertSeverity } from "@/data/mockAlerts";

const config: Record<AlertSeverity, { label: string; classes: string }> = {
  baixo: { label: "Baixo", classes: "bg-emerald-500/20 text-emerald-300 border-emerald-500/30" },
  medio: { label: "Médio", classes: "bg-amber-500/20 text-amber-300 border-amber-500/30" },
  alto: { label: "Alto", classes: "bg-orange-500/20 text-orange-300 border-orange-500/30" },
  critico: { label: "Crítico", classes: "bg-red-500/20 text-red-300 border-red-500/30" },
};

export default function RiskBadge({ level }: { level: AlertSeverity }) {
  const c = config[level];
  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wide border ${c.classes}`}>
      {c.label}
    </span>
  );
}
