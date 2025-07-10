'use client';

import { Widget } from "@/components/baseUI";
import { Clock } from "@/components/content";
import { useWidgetAnimation } from "@/utils/widgetAnimations";
import type { WidgetAnimationState } from "@/utils/widgetAnimations";

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
  
  const animationState: WidgetAnimationState = {
    activeWidget,
    leftWidgetsOpacity,
    rightWidgetsOpacity
  };
  
  const { style } = useWidgetAnimation('clock', animationState, 'default');

  return (
    <Widget style={style}>
      <div className="flex items-center justify-center h-full p-4">
        <Clock 
          size={418}
          className="transition-all duration-300"
        />
      </div>
    </Widget>
  );
} 