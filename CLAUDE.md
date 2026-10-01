# CLAUDE.md

Guidance for Claude Code (and other AI agents) working in this repository.

## ADRs (Architecture / Process Decision Records)

### ADR-01: Trabalhar diretamente em `main` e abrir PR (quando necessário) sem rascunho

- **Status:** Aceita — revisada (alinhada à seção "Fluxo Git e issues")
- **Contexto:** Este é um projeto simples (site estático Astro), sem necessidade de um
  fluxo de branches elaborado.
- **Decisão:**
  - O desenvolvimento é feito direto na `main`: commit e push na `main`, depois de
    `git pull --rebase origin main` e das verificações da seção "Fluxo Git e issues".
    Não se cria branch de trabalho a partir da `main` por padrão.
  - Branch própria só para frentes paralelas simultâneas, como descrito em "Fluxo Git e
    issues"; nunca a partir de outra branch de feature.
  - Se um Pull Request for necessário, ele é aberto **sem rascunho (draft)**, já pronto
    para revisão/merge.
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
  - O primário do site é #306DD4 (botões, links, títulos; ADR-08 substituiu o #0A6FDB). As
    famílias `brand`/`attention`/`critical` dos callouts não mudam.
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

### ADR-06: Diagramas e textos operacionais em plain text (ADR-BLOG-ASCII-001 + anexo A)

- **Status:** Aceita — implementada; tokens escuros provisórios
- **Contexto:** Fluxogramas, organogramas, árvores, mapas mentais, planos e textos
  operacionais precisam ser copiáveis, pesquisáveis e acessíveis. Especificação em
  `docs/design-system/ADR-BLOG-ASCII-001.md`, `ANX-ADR-BLOG-ASCII-001-A.md` e
  `REPORT-GENERATOR-CONTRACT-001.md`.
- **Decisão:**
  - Diagramas são texto UTF-8 com caracteres de desenho de caixa, renderizados por
    `<AsciiDiagram>`; textos operacionais por `<PlainTextPanel>`. Nunca Mermaid, SVG,
    Canvas ou imagem para esse conteúdo.
  - Os dois usam a mesma base `PlainSurface` (`src/components/plain/`) e só os tokens
    `--plain-*` de `src/styles/global.css`. `--plain-accent` é `var(--primary)`: nada de
    matiz nova (ADR-03).
  - `AsciiDiagram` preserva geometria (`white-space: pre`, rolagem horizontal);
    `PlainTextPanel` quebra texto longo (`pre-wrap`). Conteúdo nunca é reescrito, só
    normalizado (BOM, fim de linha, linhas em branco nas pontas).
  - Em MDX, o conteúdo vai como `` {`…`} `` filho único ou em blocos ` ```ascii ` /
    ` ```plain `; o plugin `src/lib/plain/remarkPlain.ts` passa o texto verbatim como
    `source`. Em TSX/Astro, use `source` (ou `renderTree(json)` para árvores).
  - Copiar funciona sem hidratação (script delegado `src/lib/plain/copy.ts` no
    `DefaultLayout`); sem JavaScript o bloco segue legível.
  - Relatórios seguem o `REPORT-GENERATOR-CONTRACT-001`: Markdown para a narrativa,
    blocos plain text só onde o conteúdo é operacional ou estrutural, sempre com `kind`.
- **Consequências:**
  - O showroom oficial é `/admin/design-system#plain`; exemplo em `/admin/relatorio-exemplo/`.
  - Relatórios (`ReportLayout`) não usam capitular.
  - Toda tabela (`Table` de `src/components/ui/table.tsx`, classe `.ds-table` ou tabela
    Markdown em `.prose`) segue o padrão STORE-WIREFRAMES: células cinza separadas
    (`--table-*`), cabeçalho em caixa alta, valores técnicos em mono, sem bordas locais.

### ADR-07: Hub de rotas e links — toda nova rota ou link entra no hub

- **Status:** Aceita — implementada
- **Contexto:** Rotas e links (previews, deploys, compartilhamentos) se espalhavam sem
  catálogo, e um catálogo de QR gerado à parte apontava para o preview de outra branch.
  Fluxo detalhado em `docs/design-system/ROUTES-HUB-WORKFLOW-001.md`.
- **Decisão:**
  - O hub é `/admin/rotas/` (linkado no painel `/admin`), gerado a partir de
    `src/data/routes.ts`, a fonte única. Os artigos de `src/content/blog` entram sozinhos.
  - Todo PR que cria página em `src/pages`, ferramenta em `public/*/index.html` ou um
    link gerado/compartilhado (preview, deploy, QR) registra a entrada no mesmo PR.
  - `npm run routes:check` (`tests/routes.spec.ts`) falha se uma rota existir sem registro,
    se um registro não tiver rota ou se uma entrada estiver malformada; o checklist do PR
    (`.github/pull_request_template.md`) repete a regra.
  - Os QRs apontam para `PUBLIC_ROUTES_BASE_URL` (padrão: o host de produção), nunca para
    preview de branch, e o teste decodifica cada QR e compara com a URL exibida.
  - Rotas em `/admin/*` seguem sem guarda de autenticação e ficam marcadas "Interno exposto".
- **Consequências:**
  - Rota nova sem registro não passa nos testes; rota removida exige remover a entrada.
  - `tools/qr-python/` é arquivo de referência (gerador DESK-OS Sprint, incompleto) e fica
    fora do build; não gera este catálogo.

### ADR-08: Superfícies, bordas e elevação (DS-SURFACE-UNIFICATION-001)

- **Status:** Aceita — implementada; tema escuro provisório
- **Contexto:** O visual aprovado das tabelas (cinza muito claro, separação limpa, borda discreta)
  vivia só em `--plain-*`, enquanto cards usavam `--card`/`--border` e cinco níveis de sombra
  sem regra. Handoff em `docs/handoff/surface-unification/`; contrato em
  `docs/design-system/DS-SURFACE-UNIFICATION-001.md`.
- **Decisão:**
  - Camada "Surfaces & Elevation" em `src/styles/global.css`: `--surface-{page,subtle,default,hover,selected}`,
    `--border-{subtle,default,strong}`, `--elevation-{flat,raised,overlay}`. É o único lugar com
    hex neutro; `--plain-*`, `--table-*`, `--card`, `--border`, `--muted` são aliases.
  - Card, painel, célula de tabela, Plain/Ascii: `surface-default` + `border-default` + **sem sombra**.
    Hover por superfície (`surface-hover`), não por sombra.
  - Sombra só indica elevação: `raised` em controles (`shadow-xs/sm`), `overlay` em popover, dialog,
    drawer, sheet, hover-card e menus (`shadow-md…`). Tabela dentro de card usa células na superfície da página.
  - `#EBEBEB` é estrutural (contraste ~1,1:1): nunca texto, ícone ou estado só por borda; contorno de
    campos segue em `--input`.
  - Texto: `--foreground` #111111, `--muted-foreground` #6A6A72, `--muted-foreground-subtle` #727272
    (AA sobre `surface-default`; o #737373 do handoff não passa). Marca: `--primary` #306DD4.
  - Callouts semânticos mantêm suas famílias cromáticas; só o card perde a sombra.
- **Consequências:**
  - Código novo não usa hex neutro nem `shadow-md/lg/xl` fora de overlay (`tests/surfaces.spec.ts`).
  - Mudar a aparência neutra do blog mexe só nesse bloco de tokens.

### ADR-09: Conteúdo editorial a partir do banco, visual editorial em todas as rotas (HANDOFF-RC-GLOBAL-DESIGN-CONTENT-001)

- **Status:** Aceita — implementada; revisão humana dos artigos pendente
- **Contexto:** O site ainda era o template Mainline (landing, nav, páginas e posts demo). Registros em
  `docs/handoff/HANDOFF-RC-GLOBAL-DESIGN-CONTENT-001/` (entradas, rotas, extração dos mood boards,
  reconciliação, artigos, verificação).
- **Decisão:**
  - Banco editorial canônico: `src/data/editorial/seed.json` (CNT, ARG, EVD, TAX, IDE…). O Hub Editorial
    recebe `public/hub-editorial/seed.js`, gerado no `prebuild`; nunca editar o seed dentro do HTML.
  - Artigos seguem a skill `executar-block-quick-frameworks` (`tools/`): registro em
    `src/data/editorial/quick-frameworks/CNT-RC-NNNN.md` (validado por `validate_output.py`) e MDX gerado por
    `scripts/build-quick-frameworks.mjs` — não editar os `.mdx` gerados. Mermaid vira ```` ```ascii ```` (ADR-06).
  - Todo post declara `territory` (TAX) e, quando houver, `contentId` e `evidence`; listagens, cards, temas,
    busca e artigos consomem `getPosts()` (`src/lib/posts.ts`) e `src/lib/editorial.ts`, sem copy duplicada.
  - Títulos de mockup sem registro no banco vão para o backlog (IDE-RC), não para o site. Dados ilustrativos
    (autores, datas, contagens) nunca viram conteúdo.
  - Shell editorial único (`SiteHeader`/`SiteFooter`, `site/nav.ts`), `lang="pt-BR"`, utilitários `rc-*`
    (`global.css`) e superfícies via `SURFACE` (`components/editorial/surface.ts`) sobre os tokens do ADR-08.
  - Ferramentas em `public/` consomem `public/ds/surfaces.css`, gerado de `global.css`
    (`scripts/export-surface-tokens.mjs`); só cores de estado próprias ficam locais.
  - URLs antigas removidas ganham 301 em `public/_redirects`.
- **Consequências:**
  - `tests/content.spec.ts` (`npm run content:check`) falha com arquivo gerado defasado, Quick Framework
    inválido, território/evidência inexistente, copy de template no build, página sem pt-BR ou link quebrado.
  - Novo artigo = novo registro QF + `node scripts/build-quick-frameworks.mjs` (ou `npm run build`).

## Cloudflare

- Conta padrão: **Hub.executar** (`92fdc1b5…`, `*.hub-executar.workers.dev`), conforme o ADR-002 do `executar-23/PROGAMA-LANCAMENTO`. O `wrangler.jsonc` fixa `account_id`; não criar recursos em outra conta.
- URL canônica do blog: `https://risco-cognitivo-blog.hub-executar.workers.dev` (`DEFAULT_BASE_URL` em `src/data/routes.ts`).

## Fluxo Git e issues

- **Nunca criar PR em rascunho (draft).** Se um PR for necessário, abra-o já pronto para revisão. Vale mesmo quando o ambiente ou uma ferramenta sugerir draft por padrão.
- **Precedência sobre o ambiente.** Se a sessão ou o ambiente designar uma branch de trabalho (ex.: `claude/...`) e mandar abrir PR em rascunho, estas regras prevalecem: a branch designada é só base temporária de trabalho; integre o resultado na `main` e, se um PR for necessário, abra-o pronto para revisão, nunca em rascunho.
- **Trabalho direto na `main`.** O padrão é commitar e dar push na `main`. Antes do push: `git pull --rebase origin main`, `npm run lint`, `npm run build` e `npm run routes:check`.
- **Branches paralelas.** Com mais de uma frente independente ao mesmo tempo (várias sessões ou agentes), cada frente usa sua própria branch curta (`git worktree add ../<nome> -b <tipo>/<nome>`), com escopo de arquivos disjunto. Ao terminar, integre na `main` (merge ou rebase, sem PR draft), apague a branch e remova o worktree. Uma frente única vai direto na `main`.
- **Issues no GitHub, não no chat.** Nunca devolva listas de issues, pendências ou achados por aqui: registre cada item como issue do repositório com as ferramentas `mcp__github__*` (`issue_write`; cheque duplicatas com `search_issues`) e responda só com o link e um resumo de uma linha. O `.handoff/backlog.md` é o rascunho local do ciclo; os itens abertos viram issues.
