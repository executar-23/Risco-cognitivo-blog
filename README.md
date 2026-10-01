# Risco Cognitivo — blog

Blog e framework sobre risco cognitivo: como atenção, memória e julgamento participam da formação do
risco no trabalho, e como identificar, controlar e acompanhar esse risco.

Produção: https://risco-cognitivo-blog.hub-executar.workers.dev

## Rodar localmente

```bash
npm install
npm run dev          # servidor de desenvolvimento
npm run build        # prebuild (quick frameworks + seed do Hub) + astro build
npm run lint
npm run routes:check # hub de rotas (ADR-07)
npm run content:check
npm run test:visual  # Playwright (inclui regressão visual)
```

## Onde está cada coisa

| Caminho | Conteúdo |
|---|---|
| `src/data/editorial/seed.json` | Banco editorial canônico (CNT, ARG, EVD, TAX…). Alimenta o site e o Hub Editorial (`public/hub-editorial/seed.js`, gerado). |
| `src/data/editorial/quick-frameworks/` | Artigos no formato da skill `executar-block-quick-frameworks` (fonte dos `.mdx` gerados). |
| `src/content/blog/` | Artigos publicados. Os gerados trazem o aviso “não edite à mão”. |
| `src/styles/global.css` | Tokens (ADR-03, ADR-04, ADR-08) e utilitários editoriais `rc-*`. |
| `src/data/routes.ts` | Hub de rotas (ADR-07). |
| `docs/` | ADRs, especificações do design system e handoffs. |
| `CLAUDE.md` | Decisões de arquitetura e de processo. |

## Origem

O projeto começou a partir do template Mainline (shadcnblocks.com); o licenciamento original está em
`LICENSE`. Conteúdo, páginas e componentes de template foram substituídos pelo conteúdo do Risco Cognitivo
(HANDOFF-RC-GLOBAL-DESIGN-CONTENT-001).
