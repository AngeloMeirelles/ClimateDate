# ClimateDate - Monitoramento Climático Inteligente

> **Protótipo Acadêmico Fictício** — Este projeto foi desenvolvido como parte de um trabalho da disciplina de Engenharia de Software. Todos os dados exibidos são fictícios/mockados e não representam informações climáticas reais.

## Sobre o Projeto

O ClimateDate é uma plataforma de visualização inteligente de impactos climáticos locais. A proposta do sistema é reunir informações climáticas de forma acessível, visual e intuitiva para cidadãos, pesquisadores e gestores públicos, auxiliando na compreensão de dados climáticos, prevenção de riscos ambientais e apoio à tomada de decisão.

## Tecnologias Utilizadas

- **Next.js 16.2.6** — Framework React com App Router
- **React 19** — Biblioteca de UI
- **TypeScript** — Tipagem estática
- **TailwindCSS v4** — Estilização utilitária
- **Recharts** — Gráficos e visualizações de dados
- **Leaflet + react-leaflet v5** — Mapa interativo real (tiles CartoDB Dark Matter, sem API key)
- **Lucide React** — Biblioteca de ícones
- **localStorage** — Persistência de dados e autenticação simulada

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

## Deploy

A aplicação está deployada na Vercel:

**URL de Produção:** https://climate-date-chi.vercel.app

Para fazer novo deploy:
```bash
npx vercel --prod --yes
```

## Telas do Sistema (16 telas)

| # | Tela | Rota | Descrição |
|---|------|------|-----------|
| 1 | **Landing Page** | `/` | Página inicial com apresentação do sistema, features e CTAs |
| 2 | **Login** | `/login` | Autenticação fictícia (aceita qualquer e-mail/senha) |
| 3 | **Cadastro** | `/register` | Registro com escolha de tipo de conta (comum/avançada) |
| 4 | **Dashboard** | `/dashboard` | 6 indicadores climáticos, 5 gráficos, simulação em tempo real, locais monitorados |
| 5 | **Mapa Climático** | `/mapa` | Mapa Leaflet do Brasil inteiro, busca qualquer cidade, clique em qualquer ponto, 4 camadas de dados, geolocalização |
| 6 | **Alertas** | `/alertas` | 8 alertas mockados com filtros por severidade, cards expandíveis |
| 7 | **Notificações** | `/notificacoes` | 10 notificações com sistema de prioridade (urgente/alta/média/baixa), filtros por tipo, status e prioridade, marcar como lida |
| 8 | **Comparador** | `/comparador` | Comparação de 6 métricas entre 2 cidades, gráficos, texto interpretativo |
| 9 | **Histórico Climático** | `/historico` | Timeline de 15 eventos, gráfico por mês, filtros por região e tipo |
| 10 | **Relatórios** | `/relatorios` | 4 relatórios, exportação CSV/JSON, resumo executivo modal (conta avançada) |
| 11 | **Gestão Pública** | `/gestao` | Ranking de risco, stats, 6 ações recomendadas (conta avançada) |
| 12 | **Reportar Ocorrência** | `/ocorrencias` | Formulário (6 tipos, urgência, região), lista com status progressivo |
| 13 | **Educação Ambiental** | `/educacao` | 8 cards educativos, 5 categorias, busca, dicas expandíveis |
| 14 | **Contatos Públicos** | `/contatos` | 4 contatos de serviços públicos (Defesa Civil, Bombeiros, etc.) |
| 15 | **Reciclagem** | `/reciclagem` | 6 pontos de coleta, filtro por 12 tipos de resíduo |
| 16 | **Perfil** | `/perfil` | Header com banner/avatar editável, 3 abas (Geral, Preferências, Dados), stats, gerenciamento de favoritos, zona de perigo |

## Funcionalidades

### Mapa Climático (Leaflet)
- Mapa real do Brasil com tiles CartoDB Dark Matter (tema escuro, sem API key)
- Busca de qualquer cidade brasileira via Nominatim (OpenStreetMap)
- Clique em qualquer ponto do mapa para gerar dados climáticos
- Gerador determinístico de dados mockados baseado em latitude/longitude (`generateClimateData()`)
- 5 cidades em destaque com marcadores: São Paulo, Rio de Janeiro, Brasília, Manaus, Porto Alegre
- 4 camadas alternáveis: Nível de Risco, Temperatura, Qualidade do Ar, Risco de Enchente
- Legenda dinâmica mostrando locais monitorados (favoritos) do usuário
- Botão de geolocalização, popups customizados, skeleton loading
- Painel de detalhes com 8 métricas, previsão, alertas, coordenadas

### Dashboard
- 6 indicadores: Temperatura, Umidade, Índice UV, Qualidade do Ar, Risco de Enchente, Prob. Tempestade
- 5 gráficos Recharts (diferenciados por tipo de conta)
- Simulação de tempo real: botão que varia indicadores + log de atualizações
- Seção "Meus Locais Monitorados" com dados dos favoritos

### Sistema de Favoritos
- Favoritar qualquer local (cidades em destaque OU locais buscados/clicados no mapa)
- Salva objetos `Region` completos no localStorage (não apenas IDs)
- Visualizar favoritos no mapa (legenda), dashboard e perfil
- Remover favoritos no perfil

### Perfil Completo
- Header com banner gradiente, avatar com 6 cores alternáveis, edição inline de nome/e-mail
- 4 cards de estatísticas: locais monitorados, ocorrências, exportações, notificações
- 3 abas: Geral (config + favoritos), Preferências (notificações + exibição + atalhos), Dados e Privacidade (resumo de dados + zona de perigo)
- Limpar dados locais com confirmação, logout

### Busca Global (Ctrl+K)
- Modal de busca na sidebar que pesquisa em regiões, alertas, relatórios, educação e reciclagem
- Atalho de teclado Ctrl+K / Cmd+K

### Autenticação Simulada
- Login aceita qualquer e-mail/senha
- Cadastro permite escolher tipo de conta
- Dois tipos: Conta Comum e Conta Avançada
- Alternável no perfil para fins de demonstração

### Controle de Acesso
- **Conta Comum**: dashboard, mapa, alertas, notificações, comparador, histórico, ocorrências, educação, contatos, reciclagem, perfil
- **Conta Avançada**: tudo acima + relatórios completos + painel de gestão pública + gráficos detalhados no dashboard

## Dados Fictícios (src/data/)

| Arquivo | Conteúdo |
|---------|----------|
| `mockClimateData.ts` | Indicadores, temperaturas, chuvas, qualidade do ar, previsão horária, comparação regional |
| `mockAlerts.ts` | 8 alertas com severidade, região, recomendações (São Paulo, Rio, Brasília, Manaus, Porto Alegre) |
| `mockRegions.ts` | 5 cidades em destaque com coordenadas reais + `generateClimateData()` para qualquer ponto |
| `mockReports.ts` | 4 relatórios climáticos com dados tabulares |
| `mockRecyclingPoints.ts` | 6 pontos de reciclagem com tipos de resíduo |
| `mockContacts.ts` | 4 contatos de serviços públicos |
| `mockEducation.ts` | 8 conteúdos educativos em 5 categorias |
| `mockNotifications.ts` | 10 notificações em 5 tipos com sistema de prioridade |
| `mockClimateHistory.ts` | 15 eventos históricos + agregação por mês |
| `mockPublicManagement.ts` | Ranking de risco, ações recomendadas, stats de gestão |
| `mockOccurrences.ts` | Tipos, status e configurações de ocorrências |

## Persistência Local (localStorage)

| Chave | Conteúdo | Formato |
|-------|----------|---------|
| `climatedate_user` | Dados do usuário logado | `User` object |
| `climatedate_favorites` | Locais monitorados | `Region[]` (objetos completos) |
| `climatedate_notifications` | Estado das notificações | `Notification[]` |
| `climatedate_occurrences` | Ocorrências registradas | `Occurrence[]` |
| `climatedate_export_count` | Contador de exportações | `number` (string) |

## Componentes Reutilizáveis (src/components/)

| Componente | Uso |
|------------|-----|
| `Sidebar.tsx` | Navegação lateral com 13 itens, busca global (Ctrl+K), contador de notificações, seção do usuário |
| `ClimateMap.tsx` | Mapa Leaflet completo (dynamic import com ssr:false), camadas, busca, legenda de favoritos |
| `IndicatorCard.tsx` | Card de indicador climático com ícone, valor, tendência |
| `ChartCard.tsx` | Wrapper glass para gráficos Recharts |
| `AlertCard.tsx` | Card expandível de alerta com severidade e recomendações |
| `RiskBadge.tsx` | Badge de nível de risco (baixo/médio/alto/crítico) |
| `PageHeader.tsx` | Cabeçalho de página com título, descrição e ação |
| `StatSummaryCard.tsx` | Card de estatística resumida com ícone |
| `EmptyState.tsx` | Estado vazio reutilizável com ícone, título, descrição e ação |
| `AccessBlocked.tsx` | Tela de acesso bloqueado para conta comum (link para upgrade) |
| `FavoriteButton.tsx` | Botão de favoritar/desfavoritar com estrela |
| `SearchModal.tsx` | Modal de busca global com resultados categorizados |

## Estrutura de Pastas

```
climate-date/
├── src/
│   ├── app/
│   │   ├── page.tsx                    # Landing page
│   │   ├── layout.tsx                  # Layout raiz (AuthProvider, fonts)
│   │   ├── globals.css                 # Tema escuro, glassmorphism, scrollbar, recharts
│   │   ├── login/page.tsx              # Login (split-screen)
│   │   ├── register/page.tsx           # Cadastro (split-screen, seletor de conta)
│   │   └── (app)/                      # Grupo autenticado
│   │       ├── layout.tsx              # Auth guard + Sidebar
│   │       ├── dashboard/page.tsx      # Dashboard principal
│   │       ├── mapa/page.tsx           # Mapa Leaflet (dynamic import)
│   │       ├── alertas/page.tsx        # Alertas climáticos
│   │       ├── notificacoes/page.tsx   # Central de notificações
│   │       ├── comparador/page.tsx     # Comparador entre cidades
│   │       ├── historico/page.tsx      # Histórico/timeline
│   │       ├── relatorios/page.tsx     # Relatórios (avançada)
│   │       ├── gestao/page.tsx         # Gestão pública (avançada)
│   │       ├── ocorrencias/page.tsx    # Reportar ocorrências
│   │       ├── educacao/page.tsx       # Educação ambiental
│   │       ├── contatos/page.tsx       # Contatos públicos
│   │       ├── reciclagem/page.tsx     # Pontos de reciclagem
│   │       └── perfil/page.tsx         # Perfil (3 abas)
│   ├── __tests__/
│   │   └── alertas-regressao.test.ts   # 17 testes de regressão
│   ├── components/                     # 12 componentes reutilizáveis
│   ├── contexts/
│   │   └── AuthContext.tsx             # Auth simulada (localStorage)
│   └── data/                           # 12 arquivos de dados mockados
├── vitest.config.ts                    # Configuração do Vitest
├── package.json
├── tsconfig.json
├── next.config.ts
├── postcss.config.mjs
├── eslint.config.mjs
└── tailwind (via @tailwindcss/postcss v4)
```

## Design

## Testes de Regressão

O projeto utiliza **Vitest** para testes de regressão automatizados, garantindo que novas funcionalidades não quebrem as existentes.

```bash
# Rodar testes
npm test

# Rodar com saída detalhada
npx vitest run --reporter=verbose
```

**Arquivo:** `src/__tests__/alertas-regressao.test.ts` — 17 testes que verificam:

| Grupo | Testes | O que valida |
|-------|--------|-------------|
| Integridade dos Dados | 3 | Quantidade de alertas, campos obrigatórios, severidades válidas |
| Filtragem por Severidade | 6 | Cada filtro retorna dados corretos, soma dos filtros = total |
| Filtro de Alertas Ativos | 3 | Exclui resolvidos, combinação de filtros funciona |
| Dados para Expansão de Cards | 3 | Campos de impacto, recomendação, fonte e população |
| Resumo do Header | 2 | Contagem de ativos consistente, regiões listáveis |

## Design

- **Tema**: Escuro com glassmorphism (blur + transparência)
- **Paleta**: Violeta (#7c5cfc), Ciano (#22d3ee), Rosa (#e879f9), fundos #0f0a1e/#1a1035
- **Glassmorphism**: 3 classes utilitárias (glass, glass-strong, glass-subtle)
- **Responsivo**: Mobile-first, sidebar colapsa em hambúrguer
- **Fonte**: Geist Sans + Geist Mono
- **Idioma**: pt-BR em toda a aplicação
