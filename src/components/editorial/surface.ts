// Classes da superfície neutra (ADR-08) para blocos editoriais em Astro.
// Card/default: surface-default + border-default, raio do card, sem sombra; hover por superfície.
export const SURFACE =
  "rounded-[var(--surface-radius-card)] border border-[var(--border-default)] bg-[var(--surface-default)]";
export const SURFACE_LINK = `${SURFACE} transition-colors hover:bg-[var(--surface-hover)] focus-visible:ring-ring/50 outline-none focus-visible:ring-[3px]`;
