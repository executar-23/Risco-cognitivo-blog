import { useId, useMemo } from "react";
import { brainHotspots, type BrainHotspotId } from "../../data/executiveFunctions.data";

interface BrainNetworkMapProps {
  activeId?: BrainHotspotId;
  onSelect?: (id: BrainHotspotId) => void;
  compact?: boolean;
  interactive?: boolean;
}

interface Dot {
  x: number;
  y: number;
  r: number;
  opacity: number;
}

function buildDots(count = 880): Dot[] {
  let seed = 1947;
  const next = () => {
    seed = (seed * 16807) % 2147483647;
    return (seed - 1) / 2147483646;
  };

  return Array.from({ length: count }, () => ({
    x: 70 + next() * 570,
    y: 55 + next() * 390,
    r: 0.8 + next() * 1.5,
    opacity: 0.32 + next() * 0.58,
  }));
}

export function BrainNetworkMap({
  activeId = "working-memory",
  onSelect,
  compact = false,
  interactive = true,
}: BrainNetworkMapProps) {
  const dots = useMemo(() => buildDots(compact ? 520 : 880), [compact]);
  const svgId = useId().replace(/:/g, "");
  const clipId = `rcx-brain-clip-${svgId}`;
  const gradientId = `rcx-hotspot-gradient-${svgId}`;

  return (
    <div className={`rcx-brain-map ${compact ? "rcx-brain-map--compact" : ""}`}>
      <svg
        className="rcx-brain-svg"
        viewBox="0 0 720 520"
        role="img"
        aria-label="Mapa cerebral didático de redes executivas distribuídas"
      >
        <defs>
          <clipPath id={clipId}>
            <path d="M130,257 C95,198 118,127 178,101 C208,57 275,44 321,68 C367,34 433,48 463,79 C522,65 578,101 590,148 C636,172 654,226 628,265 C653,317 623,370 577,386 C554,432 494,455 451,431 C409,469 351,465 313,438 C268,461 214,443 193,405 C143,395 112,352 125,310 C102,295 102,273 130,257 Z" />
          </clipPath>
          <radialGradient id={gradientId}>
            <stop offset="0%" stopColor="var(--rcx-orange)" stopOpacity="0.72" />
            <stop offset="58%" stopColor="var(--rcx-orange)" stopOpacity="0.18" />
            <stop offset="100%" stopColor="var(--rcx-orange)" stopOpacity="0" />
          </radialGradient>
        </defs>

        <g className="rcx-brain-orbits" aria-hidden="true">
          <ellipse cx="360" cy="260" rx="302" ry="184" />
          <ellipse cx="360" cy="260" rx="248" ry="219" transform="rotate(-17 360 260)" />
          <path d="M94 301 C229 110 454 89 638 235" />
          <path d="M105 198 C270 359 455 399 626 284" />
        </g>

        <g clipPath={`url(#${clipId})`} className="rcx-brain-dots" aria-hidden="true">
          <rect x="70" y="55" width="570" height="390" fill="var(--rcx-surface)" />
          {dots.map((dot, index) => (
            <circle key={index} cx={dot.x} cy={dot.y} r={dot.r} opacity={dot.opacity} />
          ))}
          {brainHotspots.map((hotspot) => {
            const isActive = hotspot.id === activeId;
            return (
              <circle
                key={`glow-${hotspot.id}`}
                cx={(hotspot.x / 100) * 720}
                cy={(hotspot.y / 100) * 520}
                r={isActive ? 72 : 42}
                fill={`url(#${gradientId})`}
                opacity={isActive ? 1 : 0.32}
              />
            );
          })}
        </g>

        <path
          className="rcx-brain-outline"
          d="M130,257 C95,198 118,127 178,101 C208,57 275,44 321,68 C367,34 433,48 463,79 C522,65 578,101 590,148 C636,172 654,226 628,265 C653,317 623,370 577,386 C554,432 494,455 451,431 C409,469 351,465 313,438 C268,461 214,443 193,405 C143,395 112,352 125,310 C102,295 102,273 130,257 Z"
          aria-hidden="true"
        />
      </svg>

      <div className="rcx-hotspots" aria-label="Redes executivas">
        {brainHotspots.map((hotspot) => {
          const isActive = hotspot.id === activeId;
          return (
            <button
              key={hotspot.id}
              type="button"
              className={`rcx-hotspot ${isActive ? "is-active" : ""}`}
              style={{ left: `${hotspot.x}%`, top: `${hotspot.y}%` }}
              aria-pressed={isActive}
              aria-label={`${hotspot.label}: ${hotspot.shortDefinition}`}
              onClick={() => interactive && onSelect?.(hotspot.id)}
              disabled={!interactive}
            >
              <span className="rcx-hotspot__dot" aria-hidden="true" />
              {!compact && <span className="rcx-hotspot__label">{hotspot.label}</span>}
            </button>
          );
        })}
      </div>
    </div>
  );
}
