export type RiskLevel = "baixo" | "medio" | "alto" | "critico";

export interface Region {
  id: string;
  name: string;
  riskLevel: RiskLevel;
  temperature: number;
  feelsLike: number;
  forecast: string;
  airQuality: number;
  airQualityLabel: string;
  floodRisk: number;
  humidity: number;
  windSpeed: number;
  uvIndex: number;
  pressure: number;
  alerts: string[];
  population: string;
  coords: { x: number; y: number };
  latlng: [number, number];
  radius: number;
}

// ── Cidades em destaque (usadas no comparador, dashboard, etc.) ──
export const regions: Region[] = [
  {
    id: "sao-paulo",
    name: "São Paulo",
    riskLevel: "alto",
    temperature: 33,
    feelsLike: 37,
    forecast: "Parcialmente nublado com pancadas de chuva à tarde",
    airQuality: 62,
    airQualityLabel: "Moderado",
    floodRisk: 45,
    humidity: 55,
    windSpeed: 18,
    uvIndex: 9,
    pressure: 1013,
    alerts: ["Onda de Calor Extremo"],
    population: "12.400.000 hab.",
    coords: { x: 50, y: 45 },
    latlng: [-23.5505, -46.6333],
    radius: 8000,
  },
  {
    id: "rio-de-janeiro",
    name: "Rio de Janeiro",
    riskLevel: "critico",
    temperature: 35,
    feelsLike: 40,
    forecast: "Chuva forte com possibilidade de deslizamentos",
    airQuality: 48,
    airQualityLabel: "Bom",
    floodRisk: 72,
    humidity: 78,
    windSpeed: 14,
    uvIndex: 11,
    pressure: 1010,
    alerts: ["Alerta de Chuva Forte", "Risco de Deslizamento"],
    population: "6.750.000 hab.",
    coords: { x: 60, y: 40 },
    latlng: [-22.9068, -43.1729],
    radius: 7000,
  },
  {
    id: "brasilia",
    name: "Brasília",
    riskLevel: "medio",
    temperature: 28,
    feelsLike: 30,
    forecast: "Céu limpo, umidade muito baixa",
    airQuality: 35,
    airQualityLabel: "Bom",
    floodRisk: 15,
    humidity: 25,
    windSpeed: 12,
    uvIndex: 10,
    pressure: 1018,
    alerts: ["Umidade Baixa — Abaixo de 30%"],
    population: "3.100.000 hab.",
    coords: { x: 50, y: 30 },
    latlng: [-15.7975, -47.8919],
    radius: 6000,
  },
  {
    id: "manaus",
    name: "Manaus",
    riskLevel: "alto",
    temperature: 34,
    feelsLike: 41,
    forecast: "Pancadas de chuva à tarde, tempo abafado",
    airQuality: 55,
    airQualityLabel: "Moderado",
    floodRisk: 60,
    humidity: 88,
    windSpeed: 8,
    uvIndex: 12,
    pressure: 1008,
    alerts: ["Risco de Enchente"],
    population: "2.250.000 hab.",
    coords: { x: 25, y: 10 },
    latlng: [-3.1190, -60.0217],
    radius: 6000,
  },
  {
    id: "porto-alegre",
    name: "Porto Alegre",
    riskLevel: "baixo",
    temperature: 22,
    feelsLike: 21,
    forecast: "Parcialmente nublado, temperaturas amenas",
    airQuality: 28,
    airQualityLabel: "Bom",
    floodRisk: 20,
    humidity: 70,
    windSpeed: 20,
    uvIndex: 5,
    pressure: 1020,
    alerts: [],
    population: "1.490.000 hab.",
    coords: { x: 45, y: 80 },
    latlng: [-30.0346, -51.2177],
    radius: 5000,
  },
];

export const riskLevelConfig: Record<string, { label: string; color: string; bg: string; mapColor: string }> = {
  baixo: { label: "Baixo", color: "text-emerald-400", bg: "bg-emerald-500", mapColor: "#34d399" },
  medio: { label: "Médio", color: "text-amber-400", bg: "bg-amber-500", mapColor: "#fbbf24" },
  alto: { label: "Alto", color: "text-orange-400", bg: "bg-orange-500", mapColor: "#fb923c" },
  critico: { label: "Crítico", color: "text-red-400", bg: "bg-red-500", mapColor: "#f87171" },
};

// ── Gerador de dados climáticos mockados para QUALQUER localização ──

const forecasts = [
  "Céu limpo com sol forte durante todo o dia",
  "Parcialmente nublado com possibilidade de chuva à tarde",
  "Chuva intermitente durante o dia, melhorando à noite",
  "Nublado com pancadas de chuva isoladas",
  "Tempo firme, sem previsão de chuva",
  "Chuva moderada pela manhã, céu aberto à tarde",
  "Tempo instável com trovoadas no fim da tarde",
  "Sol entre nuvens, possibilidade de chuva rápida",
  "Céu claro, umidade relativa muito baixa",
  "Neblina pela manhã, sol a partir do meio-dia",
];

const alertPool = [
  "Onda de Calor Extremo",
  "Alerta de Chuva Forte",
  "Risco de Enchente",
  "Qualidade do Ar Comprometida",
  "Índice UV Extremo",
  "Ventos Fortes Previstos",
  "Risco de Deslizamento",
  "Umidade Baixa — Abaixo de 30%",
  "Geada Prevista",
  "Tempestade Elétrica",
];

function seededRandom(lat: number, lon: number, offset: number = 0): number {
  const seed = Math.abs(Math.sin(lat * 12.9898 + lon * 78.233 + offset) * 43758.5453);
  return seed - Math.floor(seed);
}

export function generateClimateData(lat: number, lon: number, name: string): Region {
  const r = (offset: number) => seededRandom(lat, lon, offset);

  // Temperatura influenciada pela latitude (mais ao norte do Brasil = mais quente)
  const baseTemp = lat > -10 ? 33 : lat > -20 ? 30 : lat > -25 ? 27 : 22;
  const temperature = Math.round(baseTemp + (r(1) - 0.5) * 8);
  const humidity = Math.round(40 + r(2) * 50);
  const feelsLike = Math.round(temperature + (humidity > 70 ? 3 : humidity > 50 ? 1 : -1) + (r(3) - 0.5) * 4);
  const airQuality = Math.round(15 + r(4) * 80);
  const floodRisk = Math.round(r(5) * 80);
  const windSpeed = Math.round(5 + r(6) * 25);
  const uvIndex = Math.round(3 + r(7) * 10);
  const pressure = Math.round(1005 + r(8) * 20);

  const aqiLabel = airQuality <= 50 ? "Bom" : airQuality <= 100 ? "Moderado" : "Ruim";
  const riskLevel: RiskLevel =
    floodRisk > 65 || airQuality > 90 ? "critico" :
    floodRisk > 45 || airQuality > 60 || temperature > 35 ? "alto" :
    floodRisk > 25 || airQuality > 40 ? "medio" : "baixo";

  const forecastIdx = Math.floor(r(9) * forecasts.length);
  const forecast = forecasts[forecastIdx];

  const alerts: string[] = [];
  if (temperature >= 35) alerts.push(alertPool[0]);
  if (floodRisk >= 50) alerts.push(alertPool[2]);
  if (airQuality >= 80) alerts.push(alertPool[3]);
  if (uvIndex >= 10) alerts.push(alertPool[4]);
  if (windSpeed >= 25) alerts.push(alertPool[5]);
  if (humidity < 30) alerts.push(alertPool[7]);
  if (temperature <= 5) alerts.push(alertPool[8]);

  const popEstimate = Math.round(50 + r(10) * 5000);
  const popStr = popEstimate > 1000
    ? `${(popEstimate / 1000).toFixed(1).replace(".", ",")} mi hab.`
    : `${popEstimate}.000 hab.`;

  return {
    id: `loc-${lat.toFixed(4)}-${lon.toFixed(4)}`,
    name,
    riskLevel,
    temperature,
    feelsLike,
    forecast,
    airQuality,
    airQualityLabel: aqiLabel,
    floodRisk,
    humidity,
    windSpeed,
    uvIndex,
    pressure,
    alerts,
    population: popStr,
    coords: { x: 0, y: 0 },
    latlng: [lat, lon],
    radius: 5000,
  };
}
