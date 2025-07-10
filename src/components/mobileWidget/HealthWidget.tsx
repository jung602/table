'use client';

import { Widget } from "@/components/baseUI";
import { useWidgetAnimation } from "@/utils/widgetAnimations";
import type { WidgetAnimationState } from "@/utils/widgetAnimations";

interface HealthWidgetProps {
  activeWidget: string | null;
  leftWidgetsOpacity: number;
  rightWidgetsOpacity: number;
}

export default function HealthWidget({ 
  activeWidget, 
  leftWidgetsOpacity, 
  rightWidgetsOpacity 
}: HealthWidgetProps) {
  
  const animationState: WidgetAnimationState = {
    activeWidget,
    leftWidgetsOpacity,
    rightWidgetsOpacity
  };
  
  const { style } = useWidgetAnimation('health', animationState, 'default');

  return (
    <Widget style={style}>
    </Widget>
  );
} 