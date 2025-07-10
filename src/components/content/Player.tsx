'use client';

import { useState, useEffect, useRef } from 'react';

interface PlayerProps {
  width: number;
  height: number;
  className?: string;
  isActive?: boolean; // 위젯 활성화 상태
}

export default function Player({ width, height, className = '', isActive = false }: PlayerProps) {
  const [currentProgress, setCurrentProgress] = useState(0);
  const animationStartTime = useRef<number>(Date.now());
  const progressRef = useRef<SVGPathElement | SVGLineElement>(null);
  
  const borderRadius = width === 418 ? 260 : (260 * (width / 418)); // 위젯 크기에 비례한 border radius
  const strokeWidth = 10;
  const padding = strokeWidth / 2;
  const animationDuration = 240000; // 240초를 밀리초로
  
  // 사각형 경로의 둘레 계산 (border radius 고려)
  const rectWidth = width - strokeWidth;
  const rectHeight = height - strokeWidth;
  const adjustedRadius = Math.min(borderRadius, rectWidth / 2, rectHeight / 2);
  
  // 둥근 사각형의 둘레 계산
  const straightSides = 2 * (rectWidth - 2 * adjustedRadius) + 2 * (rectHeight - 2 * adjustedRadius);
  const cornerPerimeter = 2 * Math.PI * adjustedRadius;
  const totalPerimeter = straightSides + cornerPerimeter;

  // 직선 플레이어의 길이 (활성화 시 사용)
  const lineLength = rectWidth - 40; // 좌우 마진 20씩
  const lineY = height / 2; // 중앙 수직 위치
  const lineStartX = padding + 20; // 시작점
  const lineEndX = lineStartX + lineLength; // 끝점

  // 현재 진행도 업데이트
  useEffect(() => {
    const updateProgress = () => {
      const elapsed = Date.now() - animationStartTime.current;
      let progress = (elapsed % animationDuration) / animationDuration;
      
      // 진행도가 1에 가까우면 명확히 리셋
      if (progress >= 0.99) {
        progress = 0;
        animationStartTime.current = Date.now();
      }
      
      setCurrentProgress(progress);
    };

    const interval = setInterval(updateProgress, 16); // 60fps
    return () => clearInterval(interval);
  }, [animationDuration]);

  // 진행도에 따른 stroke-dashoffset 계산
  const getRectOffset = () => totalPerimeter * (1 - currentProgress);
  const getLineOffset = () => lineLength * (1 - currentProgress);

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
          {!isActive ? (
            // 둥근 사각형 모드 (비활성화 상태)
            <>
              {/* 배경 사각형 */}
              <path
                d={rectPath}
                fill="none"
                stroke="rgba(255, 255, 255, 0.3)"
                strokeWidth={strokeWidth}
              />
              
              {/* 진행 사각형 */}
              <path
                ref={progressRef as React.RefObject<SVGPathElement>}
                d={rectPath}
                fill="none"
                stroke="rgba(255, 255, 255, 1)"
                strokeWidth={strokeWidth}
                strokeLinecap="round"
                strokeDasharray={totalPerimeter}
                strokeDashoffset={getRectOffset()}
                style={{ transition: isActive ? 'none' : 'stroke-dashoffset 0.3s ease-in-out' }}
              />
            </>
          ) : (
            // 직선 플레이어 모드 (활성화 상태)
            <>
              {/* 배경 라인 */}
              <line
                x1={lineStartX}
                y1={lineY}
                x2={lineEndX}
                y2={lineY}
                stroke="rgba(255, 255, 255, 0.3)"
                strokeWidth={strokeWidth}
                strokeLinecap="round"
              />
              
              {/* 진행 라인 */}
              <line
                ref={progressRef as React.RefObject<SVGLineElement>}
                x1={lineStartX}
                y1={lineY}
                x2={lineEndX}
                y2={lineY}
                stroke="rgba(255, 255, 255, 1)"
                strokeWidth={strokeWidth}
                strokeLinecap="round"
                strokeDasharray={lineLength}
                strokeDashoffset={getLineOffset()}
                style={{ transition: isActive ? 'none' : 'stroke-dashoffset 0.3s ease-in-out' }}
              />
            </>
          )}
        </svg>
      </div>
  );
} 