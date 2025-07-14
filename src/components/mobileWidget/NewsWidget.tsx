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
      <div className="w-full h-full flex items-center justify-center overflow-hidden rounded-lg rounded-[196px]">
        <img 
          src="https://i.pinimg.com/1200x/d3/65/64/d365641919e902979ad574457550476f.jpg"
          alt="News Image"
          className="w-[1000px] h-[1000px] object-cover rounded-lg pb-[10px] opacity-50"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent rounded-lg"></div>
        <div className="absolute top-[42px] left-1/2 transform -translate-x-1/2">
          <img src="/icons/news.svg" alt="News" width="54" height="54" />
        </div>
        <div className="absolute bottom-64 rounded-full m-2 bg-black left-20 w-24 h-24 overflow-hidden">
        <img 
          src="https://i.pinimg.com/280x280_RS/67/58/0a/67580a2ba33cfe4b2afb72ec47c14836.jpg"
          alt="NewyorkTimes" 
        /></div>
        <div className="text-[54px] absolute bottom-20 left-20 font-bold text-white mb-4 text-left leading-tight">
        When does it turn into a movement?
        </div>
      </div>
    </Widget>
  );
} 