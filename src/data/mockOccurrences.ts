export type OccurrenceType = "alagamento" | "queda_arvore" | "deslizamento" | "fumaca_queimada" | "falta_energia" | "outro";
export type OccurrenceStatus = "recebido" | "em_analise" | "encaminhado" | "resolvido";
export type UrgencyLevel = "baixa" | "media" | "alta" | "critica";

export interface Occurrence {
  id: string;
  type: OccurrenceType;
  region: string;
  description: string;
  urgency: UrgencyLevel;
  status: OccurrenceStatus;
  wantsUpdates: boolean;
  createdAt: string;
  updatedAt: string;
}

export const occurrenceTypeConfig: Record<OccurrenceType, { label: string; icon: string }> = {
  alagamento: { label: "Alagamento", icon: "Waves" },
  queda_arvore: { label: "Queda de Árvore", icon: "TreePine" },
  deslizamento: { label: "Deslizamento", icon: "Mountain" },
  fumaca_queimada: { label: "Fumaça/Queimada", icon: "Flame" },
  falta_energia: { label: "Falta de Energia", icon: "ZapOff" },
  outro: { label: "Outro", icon: "HelpCircle" },
};

export const occurrenceStatusConfig: Record<OccurrenceStatus, { label: string; color: string; bg: string }> = {
  recebido: { label: "Recebido", color: "text-blue-400", bg: "bg-blue-500/15" },
  em_analise: { label: "Em Análise", color: "text-amber-400", bg: "bg-amber-500/15" },
  encaminhado: { label: "Encaminhado", color: "text-violet-400", bg: "bg-violet-500/15" },
  resolvido: { label: "Resolvido", color: "text-emerald-400", bg: "bg-emerald-500/15" },
};

export const urgencyConfig: Record<UrgencyLevel, { label: string; color: string; bg: string }> = {
  baixa: { label: "Baixa", color: "text-emerald-400", bg: "bg-emerald-500/15" },
  media: { label: "Média", color: "text-amber-400", bg: "bg-amber-500/15" },
  alta: { label: "Alta", color: "text-orange-400", bg: "bg-orange-500/15" },
  critica: { label: "Crítica", color: "text-red-400", bg: "bg-red-500/15" },
};

export const regionOptions = ["São Paulo", "Rio de Janeiro", "Brasília", "Manaus", "Porto Alegre", "Recife", "Salvador", "Curitiba", "Belo Horizonte", "Fortaleza"];
