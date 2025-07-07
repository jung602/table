'use client';

import { CSSProperties } from 'react';

interface GradientProps {
  size?: number;
  className?: string;
  style?: CSSProperties;
}

export default function Gradient({ size = 418, className = '', style }: GradientProps) {
  return (
    <div
      className={`relative rounded-full blur-xl ${className}`}
      style={{
        width: 418,
        height: 418,
        backgroundColor: 'hsla(0,0%,0%,1)',
        backgroundImage: `
          radial-gradient(at 16% 73%, hsla(360,0%,0%,1) 0px, transparent 50%),
          radial-gradient(at 23% 26%, hsla(341,0%,0%,1) 0px, transparent 50%),
          radial-gradient(at 56% 60%, hsla(231,56%,24%,1) 0px, transparent 50%),
          radial-gradient(at 56% 37%, hsla(231,56%,24%,1) 0px, transparent 50%),
          radial-gradient(at 70% 39%, hsla(217,99%,61%,1) 0px, transparent 50%),
          radial-gradient(at 71% 60%, hsla(218,99%,61%,1) 0px, transparent 50%),
          radial-gradient(at 99% 0%, hsla(189,100%,56%,1) 0px, transparent 50%),
          radial-gradient(at 0% 100%, hsla(206,100%,77%,1) 0px, transparent 50%),
          radial-gradient(at 49% 0%, hsla(25,0%,100%,1) 0px, transparent 50%),
          radial-gradient(at 99% 98%, hsla(359,0%,100%,1) 0px, transparent 50%),
          radial-gradient(at 53% 89%, hsla(279,100%,50%,1) 0px, transparent 50%)
        `,
        ...style,
      }}
    />
  );
} 