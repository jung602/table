'use client';

import { Widget } from "@/components/baseUI";
import { ImageLong, Player } from "@/components/content";
import { useWidgetAnimation } from "@/utils/widgetAnimations";
import type { WidgetAnimationState } from "@/utils/widgetAnimations";

interface SpotifyWidgetProps {
  activeWidget: string | null;
  leftWidgetsOpacity: number;
  rightWidgetsOpacity: number;
}

export default function SpotifyWidget({ 
  activeWidget, 
  leftWidgetsOpacity, 
  rightWidgetsOpacity 
}: SpotifyWidgetProps) {
  
  const animationState: WidgetAnimationState = {
    activeWidget,
    leftWidgetsOpacity,
    rightWidgetsOpacity
  };
  
  const { style, dimensions } = useWidgetAnimation('spotify', animationState, 'default');

  return (
    <Widget style={style}>
      <ImageLong
        src="/image/thumb.png"
        overlayImage="/image/thumb.png"
        width={418}
        height={877}
        className="absolute inset-0"
        blendMode="normal"
        saturation={1}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          borderRadius: 260,
          zIndex: 0,
        }}
      />
      <Player 
        width={dimensions.width} 
        height={dimensions.height} 
        className="m-[-3px] z-10"
        isActive={activeWidget === 'widget2'}
      />
      <div className="z-20 flex flex-col items-center justify-between h-full">
        <div className="z-20 mt-[42px]">
          <svg width="54" height="52" viewBox="0 0 54 52" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M27 0C12.0886 0 0 11.6397 0 26C0 40.3603 12.0886 52 27 52C41.9114 52 54 40.3603 54 26C54 11.6397 41.9114 0 27 0ZM40.1727 37.4806C39.7391 38.22 38.9414 38.636 38.1191 38.636C37.7346 38.636 37.3377 38.5434 36.9736 38.3484C33.6027 36.5284 29.9291 35.4136 26.0468 35.035C22.1564 34.6596 18.315 35.0397 14.625 36.1743C13.3936 36.5528 12.0682 35.8977 11.6755 34.71C11.2787 33.5203 11.9618 32.2483 13.1973 31.8677C17.5009 30.5437 21.9886 30.0934 26.5213 30.537C31.0459 30.9806 35.3332 32.2806 39.2686 34.4047C40.4018 35.0122 40.8068 36.3902 40.1727 37.4806ZM43.4045 29.5833C42.9873 30.3566 42.1691 30.8002 41.3223 30.8002C40.9541 30.8002 40.5859 30.719 40.2382 30.5437C36.0941 28.4653 31.6186 27.1783 26.9263 26.7197C22.1973 26.2537 17.5132 26.6598 12.9968 27.9142C11.7491 28.2553 10.4482 27.5683 10.0923 26.3672C9.73229 25.168 10.4523 23.9153 11.6959 23.569C16.7932 22.1536 22.0786 21.7002 27.4009 22.2202C32.6864 22.7386 37.7346 24.1883 42.4105 26.5346C43.5559 27.1117 44.0059 28.4763 43.4045 29.5833ZM44.5745 23.0132C44.2227 23.0132 43.8668 22.9367 43.5273 22.776C38.61 20.4147 33.3204 18.9442 27.8018 18.4049C22.275 17.8604 16.7768 18.2812 11.4545 19.6497C10.2027 19.9696 8.91817 19.2546 8.58272 18.0472C8.24726 16.8413 8.99184 15.6016 10.2477 15.2797C16.1182 13.7702 22.1891 13.3104 28.2805 13.9068C34.3636 14.4997 40.1973 16.1232 45.6218 18.7283C46.7836 19.2853 47.2541 20.644 46.6773 21.7604C46.2682 22.555 45.4377 23.0132 44.5745 23.0132Z" fill="white"/>
          </svg>
        </div>
        <div className="z-20 text-center mb-[80px]">
          <div 
            className="z-20 text-[42px] text-white mb-1"
            style={{
              fontFamily: 'OneUISansGUI',
              fontWeight: 700,
              lineHeight: '54px',
            }}
          >
            Kill Bill
          </div>
          <div 
            className="z-20 text-[32px] text-white opacity-70"
            style={{
              fontFamily: 'OneUISansGUI',
              fontWeight: 400,
              lineHeight: '32px',
            }}
          >
            SZA
          </div>
        </div>
      </div>
    </Widget>
  );
} 