import React from 'react';

interface BackgroundProps {
  width?: string | number;
  height?: string | number;
  children?: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

const Background: React.FC<BackgroundProps> = ({
  width = 2378,
  height = 1485,
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
          linear-gradient(180deg, rgba(255, 255, 255, .5) 0%, rgba(255, 255, 255, 0) 100%),
        rgba(255, 255, 255, 0)
        `,
        border: '0px solid rgba(255, 255, 255, 0.8)',
        boxShadow: 'inset 0px -5px 30px 0px rgba(255, 255, 255, 0.2)',
        backdropFilter: 'blur(7.5px)',
        borderRadius: '260px',
        ...style, // 외부 스타일로 오버라이드 가능
      }}
    >
      {/* 내부 요소 - 2px 작아지는 동일한 스타일, 그리드 제거하고 상대 위치 컨테이너로만 사용 */}
      <div
        className="absolute inset-0 m-[4px]"
        style={{
          background: `
            linear-gradient(-180deg, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 0.2) 100%),
            radial-gradient(circle, rgba(255, 255, 255, 0.05) 50%, rgba(255, 255, 255, .1) 100%),
            #2D363F
          `,
          border: '0px solid rgba(255, 255, 255, 0.8)',
          boxShadow: 'inset 0px -5px 30px 0px rgba(255, 255, 255, 0.2)',
          backdropFilter: 'blur(7.5px)',
          borderRadius: '260px',
        }}
      >
        {children}
      </div>
    </div>
  );
};

export default Background; 