'use client';

import Image from "next/image";
import { Background, Widget } from "@/components/ui";
import HandTracking from "@/components/HandTracking";
import { useState } from "react";

export default function Home() {
  const [activeWidget, setActiveWidget] = useState<string | null>(null);

  const handlePinchDetected = (widgetId: string) => {
    setActiveWidget(widgetId);
  };

  const handlePinchEnd = () => {
    setActiveWidget(null);
  };

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
          }}
          className="flex items-center justify-center"
        >
          <div className="text-center">
            <h1 className="text-[128px] leading-[128px] font-bold opacity-50 text-white mb-2 font-mono">Good Morning</h1>
            <h2 className="text-[128px] leading-[128px] font-bold opacity-75 text-white font-mono">David</h2>
          </div>
        </div>

        {/* 좌측 상단 1x1 위젯 (418x418px) */}
        <Widget 
          style={{ 
            position: 'absolute',
            left: activeWidget === 'widget1' ? '0px' : '60px',
            top: activeWidget === 'widget1' ? '0px' : '60px',
            width: activeWidget === 'widget1' ? '2378px' : '418px', 
            height: activeWidget === 'widget1' ? '1485px' : '418px',
            borderRadius: '260px',
            opacity: activeWidget && activeWidget !== 'widget1' ? 0 : 1,
            transition: 'all 0.5s ease-in-out',
            zIndex: activeWidget === 'widget1' ? 200 : 1,
          }} 
        />
        
        {/* 좌측 하단 1x2 위젯 (418x877px) */}
        <Widget 
          style={{ 
            position: 'absolute',
            left: activeWidget === 'widget2' ? '0px' : '60px',
            top: activeWidget === 'widget2' ? '0px' : '524px',
            width: activeWidget === 'widget2' ? '2378px' : '418px', 
            height: activeWidget === 'widget2' ? '1485px' : '877px',
            borderRadius: '260px',
            opacity: activeWidget && activeWidget !== 'widget2' ? 0 : 1,
            transition: 'all 0.5s ease-in-out',
            zIndex: activeWidget === 'widget2' ? 200 : 1,
          }} 
        />
        
        {/* 우측 상단 1x2 위젯 (418x877px) */}
        <Widget 
          style={{ 
            position: 'absolute',
            right: activeWidget === 'widget3' ? '0px' : '60px',
            top: activeWidget === 'widget3' ? '0px' : '60px',
            width: activeWidget === 'widget3' ? '2378px' : '418px', 
            height: activeWidget === 'widget3' ? '1485px' : '877px',
            borderRadius: '260px',
            opacity: activeWidget && activeWidget !== 'widget3' ? 0 : 1,
            transition: 'all 0.5s ease-in-out',
            zIndex: activeWidget === 'widget3' ? 200 : 1,
          }} 
        />
        
        {/* 우측 하단 1x1 위젯 (418x418px) */}
        <Widget 
          style={{ 
            position: 'absolute',
            right: activeWidget === 'widget4' ? '0px' : '60px',
            bottom: activeWidget === 'widget4' ? '0px' : '60px',
            width: activeWidget === 'widget4' ? '2378px' : '418px', 
            height: activeWidget === 'widget4' ? '1485px' : '418px',
            borderRadius: '260px',
            opacity: activeWidget && activeWidget !== 'widget4' ? 0 : 1,
            transition: 'all 0.5s ease-in-out',
            zIndex: activeWidget === 'widget4' ? 200 : 1,
          }} 
        />
      </Background>

      {/* 핸드트래킹 컴포넌트 - Background 전체 사이즈 */}
      <HandTracking 
        width={2378} 
        height={1485} 
        onPinchDetected={handlePinchDetected}
        onPinchEnd={handlePinchEnd}
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
