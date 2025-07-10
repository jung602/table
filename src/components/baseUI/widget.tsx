import React from 'react';

interface WidgetProps {
  width?: string | number;
  height?: string | number;
  children?: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

const Widget: React.FC<WidgetProps> = ({
  width = 400,
  height = 300,
  children,
  className = '',
  style = {},
}) => {
  const widthStyle = typeof width === 'number' ? `${width}px` : width;
  const heightStyle = typeof height === 'number' ? `${height}px` : height;
  
  // 외부에서 받은 borderRadius 값을 추출 (기본값: 9999px)
  const borderRadius = style.borderRadius || '9999px';
  
  return (
    <div
      className={`relative ${className}`}
      style={{
        width: widthStyle,
        height: heightStyle,
        background: `
          linear-gradient(180deg, rgba(255, 255, 255, .5) 0%, rgba(255, 255, 255, 0) 100%),
        rgba(255, 255, 255, 0)
        `,
        backdropFilter: 'blur(10px)',
        borderRadius: borderRadius, // 외부에서 받은 값 또는 기본값
        ...style, // 외부 스타일로 오버라이드 가능
      }}
    >
      <div
        className="absolute inset-0 m-[3px]"
        style={{
          background: `
            radial-gradient(circle, rgba(255, 255, 255, 0.05) 24%, rgba(255, 255, 255, 0.2) 100%),
            linear-gradient(-180deg, rgba(255, 255, 255, 0.05) 73%, rgba(255, 255, 255, 0.1) 100%),
            linear-gradient(-180deg, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 0.2) 100%),
          #2D363F
          `,
          borderRadius: borderRadius, // 외부 div와 동일한 borderRadius 적용
        }}
      >
        <div className="relative h-full">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Widget; 