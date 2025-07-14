'use client';

import { Widget } from "@/components/baseUI";
import { useWidgetAnimation } from "@/utils/widgetAnimations";
import type { WidgetAnimationState } from "@/utils/widgetAnimations";
import { ImageLong } from "../content";

interface GalleryWidgetProps {
  activeWidget: string | null;
  leftWidgetsOpacity: number;
  rightWidgetsOpacity: number;
}

export default function GalleryWidget({ 
  activeWidget, 
  leftWidgetsOpacity, 
  rightWidgetsOpacity 
}: GalleryWidgetProps) {
  
  const animationState: WidgetAnimationState = {
    activeWidget,
    leftWidgetsOpacity,
    rightWidgetsOpacity
  };
  
  const { style } = useWidgetAnimation('gallery', animationState, 'default');

  return (
    <Widget style={style}>
      <div className="relative w-full h-full m-[-2px]">
        <ImageLong 
          src="/image/africa.png"
          overlayImage="none"
        /> 
                 <div className="absolute top-[42px] left-1/2 transform -translate-x-1/2">
           <img src="/icons/gallery.svg" alt="Gallery" width="54" height="54" />
         </div>
        <div className="z-20 text-center absolute bottom-[80px] left-1/2 transform -translate-x-1/2">
          <div 
            className="z-20 text-42-bold text-white mb-1"
            style={{
              lineHeight: '54px',
            }}
          >
            Africa
          </div>
          <div 
            className="z-20 text-32-medium text-white opacity-70"
            style={{
              lineHeight: '32px',
            }}
          >
            Last Month
          </div>
        </div>
      </div>
    </Widget>
  );
} 