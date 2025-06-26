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
      className={`relative p-4 ${className}`}
      style={{
        width: widthStyle,
        height: heightStyle,
        background: 'rgba(255, 255, 255, 0.3)',
        border: '2px solid rgba(255, 255, 255, 0.8)',
        backdropFilter: 'blur(10px)',
        borderRadius: '9999px', // max border radius
        ...style, // 외부 스타일로 오버라이드 가능
      }}
    >
      {children}
    </div>
  );
};

export default Widget; 