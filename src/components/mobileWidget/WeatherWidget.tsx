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
      // 위젯 표시 애니메이션 후 애니메이션 시작
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
      <div className="relative h-full p-8">
        <div className="flex flex-col items-center justify-center">
          <CloudyAnimation className="mb-[-54px]" trigger={triggerAnimation} delay={10} />
          <div className="text-[64px] font-bold text-white">28℃</div>
          <div className="mt-2 flex items-center gap-2 text-[32px] bg-white/20 pr-5 pl-2 rounded-full font-medium text-white">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path fillRule="evenodd" clipRule="evenodd" d="M11.9994 13.1688C10.3434 13.1688 8.99942 11.8258 8.99942 10.1668C8.99942 8.51179 10.3434 7.16879 11.9994 7.16879C13.6564 7.16879 14.9994 8.51179 14.9994 10.1668C14.9994 11.8258 13.6564 13.1688 11.9994 13.1688ZM11.9984 3.02679C8.02042 3.02679 4.78442 6.26279 4.78442 10.2398C4.78442 12.9948 6.87942 15.3148 6.96142 15.4028L10.8604 20.4498C11.4594 21.1478 12.5394 21.1478 13.1384 20.4488L17.0284 15.4118C17.1184 15.3148 19.2154 12.9948 19.2154 10.2398C19.2154 6.26279 15.9784 3.02679 11.9984 3.02679Z" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Seoul
          </div>
        </div>
      </div>
    </Widget>
  );
} 