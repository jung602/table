'use client';

import { BackButton } from "@/components/baseUI";
import { ClockWidget, SpotifyWidget, CoolWidget, HavenWidget } from "@/components/mainWidget";
import { NotificationWidget } from "@/components/homeWidget";
import { SettingsWidget } from "@/components/mobileWidget";

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
      <div style={{ opacity: leftWidgetsOpacity, transition: 'opacity 0.3s ease-out' }}>
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
      
      <div style={{ opacity: rightWidgetsOpacity, transition: 'opacity 0.3s ease-out' }}>
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
      
      {/* 오른쪽 위젯이 숨겨졌을 때 나타나는 설정 위젯 */}
      <SettingsWidget 
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

      {/* 왼쪽 위젯 숨김 시 왼쪽 중앙에 180도 회전된 BackButton */}
      {leftWidgetsOpacity === 0 && !activeWidget && (
        <div
          onClick={resetAllWidgets}
          style={{
            position: 'absolute',
            left: 60,
            top: '50%',
            transform: 'translateY(-50%) rotate(180deg)',
            zIndex: 300,
            cursor: 'pointer',
          }}
        >
          <BackButton 
            style={{
              transition: 'all 0.25s ease-out',
              opacity: 1,
            }}
          />
        </div>
      )}

      {/* 오른쪽 위젯 숨김 시 오른쪽 중앙에 BackButton */}
      {rightWidgetsOpacity === 0 && !activeWidget && (
        <div
          onClick={resetAllWidgets}
          style={{
            position: 'absolute',
            right: 60,
            top: '50%',
            transform: 'translateY(-50%)',
            zIndex: 300,
            cursor: 'pointer',
          }}
        >
          <BackButton 
            style={{
              transition: 'all 0.25s ease-out',
              opacity: 1,
            }}
          />
        </div>
      )}
    </div>
  );
} 