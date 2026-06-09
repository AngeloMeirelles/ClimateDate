// ── Smart Climate Assistant Data ──
// Resumos humanos gerados pelo "assistente climático inteligente"

export interface DaySummary {
  greeting: string;
  mainSummary: string;
  details: string[];
  bestTime: string;
  icon: "sun" | "cloud" | "rain" | "storm" | "hot";
  temperature: number;
  feelsLike: number;
  condition: string;
}

export interface ComfortBlock {
  title: string;
  summary: string;
  detail: string;
  level: "comfortable" | "moderate" | "uncomfortable";
}

export interface RainBlock {
  title: string;
  summary: string;
  recommendation: string;
  hasRain: boolean;
  probability: number;
  expectedTime: string | null;
}

export interface QualityBlock {
  title: string;
  summary: string;
  recommendation: string;
  level: "good" | "moderate" | "bad";
}

export function getSmartSummary(): DaySummary {
  const hour = new Date().getHours();

  if (hour < 12) {
    return {
      greeting: "Bom dia",
      mainSummary: "Hoje está quente e abafado. Possibilidade de chuva no final da tarde.",
      details: [
        "Manhã ensolarada com aumento de nuvens ao longo do dia",
        "Umidade alta pode causar desconforto a partir das 13h",
        "Melhor horário para atividades ao ar livre: agora até 10h",
      ],
      bestTime: "Manhã (até 10h)",
      icon: "hot",
      temperature: 32,
      feelsLike: 36,
      condition: "Quente e abafado",
    };
  } else if (hour < 18) {
    return {
      greeting: "Boa tarde",
      mainSummary: "Tarde quente com possibilidade de pancadas de chuva. Leve um guarda-chuva se for sair.",
      details: [
        "Chuva pode ocorrer entre 15h e 18h",
        "Temperatura em declínio após 16h",
        "Vento moderado pode refrescar no fim da tarde",
      ],
      bestTime: "Início da noite (após 18h)",
      icon: "rain",
      temperature: 33,
      feelsLike: 37,
      condition: "Quente com pancadas",
    };
  } else {
    return {
      greeting: "Boa noite",
      mainSummary: "Noite agradável com temperaturas amenas. Sem previsão de chuva para as próximas horas.",
      details: [
        "Temperatura caindo gradualmente",
        "Céu com poucas nuvens",
        "Clima ideal para caminhada ou atividades leves",
      ],
      bestTime: "Agora (noite agradável)",
      icon: "cloud",
      temperature: 26,
      feelsLike: 28,
      condition: "Ameno e agradável",
    };
  }
}

export function getComfortBlock(): ComfortBlock {
  return {
    title: "Conforto Térmico",
    summary: "32°C com sensação de 36°C devido à umidade alta",
    detail: "A combinação de calor e umidade elevada (68%) torna o ambiente abafado. Hidrate-se frequentemente.",
    level: "uncomfortable",
  };
}

export function getRainBlock(): RainBlock {
  const hour = new Date().getHours();
  const hasRain = hour < 20;

  return {
    title: "Chuva e Alertas",
    summary: hasRain
      ? "Possibilidade moderada de chuva após 15h"
      : "Sem previsão relevante de chuva nas próximas horas",
    recommendation: hasRain
      ? "Leve guarda-chuva se for sair. Evite áreas alagáveis no fim da tarde."
      : "Pode sair tranquilo, sem necessidade de proteção contra chuva.",
    hasRain,
    probability: hasRain ? 65 : 10,
    expectedTime: hasRain ? "15h – 18h" : null,
  };
}

export function getQualityBlock(): QualityBlock {
  return {
    title: "Qualidade do Dia",
    summary: "Boa qualidade do ar e clima agradável para atividades externas pela manhã.",
    recommendation: "Aproveite o período da manhã para exercícios ao ar livre. Evite o sol forte entre 11h e 15h.",
    level: "good",
  };
}

// Smart alerts for the "Hoje" page - simplified human alerts
export interface SmartAlert {
  id: string;
  icon: "storm" | "flood" | "heat" | "wind" | "air";
  title: string;
  when: string;
  where: string;
  impact: string;
  recommendation: string;
  severity: "low" | "medium" | "high" | "critical";
}

export const smartAlerts: SmartAlert[] = [
  {
    id: "sa1",
    icon: "storm",
    title: "Tempestade forte prevista",
    when: "Entre 15h e 18h",
    where: "Rio de Janeiro",
    impact: "Pode afetar deslocamentos urbanos e causar queda de energia",
    recommendation: "Evite sair nesse horário sem necessidade. Recolha objetos soltos.",
    severity: "critical",
  },
  {
    id: "sa2",
    icon: "heat",
    title: "Calor intenso durante a tarde",
    when: "11h às 16h",
    where: "São Paulo",
    impact: "Sensação térmica acima de 38°C. Risco de desidratação.",
    recommendation: "Hidrate-se constantemente. Evite exercícios ao ar livre no pico do calor.",
    severity: "high",
  },
  {
    id: "sa3",
    icon: "wind",
    title: "Ventos fortes no fim da tarde",
    when: "A partir das 16h",
    where: "Porto Alegre",
    impact: "Rajadas de até 60 km/h. Possível queda de galhos.",
    recommendation: "Não estacione sob árvores. Recolha objetos leves de varandas.",
    severity: "medium",
  },
];
