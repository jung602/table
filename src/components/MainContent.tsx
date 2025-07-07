'use client';

import { BackButton } from "@/components/ui";
import { ClockWidget, SpotifyWidget, CoolWidget, HavenWidget } from "@/components/widget";

interface MainContentProps {
  activeWidget: string | null;
}

export default function MainContent({ activeWidget }: MainContentProps) {
  return (
    <>
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

      {/* 위젯들 */}
      <ClockWidget activeWidget={activeWidget} />
      <SpotifyWidget activeWidget={activeWidget} />
      <CoolWidget activeWidget={activeWidget} />
      <HavenWidget activeWidget={activeWidget} />

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
    </>
  );
} 