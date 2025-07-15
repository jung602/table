'use client';

import { BackButton } from "@/components/baseUI";
import { ClockWidget, SpotifyWidget, CoolWidget, HavenWidget } from "@/components/mainWidget";
import { NotificationWidget } from "@/components/homeWidget";
import { WeatherWidget, GalleryWidget, NewsWidget, HealthWidget } from "@/components/mobileWidget";
import { WidgetAnimationController } from "@/utils/widgetAnimations";
import { useEffect } from "react";

interface MainContentProps {
  activeWidget: string | null;
  setActiveWidget: (widget: string | null) => void;
  leftWidgetsOpacity: number;
  rightWidgetsOpacity: number;
  resetAllWidgets: () => void;
}

export default function MainContent({ 
  activeWidget, 
  setActiveWidget, 
  leftWidgetsOpacity, 
  rightWidgetsOpacity,
  resetAllWidgets
}: MainContentProps) {

  // 화면 너비 업데이트 (중앙 애니메이션 시스템에서 사용)
  useEffect(() => {
    const updateScreenWidth = () => {
      WidgetAnimationController.updateScreenWidth(window.innerWidth);
    };
    
    updateScreenWidth();
    window.addEventListener('resize', updateScreenWidth);
    
    return () => window.removeEventListener('resize', updateScreenWidth);
  }, []);

  // 가운데 텍스트 opacity 계산: 위젯이 활성화되거나 한쪽 위젯이 숨겨지면 텍스트도 숨김
  const centerTextOpacity = (activeWidget || leftWidgetsOpacity === 0 || rightWidgetsOpacity === 0) ? 0 : 1;

  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        position: 'relative'
      }}
    >

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
         opacity: centerTextOpacity,
         transition: 'opacity 0.2s ease-out',
        }}
        className="flex items-center justify-center"
      >
        <div className="text-center">
          <h1 className="text-[128px] leading-[128px] font-bold opacity-50 text-white mb-2 font-mono">Good Morning</h1>
          <h2 className="text-[128px] leading-[128px] font-bold opacity-75 text-white font-mono">David</h2>
        </div>
      </div>

      {/* 위젯들 */}
      <div>
        <ClockWidget 
          activeWidget={activeWidget} 
          leftWidgetsOpacity={leftWidgetsOpacity}
          rightWidgetsOpacity={rightWidgetsOpacity}
        />
        <SpotifyWidget 
          activeWidget={activeWidget}
          leftWidgetsOpacity={leftWidgetsOpacity}
          rightWidgetsOpacity={rightWidgetsOpacity}
        />
      </div>
      
      <div>
        <CoolWidget 
          activeWidget={activeWidget}
          leftWidgetsOpacity={leftWidgetsOpacity}
          rightWidgetsOpacity={rightWidgetsOpacity}
        />
        <HavenWidget 
          activeWidget={activeWidget}
          leftWidgetsOpacity={leftWidgetsOpacity}
          rightWidgetsOpacity={rightWidgetsOpacity}
        />
      </div>

      {/* 새로운 위젯들 - 조건부 표시 */}
      {/* 왼쪽 위젯이 숨겨졌을 때 나타나는 알림 위젯 */}
      <NotificationWidget 
        activeWidget={activeWidget}
        leftWidgetsOpacity={leftWidgetsOpacity}
        rightWidgetsOpacity={rightWidgetsOpacity}
      />
      
      {/* 오른쪽 위젯이 숨겨졌을 때 나타나는 갤러리 위젯 */}
      <GalleryWidget 
        activeWidget={activeWidget}
        leftWidgetsOpacity={leftWidgetsOpacity}
        rightWidgetsOpacity={rightWidgetsOpacity}
      />
      
      {/* 오른쪽 위젯이 숨겨졌을 때 나타나는 날씨 위젯 */}
      <WeatherWidget 
        activeWidget={activeWidget}
        leftWidgetsOpacity={leftWidgetsOpacity}
        rightWidgetsOpacity={rightWidgetsOpacity}
      />
      
      {/* 오른쪽 위젯이 숨겨졌을 때 나타나는 뉴스 위젯 */}
      <NewsWidget 
        activeWidget={activeWidget}
        leftWidgetsOpacity={leftWidgetsOpacity}
        rightWidgetsOpacity={rightWidgetsOpacity}
      />
      
      {/* 오른쪽 위젯이 숨겨졌을 때 나타나는 건강 위젯 */}
      <HealthWidget 
        activeWidget={activeWidget}
        leftWidgetsOpacity={leftWidgetsOpacity}
        rightWidgetsOpacity={rightWidgetsOpacity}
      />
      

      {/* 뒤로가기 버튼 - 위젯이 활성화된 상태에서만 표시 */}
      {activeWidget && (
        <div
          onClick={() => setActiveWidget(null)}
          style={{
            position: 'absolute',
            left: 120,
            top: 120,
            zIndex: 300,
            cursor: 'pointer',
          }}
        >
          <BackButton 
            style={{
              transition: 'opacity 0.25s ease-out',
              opacity: 1,
            }}
          />
        </div>
      )}
    </div>
  );
} 