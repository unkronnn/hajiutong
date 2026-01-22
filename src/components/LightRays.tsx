'use client';

import { cn } from '@/lib/utils';
import { HTMLAttributes, useEffect, useRef } from 'react';

interface LightRaysProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
  color?: 'green' | 'blue' | 'purple';
}

export function LightRays({ className, color = 'green', ...props }: LightRaysProps) {
  const ray1Ref = useRef<HTMLDivElement>(null);
  const ray2Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const animate = () => {
      if (ray1Ref.current && ray2Ref.current) {
        const time = Date.now() * 0.001;

        // Animate ray 1
        const x1 = Math.sin(time * 0.5) * 100;
        const y1 = Math.cos(time * 0.3) * 50;
        ray1Ref.current.style.transform = `translate(${x1}px, ${y1}px)`;

        // Animate ray 2
        const x2 = Math.cos(time * 0.4) * 80;
        const y2 = Math.sin(time * 0.2) * 60;
        ray2Ref.current.style.transform = `translate(${x2}px, ${y2}px)`;

        requestAnimationFrame(animate);
      }
    };

    animate();
  }, []);

  const colorClasses = {
    green: 'bg-primary',
    blue: 'bg-blue-500',
    purple: 'bg-purple-500',
  };

  return (
    <div
      className={cn('absolute inset-0 overflow-hidden pointer-events-none', className)}
      {...props}
    >
      {/* Top left ray */}
      <div
        ref={ray1Ref}
        className={cn(
          'absolute top-0 left-1/4 w-96 h-96 blur-[120px] opacity-20 transition-transform duration-1000 ease-in-out',
          colorClasses[color]
        )}
      />
      {/* Bottom right ray */}
      <div
        ref={ray2Ref}
        className={cn(
          'absolute bottom-0 right-1/4 w-96 h-96 blur-[120px] opacity-15 transition-transform duration-1000 ease-in-out',
          colorClasses[color]
        )}
      />
      {/* Center glow */}
      <div
        className={cn(
          'absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] blur-[150px] opacity-10',
          colorClasses[color]
        )}
      />
    </div>
  );
}
