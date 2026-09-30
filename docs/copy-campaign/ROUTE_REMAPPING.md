# Remapeamento CSV → rotas reais (`EXECUTAR_UX_COPY_ROUTE_MASTER_V2.csv`)

`PROMPT-CAMPAIGN-SITE-COPY-002` v2.0.0 e o CSV mestre foram escritos assumindo um outro
stack (Starlight + `@executar/theme`, `repo_evidence` do próprio CSV aponta para
`Sas-Executar/executar-Blog`). O usuário confirmou que o repositório de produção real é
**este** (`executar-23/risco-cognitivo-blog`, Astro + React + shadcn/Radix + Cloudflare
Workers). Este documento remapeia cada `route_id` do CSV para a rota real deste
repositório, ou registra `GAP-BLOG-nnn` quando não existe equivalente — nenhuma linha é
aplicada por analogia forçada.

## Linhas `GLOBAL-*` (5)

| `record_id` | Evidência direta neste repo | Status |
|---|---|---|
| `GLOBAL-STACK-001` | `package.json` (Astro/React/Radix/shadcn), `wrangler.jsonc` (Cloudflare Workers) | DESBLOQUEADO |
| `GLOBAL-DS-001` | `docs/design-system/DS-CALLOUT-001*.md`, `DS-DATA-001.md`, `ADR-BLOG-ASCII-001.md` (ADR-02/03/04/05 do `CLAUDE.md`) | DESBLOQUEADO |
| `GLOBAL-HOME-001` | `src/pages/index.astro` existe e está no ar | DESBLOQUEADO |
| `GLOBAL-DEPLOY-001` | `wrangler.jsonc`, script `deploy`/`cf:dev` do `package.json` | DESBLOQUEADO |
| `GLOBAL-CAMPAIGN-001` | **sem evidência** — depende de `CAMPAIGN_BRIEFING` (STEP A do prompt mestre), não enviado nesta sessão | **BLOCKED_EVIDENCE** |

## Linhas `ROUTE-*` (22)

| `route_id` (CSV) | `route_url` assumida pelo CSV | área | rota real neste repo | status |
|---|---|---|---|---|
| `ROUTE-INST-001` | `/` | Institucional | `/` (`src/pages/index.astro`) | MAPPED |
| `ROUTE-BLOG-001` | `/blog/` | Artigos | `/blog/` (`src/pages/blog/index.astro`) | MAPPED |
| `ROUTE-BLOG-CAT-001` | `/blog/categoria/[slug]/` | Artigos | — sem página de categoria neste repo | `GAP-BLOG-001` |
| `ROUTE-ARTICLE-001` | A_DEFINIR (o próprio CSV já marca como lacuna) | Artigos | `/blog/[...slug]` (`src/pages/blog/[...slug].astro`) | MAPPED |
| `ROUTE-WORKSHOP-001` | `/oficinas/` | Oficinas | — não existe | `GAP-BLOG-002` |
| `ROUTE-WORKSHOP-DTL-001` | `/oficinas/[slug]/` | Oficinas | — não existe | `GAP-BLOG-003` |
| `ROUTE-MAP-001` | `/mapa-cognitivo/` | Mapa Cognitivo | — não existe | `GAP-BLOG-004` |
| `ROUTE-STORE-001` | `/loja/` | Loja | — não existe (há `/pricing/`, mas não é loja) | `GAP-BLOG-005` |
| `ROUTE-SKILLS-001` | `/loja/skills/` | Skills | — não existe nesta rota (existe `/skills/`, escopo diferente: catálogo EXECUTAR, não item de loja) | `GAP-BLOG-006` |
| `ROUTE-AGENTS-001` | `/loja/agentes/` | Agentes | — não existe | `GAP-BLOG-007` |
| `ROUTE-PROMPTS-001` | `/loja/prompts/` | Prompts | — não existe | `GAP-BLOG-008` |
| `ROUTE-EBOOKS-001` | `/loja/ebooks/` | E-books | — não existe | `GAP-BLOG-009` |
| `ROUTE-PDFS-001` | `/loja/pdfs/` | PDFs | — não existe | `GAP-BLOG-010` |
| `ROUTE-WORKBOOKS-001` | `/loja/workbooks/` | Workbooks | — não existe | `GAP-BLOG-011` |
| `ROUTE-HTML-001` | `/loja/html/` | HTML Tools | — não existe | `GAP-BLOG-012` |
| `ROUTE-ASSETS-001` | `/loja/assets/` | Assets | — não existe | `GAP-BLOG-013` |
| `ROUTE-STORE-DTL-001` | `/loja/[type]/[slug]/` | Loja | — não existe | `GAP-BLOG-014` |
| `ROUTE-EXPLORE-001` | `/explorar` | Descoberta | — não existe | `GAP-BLOG-015` |
| `ROUTE-SEARCH-001` | `/buscar` | Busca | — não existe | `GAP-BLOG-016` |
| `ROUTE-ASK-001` | `/perguntar` | Assistente | — não existe | `GAP-BLOG-017` |
| `ROUTE-SAVED-001` | `/salvos` | Biblioteca | — não existe | `GAP-BLOG-018` |
| `ROUTE-PREFS-001` | `/preferencias` | Preferências | — não existe | `GAP-BLOG-019` |
| `ROUTE-STYLE-001` | `/guia-de-estilo/` | Design System | `/admin/design-system/` (showroom oficial do ADR-02/03/04/05) | MAPPED (equivalência funcional, não literal) |

**Resumo:** 5/22 linhas `ROUTE-*` mapeadas (`ROUTE-INST-001`, `ROUTE-BLOG-001`,
`ROUTE-ARTICLE-001`, `ROUTE-STYLE-001`); 17 sem equivalente real (`GAP-BLOG-001..019`,
majoritariamente a árvore `/loja/*` e as páginas de descoberta/busca/assistente que este
repositório não tem). Nenhuma dessas 17 deve receber copy do CSV — criar essas páginas
não foi pedido nesta execução e não está no escopo confirmado (workflow + população das
rotas existentes).

## Rotas reais sem linha correspondente no CSV

`/about/`, `/contact/`, `/faq/`, `/pricing/`, `/privacy/`, `/login/`, `/signup/`,
`/admin/*` — existem no repositório mas o CSV não as cobre; ficam fora desta campanha até
uma fonte nova as endereçar.

## Bloqueio de conteúdo (Etapa C, item 8 do plano)

As 4 linhas `MAPPED` acima ainda não recebem `final_copy` do CSV **para os campos que
dependem de `campaign_brief_field`/`message_goal`/`campaign_stage`/`funnel_job`/`icp_scope`**
— sem `CAMPAIGN_BRIEFING`, aplicar esses campos seria inventar posicionamento de campanha.
Ver `STOP CONDITION` em `/admin/handoff/`.
