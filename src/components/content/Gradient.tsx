'use client';

import { CSSProperties } from 'react';

interface GradientProps {
  size?: number;
  className?: string;
  style?: CSSProperties;
}

export default function Gradient({ size = 418, className = '', style }: GradientProps) {8
  return (
    <div
      className={`relative rounded-full blur-xl ${className}`}
      style={{
        width: 418,
        height: 418,
        background: `radial-gradient(
          circle at 30% 30%,
          rgba(0, 0, 0, 0) 0%,
          rgba(10, 10, 60, 0.1) 30%,
          rgba(0, 55, 142, 1) 60%,
          rgba(74, 163, 255, 1) 80%,
          rgba(224, 230, 245, 1) 100%
        )`,
        ...style,
      }}
    />
  );
} 