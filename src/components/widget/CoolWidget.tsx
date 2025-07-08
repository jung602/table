'use client';

import { Widget } from "@/components/ui";
import { ImageLong } from "@/components/content";

interface CoolWidgetProps {
  activeWidget: string | null;
}

export default function CoolWidget({ activeWidget }: CoolWidgetProps) {
  const isActive = activeWidget === 'widget3';
  const currentWidth = isActive ? 2378 : 418;
  const currentHeight = isActive ? 1485 : 877;

  return (
    <Widget 
      style={{ 
        position: 'absolute',
        right: isActive ? 0 : 64,
        top: isActive ? 0 : 64,
        width: currentWidth,
        height: currentHeight,
        borderRadius: 260,
        opacity: activeWidget && activeWidget !== 'widget3' ? 0 : 1,
        transition: 'all 0.25s cubic-bezier(0.23, 1, 0.32, 1)',
        zIndex: isActive ? 200 : 1,
        transform: 'translate3d(0, 0, 0)',
        backfaceVisibility: 'hidden',
        perspective: 1000,
        overflow: 'hidden',
      }} 
    >
      <ImageLong 
        width={currentWidth}
        height={currentHeight}
        saturation={2}
        className="opacity-20 absolute inset-0 object-cover"
      />
      
      {/* 카드 UI */}
      <div 
        className="absolute overflow-hidden"
        style={{
          width: 416,
          height: 875,
          borderRadius: '260px 260px 0 0',
          top: '0',
          left: '50%',
          transform: 'translateX(-50%)',
          background: `
            linear-gradient(to top, rgba(9,11,13,0) 0%, rgba(65,75,82,1) 100%)
          `,
          zIndex: 2,
        }}
      >

        {/* 상단 그라디언트 이미지 */}
        <div
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 blur-[50px]"
          style={{
            width: '80%',
            height: '55%',
            backgroundImage: 'url(/image/topGradient.svg)',
            backgroundSize: 'cover',
            backgroundPosition: 'center top',
            backgroundRepeat: 'no-repeat',
            mixBlendMode: 'screen',
          }}
        >
        <div
          className="absolute left-1/2 transform -translate-x-1/2 px-8"
          style={{
            top: 150,
            width: '90%',
            textAlign: 'center',
            zIndex: 10,
          }}
        >
          <p 
            className="text-white font-semibold"
            style={{
              fontSize: '32px',
              lineHeight: '40px',
            }}
          >
            Blueberry juice expires tommorow, better drink it soon!
          </p>
        </div>
        </div>


        {/* 그라디언트 영역 위 텍스트 */}
        <div
          className="absolute left-1/2 transform -translate-x-1/2 px-8"
          style={{
            top: 140,
            width: '90%',
            textAlign: 'center',
            zIndex: 10,
            
          }}
        >
          <p 
            className="text-white font-semibold"
            style={{
              fontSize: '32px',
              lineHeight: '42px',
            }}
          >
            Expires tommorow, better drink it soon!
          </p>
        </div>


        {/* AI cooling 컴포넌트 */}
        <div
          className="absolute left-1/2 transform -translate-x-1/2"
          style={{
            top: 72,
          }}
        >
          <style jsx>{`
            @keyframes rotate-gradient {
              0% { background: conic-gradient(from 360deg, rgba(255, 255, 255, 1) 0%, rgba(255, 255, 255, 0.3) 15%, rgba(255, 255, 255, 0) 30%, rgba(255, 255, 255, 0) 100%), rgba(255, 255, 255, .2); }
              10% { background: conic-gradient(from 324deg, rgba(255, 255, 255, 1) 0%, rgba(255, 255, 255, 0.3) 15%, rgba(255, 255, 255, 0) 30%, rgba(255, 255, 255, 0) 100%), rgba(255, 255, 255, .2); }
              20% { background: conic-gradient(from 288deg, rgba(255, 255, 255, 1) 0%, rgba(255, 255, 255, 0.3) 15%, rgba(255, 255, 255, 0) 30%, rgba(255, 255, 255, 0) 100%), rgba(255, 255, 255, .2); }
              30% { background: conic-gradient(from 252deg, rgba(255, 255, 255, 1) 0%, rgba(255, 255, 255, 0.3) 15%, rgba(255, 255, 255, 0) 30%, rgba(255, 255, 255, 0) 100%), rgba(255, 255, 255, .2); }
              40% { background: conic-gradient(from 216deg, rgba(255, 255, 255, 1) 0%, rgba(255, 255, 255, 0.3) 15%, rgba(255, 255, 255, 0) 30%, rgba(255, 255, 255, 0) 100%), rgba(255, 255, 255, .2); }
              50% { background: conic-gradient(from 180deg, rgba(255, 255, 255, 1) 0%, rgba(255, 255, 255, 0.3) 15%, rgba(255, 255, 255, 0) 30%, rgba(255, 255, 255, 0) 100%), rgba(255, 255, 255, .2); }
              60% { background: conic-gradient(from 144deg, rgba(255, 255, 255, 1) 0%, rgba(255, 255, 255, 0.3) 15%, rgba(255, 255, 255, 0) 30%, rgba(255, 255, 255, 0) 100%), rgba(255, 255, 255, .2); }
              70% { background: conic-gradient(from 108deg, rgba(255, 255, 255, 1) 0%, rgba(255, 255, 255, 0.3) 15%, rgba(255, 255, 255, 0) 30%, rgba(255, 255, 255, 0) 100%), rgba(255, 255, 255, .2); }
              80% { background: conic-gradient(from 72deg, rgba(255, 255, 255, 1) 0%, rgba(255, 255, 255, 0.3) 15%, rgba(255, 255, 255, 0) 30%, rgba(255, 255, 255, 0) 100%), rgba(255, 255, 255, .2); }
              90% { background: conic-gradient(from 36deg, rgba(255, 255, 255, 1) 0%, rgba(255, 255, 255, 0.3) 15%, rgba(255, 255, 255, 0) 30%, rgba(255, 255, 255, 0) 100%), rgba(255, 255, 255, .2); }
              100% { background: conic-gradient(from 0deg, rgba(255, 255, 255, 1) 0%, rgba(255, 255, 255, 0.3) 15%, rgba(255, 255, 255, 0) 30%, rgba(255, 255, 255, 0) 100%), rgba(255, 255, 255, .2); }
            }
            .rotating-gradient {
              animation: rotate-gradient 2s linear infinite;
            }
          `}</style>
          <div
            className="relative overflow-hidden rotating-gradient"
            style={{
              backdropFilter: 'blur(10px)',
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
                className="text-white font-medium relative z-10"
                style={{
                  fontSize: '28px',
                  lineHeight: '32px',
                }}
              >
                AI Cooling
              </span>
            </div>
          </div>
        </div>



        {/* 내부 카드 */}
        <div 
        className="absolute"
        style={{
          width: 370,
          borderRadius: '50px',
          top: '50%',
          left: '50%',
          transform: 'translateX(-50%) translateY(-38%)',
          background: 'rgba(65,75,82,1)',
          border: '2px solid rgba(255, 255, 255, 0)',
          padding: '16px',
        }}
      >
          {/* 상품 이미지 - 왼쪽 */}
          <div
            style={{
              height: '300px',
              backgroundColor: 'rgba(255, 255, 255, 0.1)',
              borderRadius: '32px',
              padding: '8px',
              marginBottom: '24px',
            }}
          >
            <img
              src="/image/juice.png"
              alt="Ocean Spray Blueberry Juice"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'contain',
              }}
            />
          </div>
            <h3 
              className="pl-3 text-white/80 text-[28px] font-bold"
            >
              Ocean Spray Blueberry
            </h3>
            <p 
              className="pl-3 text-white/50 text-[24px] font-medium mb-4"
            >
              21/07/2025
            </p>
          </div>

        {/* 주문 버튼 
        <div
          className="absolute left-1/2 transform -translate-x-1/2"
          style={{
            bottom: '16px',
            width: '90%',
          }}
        >
          <button
            className="w-full text-black font-semibold"
            style={{
              backgroundColor: 'rgba(255, 255, 255, 1)',
              borderRadius: '32px',
              padding: '16px 0',
              fontSize: '20px',
              lineHeight: '24px',
              border: 'none',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
            }}
          >
            Order
          </button>
        </div>*/}


      </div>



    </Widget>
  );
} 