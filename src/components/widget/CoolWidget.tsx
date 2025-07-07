'use client';

import { Widget } from "@/components/ui";

interface CoolWidgetProps {
  activeWidget: string | null;
}

export default function CoolWidget({ activeWidget }: CoolWidgetProps) {
  return (
    <Widget 
      style={{ 
        position: 'absolute',
        right: activeWidget === 'widget3' ? 0 : 64,
        top: activeWidget === 'widget3' ? 0 : 64,
        width: activeWidget === 'widget3' ? 2378 : 418,
        height: activeWidget === 'widget3' ? 1485 : 877,
        borderRadius: 260,
        opacity: activeWidget && activeWidget !== 'widget3' ? 0 : 1,
        transition: 'all 0.25s cubic-bezier(0.23, 1, 0.32, 1)',
        zIndex: activeWidget === 'widget3' ? 200 : 1,
        transform: 'translate3d(0, 0, 0)',
        backfaceVisibility: 'hidden',
        perspective: 1000,
        overflow: 'hidden',
      }} 
    >
      {/* 여기에 향후 컨텐츠를 추가할 수 있습니다 */}
    </Widget>
  );
} 