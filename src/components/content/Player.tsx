'use client';

interface PlayerProps {
  width: number;
  height: number;
  className?: string;
}

export default function Player({ width, height, className = '' }: PlayerProps) {
  const borderRadius = width === 418 ? 260 : (260 * (width / 418)); // 위젯 크기에 비례한 border radius
  const strokeWidth = 10;
  const padding = strokeWidth / 2;
  
  // 사각형 경로의 둘레 계산 (border radius 고려)
  const rectWidth = width - strokeWidth;
  const rectHeight = height - strokeWidth;
  const adjustedRadius = Math.min(borderRadius, rectWidth / 2, rectHeight / 2);
  
  // 둥근 사각형의 둘레 계산
  const straightSides = 2 * (rectWidth - 2 * adjustedRadius) + 2 * (rectHeight - 2 * adjustedRadius);
  const cornerPerimeter = 2 * Math.PI * adjustedRadius;
  const totalPerimeter = straightSides + cornerPerimeter;

  // 둥근 사각형 path 생성
  const createRoundedRectPath = (x: number, y: number, w: number, h: number, r: number) => {
    return `
      M ${x + r} ${y}
      L ${x + w - r} ${y}
      A ${r} ${r} 0 0 1 ${x + w} ${y + r}
      L ${x + w} ${y + h - r}
      A ${r} ${r} 0 0 1 ${x + w - r} ${y + h}
      L ${x + r} ${y + h}
      A ${r} ${r} 0 0 1 ${x} ${y + h - r}
      L ${x} ${y + r}
      A ${r} ${r} 0 0 1 ${x + r} ${y}
      Z
    `;
  };

  const rectPath = createRoundedRectPath(padding, padding, rectWidth, rectHeight, adjustedRadius);

  return (
    <>
      <style jsx global>{`
        @keyframes playerProgress {
          from {
            stroke-dashoffset: ${totalPerimeter};
          }
          to {
            stroke-dashoffset: 0;
          }
        }
        .player-progress {
          animation: playerProgress 240s linear infinite;
        }
      `}</style>
      
      <div 
        className={`absolute inset-0 ${className}`}
        style={{ 
          width: width,
          height: height,
        }}
      >
        <svg
          width={width}
          height={height}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
          }}
        >
          {/* 배경 사각형 */}
          <path
            d={rectPath}
            fill="none"
            stroke="rgba(255, 255, 255, 0.3)"
            strokeWidth={strokeWidth}
          />
          
          {/* 진행 사각형 */}
          <path
            d={rectPath}
            fill="none"
            stroke="rgba(255, 255, 255, 1)"
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeDasharray={totalPerimeter}
            strokeDashoffset={totalPerimeter}
            className="player-progress"
          />
        </svg>
      </div>
    </>
  );
} 