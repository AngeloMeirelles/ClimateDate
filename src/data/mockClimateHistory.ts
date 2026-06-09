export type EventType = "tempestade" | "enchente" | "onda_de_calor" | "seca" | "vendaval" | "deslizamento";
export type EventSeverity = "baixo" | "medio" | "alto" | "critico";

export interface ClimateEvent {
  id: string;
  date: string;
  region: string;
  type: EventType;
  severity: EventSeverity;
  title: string;
  impact: string;
  affectedPeople: number;
  recommendation: string;
}

export const eventTypeConfig: Record<EventType, { label: string; color: string; bg: string }> = {
  tempestade: { label: "Tempestade", color: "text-purple-400", bg: "bg-purple-500/15" },
  enchente: { label: "Enchente", color: "text-blue-400", bg: "bg-blue-500/15" },
  onda_de_calor: { label: "Onda de Calor", color: "text-orange-400", bg: "bg-orange-500/15" },
  seca: { label: "Seca", color: "text-amber-400", bg: "bg-amber-500/15" },
  vendaval: { label: "Vendaval", color: "text-cyan-400", bg: "bg-cyan-500/15" },
  deslizamento: { label: "Deslizamento", color: "text-red-400", bg: "bg-red-500/15" },
};

export const climateHistory: ClimateEvent[] = [
  { id: "h1", date: "2026-05-18", region: "Rio de Janeiro", type: "tempestade", severity: "critico", title: "Tempestade severa com granizo", impact: "Queda de energia em 12 bairros, 3 vias interditadas", affectedPeople: 180000, recommendation: "Busque abrigo seguro imediatamente" },
  { id: "h2", date: "2026-05-16", region: "Manaus", type: "enchente", severity: "alto", title: "Enchente no córrego Aricanduva", impact: "Alagamento de 8 ruas, 2 escolas fechadas", affectedPeople: 95000, recommendation: "Evite áreas ribeirinhas e passagens alagadas" },
  { id: "h3", date: "2026-05-14", region: "São Paulo", type: "onda_de_calor", severity: "alto", title: "Onda de calor extremo — 39°C", impact: "Aumento de 40% nos atendimentos de emergência", affectedPeople: 320000, recommendation: "Hidrate-se e evite exposição solar entre 10h e 16h" },
  { id: "h4", date: "2026-05-10", region: "Brasília", type: "seca", severity: "medio", title: "Baixa umidade — 15%", impact: "Risco de incêndios, problemas respiratórios", affectedPeople: 390000, recommendation: "Use umidificadores e beba bastante água" },
  { id: "h5", date: "2026-05-07", region: "Porto Alegre", type: "vendaval", severity: "medio", title: "Vendaval com rajadas de 70 km/h", impact: "Queda de árvores, destelhamentos pontuais", affectedPeople: 150000, recommendation: "Recolha objetos soltos em áreas externas" },
  { id: "h6", date: "2026-04-28", region: "Rio de Janeiro", type: "enchente", severity: "critico", title: "Transbordamento do Rio Tietê", impact: "Evacuação de 340 famílias, 5 abrigos ativados", affectedPeople: 60000, recommendation: "Siga orientações da Defesa Civil para evacuação" },
  { id: "h7", date: "2026-04-22", region: "Manaus", type: "deslizamento", severity: "critico", title: "Deslizamento de terra em encosta", impact: "3 residências destruídas, interdição de via", affectedPeople: 8000, recommendation: "Evacue áreas de encosta durante chuvas fortes" },
  { id: "h8", date: "2026-04-15", region: "São Paulo", type: "tempestade", severity: "alto", title: "Tempestade com raios e chuva intensa", impact: "Semáforos inoperantes, trânsito paralisado", affectedPeople: 200000, recommendation: "Evite deslocamentos desnecessários" },
  { id: "h9", date: "2026-04-10", region: "Brasília", type: "vendaval", severity: "baixo", title: "Ventos moderados de 50 km/h", impact: "Galhos caídos, interrupção pontual de energia", affectedPeople: 45000, recommendation: "Mantenha distância de árvores e outdoors" },
  { id: "h10", date: "2026-04-05", region: "Porto Alegre", type: "onda_de_calor", severity: "medio", title: "Temperatura de 36°C por 2 dias", impact: "Aumento na demanda de água e energia", affectedPeople: 450000, recommendation: "Economize água e evite uso de chuveiro elétrico em horário de pico" },
  { id: "h11", date: "2026-03-28", region: "Rio de Janeiro", type: "tempestade", severity: "alto", title: "Chuva forte acumulada de 80mm em 2h", impact: "Pontos de alagamento, metrô com atrasos", affectedPeople: 300000, recommendation: "Use transporte alternativo e evite áreas baixas" },
  { id: "h12", date: "2026-03-20", region: "Manaus", type: "enchente", severity: "medio", title: "Acúmulo de água em vias principais", impact: "Trânsito lento, desvios necessários", affectedPeople: 120000, recommendation: "Não tente atravessar alagamentos com veículos" },
  { id: "h13", date: "2026-03-12", region: "São Paulo", type: "seca", severity: "baixo", title: "Umidade abaixo de 30% por 3 dias", impact: "Desconforto respiratório em idosos e crianças", affectedPeople: 100000, recommendation: "Mantenha ambientes umidificados" },
  { id: "h14", date: "2026-03-05", region: "Brasília", type: "tempestade", severity: "medio", title: "Chuva moderada com trovoadas", impact: "Quedas de energia isoladas", affectedPeople: 80000, recommendation: "Desligue aparelhos da tomada durante a tempestade" },
  { id: "h15", date: "2026-02-20", region: "Porto Alegre", type: "enchente", severity: "alto", title: "Enchente relâmpago após chuva de 60mm", impact: "Comércio alagado, veículos submersos", affectedPeople: 75000, recommendation: "Evite estacionar em áreas alagáveis" },
];

export const eventsByMonth = [
  { month: "Jan", total: 2, critico: 0, alto: 1, medio: 1, baixo: 0 },
  { month: "Fev", total: 3, critico: 0, alto: 1, medio: 1, baixo: 1 },
  { month: "Mar", total: 4, critico: 0, alto: 1, medio: 2, baixo: 1 },
  { month: "Abr", total: 4, critico: 1, alto: 1, medio: 1, baixo: 1 },
  { month: "Mai", total: 5, critico: 1, alto: 2, medio: 1, baixo: 0 },
];
