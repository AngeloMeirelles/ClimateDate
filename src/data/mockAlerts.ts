export type AlertSeverity = "baixo" | "medio" | "alto" | "critico";

export interface ClimateAlert {
  id: string;
  type: string;
  title: string;
  severity: AlertSeverity;
  region: string;
  date: string;
  time: string;
  description: string;
  recommendation: string;
  active: boolean;
  impact: string;
  source: string;
  updatedAt: string;
  affectedPop: string;
}

export const alerts: ClimateAlert[] = [
  {
    id: "1",
    type: "tempestade",
    title: "Alerta de Tempestade Severa",
    severity: "critico",
    region: "Rio de Janeiro",
    date: "2026-05-18",
    time: "14:30",
    description: "Previsão de tempestade com ventos acima de 80 km/h e granizo. Possibilidade de alagamentos em áreas baixas. Rajadas de vento podem derrubar árvores e causar queda de energia em diversas localidades.",
    recommendation: "Evite sair de casa. Busque abrigo em local seguro. Não se abrigue sob árvores. Desligue aparelhos eletrônicos da tomada.",
    active: true,
    impact: "Queda de energia, alagamentos, interrupção do transporte público",
    source: "INMET / Defesa Civil",
    updatedAt: "Há 25 min",
    affectedPop: "~180.000 pessoas",
  },
  {
    id: "2",
    type: "enchente",
    title: "Risco Elevado de Enchente",
    severity: "alto",
    region: "Manaus",
    date: "2026-05-18",
    time: "12:00",
    description: "Nível dos rios acima do normal após chuvas intensas dos últimos dias. Áreas ribeirinhas em estado de atenção. Solo saturado aumenta risco de deslizamentos em encostas.",
    recommendation: "Moradores de áreas de risco devem estar preparados para evacuação. Mantenha documentos em local seguro e elevado.",
    active: true,
    impact: "Alagamento de vias, risco de deslizamento, evacuações preventivas",
    source: "Defesa Civil / CEMADEN",
    updatedAt: "Há 1 hora",
    affectedPop: "~95.000 pessoas",
  },
  {
    id: "3",
    type: "calor",
    title: "Onda de Calor Extremo",
    severity: "alto",
    region: "São Paulo",
    date: "2026-05-17",
    time: "10:00",
    description: "Temperaturas acima de 38°C previstas para os próximos 3 dias. Umidade relativa do ar abaixo de 20%. Risco elevado de desidratação e problemas respiratórios.",
    recommendation: "Beba bastante água. Evite exercícios físicos ao ar livre entre 10h e 16h. Use protetor solar. Mantenha ambientes ventilados.",
    active: true,
    impact: "Risco à saúde, aumento de atendimentos hospitalares, estresse hídrico",
    source: "INMET",
    updatedAt: "Há 3 horas",
    affectedPop: "~320.000 pessoas",
  },
  {
    id: "4",
    type: "ar",
    title: "Qualidade do Ar Comprometida",
    severity: "medio",
    region: "Brasília",
    date: "2026-05-17",
    time: "08:00",
    description: "Índice de qualidade do ar na faixa 'Ruim' (AQI 120) devido a queimadas em áreas periféricas. Concentração elevada de material particulado (PM2.5).",
    recommendation: "Pessoas com doenças respiratórias devem evitar atividades ao ar livre. Mantenha ambientes ventilados. Use máscara se necessário.",
    active: true,
    impact: "Problemas respiratórios, redução de visibilidade",
    source: "CETESB",
    updatedAt: "Há 5 horas",
    affectedPop: "~390.000 pessoas",
  },
  {
    id: "5",
    type: "tempestade",
    title: "Possibilidade de Chuva Forte",
    severity: "baixo",
    region: "Porto Alegre",
    date: "2026-05-16",
    time: "18:00",
    description: "Previsão de chuva moderada a forte no período noturno, sem risco significativo de alagamento. Ventos de até 40 km/h.",
    recommendation: "Leve guarda-chuva ao sair. Evite estacionar em áreas alagáveis. Dirija com cuidado em pistas molhadas.",
    active: false,
    impact: "Trânsito lento, poças em vias",
    source: "INMET",
    updatedAt: "Há 1 dia",
    affectedPop: "~450.000 pessoas",
  },
  {
    id: "6",
    type: "enchente",
    title: "Monitoramento de Nível do Rio",
    severity: "medio",
    region: "Rio de Janeiro",
    date: "2026-05-16",
    time: "06:00",
    description: "Rio Tietê com nível 2m acima do normal. Situação sob monitoramento contínuo. Comportas do reservatório foram abertas parcialmente.",
    recommendation: "Fique atento a comunicados da Defesa Civil. Evite áreas próximas ao leito do rio. Não atravesse pontes interditadas.",
    active: false,
    impact: "Interdição de vias ribeirinhas, risco de transbordamento",
    source: "Defesa Civil / DAEE",
    updatedAt: "Há 1 dia",
    affectedPop: "~60.000 pessoas",
  },
  {
    id: "7",
    type: "calor",
    title: "Índice UV Extremo",
    severity: "medio",
    region: "Todas",
    date: "2026-05-18",
    time: "11:00",
    description: "Índice UV previsto de 12 (extremo) entre 11h e 15h. Exposição desprotegida causa queimaduras em menos de 10 minutos.",
    recommendation: "Use protetor solar FPS 50+. Evite exposição direta ao sol no horário de pico. Use chapéu, óculos escuros e roupas com proteção UV.",
    active: true,
    impact: "Risco de queimaduras, câncer de pele, desidratação",
    source: "INPE",
    updatedAt: "Há 2 horas",
    affectedPop: "Toda a região",
  },
  {
    id: "8",
    type: "tempestade",
    title: "Ventos Fortes Previstos",
    severity: "medio",
    region: "Porto Alegre",
    date: "2026-05-18",
    time: "16:00",
    description: "Rajadas de vento de até 60 km/h previstas para o final da tarde. Risco de queda de galhos e destelhamento.",
    recommendation: "Recolha objetos soltos em áreas externas. Evite estacionar sob árvores. Mantenha distância de outdoors e estruturas frágeis.",
    active: true,
    impact: "Queda de galhos, destelhamento, queda de energia pontual",
    source: "INMET",
    updatedAt: "Há 45 min",
    affectedPop: "~150.000 pessoas",
  },
];

export const severityConfig: Record<AlertSeverity, { label: string; color: string; bg: string; border: string }> = {
  baixo: { label: "Baixo", color: "text-emerald-400", bg: "bg-emerald-500/15", border: "border-emerald-500/20" },
  medio: { label: "Médio", color: "text-amber-400", bg: "bg-amber-500/15", border: "border-amber-500/20" },
  alto: { label: "Alto", color: "text-orange-400", bg: "bg-orange-500/15", border: "border-orange-500/20" },
  critico: { label: "Crítico", color: "text-red-400", bg: "bg-red-500/15", border: "border-red-500/20" },
};

export const alertTypeIcons: Record<string, string> = {
  tempestade: "CloudLightning",
  enchente: "Waves",
  calor: "Thermometer",
  ar: "Wind",
};
