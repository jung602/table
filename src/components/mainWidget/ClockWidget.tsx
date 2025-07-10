'use client';

import { Widget } from "@/components/baseUI";
import { Clock } from "@/components/content";

interface ClockWidgetProps {
  activeWidget: string | null;
  leftWidgetsOpacity: number;
  rightWidgetsOpacity: number;
}

export default function ClockWidget({ 
  activeWidget, 
  leftWidgetsOpacity, 
  rightWidgetsOpacity 
}: ClockWidgetProps) {
  
  // 위치 계산: 오른쪽 위젯이 숨겨지면 오른쪽으로 이동
  const getLeftPosition = () => {
    if (activeWidget === 'widget1') return 0;
    if (rightWidgetsOpacity === 0) return window.innerWidth / 2 + 209; // 중앙으로 이동 (418/2 = 209)
    return 64; // 기본 위치
  };

  return (
    <Widget 
      style={{ 
        position: 'absolute',
        left: getLeftPosition(),
        top: activeWidget === 'widget1' ? 0 : 64,
        width: activeWidget === 'widget1' ? 2378 : 418,
        height: activeWidget === 'widget1' ? 1485 : 418,
        borderRadius: 260,
        opacity: activeWidget && activeWidget !== 'widget1' ? 0 : 1,
        transition: 'all 0.25s cubic-bezier(0.23, 1, 0.32, 1)',
        zIndex: activeWidget === 'widget1' ? 200 : 1,
        transform: 'translate3d(0, 0, 0)',
        backfaceVisibility: 'hidden',
        perspective: 1000,
        margin: '-2px'
      }} 
    >
      <div className="flex items-center justify-center h-full p-4">
        <Clock 
          size={418}
          className="transition-all duration-300"
        />
      </div>
    </Widget>
  );
} 