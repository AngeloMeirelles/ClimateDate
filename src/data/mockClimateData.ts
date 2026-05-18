export const currentIndicators = {
  temperature: { value: 32, unit: "°C", trend: "up" as const, description: "Temperatura atual" },
  humidity: { value: 68, unit: "%", trend: "down" as const, description: "Umidade relativa" },
  uvIndex: { value: 9, unit: "", trend: "up" as const, description: "Índice UV" },
  airQuality: { value: 42, unit: "AQI", trend: "stable" as const, description: "Qualidade do ar" },
  floodRisk: { value: 65, unit: "%", trend: "up" as const, description: "Risco de enchente" },
  stormProbability: { value: 40, unit: "%", trend: "up" as const, description: "Prob. tempestade" },
};

// ── Temperature ──
export const temperatureWeek = [
  { day: "Seg", temp: 28, min: 21, feelsLike: 30, humidity: 72, dewPoint: 18, avgHistoric: 26 },
  { day: "Ter", temp: 30, min: 22, feelsLike: 33, humidity: 68, dewPoint: 19, avgHistoric: 26 },
  { day: "Qua", temp: 32, min: 23, feelsLike: 35, humidity: 65, dewPoint: 20, avgHistoric: 27 },
  { day: "Qui", temp: 29, min: 20, feelsLike: 31, humidity: 70, dewPoint: 18, avgHistoric: 26 },
  { day: "Sex", temp: 31, min: 22, feelsLike: 34, humidity: 62, dewPoint: 19, avgHistoric: 27 },
  { day: "Sáb", temp: 33, min: 24, feelsLike: 37, humidity: 58, dewPoint: 21, avgHistoric: 27 },
  { day: "Dom", temp: 32, min: 23, feelsLike: 36, humidity: 60, dewPoint: 20, avgHistoric: 27 },
];

export const temperatureStats = [
  { label: "Máxima da semana", value: "33°C", detail: "Sábado, 14h" },
  { label: "Mínima da semana", value: "20°C", detail: "Quinta, 05h" },
  { label: "Amplitude média", value: "9.6°C", detail: "Diferença máx-mín" },
  { label: "Sensação térmica máx.", value: "37°C", detail: "Sábado, 14h" },
  { label: "Média histórica (Mai)", value: "26.7°C", detail: "Últimos 10 anos" },
  { label: "Desvio da média", value: "+4.1°C", detail: "Acima do esperado" },
];

// ── Rainfall ──
export const rainfallMonthly = [
  { month: "Jan", volume: 220, rainyDays: 18, avgHistoric: 200, maxDay: 45 },
  { month: "Fev", volume: 195, rainyDays: 15, avgHistoric: 180, maxDay: 38 },
  { month: "Mar", volume: 160, rainyDays: 13, avgHistoric: 150, maxDay: 32 },
  { month: "Abr", volume: 80, rainyDays: 8, avgHistoric: 75, maxDay: 22 },
  { month: "Mai", volume: 45, rainyDays: 5, avgHistoric: 55, maxDay: 15 },
  { month: "Jun", volume: 30, rainyDays: 3, avgHistoric: 40, maxDay: 12 },
  { month: "Jul", volume: 25, rainyDays: 3, avgHistoric: 30, maxDay: 10 },
  { month: "Ago", volume: 35, rainyDays: 4, avgHistoric: 35, maxDay: 14 },
  { month: "Set", volume: 55, rainyDays: 6, avgHistoric: 60, maxDay: 18 },
  { month: "Out", volume: 110, rainyDays: 10, avgHistoric: 120, maxDay: 28 },
  { month: "Nov", volume: 170, rainyDays: 14, avgHistoric: 160, maxDay: 35 },
  { month: "Dez", volume: 210, rainyDays: 17, avgHistoric: 195, maxDay: 42 },
];

export const rainfallStats = [
  { label: "Acumulado anual", value: "1.335 mm", detail: "Jan-Dez 2026" },
  { label: "Média histórica anual", value: "1.100 mm", detail: "Últimos 10 anos" },
  { label: "Desvio do acumulado", value: "+21.4%", detail: "Acima da média" },
  { label: "Mês mais chuvoso", value: "Janeiro (220mm)", detail: "18 dias de chuva" },
  { label: "Mês mais seco", value: "Julho (25mm)", detail: "3 dias de chuva" },
  { label: "Máx. em 24h (ano)", value: "45 mm", detail: "15/Jan/2026" },
];

// ── Air Quality ──
export const airQualityWeek = [
  { day: "Seg", aqi: 35, pm25: 12, pm10: 28, o3: 45, no2: 18, so2: 5, co: 0.4 },
  { day: "Ter", aqi: 42, pm25: 18, pm10: 35, o3: 52, no2: 22, so2: 7, co: 0.6 },
  { day: "Qua", aqi: 58, pm25: 28, pm10: 48, o3: 68, no2: 35, so2: 12, co: 0.9 },
  { day: "Qui", aqi: 75, pm25: 42, pm10: 62, o3: 85, no2: 45, so2: 18, co: 1.2 },
  { day: "Sex", aqi: 48, pm25: 20, pm10: 38, o3: 55, no2: 25, so2: 8, co: 0.5 },
  { day: "Sáb", aqi: 38, pm25: 14, pm10: 30, o3: 48, no2: 20, so2: 6, co: 0.4 },
  { day: "Dom", aqi: 42, pm25: 16, pm10: 32, o3: 50, no2: 21, so2: 6, co: 0.5 },
];

export const airQualityPollutants = [
  { name: "PM2.5", value: 18, unit: "µg/m³", limit: 25, status: "Bom" },
  { name: "PM10", value: 35, unit: "µg/m³", limit: 50, status: "Bom" },
  { name: "O₃ (Ozônio)", value: 52, unit: "µg/m³", limit: 100, status: "Moderado" },
  { name: "NO₂", value: 22, unit: "µg/m³", limit: 40, status: "Bom" },
  { name: "SO₂", value: 7, unit: "µg/m³", limit: 20, status: "Bom" },
  { name: "CO", value: 0.6, unit: "mg/m³", limit: 4, status: "Bom" },
];

// ── Region Comparison ──
export const regionComparison = [
  { region: "Centro", temp: 33, airQuality: 62, floodRisk: 45, humidity: 55, uvIndex: 9, windSpeed: 18 },
  { region: "Zona Norte", temp: 31, airQuality: 38, floodRisk: 70, humidity: 72, uvIndex: 7, windSpeed: 12 },
  { region: "Zona Sul", temp: 30, airQuality: 35, floodRisk: 30, humidity: 65, uvIndex: 8, windSpeed: 14 },
  { region: "Zona Leste", temp: 32, airQuality: 55, floodRisk: 60, humidity: 68, uvIndex: 8, windSpeed: 10 },
  { region: "Zona Oeste", temp: 29, airQuality: 30, floodRisk: 25, humidity: 62, uvIndex: 7, windSpeed: 16 },
];

export const regionDetailedStats = [
  { region: "Centro", population: "320 mil", alertCount: 1, riskLevel: "Alto", mainRisk: "Onda de calor", treesCoverage: "12%" },
  { region: "Zona Norte", population: "580 mil", alertCount: 2, riskLevel: "Crítico", mainRisk: "Tempestade + Enchente", treesCoverage: "18%" },
  { region: "Zona Sul", population: "450 mil", alertCount: 0, riskLevel: "Baixo", mainRisk: "Nenhum ativo", treesCoverage: "25%" },
  { region: "Zona Leste", population: "620 mil", alertCount: 1, riskLevel: "Alto", mainRisk: "Enchente", treesCoverage: "15%" },
  { region: "Zona Oeste", population: "390 mil", alertCount: 1, riskLevel: "Médio", mainRisk: "Qualidade do ar", treesCoverage: "22%" },
];

// ── Hourly Forecast ──
export const hourlyForecast = [
  { hour: "06:00", temp: 22, humidity: 85, wind: 8, feelsLike: 23, uvIndex: 0, rainProb: 10 },
  { hour: "08:00", temp: 24, humidity: 78, wind: 10, feelsLike: 26, uvIndex: 2, rainProb: 10 },
  { hour: "10:00", temp: 28, humidity: 65, wind: 12, feelsLike: 31, uvIndex: 6, rainProb: 15 },
  { hour: "12:00", temp: 31, humidity: 55, wind: 15, feelsLike: 34, uvIndex: 9, rainProb: 20 },
  { hour: "14:00", temp: 33, humidity: 48, wind: 18, feelsLike: 37, uvIndex: 10, rainProb: 35 },
  { hour: "16:00", temp: 32, humidity: 52, wind: 16, feelsLike: 36, uvIndex: 7, rainProb: 45 },
  { hour: "18:00", temp: 29, humidity: 60, wind: 12, feelsLike: 31, uvIndex: 2, rainProb: 50 },
  { hour: "20:00", temp: 26, humidity: 70, wind: 8, feelsLike: 27, uvIndex: 0, rainProb: 40 },
  { hour: "22:00", temp: 24, humidity: 78, wind: 6, feelsLike: 24, uvIndex: 0, rainProb: 25 },
];

export const hourlyStats = [
  { label: "Pico de temperatura", value: "33°C às 14h", detail: "Sensação de 37°C" },
  { label: "Pico de UV", value: "Índice 10 às 14h", detail: "Muito Alto — use protetor" },
  { label: "Maior prob. chuva", value: "50% às 18h", detail: "Pancada isolada prevista" },
  { label: "Vento máximo", value: "18 km/h às 14h", detail: "Direção: Sudeste" },
  { label: "Menor umidade", value: "48% às 14h", detail: "Abaixo do recomendado" },
  { label: "Variação térmica", value: "11°C (22-33)", detail: "Amplitude elevada" },
];
