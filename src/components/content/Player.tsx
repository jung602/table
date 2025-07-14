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
  
  const strokeWidth = 10;
  const padding = strokeWidth / 2;
  const animationDuration = 240000; // 240초를 밀리초로
  
  // 직선 플레이어용 변수
  const rectWidth = width - strokeWidth;

  // 직선 플레이어의 길이 (항상 사용)
  const lineLength = rectWidth - 40; // 좌우 마진 100씩
  const lineY = isActive ? height - 240 : height - 200; // 확장 시 하단 240px, 축소 시 하단 120px
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
  const getLineOffset = () => lineLength * (1 - currentProgress);

  // 시간 계산 (총 재생시간 3:54 = 234초)
  const totalDurationSeconds = 234; // 3분 54초
  const currentTimeSeconds = Math.floor(currentProgress * totalDurationSeconds);
  
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };
  
  const currentTimeString = formatTime(currentTimeSeconds);
  const totalTimeString = "3:54";



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
          {/* 직선 플레이어 모드 (확장상태일 때만 표시) */}
          {isActive && (
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
        
        {/* 확장 상태일 때 재생시간 표시 */}
        {isActive && (
          <div
            style={{
              position: 'absolute',
              top: lineY + 30, // 진행바 아래 30px
              left: lineStartX,
              right: 100,
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              zIndex: 10,
            }}
          >
            <span
              style={{
                color: 'rgba(255, 255, 255, 0.8)',
                fontSize: '32px',
                fontFamily: 'OneUISansGUI',
                fontWeight: 400,
              }}
            >
              {currentTimeString}
            </span>
            <span
              style={{
                color: 'rgba(255, 255, 255, 0.8)',
                fontSize: '32px',
                fontFamily: 'OneUISansGUI',
                fontWeight: 400,
              }}
            >
              {totalTimeString}
            </span>
          </div>
        )}
        
        {/* 확장 상태일 때 컨트롤 버튼들 */}
        {isActive && (
          <div
            style={{
              position: 'absolute',
              top: lineY + 40, // 재생바 아래 70px (시간 표시 + 40px)
              left: '50%',
              transform: 'translateX(-50%)',
              display: 'flex',
              alignItems: 'center',
              gap: '40px',
              zIndex: 10,
            }}
          >
            {/* 이전 버튼 */}
            <svg width="64" height="64" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path fillRule="evenodd" clipRule="evenodd" d="M16.738 19.519L7.489 13.476C6.352 12.82 6.352 11.18 7.489 10.524L16.738 4.481C17.874 3.825 19.295 4.645 19.295 5.957V18.042C19.295 19.355 17.874 20.175 16.738 19.519Z" fill="#FFFFFF"/>
              <path d="M8.5 5.5C8.5 4.67157 7.82843 4 7 4C6.17157 4 5.5 4.67157 5.5 5.5V18.5C5.5 19.3284 6.17157 20 7 20C7.82843 20 8.5 19.3284 8.5 18.5V5.5Z" fill="#FFFFFF"/>
            </svg>
            
            {/* 일시정지 버튼 */}
            <svg width="64" height="64" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path fillRule="evenodd" clipRule="evenodd" d="M8.52443 4.54102L8.66943 4.54692C9.57813 4.62122 10.2974 5.38782 10.2974 6.31402V17.685C10.2974 18.661 9.50043 19.459 8.52443 19.459C7.54743 19.459 6.75043 18.661 6.75043 17.685V6.31402C6.75043 5.33902 7.54743 4.54102 8.52443 4.54102ZM16.4756 4.54102L16.6206 4.54692C17.5294 4.62122 18.2496 5.38782 18.2496 6.31402V17.685C18.2496 18.661 17.4516 19.459 16.4756 19.459C15.4996 19.459 14.7026 18.661 14.7026 17.685V6.31402C14.7026 5.33902 15.4996 4.54102 16.4756 4.54102Z" fill="#FFFFFF"/>
            </svg>
            
            {/* 다음 버튼 */}
            <svg width="64" height="64" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path fillRule="evenodd" clipRule="evenodd" d="M8.26194 19.519L17.5109 13.476C18.6479 12.82 18.6479 11.18 17.5109 10.524L8.26194 4.481C7.12594 3.825 5.70494 4.645 5.70494 5.957V18.042C5.70494 19.355 7.12594 20.175 8.26194 19.519Z" fill="#FFFFFF"/>
              <path d="M16.4999 5.5C16.4999 4.67157 17.1715 4 17.9999 4C18.8284 4 19.4999 4.67157 19.4999 5.5V18.5C19.4999 19.3284 18.8284 20 17.9999 20C17.1715 20 16.4999 19.3284 16.4999 18.5V5.5Z" fill="#FFFFFF"/>
            </svg>
          </div>
        )}
      </div>
  );
} 