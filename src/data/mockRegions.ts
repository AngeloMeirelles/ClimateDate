export interface Region {
  id: string;
  name: string;
  riskLevel: "baixo" | "medio" | "alto" | "critico";
  temperature: number;
  forecast: string;
  airQuality: number;
  airQualityLabel: string;
  floodRisk: number;
  alerts: string[];
  population: string;
  coords: { x: number; y: number };
}

export const regions: Region[] = [
  {
    id: "centro",
    name: "Centro",
    riskLevel: "alto",
    temperature: 33,
    forecast: "Parcialmente nublado com pancadas de chuva à tarde",
    airQuality: 62,
    airQualityLabel: "Moderado",
    floodRisk: 45,
    alerts: ["Onda de Calor Extremo"],
    population: "320.000 hab.",
    coords: { x: 50, y: 45 },
  },
  {
    id: "zona-norte",
    name: "Zona Norte",
    riskLevel: "critico",
    temperature: 31,
    forecast: "Chuva forte com possibilidade de granizo",
    airQuality: 38,
    airQualityLabel: "Bom",
    floodRisk: 70,
    alerts: ["Alerta de Tempestade Severa", "Monitoramento de Nível do Rio"],
    population: "580.000 hab.",
    coords: { x: 50, y: 15 },
  },
  {
    id: "zona-sul",
    name: "Zona Sul",
    riskLevel: "baixo",
    temperature: 30,
    forecast: "Céu limpo com possibilidade de chuva isolada à noite",
    airQuality: 35,
    airQualityLabel: "Bom",
    floodRisk: 30,
    alerts: [],
    population: "450.000 hab.",
    coords: { x: 50, y: 78 },
  },
  {
    id: "zona-leste",
    name: "Zona Leste",
    riskLevel: "alto",
    temperature: 32,
    forecast: "Nublado com chuva contínua",
    airQuality: 55,
    airQualityLabel: "Moderado",
    floodRisk: 60,
    alerts: ["Risco Elevado de Enchente"],
    population: "620.000 hab.",
    coords: { x: 82, y: 45 },
  },
  {
    id: "zona-oeste",
    name: "Zona Oeste",
    riskLevel: "medio",
    temperature: 29,
    forecast: "Parcialmente nublado",
    airQuality: 30,
    airQualityLabel: "Bom",
    floodRisk: 25,
    alerts: ["Qualidade do Ar Comprometida"],
    population: "390.000 hab.",
    coords: { x: 18, y: 45 },
  },
];

export const riskLevelConfig: Record<string, { label: string; color: string; bg: string; mapColor: string }> = {
  baixo: { label: "Baixo", color: "text-emerald-700", bg: "bg-emerald-500", mapColor: "#10b981" },
  medio: { label: "Médio", color: "text-amber-700", bg: "bg-amber-500", mapColor: "#f59e0b" },
  alto: { label: "Alto", color: "text-orange-700", bg: "bg-orange-500", mapColor: "#f97316" },
  critico: { label: "Crítico", color: "text-red-700", bg: "bg-red-500", mapColor: "#ef4444" },
};
