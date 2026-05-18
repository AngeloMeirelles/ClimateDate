# ClimateDate - Monitoramento Climático Inteligente

> **Protótipo Acadêmico Fictício** — Este projeto foi desenvolvido como parte de um trabalho da disciplina de Engenharia de Software. Todos os dados exibidos são fictícios/mockados e não representam informações climáticas reais.

## Sobre o Projeto

O ClimateDate é uma plataforma de visualização inteligente de impactos climáticos locais. A proposta do sistema é reunir informações climáticas de forma acessível, visual e intuitiva para cidadãos, pesquisadores e gestores públicos, auxiliando na compreensão de dados climáticos, prevenção de riscos ambientais e apoio à tomada de decisão.

## Tecnologias Utilizadas

- **Next.js 16** — Framework React com App Router
- **TypeScript** — Tipagem estática
- **TailwindCSS v4** — Estilização utilitária
- **Recharts** — Gráficos e visualizações de dados
- **Lucide React** — Biblioteca de ícones
- **localStorage** — Simulação de autenticação

## Como Rodar Localmente

```bash
# 1. Acesse a pasta do projeto
cd climate-date

# 2. Instale as dependências
npm install

# 3. Inicie o servidor de desenvolvimento
npm run dev

# 4. Acesse no navegador
# http://localhost:3000
```

## Telas do Sistema

| # | Tela | Rota | Descrição |
|---|------|------|-----------|
| 1 | **Landing Page** | `/` | Página inicial com apresentação do sistema e CTAs |
| 2 | **Login** | `/login` | Autenticação fictícia (qualquer e-mail/senha) |
| 3 | **Cadastro** | `/register` | Registro com escolha de tipo de conta |
| 4 | **Dashboard** | `/dashboard` | Cards de indicadores + 4 gráficos climáticos |
| 5 | **Mapa Climático** | `/mapa` | Mapa interativo com regiões e níveis de risco |
| 6 | **Alertas** | `/alertas` | Lista de alertas com filtros por severidade |
| 7 | **Relatórios** | `/relatorios` | Relatórios com filtros e exportação CSV (conta avançada) |
| 8 | **Educação Ambiental** | `/educacao` | Cards educativos com dicas de segurança |
| 9 | **Contatos Públicos** | `/contatos` | Contatos de serviços públicos (Defesa Civil, etc.) |
| 10 | **Reciclagem** | `/reciclagem` | Pontos de coleta com filtro por tipo de resíduo |
| 11 | **Perfil** | `/perfil` | Configurações e alternância de tipo de conta |

## Dados Fictícios

Todos os dados são mockados e organizados em arquivos separados na pasta `src/data/`:

- `mockClimateData.ts` — Indicadores climáticos, temperaturas, chuvas, qualidade do ar
- `mockAlerts.ts` — Alertas climáticos com severidade e recomendações
- `mockRegions.ts` — Regiões da cidade com níveis de risco
- `mockReports.ts` — Relatórios climáticos para conta avançada
- `mockRecyclingPoints.ts` — Pontos de reciclagem e cooperativas
- `mockContacts.ts` — Contatos de serviços públicos
- `mockEducation.ts` — Conteúdo educativo ambiental

## Tipos de Conta

O sistema simula dois tipos de conta para demonstração:

- **Conta Comum**: Acesso ao dashboard, mapa, alertas, educação, contatos e reciclagem
- **Conta Avançada**: Todos os recursos + acesso completo a relatórios climáticos com exportação CSV

Você pode alternar entre os tipos na tela de Perfil (`/perfil`).

## Estrutura de Pastas

```
src/
├── app/
│   ├── page.tsx              # Landing page
│   ├── layout.tsx            # Layout raiz
│   ├── login/page.tsx        # Login
│   ├── register/page.tsx     # Cadastro
│   └── (app)/                # Grupo de rotas autenticadas
│       ├── layout.tsx        # Layout com sidebar
│       ├── dashboard/        # Dashboard climático
│       ├── mapa/             # Mapa interativo
│       ├── alertas/          # Alertas climáticos
│       ├── relatorios/       # Relatórios (conta avançada)
│       ├── educacao/         # Educação ambiental
│       ├── contatos/         # Contatos públicos
│       ├── reciclagem/       # Pontos de reciclagem
│       └── perfil/           # Perfil e configurações
├── components/               # Componentes reutilizáveis
│   ├── Sidebar.tsx
│   ├── IndicatorCard.tsx
│   ├── AlertCard.tsx
│   ├── RiskBadge.tsx
│   ├── ChartCard.tsx
│   └── PageHeader.tsx
├── contexts/
│   └── AuthContext.tsx        # Contexto de autenticação (localStorage)
└── data/                     # Dados mockados
    ├── mockClimateData.ts
    ├── mockAlerts.ts
    ├── mockRegions.ts
    ├── mockReports.ts
    ├── mockRecyclingPoints.ts
    ├── mockContacts.ts
    └── mockEducation.ts
```

## Deploy na Vercel (Futuro)

O projeto está preparado para deploy na Vercel:

```bash
# Instalar Vercel CLI
npm i -g vercel

# Fazer deploy
vercel
```

Ou conecte o repositório GitHub diretamente na Vercel para deploy automático.
