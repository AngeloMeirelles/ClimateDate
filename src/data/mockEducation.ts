export interface EducationCard {
  id: string;
  title: string;
  category: string;
  icon: string;
  summary: string;
  tips: string[];
  image: string;
}

export const educationCards: EducationCard[] = [
  {
    id: "1",
    title: "Como se Proteger em Temporais",
    category: "Emergência",
    icon: "CloudLightning",
    summary: "Saiba como agir antes, durante e depois de uma tempestade severa para garantir sua segurança.",
    tips: [
      "Procure abrigo em construções sólidas imediatamente.",
      "Evite ficar perto de janelas, árvores e postes.",
      "Desligue aparelhos eletrônicos da tomada.",
      "Não atravesse ruas alagadas, mesmo de carro.",
      "Mantenha um kit de emergência com lanterna, água e documentos.",
    ],
    image: "storm",
  },
  {
    id: "2",
    title: "O Que Fazer em Risco de Enchente",
    category: "Emergência",
    icon: "Waves",
    summary: "Procedimentos essenciais para se preparar e reagir a situações de enchente na sua região.",
    tips: [
      "Conheça as rotas de evacuação do seu bairro.",
      "Guarde documentos importantes em sacos plásticos.",
      "Suba para andares superiores se a água começar a subir.",
      "Nunca tente nadar ou andar em correntezas.",
      "Ligue para a Defesa Civil (199) em caso de emergência.",
    ],
    image: "flood",
  },
  {
    id: "3",
    title: "Cuidados em Ondas de Calor",
    category: "Saúde",
    icon: "Sun",
    summary: "Dicas para se manter saudável durante períodos de calor extremo e baixa umidade.",
    tips: [
      "Beba pelo menos 2 litros de água por dia.",
      "Evite atividades físicas entre 10h e 16h.",
      "Use protetor solar, chapéu e roupas leves.",
      "Mantenha ambientes ventilados ou com ar-condicionado.",
      "Fique atento a sinais de desidratação e insolação.",
    ],
    image: "heat",
  },
  {
    id: "4",
    title: "Como Interpretar a Qualidade do Ar",
    category: "Educação",
    icon: "Wind",
    summary: "Entenda o índice de qualidade do ar (AQI) e saiba quando tomar precauções.",
    tips: [
      "AQI 0-50: Bom — sem riscos para a saúde.",
      "AQI 51-100: Moderado — sensíveis devem ter cautela.",
      "AQI 101-150: Ruim — evite exercícios ao ar livre.",
      "AQI 151-200: Muito Ruim — limite atividades externas.",
      "AQI 200+: Perigoso — fique em ambientes fechados.",
    ],
    image: "air",
  },
  {
    id: "5",
    title: "Práticas Sustentáveis no Dia a Dia",
    category: "Sustentabilidade",
    icon: "Leaf",
    summary: "Pequenas ações diárias que fazem grande diferença para o meio ambiente e o clima.",
    tips: [
      "Separe o lixo reciclável do orgânico.",
      "Economize água: feche a torneira ao escovar os dentes.",
      "Use transporte público, bicicleta ou caminhe quando possível.",
      "Reduza o consumo de plásticos descartáveis.",
      "Plante árvores e cuide de áreas verdes próximas.",
    ],
    image: "sustainability",
  },
];
