import React from 'react';
import { ArrowLeft } from 'lucide-react';

interface BackButtonProps {
  className?: string;
  style?: React.CSSProperties;
}

const BackButton: React.FC<BackButtonProps> = ({
  className = '',
  style = {},
}) => {
  const size = 100; // 원형 버튼 크기
  const borderRadius = '9999px'; // 완전한 원형
  
  return (
    <div
      className={`relative ${className}`}
      style={{
        width: `${size}px`,
        height: `${size}px`,
        background: `
          linear-gradient(180deg, rgba(255, 255, 255, .1) 0%, rgba(255, 255, 255, 0) 100%),
        rgba(255, 255, 255, 0)
        `,
        backdropFilter: 'blur(10px)',
        borderRadius: borderRadius,
        ...style,
      }}
    >
      <div
        className="absolute inset-0 m-[2px] flex items-center justify-center"
        style={{
          background: `
            radial-gradient(circle, rgba(255, 255, 255, 0.05) 24%, rgba(255, 255, 255, 0.2) 100%),
            linear-gradient(-180deg, rgba(255, 255, 255, 0.05) 73%, rgba(255, 255, 255, 0.1) 100%),
            linear-gradient(-180deg, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 0.2) 100%),
          #2D363F30
          `,
          borderRadius: borderRadius,
        }}
      >
        <ArrowLeft 
          size={64} 
          color="white" 
          strokeWidth={2}
        />
      </div>
    </div>
  );
};

export default BackButton; 