import React from 'react';

interface BackgroundProps {
  width?: string | number;
  height?: string | number;
  children?: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

const Background: React.FC<BackgroundProps> = ({
  width = 1920,
  height = 1200,
  children,
  className = '',
  style = {},
}) => {
  const widthStyle = typeof width === 'number' ? `${width}px` : width;
  const heightStyle = typeof height === 'number' ? `${height}px` : height;
  
  // width에 따른 동적 border-radius 계산 (13.54% 비율)
  const calculateBorderRadius = () => {
    if (typeof width === 'number') {
      return `${width * 0.1354}px`;
    } else if (typeof width === 'string' && width.endsWith('px')) {
      const numericWidth = parseFloat(width);
      return `${numericWidth * 0.1354}px`;
    }
    // 기본값 (1920px의 13.54%)
    return '260px';
  };

  return (
    <div
      className={`relative p-16 grid grid-cols-5 grid-rows-3 gap-5 ${className}`}
      style={{
        width: widthStyle,
        height: heightStyle,
        background: 'linear-gradient(-180deg, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 0.2) 100%)',
        border: '6px solid rgba(255, 255, 255, 0.8)',
        boxShadow: 'inset 0px -5px 30px 0px rgba(255, 255, 255, 0.2)',
        backdropFilter: 'blur(7.5px)',
        borderRadius: calculateBorderRadius(),
        ...style, // 외부 스타일로 오버라이드 가능
      }}
    >
      {/* 5x3 그리드 - 15개 셀 */}
      {Array.from({ length: 15 }, (_, index) => (
        <div key={index} className="grid-cell">
          {Array.isArray(children) ? children[index] : index === 0 ? children : null}
        </div>
      ))}
    </div>
  );
};

export default Background; 