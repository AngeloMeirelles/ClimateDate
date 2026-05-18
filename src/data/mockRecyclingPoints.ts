export interface RecyclingPoint {
  id: string;
  name: string;
  address: string;
  wasteTypes: string[];
  distance: string;
  open: boolean;
  hours: string;
  phone: string;
}

export const recyclingPoints: RecyclingPoint[] = [
  {
    id: "1",
    name: "Cooperativa EcoVerde",
    address: "Rua das Palmeiras, 245 - Centro",
    wasteTypes: ["Papel", "Plástico", "Metal", "Vidro"],
    distance: "1.2 km",
    open: true,
    hours: "08:00 - 17:00",
    phone: "(11) 3456-7890",
  },
  {
    id: "2",
    name: "Ponto de Coleta Recicla+",
    address: "Av. Brasil, 1500 - Zona Norte",
    wasteTypes: ["Eletrônicos", "Pilhas", "Baterias"],
    distance: "2.8 km",
    open: true,
    hours: "09:00 - 18:00",
    phone: "(11) 3456-1234",
  },
  {
    id: "3",
    name: "Cooperativa Vida Limpa",
    address: "Rua dos Ipês, 78 - Zona Sul",
    wasteTypes: ["Papel", "Plástico", "Óleo de Cozinha"],
    distance: "3.5 km",
    open: false,
    hours: "07:00 - 16:00",
    phone: "(11) 3456-5678",
  },
  {
    id: "4",
    name: "EcoPonto Municipal Leste",
    address: "Rua Esperança, 900 - Zona Leste",
    wasteTypes: ["Entulho", "Móveis", "Podas de Árvore", "Plástico"],
    distance: "5.1 km",
    open: true,
    hours: "06:00 - 22:00",
    phone: "(11) 3456-9012",
  },
  {
    id: "5",
    name: "Reciclagem Oeste Sustentável",
    address: "Av. das Nações, 320 - Zona Oeste",
    wasteTypes: ["Papel", "Vidro", "Metal", "Plástico", "Têxtil"],
    distance: "4.3 km",
    open: true,
    hours: "08:00 - 18:00",
    phone: "(11) 3456-3456",
  },
  {
    id: "6",
    name: "Ponto Verde Centro",
    address: "Praça da República, 50 - Centro",
    wasteTypes: ["Eletrônicos", "Lâmpadas", "Pilhas"],
    distance: "0.8 km",
    open: false,
    hours: "10:00 - 16:00 (Seg-Sex)",
    phone: "(11) 3456-7777",
  },
];

export const wasteTypeOptions = [
  "Todos",
  "Papel",
  "Plástico",
  "Metal",
  "Vidro",
  "Eletrônicos",
  "Pilhas",
  "Baterias",
  "Óleo de Cozinha",
  "Entulho",
  "Têxtil",
  "Lâmpadas",
];
