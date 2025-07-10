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
    </Widget>
  );
} 