'use client';

import React from 'react';

interface ImageLongProps {
  width?: number;
  height?: number;
  className?: string;
  blendMode?: 'normal' | 'screen' | 'multiply' | 'overlay' | 'color-dodge' | 'lighten';
  saturation?: number; // 채도 조정 옵션 추가
  src?: string; // 이미지 소스 옵션 추가
  overlayImage?: string; // 오버레이 이미지 옵션 추가
  style?: React.CSSProperties; // 스타일 옵션 추가
}

export default function ImageLong({ 
  width = 418, 
  height = 877,
  className = '', 
  blendMode = 'normal',
  saturation = 1.4, // 기본 채도 1.4배
  src = '/image/gradientLong2.svg', // 기본 이미지
  overlayImage = '/image/gradientOverlayLong.svg', // 기본 오버레이 이미지
  style = {}
}: ImageLongProps) {
  return (
    <div 
      className={`relative overflow-hidden ${className}`}
      style={{
        width: width,
        height: height,
        backgroundImage: `url(${src})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        mixBlendMode: blendMode,
        filter: `saturate(${saturation})`, // 채도 조정
        ...style
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
          backgroundImage: `url(${overlayImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          pointerEvents: 'none',
        }}
      />
    </div>
  );
} 