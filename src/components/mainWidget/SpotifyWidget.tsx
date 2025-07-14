'use client';

import { useState, useEffect } from 'react';
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

  // 앨범커버 크기 계산
  const albumSize = Math.min(dimensions.width, dimensions.height) * .55;

  // 가사 데이터 (시간 : 가사) - 3초 간격
  const lyrics = [
    { time: 0, text: "I'm still a fan" },
    { time: 3, text: "even though I was salty" },
    { time: 6, text: "Hate to see you happy'" },
    { time: 9, text: "if I'm not the one drivin" },
    { time: 12, text: "I'm so mature, I'm so mature" },
    { time: 15, text: "I'm so mature, I got me a therapist" },
    { time: 18, text: "to tell me there's other men" },
    { time: 21, text: "I don't want none, I just want you" },
    { time: 24, text: "If I can't have you," },
    { time: 27, text: "no one should, I might" },
    { time: 30, text: "I might kill my ex, not the best idea" },
    { time: 33, text: "His new girlfriend's next," },
    { time: 36, text: "how'd I get here?" },
    { time: 39, text: "I might kill my ex, I still love him, though" },
    { time: 42, text: "Rather be in jail than alone" },
    { time: 45, text: "I get the sense that it's a lost cause" },
    { time: 48, text: "that you might really love her" },
    { time: 51, text: "The text gon' be evidence," },
    { time: 54, text: "I try to ration with you, no murders," },
    { time: 57, text: "no crime of passion" },
    { time: 60, text: "But, damn, you was out of reach" },
  ];

  // 현재 재생 시간 계산 (총 234초 기준)
  const [currentTime, setCurrentTime] = useState(0);
  const [isFirstExpansion, setIsFirstExpansion] = useState(true);
  
  useEffect(() => {
    if (activeWidget === 'widget2') { // 확장 상태일 때만 실행
      const startTime = Date.now();
      const fifthLyricTime = 12; // 다섯번째 가사 시간 (12초)
      
      // 확장 즉시 다섯번째 가사로 설정
      setCurrentTime(fifthLyricTime);
      setIsFirstExpansion(true);
      
      // 짧은 지연 후 애니메이션 활성화
      const enableAnimation = setTimeout(() => {
        setIsFirstExpansion(false);
      }, 50);
      
      const interval = setInterval(() => {
        const elapsed = ((Date.now() - startTime) / 1000 + fifthLyricTime) % 90; // 다섯번째 가사부터 시작
        setCurrentTime(elapsed);
      }, 100);
      
      return () => {
        clearInterval(interval);
        clearTimeout(enableAnimation);
      };
    } else {
      // 축소 상태에서는 시간 리셋
      setCurrentTime(0);
      setIsFirstExpansion(true);
    }
  }, [activeWidget]);

  // 현재 가사 인덱스 찾기
  const getCurrentLyricIndex = () => {
    for (let i = lyrics.length - 1; i >= 0; i--) {
      if (currentTime >= lyrics[i].time) {
        return i;
      }
    }
    return 0;
  };

  return (
    <Widget style={style}>
      {activeWidget === 'widget2' ? (
        // 확장 상태: 블러 배경 + 정사각형 이미지
        <>
          {/* 블러 배경 이미지 */}
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: 'url(/image/thumb.png)',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat',
              filter: 'blur(50px) saturate(1)',
              opacity: 0.3,
              zIndex: 0,
            }}
          />
          
          {/* 중앙 정사각형 이미지 */}
          <div
            className="absolute inset-0"
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              zIndex: 1,
            }}
          >
            <div
              style={{
                width: albumSize,
                height: albumSize,
                backgroundImage: 'url(/image/thumb.png)',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                borderRadius: 80,
                filter: 'saturate(1)',
                position: 'absolute',
                left: 100, 
                top: '50%',
                transform: 'translateY(-50%)',
              }}
            />
          </div>
          
          {/* 가사 영역 */}
          <div
            style={{
              position: 'absolute',
              left: 100 + albumSize + 80, // 섬네일 오른쪽 + 80px
              top: '50%',
              transform: 'translateY(-50%)',
              width: dimensions.width - albumSize - 280, // 화면 오른쪽 끝에서 100px 남기기
              height: 560, // 높이를 560px로 조정
              zIndex: 2,
              overflow: 'hidden',
              maskImage: 'linear-gradient(to bottom, transparent 0%, black 10%, black 90%, transparent 100%)',
              WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, black 10%, black 90%, transparent 100%)',
            }}
          >
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '20px',
                transform: `translateY(${-(getCurrentLyricIndex() * 116)}px)`, // 각 가사 높이 + gap = 96px + 32px = 128px
                transition: isFirstExpansion ? 'none' : 'transform 0.5s ease-out',
                paddingTop: '252px', // 560px 높이의 중앙에서 40px 위로 조정 (280px - 40px)
                paddingLeft: '20px', // 왼쪽 패딩 추가
                paddingRight: '20px', // 오른쪽도 균형 맞추기
              }}
            >
              {lyrics.map((lyric, index) => {
                const currentIndex = getCurrentLyricIndex();
                const isActive = index === currentIndex;
                const isPast = index < currentIndex;
                
                return (
                  <div
                    key={index}
                    style={{
                      fontSize: '64px',
                      fontFamily: 'OneUISansGUI',
                      fontWeight: 600,
                      lineHeight: '96px',
                      color: isActive ? '#FFFFFF' : isPast ? 'rgba(255, 255, 255, 0.3)' : 'rgba(255, 255, 255, 0.5)',
                      opacity: isActive ? 1 : isPast ? 0.3 : 0.5,
                      transform: isActive ? 'scale(1.02)' : 'scale(1)',
                      transition: isFirstExpansion ? 'none' : 'all 0.5s ease-out',
                      textShadow: 'none', // 그림자 효과 제거
                    }}
                  >
                    {lyric.text}
                  </div>
                );
              })}
            </div>
          </div>
        </>
      ) : (
        // 축소 상태: 기존 ImageLong
        <ImageLong
          src="/image/thumb.png"
          overlayImage="/image/thumb.png"
          width={dimensions.width - 6}
          height={dimensions.height}
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
      )}
      <Player 
        width={dimensions.width} 
        height={dimensions.height} 
        className="z-10"
        isActive={activeWidget === 'widget2'}
      />
      <div className="z-20 flex flex-col items-center justify-between h-full">
        <div className="z-20 mt-[42px]">
          <svg width="54" height="52" viewBox="0 0 54 52" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M27 0C12.0886 0 0 11.6397 0 26C0 40.3603 12.0886 52 27 52C41.9114 52 54 40.3603 54 26C54 11.6397 41.9114 0 27 0ZM40.1727 37.4806C39.7391 38.22 38.9414 38.636 38.1191 38.636C37.7346 38.636 37.3377 38.5434 36.9736 38.3484C33.6027 36.5284 29.9291 35.4136 26.0468 35.035C22.1564 34.6596 18.315 35.0397 14.625 36.1743C13.3936 36.5528 12.0682 35.8977 11.6755 34.71C11.2787 33.5203 11.9618 32.2483 13.1973 31.8677C17.5009 30.5437 21.9886 30.0934 26.5213 30.537C31.0459 30.9806 35.3332 32.2806 39.2686 34.4047C40.4018 35.0122 40.8068 36.3902 40.1727 37.4806ZM43.4045 29.5833C42.9873 30.3566 42.1691 30.8002 41.3223 30.8002C40.9541 30.8002 40.5859 30.719 40.2382 30.5437C36.0941 28.4653 31.6186 27.1783 26.9263 26.7197C22.1973 26.2537 17.5132 26.6598 12.9968 27.9142C11.7491 28.2553 10.4482 27.5683 10.0923 26.3672C9.73229 25.168 10.4523 23.9153 11.6959 23.569C16.7932 22.1536 22.0786 21.7002 27.4009 22.2202C32.6864 22.7386 37.7346 24.1883 42.4105 26.5346C43.5559 27.1117 44.0059 28.4763 43.4045 29.5833ZM44.5745 23.0132C44.2227 23.0132 43.8668 22.9367 43.5273 22.776C38.61 20.4147 33.3204 18.9442 27.8018 18.4049C22.275 17.8604 16.7768 18.2812 11.4545 19.6497C10.2027 19.9696 8.91817 19.2546 8.58272 18.0472C8.24726 16.8413 8.99184 15.6016 10.2477 15.2797C16.1182 13.7702 22.1891 13.3104 28.2805 13.9068C34.3636 14.4997 40.1973 16.1232 45.6218 18.7283C46.7836 19.2853 47.2541 20.644 46.6773 21.7604C46.2682 22.555 45.4377 23.0132 44.5745 23.0132Z" fill="white"/>
          </svg>
        </div>
        <div 
          className="z-20 text-center"
          style={{
            position: activeWidget === 'widget2' ? 'absolute' : 'static',
            top: activeWidget === 'widget2' ? '130px' : 'auto',
            left: activeWidget === 'widget2' ? '50%' : 'auto',
            transform: activeWidget === 'widget2' ? 'translateX(-50%)' : 'none',
            marginBottom: activeWidget === 'widget2' ? '0' : '80px',
          }}
        >
          <div 
            className="z-20 text-white mb-1"
            style={{
              fontFamily: 'OneUISansGUI',
              fontWeight: 700,
              fontSize: activeWidget === 'widget2' ? '64px' : '42px', // 확장 시 폰트 사이즈 조정 가능
              lineHeight: activeWidget === 'widget2' ? '72px' : '54px', // 확장 시 라인 높이 조정 가능
            }}
          >
            Kill Bill
          </div>
          <div 
            className="z-20 text-white opacity-70"
            style={{
              fontFamily: 'OneUISansGUI',
              fontWeight: 400,
              fontSize: activeWidget === 'widget2' ? '48px' : '32px', // 확장 시 폰트 사이즈 조정 가능
              lineHeight: activeWidget === 'widget2' ? '48px' : '32px', // 확장 시 라인 높이 조정 가능
            }}
          >
            SZA
          </div>
        </div>
      </div>
    </Widget>
  );
} 