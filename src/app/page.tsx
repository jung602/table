'use client';

import Image from "next/image";
import { Background } from "@/components/ui";
import HandTracking from "@/components/HandTracking";
import MainContent from "@/components/MainContent";
import { useState, useRef, useCallback } from "react";

export default function Home() {
  const [activeWidget, setActiveWidget] = useState<string | null>(null);
  const [isAnimating, setIsAnimating] = useState(false);
  const [disabledHoverWidgets, setDisabledHoverWidgets] = useState<string[]>([]);
  
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
        <MainContent 
          activeWidget={activeWidget} 
          onDisabledHoverWidgetsChange={setDisabledHoverWidgets}
        />
      </Background>

      {/* 핸드트래킹 컴포넌트 - Background 전체 사이즈 */}
      <HandTracking 
        width={2378} 
        height={1485} 
        onHoverDetected={handleHoverDetected}
        onHoverEnd={handleHoverEnd}
        onBackButtonHover={handleBackButtonHover}
        activeWidget={activeWidget}
        disabledHoverWidgets={disabledHoverWidgets}
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
