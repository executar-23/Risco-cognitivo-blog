# DESIGN_SYSTEM

Apontador da fonte de verdade do design system deste repositório (ADR-DS-ROOT-MIGRATION-001).
O registro legível por máquina está em `design-system.manifest.json`.

| Campo | Valor |
| --- | --- |
| SOURCE_REPOSITORY | `executar-23/Risco-cognitivo-blog` |
| SOURCE_BRANCH | `main` (ver nota abaixo) |
| SOURCE_COMMIT | `530afe1708ed24111f9b6756948908ab7e9b3afe` |
| CANONICAL_TOKEN_FILE | `src/styles/global.css` |
| COMPONENT_DIRECTORY | `src/components/ui` |
| DESIGN_SYSTEM_ROUTE | `/admin/design-system` |
| CLASSIFICATION | `SOURCE` |
| INTEGRATION_STATUS | `SOURCE_OF_TRUTH` |
| LAST_SYNC | 2026-10-01 |
| TARGET_COMMIT_BEFORE | `530afe1708ed24111f9b6756948908ab7e9b3afe` |

> Nota sobre a branch: em 2026-10-01 a default branch do GitHub da origem era
> `claude/youthful-archimedes-qksrsl` (`11f78e4`), ancestral direto da `main` (`530afe1`, 7 commits
> à frente). A `main` é a branch de integração declarada no `CLAUDE.md` da origem e traz a versão
> mais nova do design system (tokens `--area-*`, `ScrollArea` com `viewportProps`), por isso é a
> fonte usada aqui.

## Este repositório é a origem

Os demais repositórios do `executar-23` apontam para cá (ADR-DS-ROOT-MIGRATION-001). Mudanças em
tokens, componentes, plain text ou normas nascem aqui e depois são ressincronizadas nos destinos
(cada destino tem `DESIGN_SYSTEM.md` + `design-system.manifest.json` com o commit de origem).

| Item | Caminho |
| --- | --- |
| Tokens (claro/escuro, `@theme inline`) | `src/styles/global.css` (importado em `src/components/BaseHead.astro`) |
| Primitives (shadcn new-york + Radix) | `src/components/ui/` |
| Callouts | `src/components/ui/callout.tsx`, `callout-registry.ts` (ADR-02/03) |
| Plain text / ASCII | `src/components/plain/`, `src/lib/plain/` (ADR-05) |
| Galerias | `src/components/design-system/` |
| Fontes | `public/fonts/dm-sans/` |
| Configuração | `components.json` |
| Normas | `docs/design-system/` |
| Catálogo | `src/pages/admin/design-system.astro` → `/admin/design-system` |

## Destinos (2026-10-01)

| Repositório | Classificação | Status |
| --- | --- | --- |
| `executar-23/react-router-hono-fullstack-template` | COMPATIBLE_NATIVE | IMPLEMENTED_DEFAULT (`app/`) |
| `executar-23/workflows-starter-template` | COMPATIBLE_NATIVE | IMPLEMENTED_DEFAULT (`admin/`; a UI do workflow mantém paleta própria) |
| `executar-23/Blog-full-stack` | BLOCKED | ADR-001 de lá fixa Fluent UI e outra identidade |
| `executar-23/Workbook` | NON_UI | VENDORED_REFERENCE_ONLY (conflito CNF-008) |
| `executar-23/PROGAMA-LANCAMENTO` | NON_UI | VENDORED_REFERENCE_ONLY |
| `executar-23/Copiloto-ops` | NON_UI | VENDORED_REFERENCE_ONLY |
| `executar-23/ADM_Copiloto` | não inspecionado | acesso negado na sessão de migração |

## Ao mudar o design system

1. Mude aqui e valide em `/admin/design-system`.
2. Em cada destino `IMPLEMENTED_DEFAULT`, copie só os arquivos alterados, rode as checagens do
   destino e atualize `SOURCE_COMMIT`, `LAST_SYNC` e o manifesto no mesmo commit.
