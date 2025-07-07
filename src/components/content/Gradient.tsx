'use client';

import { CSSProperties } from 'react';

interface GradientProps {
  size?: number;
  className?: string;
  style?: CSSProperties;
}

export default function Gradient({ size = 300, className = '', style }: GradientProps) {
  return (
    <div
      className={`relative rounded-full ${className}`}
      style={{
        width: size,
        height: size,
        background: `radial-gradient(circle at center, 
          #4A90E2 0%, 
          #357ABD 15%, 
          #2E5BA1 30%, 
          #264A85 45%, 
          #1E3A6F 60%, 
          #162B5A 75%, 
          #0F1C45 90%, 
          #000000 100%)`,
        ...style,
      }}
    >
      {/* 추가적인 블러 효과를 위한 오버레이 */}
      <div
        className="absolute inset-0 rounded-full"
        style={{
          background: `radial-gradient(circle at center, 
            rgba(74, 144, 226, 0.8) 0%, 
            rgba(53, 122, 189, 0.6) 20%, 
            rgba(46, 91, 161, 0.4) 40%, 
            rgba(38, 74, 133, 0.2) 60%, 
            rgba(30, 58, 111, 0.1) 80%, 
            rgba(0, 0, 0, 0) 100%)`,
        }}
      />
      
      {/* 중심부 하이라이트 */}
      <div
        className="absolute rounded-full"
        style={{
          top: '20%',
          left: '20%',
          width: '60%',
          height: '60%',
          background: `radial-gradient(circle at center, 
            rgba(135, 206, 235, 0.3) 0%, 
            rgba(74, 144, 226, 0.2) 30%, 
            rgba(53, 122, 189, 0.1) 60%, 
            rgba(0, 0, 0, 0) 100%)`,
        }}
      />
    </div>
  );
} 