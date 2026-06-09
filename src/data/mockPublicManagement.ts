export interface RiskOverview {
  region: string;
  riskScore: number;
  population: string;
  activeAlerts: number;
  criticalAlerts: number;
  mainRisk: string;
  status: "normal" | "atencao" | "alerta" | "emergencia";
}

export const riskOverview: RiskOverview[] = [
  { region: "Rio de Janeiro", riskScore: 92, population: "580.000", activeAlerts: 2, criticalAlerts: 1, mainRisk: "Tempestade + Enchente", status: "emergencia" },
  { region: "Manaus", riskScore: 75, population: "620.000", activeAlerts: 1, criticalAlerts: 0, mainRisk: "Risco de Enchente", status: "alerta" },
  { region: "São Paulo", riskScore: 68, population: "320.000", activeAlerts: 1, criticalAlerts: 0, mainRisk: "Onda de Calor", status: "alerta" },
  { region: "Brasília", riskScore: 45, population: "390.000", activeAlerts: 1, criticalAlerts: 0, mainRisk: "Qualidade do Ar", status: "atencao" },
  { region: "Porto Alegre", riskScore: 22, population: "450.000", activeAlerts: 0, criticalAlerts: 0, mainRisk: "Nenhum", status: "normal" },
];

export const statusConfig: Record<string, { label: string; color: string; bg: string }> = {
  normal: { label: "Normal", color: "text-emerald-400", bg: "bg-emerald-500/15" },
  atencao: { label: "Atenção", color: "text-amber-400", bg: "bg-amber-500/15" },
  alerta: { label: "Alerta", color: "text-orange-400", bg: "bg-orange-500/15" },
  emergencia: { label: "Emergência", color: "text-red-400", bg: "bg-red-500/15" },
};

export const recommendedActions = [
  { id: "a1", action: "Acionar Defesa Civil no Rio de Janeiro", priority: "urgente", region: "Rio de Janeiro", description: "Chuva forte prevista com risco de deslizamentos. Necessário acionamento imediato para apoio à população." },
  { id: "a2", action: "Emitir comunicado público sobre onda de calor", priority: "alta", region: "São Paulo", description: "Temperaturas acima de 38°C nos próximos 3 dias. Comunicar população sobre hidratação e proteção solar." },
  { id: "a3", action: "Monitorar nível dos rios em Manaus", priority: "alta", region: "Manaus", description: "Nível acima do normal. Manter monitoramento contínuo e preparar equipes para possível evacuação." },
  { id: "a4", action: "Abrir ponto de apoio em Manaus", priority: "media", region: "Manaus", description: "Risco de enchente em 60%. Preparar abrigos temporários e kits de emergência para famílias vulneráveis." },
  { id: "a5", action: "Distribuir alertas sobre umidade baixa", priority: "media", region: "Brasília", description: "Umidade abaixo de 30%. Orientar população a se hidratar e evitar atividades ao ar livre." },
  { id: "a6", action: "Verificar estruturas em áreas de risco", priority: "baixa", region: "Porto Alegre", description: "Inspeção preventiva de encostas e áreas suscetíveis a alagamentos antes do período chuvoso." },
];

export const managementStats = {
  totalPopulationAtRisk: "1.590.000",
  criticalAlerts: 1,
  regionsAttention: 4,
  reportsIssued: 4,
};
