'use client';

import { Widget } from "@/components/ui";
import { ImageInvert } from "@/components/content";

interface HavenWidgetProps {
  activeWidget: string | null;
}

export default function HavenWidget({ activeWidget }: HavenWidgetProps) {
  return (
    <Widget 
      style={{ 
        position: 'absolute',
        right: activeWidget === 'widget4' ? 0 : 64,
        bottom: activeWidget === 'widget4' ? 0 : 64,
        width: activeWidget === 'widget4' ? 2378 : 418,
        height: activeWidget === 'widget4' ? 1485 : 418,
        borderRadius: 260,
        opacity: activeWidget && activeWidget !== 'widget4' ? 0 : 1,
        transition: 'all 0.25s cubic-bezier(0.23, 1, 0.32, 1)',
        zIndex: activeWidget === 'widget4' ? 200 : 1,
        transform: 'translate3d(0, 0, 0)',
        backfaceVisibility: 'hidden',
        perspective: 1000,
        overflow: 'hidden',
      }} 
    >
      <div className="relative flex items-center justify-center h-full">
        <ImageInvert 
          size={418}
          className="transition-all duration-300 rounded-full blur-3xl"
          blendMode="normal"
          saturation={1.5}
        />
        {/* 텍스트 오버레이 */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
          {/* 아이콘 */}
          <div className="mt-[-12px] mb-2">
            <svg 
              width="54" 
              height="54" 
              viewBox="0 0 54 54" 
              fill="none" 
              xmlns="http://www.w3.org/2000/svg"
              style={{
                filter: 'drop-shadow(0 -1px 0 rgba(0,12,85,0.8)) drop-shadow(0 1px 1px rgba(106,182,255,0.5))'
              }}
            >
              <defs>
                <linearGradient id="iconGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#000c55" />
                  <stop offset="100%" stopColor="#3168aa" />
                </linearGradient>
              </defs>
              <path fillRule="evenodd" clipRule="evenodd" d="M27.0007 22.25C34.5929 22.25 40.7504 28.406 40.7504 36.0005C40.7504 38.7149 39.9463 41.2295 38.5837 43.3544H15.4177C14.0549 41.2295 13.2509 38.7149 13.2509 36.0005C13.2509 28.406 19.4085 22.25 27.0007 22.25ZM49.3432 33.8337L49.606 33.8476C50.8111 33.9784 51.7493 34.9992 51.75 36.2396C51.75 37.5678 50.6729 38.6455 49.3447 38.6462H47.0594L46.7966 38.6323C45.5909 38.5016 44.6526 37.4807 44.6519 36.241C44.6506 34.9121 45.729 33.8344 47.0572 33.8344L49.3432 33.8337ZM6.94283 33.3538C8.271 33.3538 9.34875 34.4315 9.34875 35.7606C9.34875 37.0895 8.271 38.1665 6.94283 38.1665H4.65592C3.32775 38.1665 2.25 37.0895 2.25 35.7606C2.25 34.4315 3.32775 33.3538 4.65592 33.3538H6.94283ZM45.2657 22.9523C46.4161 22.2876 47.8892 22.6807 48.5536 23.8311C49.2183 24.9818 48.8246 26.4539 47.6748 27.1183L45.6962 28.2629C45.3168 28.4819 44.9019 28.5862 44.4933 28.5862C43.6621 28.5862 42.8537 28.1549 42.4082 27.3832C41.7429 26.2334 42.136 24.7613 43.2873 24.0959L45.2657 22.9523ZM5.68575 23.4185C6.34882 22.2671 7.82168 21.872 8.97232 22.5365L10.9523 23.6788C12.1043 24.3432 12.4987 25.8147 11.8343 26.966C11.3888 27.7378 10.5802 28.1698 9.74768 28.1698C9.33975 28.1698 8.92643 28.0663 8.54775 27.8471L6.56707 26.705C5.41575 26.0404 5.02042 24.5689 5.68575 23.4185ZM36.2977 15.5655C36.9623 14.4151 38.4345 14.022 39.5843 14.6864C40.7356 15.3511 41.1293 16.8226 40.464 17.9737L39.3203 19.9537C38.8739 20.7248 38.0662 21.1561 37.2352 21.1561C36.8257 21.1561 36.4124 21.0517 36.0331 20.8327C34.8817 20.1674 34.488 18.6959 35.1533 17.5455L36.2977 15.5655ZM14.8329 14.4463C15.9827 13.7826 17.4555 14.175 18.1202 15.327L19.2638 17.3061C19.9276 18.4567 19.5332 19.9289 18.3825 20.5927C18.0038 20.8116 17.5892 20.916 17.1819 20.916C16.3501 20.916 15.5417 20.4847 15.0953 19.7122L13.9523 17.7329C13.2878 16.5825 13.6823 15.111 14.8329 14.4463ZM27.2403 11.25C28.5685 11.25 29.6462 12.3271 29.6462 13.6559V15.9419C29.6462 17.271 28.5685 18.3481 27.2403 18.3481C25.9112 18.3481 24.8335 17.271 24.8335 15.9419V13.6559C24.8335 12.3271 25.9112 11.25 27.2403 11.25Z" fill="url(#iconGradient)"/>
            </svg>
          </div>
          <div
            className="text-[42px] font-bold bg-clip-text text-transparent"
            style={{
              fontFamily: 'OneUISansGUI',
              fontWeight: 700,
              lineHeight: '44px',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              textShadow: '0 -1px 0 rgba(0,12,85,0.8), 0 1px 2px rgba(106,182,255,0.5)',
            }}
          >
            Fresh Morning
            <br />Prepared
          </div>
        </div>
      </div>
    </Widget>
  );
} 