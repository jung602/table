'use client';

import Image from "next/image";
import { Background, Widget, BackButton } from "@/components/ui";
import HandTracking from "@/components/HandTracking";
import { useState, useRef, useCallback } from "react";

export default function Home() {
  const [activeWidget, setActiveWidget] = useState<string | null>(null);
  const [isAnimating, setIsAnimating] = useState(false);
  
  // RAF를 위한 ref
  const rafRef = useRef<number | null>(null);

  const handleHoverDetected = useCallback((widgetId: string) => {
    if (isAnimating) return;
    setIsAnimating(true);
    setActiveWidget(widgetId);
    
    // 애니메이션 완료 후 플래그 해제
    setTimeout(() => setIsAnimating(false), 250);
  }, [isAnimating]);

  const handleHoverEnd = useCallback(() => {
    if (isAnimating) return;
    setIsAnimating(true);
    setActiveWidget(null);
    
    // 애니메이션 완료 후 플래그 해제
    setTimeout(() => setIsAnimating(false), 250);
  }, [isAnimating]);

  const handleBackButtonHover = useCallback(() => {
    if (isAnimating) return;
    setIsAnimating(true);
    setActiveWidget(null);
    
    // 애니메이션 완료 후 플래그 해제
    setTimeout(() => setIsAnimating(false), 250);
  }, [isAnimating]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-black">
      <Background>
        {/* 중앙 텍스트 */}
        <div 
          style={{ 
           position: 'absolute',
           top: '50%',
           left: '50%',
           transform: 'translate(-50%, -50%)',
           width: '100%',
           height: '100%',
           zIndex: 100,
           opacity: activeWidget ? 0 : 1,
           transition: 'opacity 0.2s ease-out',
          }}
          className="flex items-center justify-center"
        >
          <div className="text-center">
            <h1 className="text-[128px] leading-[128px] font-bold opacity-50 text-white mb-2 font-mono">Good Morning</h1>
            <h2 className="text-[128px] leading-[128px] font-bold opacity-75 text-white font-mono">David</h2>
          </div>
        </div>

        {/* 좌측 상단 1x1 위젯 */}
        <Widget 
          style={{ 
            position: 'absolute',
            left: activeWidget === 'widget1' ? 0 : 60,
            top: activeWidget === 'widget1' ? 0 : 60,
            width: activeWidget === 'widget1' ? 2378 : 418,
            height: activeWidget === 'widget1' ? 1485 : 418,
            borderRadius: 260,
            opacity: activeWidget && activeWidget !== 'widget1' ? 0 : 1,
            transition: 'all 0.25s cubic-bezier(0.23, 1, 0.32, 1)',
            zIndex: activeWidget === 'widget1' ? 200 : 1,
            transform: 'translate3d(0, 0, 0)',
            backfaceVisibility: 'hidden',
            perspective: 1000,
          }} 
        />
        
        {/* 좌측 하단 1x2 위젯 */}
        <Widget 
          style={{ 
            position: 'absolute',
            left: activeWidget === 'widget2' ? 0 : 60,
            top: activeWidget === 'widget2' ? 0 : 524,
            width: activeWidget === 'widget2' ? 2378 : 418,
            height: activeWidget === 'widget2' ? 1485 : 877,
            borderRadius: 260,
            opacity: activeWidget && activeWidget !== 'widget2' ? 0 : 1,
            transition: 'all 0.25s cubic-bezier(0.23, 1, 0.32, 1)',
            zIndex: activeWidget === 'widget2' ? 200 : 1,
            transform: 'translate3d(0, 0, 0)',
            backfaceVisibility: 'hidden',
            perspective: 1000,
          }} 
        />
        
        {/* 우측 상단 1x2 위젯 */}
        <Widget 
          style={{ 
            position: 'absolute',
            right: activeWidget === 'widget3' ? 0 : 60,
            top: activeWidget === 'widget3' ? 0 : 60,
            width: activeWidget === 'widget3' ? 2378 : 418,
            height: activeWidget === 'widget3' ? 1485 : 877,
            borderRadius: 260,
            opacity: activeWidget && activeWidget !== 'widget3' ? 0 : 1,
            transition: 'all 0.25s cubic-bezier(0.23, 1, 0.32, 1)',
            zIndex: activeWidget === 'widget3' ? 200 : 1,
            transform: 'translate3d(0, 0, 0)',
            backfaceVisibility: 'hidden',
            perspective: 1000,
          }} 
        />
        
        {/* 우측 하단 1x1 위젯 */}
        <Widget 
          style={{ 
            position: 'absolute',
            right: activeWidget === 'widget4' ? 0 : 60,
            bottom: activeWidget === 'widget4' ? 0 : 60,
            width: activeWidget === 'widget4' ? 2378 : 418,
            height: activeWidget === 'widget4' ? 1485 : 418,
            borderRadius: 260,
            opacity: activeWidget && activeWidget !== 'widget4' ? 0 : 1,
            transition: 'all 0.25s cubic-bezier(0.23, 1, 0.32, 1)',
            zIndex: activeWidget === 'widget4' ? 200 : 1,
            transform: 'translate3d(0, 0, 0)',
            backfaceVisibility: 'hidden',
            perspective: 1000,
          }} 
        />

        {/* 뒤로가기 버튼 - 위젯이 활성화된 상태에서만 표시 */}
        {activeWidget && (
          <BackButton 
            style={{
              position: 'absolute',
              left: 120,
              top: 120,
              zIndex: 300,
              transition: 'opacity 0.25s ease-out',
              opacity: 1,
            }}
          />
        )}
      </Background>

      {/* 핸드트래킹 컴포넌트 - Background 전체 사이즈 */}
      <HandTracking 
        width={2378} 
        height={1485} 
        onHoverDetected={handleHoverDetected}
        onHoverEnd={handleHoverEnd}
        onBackButtonHover={handleBackButtonHover}
        activeWidget={activeWidget}
        widgetAreas={[
          { id: 'widget1', x: 60, y: 60, width: 418, height: 418 },
          { id: 'widget2', x: 60, y: 524, width: 418, height: 877 },
          { id: 'widget3', x: 2378 - 60 - 418, y: 60, width: 418, height: 877 },
          { id: 'widget4', x: 2378 - 60 - 418, y: 1485 - 60 - 418, width: 418, height: 418 }
        ]}
      />
    </div>
  );
}
