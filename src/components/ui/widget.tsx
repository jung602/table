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
  
  return (
    <div
      className={`relative ${className}`}
      style={{
        width: widthStyle,
        height: heightStyle,
        background: `
          linear-gradient(180deg, rgba(255, 255, 255, .3) 0%, rgba(255, 255, 255, 0) 100%),
        rgba(255, 255, 255, 0)
        `,
        backdropFilter: 'blur(10px)',
        borderRadius: '9999px', // 적당한 기본 border radius
        ...style, // 외부 스타일로 오버라이드 가능
      }}
    >
      <div
        className="absolute inset-0 m-[4px]"
        style={{
          background: `
            radial-gradient(circle, rgba(255, 255, 255, 0.05) 24%, rgba(255, 255, 255, 0.2) 100%),
            linear-gradient(-180deg, rgba(255, 255, 255, 0.05) 73%, rgba(255, 255, 255, 0.1) 100%),
            linear-gradient(-180deg, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 0.2) 100%),
          #2D363F
          `,
          borderRadius: '9999px',
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