export type NotificationType = "alerta_climatico" | "atualizacao_relatorio" | "qualidade_ar" | "risco_regiao" | "aviso_educativo";

export type NotificationPriority = "urgente" | "alta" | "media" | "baixa";

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: NotificationType;
  priority: NotificationPriority;
  date: string;
  time: string;
  region: string;
  read: boolean;
}

export const notificationTypeConfig: Record<NotificationType, { label: string; color: string; bg: string }> = {
  alerta_climatico: { label: "Alerta Climático", color: "text-red-400", bg: "bg-red-500/15" },
  atualizacao_relatorio: { label: "Atualização de Relatório", color: "text-violet-400", bg: "bg-violet-500/15" },
  qualidade_ar: { label: "Qualidade do Ar", color: "text-teal-400", bg: "bg-teal-500/15" },
  risco_regiao: { label: "Risco na Região", color: "text-orange-400", bg: "bg-orange-500/15" },
  aviso_educativo: { label: "Aviso Educativo", color: "text-cyan-400", bg: "bg-cyan-500/15" },
};

export const priorityConfig: Record<NotificationPriority, { label: string; color: string; bg: string; dot: string }> = {
  urgente: { label: "Urgente", color: "text-red-300", bg: "bg-red-500/20", dot: "bg-red-500" },
  alta: { label: "Alta", color: "text-orange-300", bg: "bg-orange-500/20", dot: "bg-orange-500" },
  media: { label: "Média", color: "text-amber-300", bg: "bg-amber-500/20", dot: "bg-amber-400" },
  baixa: { label: "Baixa", color: "text-emerald-300", bg: "bg-emerald-500/20", dot: "bg-emerald-400" },
};

export const defaultNotifications: Notification[] = [
  {
    id: "n1",
    title: "Tempestade severa se aproximando",
    message: "Previsão de tempestade com ventos acima de 80 km/h no Rio de Janeiro. Busque abrigo seguro e evite áreas abertas.",
    type: "alerta_climatico",
    priority: "urgente",
    date: "2026-05-20",
    time: "14:30",
    region: "Rio de Janeiro",
    read: false,
  },
  {
    id: "n2",
    title: "Relatório de Maio atualizado",
    message: "O Relatório de Eventos Extremos de maio/2026 foi atualizado com novos dados sobre as tempestades da última semana.",
    type: "atualizacao_relatorio",
    priority: "baixa",
    date: "2026-05-20",
    time: "10:00",
    region: "Todas",
    read: false,
  },
  {
    id: "n3",
    title: "Qualidade do ar em queda em Brasília",
    message: "O índice AQI subiu para 120 em Brasília devido a queimadas no cerrado. Evite atividades ao ar livre se tiver problemas respiratórios.",
    type: "qualidade_ar",
    priority: "alta",
    date: "2026-05-19",
    time: "08:15",
    region: "Brasília",
    read: false,
  },
  {
    id: "n4",
    title: "Risco de enchente elevado",
    message: "Manaus está com risco de enchente em 60%. Fique atento aos comunicados da Defesa Civil.",
    type: "risco_regiao",
    priority: "urgente",
    date: "2026-05-19",
    time: "06:00",
    region: "Manaus",
    read: false,
  },
  {
    id: "n5",
    title: "Novo conteúdo: Kit de Emergência",
    message: "Adicionamos um novo guia sobre como preparar um kit de emergência para situações climáticas extremas. Confira na seção de Educação Ambiental.",
    type: "aviso_educativo",
    priority: "baixa",
    date: "2026-05-18",
    time: "16:00",
    region: "Todas",
    read: true,
  },
  {
    id: "n6",
    title: "Onda de calor prevista para o Centro",
    message: "Temperaturas acima de 38°C previstas para os próximos 3 dias na região Centro. Mantenha-se hidratado e evite exposição ao sol entre 10h e 16h.",
    type: "alerta_climatico",
    priority: "alta",
    date: "2026-05-18",
    time: "09:30",
    region: "São Paulo",
    read: true,
  },
  {
    id: "n7",
    title: "Índice UV extremo registrado",
    message: "O índice UV atingiu nível 12 (extremo) hoje entre 11h e 15h. Use protetor solar FPS 50+ e evite exposição direta ao sol.",
    type: "risco_regiao",
    priority: "media",
    date: "2026-05-17",
    time: "11:00",
    region: "Todas",
    read: true,
  },
  {
    id: "n8",
    title: "Dica: Como interpretar o AQI",
    message: "Você sabia que o índice AQI acima de 100 é considerado prejudicial para grupos sensíveis? Aprenda mais na seção de Educação Ambiental.",
    type: "aviso_educativo",
    priority: "baixa",
    date: "2026-05-17",
    time: "08:00",
    region: "Todas",
    read: true,
  },
  {
    id: "n9",
    title: "Nível do rio Tietê acima do normal",
    message: "Rios da região do Rio de Janeiro estão acima do nível normal. Comportas foram abertas parcialmente. Evite áreas ribeirinhas.",
    type: "risco_regiao",
    priority: "alta",
    date: "2026-05-16",
    time: "06:00",
    region: "Rio de Janeiro",
    read: true,
  },
  {
    id: "n10",
    title: "Relatório de qualidade do ar disponível",
    message: "O relatório mensal de qualidade do ar para a região Centro está disponível para consulta e exportação.",
    type: "atualizacao_relatorio",
    priority: "baixa",
    date: "2026-05-15",
    time: "14:00",
    region: "São Paulo",
    read: true,
  },
];
