'use client';

import { Widget } from "@/components/baseUI";
import { useWidgetAnimation } from "@/utils/widgetAnimations";
import type { WidgetAnimationState } from "@/utils/widgetAnimations";

interface NewsWidgetProps {
  activeWidget: string | null;
  leftWidgetsOpacity: number;
  rightWidgetsOpacity: number;
}

export default function NewsWidget({ 
  activeWidget, 
  leftWidgetsOpacity, 
  rightWidgetsOpacity 
}: NewsWidgetProps) {
  
  const animationState: WidgetAnimationState = {
    activeWidget,
    leftWidgetsOpacity,
    rightWidgetsOpacity
  };
  
  const { style } = useWidgetAnimation('news', animationState, 'default');

  return (
    <Widget style={style}>
      <div className="w-full h-full flex items-center justify-center overflow-hidden">
        <img 
          src="https://i.pinimg.com/1200x/d3/65/64/d365641919e902979ad574457550476f.jpg"
          alt="News Image"
          className="w-[871px] h-[878px] rounded-lg opacity-30"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent"></div>
        <div className="absolute top-[42px] left-1/2 transform -translate-x-1/2"><img src="/icons/news.svg" alt="News" width="54" height="54" /></div>
        <div className="absolute top-[42px] rounded-full bg-black left-1/2 -translate-x-1/2 w-[54px] h-[54px] overflow-hidden">
        <img 
          src="https://i.pinimg.com/280x280_RS/67/58/0a/67580a2ba33cfe4b2afb72ec47c14836.jpg"
          alt="NewyorkTimes" 
        /></div>
        <div className="w-full text-42-bold absolute bottom-[64px] left-1/2 -translate-x-1/2 text-white text-center">
        When does it turn into a movement?
        <div className="text-32-medium mt-2 opacity-70 text-center">
        2025 / 07 / 24
        </div>
        </div>        

      </div>
    </Widget>
  );
} 