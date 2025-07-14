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
          src="https://static01.nyt.com/images/2025/02/07/multimedia/07dc-trump-news-time-musk/07dc-trump-news-time-musk-superJumbo.jpg?quality=75&auto=webp"
          alt="News Image"
          className="w-[1500px] h-[1500px] object-cover rounded-lg pb-[50px]"
        />
        <div className="text-[64px] absolute bottom-20 left-20 font-bold text-white mb-4 text-center leading-tight">
          A Time Out For Musk
        </div>
      </div>
    </Widget>
  );
} 