import type { ComponentPropsWithoutRef, ReactNode } from 'react';
import { clsx } from 'clsx';

type SectionProps = ComponentPropsWithoutRef<'section'>;
type DivProps = ComponentPropsWithoutRef<'div'>;

export function DaylightCanvas({ className, ...props }: SectionProps) {
  return <section className={clsx('ag-daylight', className)} {...props} />;
}

export function DarkRoom({ className, ...props }: SectionProps) {
  return <section className={clsx('ag-room ag-dark-door ag-room-enter', className)} {...props} />;
}

export function AnswerSheet({ className, ...props }: DivProps) {
  return <div className={clsx('ag-answer-sheet', className)} {...props} />;
}

interface SceneFlagProps extends DivProps {
  number: string;
  kicker: string;
  title: string;
}

export function SceneFlag({ number, kicker, title, className, ...props }: SceneFlagProps) {
  return (
    <div className={clsx('ag-scene-flag', className)} {...props}>
      <span className="ag-scene-flag__number" aria-hidden="true">{number}</span>
      <span className="ag-scene-flag__copy">
        <span className="ag-label">{kicker}</span>
        <span className="ag-scene-flag__title">{title}</span>
      </span>
    </div>
  );
}

type ActionVariant = 'primary' | 'secondary';

interface FoundationActionProps extends ComponentPropsWithoutRef<'button'> {
  variant?: ActionVariant;
  disabledReason?: string;
}

export function FoundationAction({
  variant = 'primary',
  disabledReason,
  className,
  disabled,
  id,
  children,
  ...props
}: FoundationActionProps) {
  const reasonId = disabled && disabledReason && id ? `${id}-reason` : undefined;

  return (
    <span className="ag-action-wrap">
      <button
        id={id}
        type="button"
        disabled={disabled}
        aria-describedby={reasonId}
        className={clsx('ag-action', variant === 'secondary' && 'ag-action--secondary', className)}
        {...props}
      >
        {children}
      </button>
      {disabled && disabledReason ? (
        <span id={reasonId} className="ag-disabled-reason">{disabledReason}</span>
      ) : null}
    </span>
  );
}

interface StatusChipProps extends ComponentPropsWithoutRef<'span'> {
  tone?: 'neutral' | 'success' | 'recovery';
  icon?: ReactNode;
}

export function StatusChip({ tone = 'neutral', icon, className, children, ...props }: StatusChipProps) {
  return (
    <span className={clsx('ag-status', className)} data-tone={tone} {...props}>
      {icon}
      <span>{children}</span>
    </span>
  );
}

export function GermanLine({ className, lang = 'de', ...props }: ComponentPropsWithoutRef<'p'>) {
  return <p lang={lang} className={clsx('ag-german-line', className)} {...props} />;
}
