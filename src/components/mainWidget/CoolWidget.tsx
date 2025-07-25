'use client';

import { Widget } from "@/components/baseUI";
import { ImageLong } from "@/components/content";
import { useWidgetAnimation } from "@/utils/widgetAnimations";
import type { WidgetAnimationState } from "@/utils/widgetAnimations";

interface CoolWidgetProps {
  activeWidget: string | null;
  leftWidgetsOpacity: number;
  rightWidgetsOpacity: number;
}

export default function CoolWidget({ 
  activeWidget, 
  leftWidgetsOpacity, 
  rightWidgetsOpacity 
}: CoolWidgetProps) {
  
  const animationState: WidgetAnimationState = {
    activeWidget,
    leftWidgetsOpacity,
    rightWidgetsOpacity
  };
  
  const { style } = useWidgetAnimation('cool', animationState, 'default');

  return (
    <Widget style={style}>
      {/*<ImageLong
        saturation={2}
        className="opacity-0 absolute inset-0 object-cover"
      />
      
      {/* 카드 UI */}
      <div 
        className="absolute overflow-hidden"
        style={{
          width: 412,
          height: 875,
          borderRadius: '260px 260px 0 0',
          top: '0',
          left: '50%',
          transform: 'translateX(-50%)',
          background: `
            linear-gradient(to top, rgba(255,255,255,0) 50%, rgba(65,75,82,1) 80%)
          `,
          zIndex: 2,
        }}
      >

        {/* 상단 그라디언트 이미지 */}
        <div
          className="absolute top-[200px] left-1/2 transform -translate-x-1/2 blur-[50px]"
          style={{
            width: '80%',
            height: '80%',
            backgroundImage: 'url(/image/topGradient.svg)',
            backgroundSize: 'cover',
            backgroundPosition: 'center top',
            backgroundRepeat: 'no-repeat',
            mixBlendMode: 'screen',
          }}
        >
        </div>
        <div
          className="absolute top-[200px] left-1/2 transform -translate-x-1/2 blur-[50px]"
          style={{
            width: '80%',
            height: '80%',
            backgroundImage: 'url(/image/topGradient.svg)',
            backgroundSize: 'cover',
            backgroundPosition: 'center top',
            backgroundRepeat: 'no-repeat',
            opacity: 0.5,
            mixBlendMode: 'screen',
          }}
        >
        </div>

        {/* 그라디언트 영역 위 텍스트
        <div
          className="absolute left-1/2 transform -translate-x-1/2 px-8"
          style={{
            top: 156,
            width: '90%',
            textAlign: 'center',
            zIndex: 10,
          }}
        >
          <p 
            className="text-white text-32-bold"
            style={{
              lineHeight: '42px',
            }}
          >
            Expires tommorow, better drink it soon!
          </p>
        </div> */}

      <div className="absolute top-[160px] w-full h-full flex flex-col items-center justify-center">
            {/* 원본 이미지 */}
            <img
              src="/image/juice.png"
              alt="Blueberry Juice"
              style={{
                width: '80%',
                height: '80%',
                objectFit: 'contain',
                zIndex: 10,
              }}
            />
              <img
                src="/image/juice2.png"
                alt="Blueberry Juice Reflection"
                style={{
                  width: '80%',
                  height: '80%',
                  objectFit: 'contain',
                  marginTop: '-120px',
                  opacity: 0.3, // 기본 투명도
                  maskImage: 'linear-gradient(to bottom, rgba(0,0,0,0.5) 0%, rgba(0,0,0,0) 50%)',
                  WebkitMaskImage: 'linear-gradient(to bottom, rgba(0,0,0,0.5) 0%, rgba(0,0,0,0) 50%)',
                }}
              />
      </div>

      <div className="absolute w-full bottom-[80px] left-1/2 transform -translate-x-1/2">
            <h3 
              className="text-white text-42-bold text-center mb-1"
            >
              Berry Juice
            </h3>
                          <p 
                className="text-white/50 text-32-medium text-center"
              >
               Expires Today
              </p>
      </div>

      {/* AI cooling 컴포넌트 */}
      <div
          className="absolute left-1/2 transform -translate-x-1/2"
          style={{
            top: 50,
          }}
        >
          <style jsx>{`
            @property --gradient-angle {
              syntax: '<angle>';
              initial-value: 0deg;
              inherits: false;
            }
            
            @keyframes rotate-gradient {
              from { --gradient-angle: 0deg; }
              to { --gradient-angle: -360deg; }
            }
            
            .rotating-gradient {
              background: conic-gradient(from var(--gradient-angle), rgba(255, 255, 255, 1) 0%, rgba(255, 255, 255, 0.8) 15%, rgba(255, 255, 255, .1) 30%, rgba(255, 255, 255, 0.1) 100%), rgba(255, 255, 255, .1);
              animation: rotate-gradient 2s linear infinite;
            }
          `}</style>
          <div
            className="relative overflow-hidden rotating-gradient "
            style={{
              borderRadius: 50,
              padding: '4px',
            }}
          >
            <div
              className="relative"
              style={{
                background: `rgba(65,75,82,1)
                `,
                borderRadius: 48,
                padding: '8px 24px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <span 
                className="text-white text-32-medium relative z-10"
              >
                AI Cooling
              </span>
            </div>
          </div>
      </div>

        {/* 내부 카드
        <div
        className="absolute"
        style={{
          width: 380,
          borderRadius: '50px',
          top: '50%',
          left: '50%',
          transform: 'translateX(-50%) translateY(-35%)',
          backgroundImage: 'url(/image/backGroundCard.svg)',
          backgroundSize: '100% 100%',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          padding: '16px',
        }}>
          <div
            style={{
              height: '300px',
              backgroundColor: 'rgba(165, 209, 255, 0)',
              borderRadius: '32px',
              marginTop: '8px',
              marginBottom: '8px',
            }}
          >
            <img
              src="/image/juice.png"
              alt="Blueberry Juice"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'contain',
              }}
            />
          </div>
            <h3 
              className="text-white text-32-bold text-center mb-1"
            >
              Blueberry Juice
            </h3>
                          <p 
                className="text-white/50 text-32-medium text-center mb-4"
              >
                21/07/2025
              </p>

          </div> */}

      </div>

    </Widget>
  );
} 