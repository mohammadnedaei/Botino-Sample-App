import * as React from 'react';
import { cn } from '@/lib/utils';

type BadgeVariant = 'primary' | 'success' | 'muted';

const variantClasses: Record<BadgeVariant, string> = {
  primary: 'bg-primary-50 text-primary-700',
  success: 'bg-emerald-50 text-emerald-700',
  muted: 'bg-slate-100 text-slate-600',
};

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
}

export function Badge({ className, variant = 'primary', ...props }: BadgeProps) {
  return (
    <span
      dir="rtl"
      className={cn(
        'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium',
        variantClasses[variant],
        className
      )}
      {...props}
    />
  );
}
