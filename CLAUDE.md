# CLAUDE.md

Guidance for Claude Code (and other AI agents) working in this repository.

## ADRs (Architecture / Process Decision Records)

### ADR-01: Trabalhar diretamente em `main` e abrir PR automaticamente (sem rascunho)

- **Status:** Aceita
- **Contexto:** Este é um projeto simples (site estático Astro), sem necessidade de um
  fluxo de branches elaborado.
- **Decisão:**
  - Todo o desenvolvimento deve ser feito diretamente a partir da branch `main`
    (criar a branch de trabalho a partir de `main`, nunca de outra branch de feature).
  - Ao concluir uma mudança, abrir o Pull Request automaticamente, **sem marcar
    como rascunho (draft)** — o PR deve ser criado já pronto para revisão/merge.
- **Consequências:**
  - Não usar branches de longa duração nem stacks de PRs dependentes.
  - PRs em draft não devem ser usados neste repositório, a menos que
    explicitamente solicitado pelo usuário para um caso pontual.

### ADR-02: Callouts editoriais com um único primitive (DS-CALLOUT-001)

- **Status:** Aceita — implementada
- **Contexto:** Destaques em artigos e páginas eram feitos com estilos ad hoc. A
  especificação completa está em `docs/design-system/DS-CALLOUT-001.md`.
- **Decisão:**
  - Todo destaque editorial ou operacional usa `<Callout>`
    (`src/components/ui/callout.tsx`). Não criar componentes por tipo.
  - As 26 variantes, com símbolo Lucide, rótulo e família, vivem só no registry
    `src/components/ui/callout-registry.ts`.
  - Tamanhos `sm | md | lg` (padrão `md`) e tons `outline | tinted`. Cor, raio e ícone
    não são props públicas: vêm dos tokens `--callout-*` em `src/styles/global.css`.
  - Em MDX, descrição rica entra como filho (`<Callout ...>…</Callout>`); JSX em prop
    não funciona em MDX com React.
  - `dismissible` só funciona com diretiva `client:*`.
  - A geometria deriva dos tokens do Button, `--radius` e `--spacing` (md = altura do CTA,
    40px); não há escala própria. Glifo sem contêiner; assunto na fonte do texto (700) e
    mensagem em `--font-mono` (400). As medidas do handoff são de um raster 3×.
  - Layout pelo conteúdo: só headline → barra compacta; com descrição/ações → anatomia
    completa (referência Material X): header tonal com rótulo e ✕, corpo com emblema
    (outline) e título mono, rodapé com ações à direita (primária na cor da família).
- **Consequências:**
  - Páginas e artigos não definem hex, raio ou ícone de callout localmente.
  - O showroom oficial é `/admin/design-system#callouts`.
  - `Alert` (shadcn) fica restrito a mensagens de sistema e formulários.

### ADR-03: Paleta dos callouts em 3 famílias e 4 camadas (DS-CALLOUT-001-PAL-ANNEX-01)

- **Status:** Aceita — implementada; tokens escuros provisórios
- **Contexto:** A especificação está em
  `docs/design-system/DS-CALLOUT-001-PAL-ANNEX-01.md`.
- **Decisão:**
  - Só 3 famílias cromáticas: `brand` (#304E83), `attention` (#8A5A00) e
    `critical` (#A33A32). Os neutros do site são infraestrutura, não uma 4ª família.
  - Quatro camadas: primitivo (`--brand-50…950`, único lugar com cor concreta) →
    semântico (`--color-{família}-{subtle,soft,default,strong,on-strong}`) →
    componente (`--callout-*`) → variante (`data-family` / `data-tone`).
    Nunca variante → hex.
  - O primário do site (#0A6FDB, botões e links) não muda.
  - Modo escuro: papéis semânticos invertidos no `.dark`, marcados como PROVISIONAL
    até existir especificação de tema escuro.
- **Consequências:**
  - Não criar cores novas (lavender, purple etc.). Tons claros vêm de `--color-brand-subtle`.
  - Recalibrar a aparência mexe só na camada primitiva, sem tocar em artigos.

### ADR-04: Dados e gráficos nos tokens do sistema (DS-DATA-001)

- **Status:** Aceita — implementada
- **Contexto:** Os `--chart-1…5` eram cores padrão do template (laranja, verde-água), fora
  das 3 famílias do ADR-03, e não havia showroom de dados. Especificação em
  `docs/design-system/DS-DATA-001.md`.
- **Decisão:**
  - A paleta de gráficos é uma camada semântica sobre as famílias e o neutro:
    `--chart-1` brand.default, `--chart-2` attention.default, `--chart-3` critical.default,
    `--chart-4` `--brand-500` (série única clara), `--chart-5` `--muted-foreground`
    (meta/referência). Nenhuma matiz nova; cada cor tem contraste ≥ 3:1 sobre `--card`
    no claro e no escuro.
  - Séries nunca se distinguem só por cor: legenda, tooltip e, em linhas de referência,
    traço tracejado. Todo gráfico tem `role="group"` + `aria-label` e, quando possível,
    alternativa em tabela.
  - `--muted-foreground-subtle` é o cinza extra do texto (legendas, notas, carimbos de
    data). Só é AA sobre `card`, `background` e `popover`; sobre `muted`, `secondary` e
    `accent` use `--muted-foreground`.
  - Novo papel semântico por família `--color-{família}-on-default` (texto sobre a cor
    `default`, usado na ação primária dos callouts).
  - O showroom oficial é `/admin/design-system#dados` (indicadores, 6 tipos de gráfico,
    tabela de dados, estados de carregando/vazio/erro).
- **Consequências:**
  - Gráficos novos usam `ChartContainer` com `var(--chart-N)`; não definir cor localmente.
  - Alterar a paleta de gráficos mexe só nos tokens, não nas páginas.

### ADR-05: Store em `/loja` com marcadores de área (ADR-STORE-ROUTES-UI-001)

- **Status:** Aceita — primeira versão implementada com dados de exemplo
- **Contexto:** Decisão em `docs/adr/ADR-STORE-ROUTES-UI-001.md`; workflow executável em
  `docs/agent-prompts/DEV-STORE-ROUTES-001.md`; handoff e mapas em `docs/handoff/`.
- **Decisão:**
  - Rotas `/loja`, `/loja/{skills,agentes,prompts,ebooks,pdfs,html,workbooks,assets}` e
    `/loja/:type/:slug`, todas sobre a ilha `StoreCatalog` (`src/features/store`).
  - Dados só via `src/features/store/data/repository.ts`; o mock (`mock-items.ts`) nunca é
    importado por componentes.
  - Cor = área (`--area-*`, `area-tokens.ts`): institucional=brand, artigos=attention,
    skills=verde. Marcador (ícone, `border-l-4`, badge), nunca card inteiro colorido, sempre
    com texto/ícone.
  - Só primitives de `src/components/ui`; a Store compõe, não duplica.
- **Consequências:**
  - Verde, verde-azulado e violeta existem **apenas** como `--area-*` — exceção controlada ao
    ADR-03, que continua valendo para callouts e gráficos.
  - Nova área exige registro em `docs/handoff/store-routes/AREA-COLOR-MAP.md` antes do uso.
  - Trocar mock por backend toca só `repository.ts` e `types/`.

