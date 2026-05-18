export interface PublicContact {
  id: string;
  name: string;
  description: string;
  phone: string;
  email: string;
  icon: string;
  available: string;
}

export const publicContacts: PublicContact[] = [
  {
    id: "1",
    name: "Defesa Civil",
    description: "Prevenção e resposta a desastres naturais, emergências climáticas e situações de risco.",
    phone: "199",
    email: "defesacivil@cidade.gov.br",
    icon: "Shield",
    available: "24 horas",
  },
  {
    id: "2",
    name: "Secretaria do Meio Ambiente",
    description: "Fiscalização ambiental, denúncias de crimes ambientais e informações sobre sustentabilidade.",
    phone: "(11) 3100-2000",
    email: "meioambiente@cidade.gov.br",
    icon: "Leaf",
    available: "Seg-Sex, 08:00 - 18:00",
  },
  {
    id: "3",
    name: "Corpo de Bombeiros",
    description: "Atendimento de emergências, resgates, combate a incêndios e salvamento em enchentes.",
    phone: "193",
    email: "bombeiros@estado.gov.br",
    icon: "Flame",
    available: "24 horas",
  },
  {
    id: "4",
    name: "Central de Atendimento Climático",
    description: "Informações sobre condições climáticas, alertas vigentes e orientações preventivas para a população.",
    phone: "0800-123-4567",
    email: "clima@cidade.gov.br",
    icon: "CloudSun",
    available: "Seg-Dom, 06:00 - 22:00",
  },
];
