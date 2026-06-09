# ClimateDate — Guia para Desenvolvimento

## O que é este projeto

Protótipo acadêmico da disciplina de Engenharia de Software. Plataforma de visualização de impactos climáticos para o Brasil. Todos os dados são fictícios/mockados. Deploy em https://climate-date-chi.vercel.app

## Stack

- Next.js 16.2.6 (App Router, Turbopack)
- React 19.2.4
- TypeScript
- Tailwind CSS v4 (via @tailwindcss/postcss)
- Recharts (gráficos)
- Leaflet + react-leaflet v5 (mapa interativo, tiles CartoDB Dark Matter, sem API key)
- Lucide React (ícones)
- Vitest (testes de regressão)
- localStorage (persistência, autenticação simulada)

## Regras importantes

- **NÃO** usar APIs reais, chaves de API ou banco de dados
- **NÃO** trocar a stack principal
- **NÃO** mudar o idioma (tudo em pt-BR)
- Manter o tema escuro com glassmorphism (violeta/roxo/ciano/rosa)
- Dados mockados ficam em `src/data/mock*.ts`, nunca inline nas páginas
- Componentes reutilizáveis ficam em `src/components/`
- Autenticação simulada via `AuthContext` + localStorage
- Conta Comum vs Avançada controla acesso a Relatórios e Gestão Pública
- O mapa usa Leaflet com dynamic import (`ssr: false`) — `ClimateMap.tsx` nunca pode ser importado sem `next/dynamic`
- Favoritos salvam `Region[]` (objetos completos) no localStorage, não apenas IDs
- `generateClimateData(lat, lon, name)` em `mockRegions.ts` gera dados determinísticos para qualquer coordenada do Brasil

## Cidades em destaque (mockRegions.ts)

São Paulo, Rio de Janeiro, Brasília, Manaus, Porto Alegre — com coordenadas reais e dados fixos. Qualquer outro local usa `generateClimateData()`.

## Chaves localStorage

- `climatedate_user` — User object
- `climatedate_favorites` — Region[] (objetos completos)
- `climatedate_notifications` — Notification[]
- `climatedate_occurrences` — Occurrence[]
- `climatedate_export_count` — number (string)

## Deploy

```bash
npx vercel --prod --yes
```

Projeto Vercel: `dev-1871s-projects/climate-date`
URL: https://climate-date-chi.vercel.app

## Comandos

```bash
npm run dev      # servidor local (http://localhost:3000)
npm run build    # build de produção
npm run lint     # eslint
npm test         # testes de regressão (vitest)
```

## Testes de Regressão

Arquivo: `src/__tests__/alertas-regressao.test.ts`

17 testes automatizados que validam a funcionalidade de Alertas Climáticos:
- Integridade dos dados (campos obrigatórios, severidades válidas)
- Filtragem por severidade (Crítico, Alto, Médio, Baixo, Todos)
- Filtro de alertas ativos (apenas ativos, combinação de filtros)
- Dados para expansão de cards (impacto, recomendação, fonte)
- Resumo do header (contagem de ativos, regiões)

Para rodar com saída detalhada: `npx vitest run --reporter=verbose`
