'use client';

import { Widget } from "@/components/baseUI";
import { ImageLong, CloudyAnimation } from "@/components/content";
import { useWidgetAnimation } from "@/utils/widgetAnimations";
import type { WidgetAnimationState } from "@/utils/widgetAnimations";
import { useState, useEffect } from 'react';

interface WeatherWidgetProps {
  activeWidget: string | null;
  leftWidgetsOpacity: number;
  rightWidgetsOpacity: number;
}

export default function WeatherWidget({ 
  activeWidget, 
  leftWidgetsOpacity, 
  rightWidgetsOpacity 
}: WeatherWidgetProps) {
  
  const [triggerAnimation, setTriggerAnimation] = useState(false);
  
  const animationState: WidgetAnimationState = {
    activeWidget,
    leftWidgetsOpacity,
    rightWidgetsOpacity
  };
  
  const { style } = useWidgetAnimation('settings', animationState, 'default');

  // 모바일 위젯이 보이기 시작할 때 애니메이션 트리거
  useEffect(() => {
    if (rightWidgetsOpacity === 0) {
      // 약간의 딜레이 후 애니메이션 시작 (위젯 표시 애니메이션 후)
      const timer = setTimeout(() => {
        setTriggerAnimation(true);
      }, 300);
      
      return () => clearTimeout(timer);
    } else {
      // 위젯이 숨겨질 때는 애니메이션 리셋
      setTriggerAnimation(false);
    }
  }, [rightWidgetsOpacity]);

  return (
    <Widget style={style}>
      <div className="relative flex flex-col items-center justify-center h-full p-8">
        <div className="flex flex-col items-center justify-center">
          <CloudyAnimation trigger={triggerAnimation} delay={0} />
          <div className="text-[64px] font-bold text-white m-[-44px]">28℃</div>
        </div>
      </div>
    </Widget>
  );
} 