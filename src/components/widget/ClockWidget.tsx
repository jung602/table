'use client';

import { Widget } from "@/components/ui";
import { Clock } from "@/components/content";

interface ClockWidgetProps {
  activeWidget: string | null;
}

export default function ClockWidget({ activeWidget }: ClockWidgetProps) {
  return (
    <Widget 
      style={{ 
        position: 'absolute',
        left: activeWidget === 'widget1' ? 0 : 64,
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