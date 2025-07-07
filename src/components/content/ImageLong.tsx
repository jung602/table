'use client';

import React from 'react';

interface ImageLongProps {
  size?: number;
  className?: string;
  blendMode?: 'normal' | 'screen' | 'multiply' | 'overlay' | 'color-dodge' | 'lighten';
  saturation?: number; // 채도 조정 옵션 추가
}

export default function ImageLong({ 
  size = 430, 
  className = '', 
  blendMode = 'normal',
  saturation = 1.4 // 기본 채도 1.4배
}: ImageLongProps) {
  return (
    <div 
      className={`relative overflow-hidden ${className}`}
      style={{
        width: size,
        height: size,
        backgroundImage: 'url(/image/gradientLong.svg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        mixBlendMode: blendMode,
        filter: `saturate(${saturation})`, // 채도 조정
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
          backgroundImage: 'url(/image/gradientOverlayLong.svg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          pointerEvents: 'none',
        }}
      />
    </div>
  );
} 