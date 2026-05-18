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
}

export const alerts: ClimateAlert[] = [
  {
    id: "1",
    type: "tempestade",
    title: "Alerta de Tempestade Severa",
    severity: "critico",
    region: "Zona Norte",
    date: "2026-05-18",
    time: "14:30",
    description: "Previsão de tempestade com ventos acima de 80 km/h e granizo. Possibilidade de alagamentos em áreas baixas.",
    recommendation: "Evite sair de casa. Busque abrigo em local seguro. Não se abrigue sob árvores. Desligue aparelhos eletrônicos da tomada.",
    active: true,
  },
  {
    id: "2",
    type: "enchente",
    title: "Risco Elevado de Enchente",
    severity: "alto",
    region: "Zona Leste",
    date: "2026-05-18",
    time: "12:00",
    description: "Nível dos rios acima do normal após chuvas intensas dos últimos dias. Áreas ribeirinhas em estado de atenção.",
    recommendation: "Moradores de áreas de risco devem estar preparados para evacuação. Mantenha documentos em local seguro e elevado.",
    active: true,
  },
  {
    id: "3",
    type: "calor",
    title: "Onda de Calor Extremo",
    severity: "alto",
    region: "Centro",
    date: "2026-05-17",
    time: "10:00",
    description: "Temperaturas acima de 38°C previstas para os próximos 3 dias. Umidade relativa do ar abaixo de 20%.",
    recommendation: "Beba bastante água. Evite exercícios físicos ao ar livre entre 10h e 16h. Use protetor solar.",
    active: true,
  },
  {
    id: "4",
    type: "ar",
    title: "Qualidade do Ar Comprometida",
    severity: "medio",
    region: "Zona Oeste",
    date: "2026-05-17",
    time: "08:00",
    description: "Índice de qualidade do ar na faixa 'Ruim' devido a queimadas em áreas periféricas.",
    recommendation: "Pessoas com doenças respiratórias devem evitar atividades ao ar livre. Mantenha ambientes ventilados.",
    active: true,
  },
  {
    id: "5",
    type: "tempestade",
    title: "Possibilidade de Chuva Forte",
    severity: "baixo",
    region: "Zona Sul",
    date: "2026-05-16",
    time: "18:00",
    description: "Previsão de chuva moderada a forte no período noturno, sem risco significativo de alagamento.",
    recommendation: "Leve guarda-chuva ao sair. Evite estacionar em áreas alagáveis.",
    active: false,
  },
  {
    id: "6",
    type: "enchente",
    title: "Monitoramento de Nível do Rio",
    severity: "medio",
    region: "Zona Norte",
    date: "2026-05-16",
    time: "06:00",
    description: "Rio Tietê com nível 2m acima do normal. Situação sob monitoramento contínuo.",
    recommendation: "Fique atento a comunicados da Defesa Civil. Evite áreas próximas ao leito do rio.",
    active: false,
  },
];

export const severityConfig: Record<AlertSeverity, { label: string; color: string; bg: string; border: string }> = {
  baixo: { label: "Baixo", color: "text-emerald-700", bg: "bg-emerald-50", border: "border-emerald-200" },
  medio: { label: "Médio", color: "text-amber-700", bg: "bg-amber-50", border: "border-amber-200" },
  alto: { label: "Alto", color: "text-orange-700", bg: "bg-orange-50", border: "border-orange-200" },
  critico: { label: "Crítico", color: "text-red-700", bg: "bg-red-50", border: "border-red-200" },
};

export const alertTypeIcons: Record<string, string> = {
  tempestade: "CloudLightning",
  enchente: "Waves",
  calor: "Thermometer",
  ar: "Wind",
};
