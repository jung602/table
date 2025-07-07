'use client';

import React from 'react';

interface ImageProps {
  size?: number;
  className?: string;
  blendMode?: 'normal' | 'screen' | 'multiply' | 'overlay' | 'color-dodge' | 'lighten';
  saturation?: number;
}

export default function Image({ 
  size = 430, 
  className = '', 
  blendMode = 'normal',
  saturation = 1.4
}: ImageProps) {
  return (
    <div 
      className={`relative overflow-hidden ${className}`}
      style={{
        width: size,
        height: size,
        backgroundImage: 'url(/image/gradient.svg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        mixBlendMode: blendMode,
        filter: `saturate(${saturation})`,
      }}
    >
      {/* Overlay gradient */}
      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '100%',
          height: '100%',
          backgroundImage: 'url(/image/gradientOverlay.svg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          pointerEvents: 'none',
        }}
      />
    </div>
  );
} 