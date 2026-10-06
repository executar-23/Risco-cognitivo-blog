# Prompt operacional curto — Lote visual de Funções Executivas

ID: RC-EF-PROMPT-SHORT-001
VERSION: 2.0.0
AREA: Design / Conteúdo / Neurociência aplicada
WORKFLOW: Pesquisa → Design Handoff → React → Validação
STATUS: READY

Produza, no repositório executar-23/Risco-cognitivo-blog, um lote visual data-driven de funções executivas usando React 19 integrado ao Astro atual. Não substituir o stack observado nem migrar o projeto. Criar os componentes dentro de src/components/executive-functions/, dados em src/data/executiveFunctions.data.ts e a rota de laboratório src/pages/lab/funcoes-executivas.astro.

A referência visual canônica é: fundo branco, tipografia editorial sans-serif, preto/cinza neutro, laranja como marca/ação, linhas finas, grandes espaços, cérebro em pontos/partículas, hotspots circulares, pills e painel lateral com borda laranja. Não usar Tailwind nem shadcn dentro do novo módulo; usar CSS isolado com prefixo rcx- e tokens locais para impedir conflito com o design system anterior.

Gerar:
1. ExecutiveHero.tsx — hero “Entenda sua execução.” com cérebro interativo, quatro hotspots (Planejamento, Controle inibitório, Memória de trabalho, Flexibilidade), painel contextual e blocos Entenda/Estruture/Execute.
2. BrainNetworkMap.tsx — SVG determinístico, acessível, com cérebro em pontos, órbitas, hotspots e reduced motion.
3. MacroCoverSlide.tsx — 3 capas 16:9: MA-01 Inibição, MA-02 Memória de Trabalho, MA-03 Flexibilidade Cognitiva.
4. RiskCardSlide.tsx — RC-01 a RC-09, cada um com macro, função executiva principal, demanda, dificuldade, estratégia e foco cerebral didático.
5. ExecutiveVisualPack.tsx — monta hero + 3 macros + 9 cards.

Taxonomia científica: use Inibição, Memória de Trabalho e Flexibilidade Cognitiva como três funções nucleares. Use as sete funções operacionais do modelo de Barkley como camada complementar: Autoconhecimento, Inibição, Memória de trabalho não verbal, Memória de trabalho verbal, Regulação emocional, Automotivação e Planejamento/Resolução de problemas.

Mapeamento cerebral deve ser apresentado como rede distribuída, não como “uma função = um ponto”: memória de trabalho → DLPFC + parietal posterior; inibição → rIFG + pré-SMA com rede cingulo/frontoparietal; flexibilidade → rede pré-frontal/cíngulo anterior/parietal; planejamento → PFC dorsolateral + componentes rostrais/frontopolares.

Obrigatório: mobile-first, teclado, foco visível, ARIA, prefers-reduced-motion, contraste, sem diagnóstico, sem prometer localização cerebral exclusiva. Registrar a nova rota em src/data/routes.ts para satisfazer o workflow de rotas do repositório. Validar estrutura, importações, IDs MA/FE/RC, correspondência de todos os 9 cards e consistência visual.
