export interface Report {
  id: string;
  title: string;
  type: "eventos_extremos" | "qualidade_ar" | "riscos_ambientais" | "indice_uv";
  region: string;
  period: string;
  date: string;
  summary: string;
  data: { label: string; value: string | number }[];
}

export const reports: Report[] = [
  {
    id: "1",
    title: "Relatório de Eventos Extremos - Mai/2026",
    type: "eventos_extremos",
    region: "Todas",
    period: "Maio 2026",
    date: "2026-05-15",
    summary: "Foram registrados 12 eventos climáticos extremos no período, com destaque para tempestades severas no Rio de Janeiro.",
    data: [
      { label: "Total de eventos", value: 12 },
      { label: "Tempestades", value: 5 },
      { label: "Enchentes", value: 3 },
      { label: "Ondas de calor", value: 2 },
      { label: "Vendavais", value: 2 },
      { label: "Região mais afetada", value: "Rio de Janeiro" },
      { label: "Pessoas afetadas (estimativa)", value: "15.200" },
    ],
  },
  {
    id: "2",
    title: "Relatório de Qualidade do Ar - Mai/2026",
    type: "qualidade_ar",
    region: "São Paulo",
    period: "Maio 2026",
    date: "2026-05-14",
    summary: "A qualidade do ar no Centro permaneceu na faixa Moderada durante 60% do período analisado.",
    data: [
      { label: "AQI médio", value: 52 },
      { label: "AQI máximo", value: 89 },
      { label: "AQI mínimo", value: 28 },
      { label: "Dias 'Bom'", value: 6 },
      { label: "Dias 'Moderado'", value: 8 },
      { label: "Dias 'Ruim'", value: 1 },
      { label: "Principal poluente", value: "PM2.5" },
    ],
  },
  {
    id: "3",
    title: "Relatório de Riscos Ambientais - Abr/2026",
    type: "riscos_ambientais",
    region: "Manaus",
    period: "Abril 2026",
    date: "2026-04-30",
    summary: "Manaus apresentou risco elevado de enchente em 40% dos dias do mês, principalmente devido ao acúmulo pluviométrico.",
    data: [
      { label: "Dias com risco alto", value: 12 },
      { label: "Dias com risco crítico", value: 3 },
      { label: "Volume de chuva total", value: "180mm" },
      { label: "Nível máx. do rio", value: "3.2m" },
      { label: "Evacuações realizadas", value: 2 },
      { label: "Famílias assistidas", value: 340 },
    ],
  },
  {
    id: "4",
    title: "Relatório de Índice UV - Mai/2026",
    type: "indice_uv",
    region: "Todas",
    period: "Maio 2026",
    date: "2026-05-12",
    summary: "O índice UV atingiu níveis extremos (acima de 11) em 4 dias do período, requerendo alerta à população.",
    data: [
      { label: "UV médio", value: 7.5 },
      { label: "UV máximo registrado", value: 12.3 },
      { label: "Dias UV extremo", value: 4 },
      { label: "Dias UV muito alto", value: 8 },
      { label: "Dias UV alto", value: 3 },
      { label: "Horário de pico", value: "12h-14h" },
    ],
  },
];

export const reportTypes = [
  { value: "todos", label: "Todos os tipos" },
  { value: "eventos_extremos", label: "Eventos Extremos" },
  { value: "qualidade_ar", label: "Qualidade do Ar" },
  { value: "riscos_ambientais", label: "Riscos Ambientais" },
  { value: "indice_uv", label: "Índice UV" },
];

export const reportRegions = [
  { value: "todas", label: "Todas as regiões" },
  { value: "São Paulo", label: "São Paulo" },
  { value: "Rio de Janeiro", label: "Rio de Janeiro" },
  { value: "Brasília", label: "Brasília" },
  { value: "Manaus", label: "Manaus" },
  { value: "Porto Alegre", label: "Porto Alegre" },
];
