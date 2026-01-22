'use client';

import { cn } from '@/lib/utils';
import { HTMLAttributes } from 'react';

interface GlowEffectProps extends HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
  glowColor?: string;
}

export function GlowEffect({ children, className, glowColor = 'from-primary/20 to-transparent', ...props }: GlowEffectProps) {
  return (
    <div className={cn('group relative', className)} {...props}>
      <div className={cn(
        'absolute -inset-px rounded-2xl bg-gradient-to-b opacity-0 transition-opacity duration-300 group-hover:opacity-100',
        glowColor
      )} />
      <div className="relative">
        {children}
      </div>
    </div>
  );
}
