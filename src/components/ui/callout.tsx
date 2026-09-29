import * as React from "react";

import { X } from "lucide-react";

import { buttonVariants } from "@/components/ui/button";
import {
  getCalloutVariant,
  type CalloutSize,
  type CalloutTone,
  type CalloutVariant,
} from "@/components/ui/callout-registry";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

type CalloutAction = {
  label: string;
  href?: string;
  onClick?: () => void;
};

export interface CalloutProps {
  variant: CalloutVariant;
  subject?: string;
  message?: string;
  description?: React.ReactNode;
  size?: CalloutSize;
  tone?: CalloutTone;
  action?: CalloutAction;
  secondaryAction?: CalloutAction;
  dismissible?: boolean;
  disabled?: boolean;
  loading?: boolean;
  id?: string;
  className?: string;
  /** Rich description passed as children (e.g. from MDX/Astro slots). */
  children?: React.ReactNode;
}

// All geometry comes from --callout-* tokens (src/styles/global.css).
const SIZE = {
  sm: {
    box: "rounded-[var(--callout-radius-sm)]",
    pad: "px-[var(--callout-padding-sm-x)] py-[var(--callout-padding-sm-y)]",
    gap: "gap-[var(--callout-gap-sm)]",
    icon: "size-[var(--callout-icon-sm)] border-[length:var(--callout-icon-border-sm)]",
    glyph: "size-[var(--callout-glyph-sm)]",
    minH: "min-h-[var(--callout-icon-sm)]",
    headline: "text-base",
    body: "text-sm",
  },
  md: {
    box: "rounded-[var(--callout-radius-md)]",
    pad: "px-[var(--callout-padding-md-x)] py-[var(--callout-padding-md-y)]",
    gap: "gap-[var(--callout-gap-md)]",
    icon: "size-[var(--callout-icon-md)] border-[length:var(--callout-icon-border-md)]",
    glyph: "size-[var(--callout-glyph-md)]",
    minH: "min-h-[var(--callout-icon-md)]",
    headline: "text-lg",
    body: "text-base",
  },
  lg: {
    box: "rounded-[var(--callout-radius-lg)] min-h-[var(--callout-min-height-lg)]",
    // < 480px: lg keeps its scale but uses md padding/gap (handoff §10)
    pad: "px-[var(--callout-padding-md-x)] py-[var(--callout-padding-md-y)] min-[480px]:px-[var(--callout-padding-lg-x)] min-[480px]:py-[var(--callout-padding-lg-y)]",
    gap: "gap-[var(--callout-gap-md)] min-[480px]:gap-[var(--callout-gap-lg)]",
    icon: "size-[var(--callout-icon-lg)] border-[length:var(--callout-icon-border-lg)]",
    glyph: "size-[var(--callout-glyph-lg)]",
    minH: "min-h-[var(--callout-icon-lg)]",
    headline: "text-2xl",
    body: "text-lg",
  },
} as const;

function Callout({
  variant,
  subject,
  message,
  description,
  size = "md",
  tone = "outline",
  action,
  secondaryAction,
  dismissible = false,
  disabled = false,
  loading = false,
  id,
  className,
  children,
}: CalloutProps) {
  description ??= children;
  const [dismissed, setDismissed] = React.useState(false);
  const entry = getCalloutVariant(variant);
  const Icon = entry.icon;
  const text = message ?? entry.label;
  const s = SIZE[size];

  if (dismissed) return null;
  if (!subject && !text && !description) return null;

  const tinted = tone === "tinted";
  const actions = [action, secondaryAction].filter(Boolean) as CalloutAction[];

  const iconBadge = (
    <span
      aria-hidden="true"
      className={cn(
        "grid shrink-0 place-items-center rounded-full",
        s.icon,
        tinted
          ? "border-current text-[var(--callout-header-text)]"
          : "border-[color:var(--callout-icon)] bg-[var(--callout-icon-surface)] text-[var(--callout-icon)]",
      )}
    >
      <Icon className={s.glyph} strokeWidth={2.25} />
    </span>
  );

  const headline = loading ? (
    <span className="flex w-full flex-col justify-center gap-2">
      <Skeleton className="h-4 w-2/5" />
    </span>
  ) : (
    <p className={cn("m-0 leading-snug", s.headline)}>
      {subject && (
        <strong className="font-[number:var(--callout-label-weight)]">
          {subject}
        </strong>
      )}
      {subject && text ? " " : null}
      {text && (
        <span className="font-[number:var(--callout-message-weight)]">{text}</span>
      )}
    </p>
  );

  const details =
    loading ? (
      <div className="mt-3 flex flex-col gap-2">
        <Skeleton className="h-3 w-full" />
        <Skeleton className="h-3 w-4/5" />
      </div>
    ) : (
      (description || actions.length > 0) && (
        <>
          {description && (
            <div
              className={cn(
                "text-[var(--callout-body)] font-[number:var(--callout-body-weight)] [&_a]:text-[var(--callout-link)] [&_a]:underline [&_p]:m-0",
                s.body,
                !tinted && "mt-2",
              )}
            >
              {description}
            </div>
          )}
          {actions.length > 0 && (
            <div className="mt-4 flex flex-wrap gap-2">
              {actions.map((a, i) => {
                const cls = buttonVariants({
                  variant: i === 0 ? "default" : "outline",
                  size: "sm",
                });
                return a.href && !disabled ? (
                  <a key={a.label} href={a.href} className={cls}>
                    {a.label}
                  </a>
                ) : (
                  <button
                    key={a.label}
                    type="button"
                    className={cls}
                    onClick={a.onClick}
                    disabled={disabled}
                  >
                    {a.label}
                  </button>
                );
              })}
            </div>
          )}
        </>
      )
    );

  const dismiss = dismissible && (
    <button
      type="button"
      aria-label="Fechar aviso"
      onClick={() => setDismissed(true)}
      className={cn(
        buttonVariants({ variant: "ghost", size: "icon-sm" }),
        "shrink-0 transition-colors duration-[var(--callout-motion-fast)] ease-[var(--callout-easing)] focus-visible:outline-[length:var(--callout-focus-width)] focus-visible:outline-offset-[var(--callout-focus-offset)] focus-visible:outline-current",
        tinted && "text-[var(--callout-header-text)] hover:bg-white/15 hover:text-[var(--callout-header-text)]",
      )}
    >
      <X aria-hidden="true" />
    </button>
  );

  return (
    <aside
      id={id}
      data-callout=""
      data-variant={variant}
      data-family={entry.family}
      data-tone={tone}
      data-size={size}
      aria-label={[subject, text].filter(Boolean).join(" ")}
      aria-busy={loading || undefined}
      className={cn(
        "not-prose w-[var(--callout-width)] max-w-[var(--callout-max-width)] overflow-hidden border-[length:var(--callout-border-width)] border-[color:var(--callout-border)] bg-[var(--callout-surface)] font-[family-name:var(--callout-font-family)] text-[var(--callout-heading)]",
        s.box,
        className,
      )}
    >
      {tinted ? (
        <>
          <div
            className={cn(
              "flex items-center bg-[var(--callout-header-surface)] text-[var(--callout-header-text)]",
              s.pad,
              s.gap,
            )}
          >
            {iconBadge}
            <div className={cn("flex min-w-0 flex-1 items-center", s.minH)}>{headline}</div>
            {dismiss}
          </div>
          {(loading || description || actions.length > 0) && (
            <div className={s.pad}>{details}</div>
          )}
        </>
      ) : (
        <div className={cn("flex items-start", s.pad, s.gap)}>
          {iconBadge}
          <div className="min-w-0 flex-1">
            <div className={cn("flex items-center", s.minH)}>{headline}</div>
            {details}
          </div>
          {dismiss}
        </div>
      )}
    </aside>
  );
}

export { Callout };
export type { CalloutVariant, CalloutSize, CalloutTone };
