'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface CloudyAnimationProps {
  className?: string;
  autoPlay?: boolean;
  duration?: number;
  delay?: number; // 로드 후 애니메이션 시작 지연 시간
  trigger?: boolean; // 외부에서 애니메이션 트리거
}

export default function CloudyAnimation({ 
  className = '', 
  autoPlay = false, 
  duration = 2000,
  delay = 0,
  trigger = false
}: CloudyAnimationProps) {
  const [isAnimated, setIsAnimated] = useState(false);

  useEffect(() => {
    // trigger prop이 있으면 이것을 우선으로 사용
    if (trigger) {
      const startAnimation = setTimeout(() => {
        setIsAnimated(true);
      }, delay);

      return () => {
        clearTimeout(startAnimation);
      };
    } else if (trigger === false) {
      // trigger가 명시적으로 false일 때는 즉시 리셋
      setIsAnimated(false);
      return;
    }

    // trigger가 없을 때만 기존 로직 사용
    // 컴포넌트 로드 시 애니메이션 시작
    const startAnimation = setTimeout(() => {
      setIsAnimated(true);
    }, delay);

    // autoPlay가 true면 반복 애니메이션
    let interval: NodeJS.Timeout | null = null;
    if (autoPlay) {
      interval = setInterval(() => {
        setIsAnimated(prev => !prev);
      }, duration);
    }

    return () => {
      clearTimeout(startAnimation);
      if (interval) clearInterval(interval);
    };
  }, [autoPlay, duration, delay, trigger]);

  // 애니메이션 variants
  const sunVariants = {
    cloudy1: {
      d: "M172 70.5C172 86.7931 158.793 100 142.5 100C126.207 100 113 86.7931 113 70.5C113 54.2069 126.207 41 142.5 41C158.793 41 172 54.2069 172 70.5Z"
    },
    cloudy2: {
      d: "M187.682 89.9C187.682 110.722 170.804 127.6 149.982 127.6C129.16 127.6 112.282 110.722 112.282 89.9C112.282 69.078 129.16 52.2 149.982 52.2C170.804 52.2 187.682 69.078 187.682 89.9Z"
    }
  };

  const smallCloudVariants = {
    cloudy1: {
      d: "M156.7 126H93V181H156.7C171.776 181 184 168.687 184 153.5C184 138.313 171.776 126 156.7 126Z"
    },
    cloudy2: {
      d: "M168.2 110.2H87V179.8H168.2C187.418 179.8 203 164.218 203 145C203 125.782 187.418 110.2 168.2 110.2Z"
    }
  };

  const bigCloudVariants = {
    cloudy1: {
      d: "M139 135.5C139 160.63 118.627 181 93.5 181C68.3704 181 48 160.63 48 135.5C48 110.37 68.3704 90 93.5 90C118.627 90 139 110.37 139 135.5Z"
    },
    cloudy2: {
      d: "M145 121.8C145 153.833 119.031 179.8 87 179.8C54.9666 179.8 29 153.833 29 121.8C29 89.7667 54.9666 63.8 87 63.8C119.031 63.8 145 89.7667 145 121.8Z"
    }
  };

  const animationState = isAnimated ? 'cloudy2' : 'cloudy1';

  return (
    <div className={className}>
      <svg 
        width="232" 
        height="232" 
        viewBox="0 0 232 232" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* 태양 */}
        <motion.path 
          fillRule="evenodd" 
          clipRule="evenodd" 
          fill="#FFBC09"
          variants={sunVariants}
          animate={animationState}
          transition={{
            type: "tween",
            duration: 0.8,
            ease: [0.23, 1, 0.32, 1],
            delay: 0.1
          }}
        />
        
        {/* 작은 구름 (오른쪽) */}
        <motion.path 
          fillRule="evenodd" 
          clipRule="evenodd" 
          fill="#C2DDF9"
          variants={smallCloudVariants}
          animate={animationState}
          transition={{
            type: "tween",
            duration: 0.8,
            ease: [0.23, 1, 0.32, 1],
            delay: 0.2
          }}
        />
        
        {/* 큰 구름 (왼쪽) */}
        <motion.path 
          fillRule="evenodd" 
          clipRule="evenodd" 
          fill="#CCE4FF"
          variants={bigCloudVariants}
          animate={animationState}
          transition={{
            type: "tween",
            duration: 0.8,
            ease: [0.23, 1, 0.32, 1],
            delay: 0.3
          }}
        />
      </svg>
    </div>
  );
} 