'use client';

import { useEffect, useState } from 'react';

interface ClockProps {
  size?: number;
  className?: string;
  style?: React.CSSProperties;
}

export default function Clock({ size = 300, className = '', style }: ClockProps) {
  const [startTime] = useState(new Date()); // 페이지 로드 시점 고정
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  // 페이지 로드 시점부터 경과된 시간을 계산
  const elapsedSeconds = Math.floor((currentTime.getTime() - startTime.getTime()) / 1000);
  const totalMinutes = Math.floor(elapsedSeconds / 60);
  const seconds = elapsedSeconds % 60;

  // 7시부터 시작해서 계속 증가
  const hours = 7 + Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;

  // 각도 계산 (7시 방향)
  const hourAngle = (hours * 30) + (minutes * 0.5) - 90; // 30도 * 시간 + 분에 따른 보정
  const minuteAngle = (minutes * 6) + (seconds * 0.1) - 90; // 6도 * 분 + 초에 따른 보정
  const secondAngle = (seconds * 6) - 90; // 6도 * 초

  const radius = size / 2;
  const hourHandLength = radius * 0.4;
  const minuteHandLength = radius * 0.8;
  const secondCircleRadius = radius - 32; // 초침 동그라미가 도는 반지름 (외곽에서 8 여유 + 동그라미 반지름 16)

  // 시계 바늘 좌표 계산
  const getHandPosition = (angle: number, length: number) => {
    const radian = (angle * Math.PI) / 180;
    const x = Math.cos(radian) * length;
    const y = Math.sin(radian) * length;
    return { x, y };
  };

  const hourHand = getHandPosition(hourAngle, hourHandLength);
  const minuteHand = getHandPosition(minuteAngle, minuteHandLength);
  const innerMinuteHand = getHandPosition(minuteAngle, minuteHandLength * 0.3); // 하늘색 분침 끝 지점 (중앙에 가까움)
  const innerHourHand = getHandPosition(hourAngle, hourHandLength * 0.3); // 하늘색 시침 끝 지점 (중앙에 가까움)
  const secondCirclePosition = getHandPosition(secondAngle, secondCircleRadius);

  return (
    <div className={`relative ${className}`} style={style}>
      {/* 배경 이미지 - 인라인 SVG */}
      <div className="absolute left-24 top-14">
        <svg width="260" height="326" viewBox="0 0 220 276" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="2.58105" y="225" width="259.808" height="100.674" rx="50.3371" transform="rotate(-60 2.58105 225)" fill="url(#paint0_linear_1034_1323)"/>
          <foreignObject x="-50" y="-31.9307" width="301.348" height="200.674">
            <div style={{backdropFilter: 'blur(25px)', clipPath: 'url(#bgblur_0_1034_1323_clip_path)', height: '100%', width: '100%'}}></div>
          </foreignObject>
          <g data-figma-bg-blur-radius="50">
            <rect y="18.0693" width="201.348" height="100.674" rx="50.3371" fill="white" fillOpacity="0.1"/>
            <rect y="18.0693" width="201.348" height="100.674" rx="50.3371" fill="url(#paint1_linear_1034_1323)" fillOpacity="0.2"/>
            <rect y="18.0693" width="201.348" height="100.674" rx="50.3371" fill="url(#paint2_linear_1034_1323)" fillOpacity="0.2"/>
            <rect y="18.0693" width="201.348" height="100.674" rx="50.3371" fill="url(#paint3_radial_1034_1323)" fillOpacity="0.2"/>
          </g>
          <defs>
            <clipPath id="bgblur_0_1034_1323_clip_path" transform="translate(50 31.9307)">
              <rect y="18.0693" width="201.348" height="100.674" rx="50.3371"/>
            </clipPath>
            <linearGradient id="paint0_linear_1034_1323" x1="346.381" y1="269.478" x2="-13.8858" y2="269.478" gradientUnits="userSpaceOnUse">
              <stop stopColor="white"/>
              <stop offset="0.120192" stopColor="#00D9FF"/>
              <stop offset="0.888166" stopColor="#0040FF"/>
              <stop offset="1" stopColor="#9747FF"/>
            </linearGradient>
            <linearGradient id="paint1_linear_1034_1323" x1="100.674" y1="18.0693" x2="100.674" y2="118.743" gradientUnits="userSpaceOnUse">
              <stop stopColor="white" stopOpacity="0"/>
              <stop offset="1" stopColor="white"/>
            </linearGradient>
            <linearGradient id="paint2_linear_1034_1323" x1="100.674" y1="18.0693" x2="100.674" y2="118.743" gradientUnits="userSpaceOnUse">
              <stop offset="0.73" stopColor="white" stopOpacity="0.2"/>
              <stop offset="1" stopColor="white"/>
            </linearGradient>
            <radialGradient id="paint3_radial_1034_1323" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(100.674 68.4064) rotate(90) scale(50.3371 100.674)">
              <stop offset="0.24" stopColor="white" stopOpacity="0.2"/>
              <stop offset="0.6" stopColor="white" stopOpacity="0.5"/>
            </radialGradient>
          </defs>
        </svg>
      </div>
      
      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        className="transform-gpu relative z-10"
      >
        {/* 메타볼 효과를 위한 필터 정의 */}
        <defs>
          <filter id="metaball" x="-20%" y="-20%" width="140%" height="140%">
            <feMorphology operator="dilate" radius="2"/>
            <feGaussianBlur stdDeviation="6" result="blur"/>
            <feColorMatrix 
              in="blur" 
              type="matrix" 
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 20 -10"
              result="contrast"
            />
            <feComposite in="SourceGraphic" in2="contrast" operator="over"/>
          </filter>
        </defs>
        
        {/* 메타볼 효과를 받을 그룹 */}
        <g filter="url(#metaball)">
      
      {/* 분침 */}
       <line
          x1={radius}
          y1={radius}
          x2={radius + minuteHand.x}
          y2={radius + minuteHand.y}
          stroke="rgba(255, 255, 255, .7)"
          strokeWidth="20"
          strokeLinecap="round"
          style={{
            backdropFilter: 'blur(25px)',
            filter: 'drop-shadow(0 2px 10px rgba(0, 0, 0, 0.1))'
          }}
        />
       {/*<circle
          cx={radius + minuteHand.x}
          cy={radius + minuteHand.y}
          r="5"
          fill="rgba(0, 255, 255, .7)"
        />
        <path
          d={`M ${radius + minuteHand.x} ${radius + minuteHand.y} L ${radius + innerMinuteHand.x} ${radius + innerMinuteHand.y}`}
          stroke="rgba(0, 255, 255, .7)"
          strokeWidth="10"
          strokeLinecap="butt"
         />*/}

        {/* 시침 */}
        <line
          x1={radius}
          y1={radius}
          x2={radius + hourHand.x}
          y2={radius + hourHand.y}
          stroke="rgba(255, 255, 255, .7)"
          strokeWidth="20"
          strokeLinecap="round"
          style={{
            filter: 'drop-shadow(0 2px 10px rgba(0, 0, 0, 0.1))'
          }}
        />
       {/*  <circle
          cx={radius + hourHand.x}
          cy={radius + hourHand.y}
          r="5"
          fill="rgba(0, 255, 255, .7)"
        />
       <path
          d={`M ${radius + hourHand.x} ${radius + hourHand.y} L ${radius + innerHourHand.x} ${radius + innerHourHand.y}`}
          stroke="rgba(0, 255, 255, .7)"
          strokeWidth="10"
          strokeLinecap="butt"
         /> */}


          {/* 초침 - 원 외곽을 따라 도는 동그라미 */}
          <circle
            cx={radius + secondCirclePosition.x}
            cy={radius + secondCirclePosition.y}
            r="20"
            fill="rgba(255, 255, 255, 0.7)"
            style={{
              backdropFilter: 'blur(25px)',
            }}
          />
        </g>

        {/* 중앙 점 (메타볼 효과 제외) */}
        <circle
          cx={radius}
          cy={radius}
          r="6"
          fill="rgba(8, 17, 79, 1)"
        />
      </svg>
    </div>
  );
} 