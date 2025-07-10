'use client';

import { Widget } from "@/components/baseUI";
import { ImageInvert } from "@/components/content";
import { useWidgetAnimation } from "@/utils/widgetAnimations";
import type { WidgetAnimationState } from "@/utils/widgetAnimations";

interface NotificationWidgetProps {
  activeWidget: string | null;
  leftWidgetsOpacity: number;
  rightWidgetsOpacity: number;
}

export default function NotificationWidget({ 
  activeWidget, 
  leftWidgetsOpacity, 
  rightWidgetsOpacity 
}: NotificationWidgetProps) {
  
  const animationState: WidgetAnimationState = {
    activeWidget,
    leftWidgetsOpacity,
    rightWidgetsOpacity
  };
  
  const { style } = useWidgetAnimation('notification', animationState, 'default');

  return (
    <Widget style={style}>
      <div className="relative flex flex-col items-center justify-center h-full p-8">
        {/* 배경 그라디언트 */}
        <div 
          className="absolute inset-0 rounded-full opacity-20"
          style={{
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          }}
        />
        
        {/* 알림 아이콘 */}
        <div className="mb-6 relative z-10">
          <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center mb-4">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 2C13.1 2 14 2.9 14 4C14 5.1 13.1 6 12 6C10.9 6 10 5.1 10 4C10 2.9 10.9 2 12 2ZM21 6.5C21 7.3 20.3 8 19.5 8H4.5C3.7 8 3 7.3 3 6.5S3.7 5 4.5 5H19.5C20.3 5 21 5.7 21 6.5ZM12 9L13.5 7.5C14.1 6.9 15 6.9 15.5 7.5L22 14L22 20C22 21.1 21.1 22 20 22H4C2.9 22 2 21.1 2 20L2 14L8.5 7.5C9 6.9 9.9 6.9 10.5 7.5L12 9Z" fill="white"/>
            </svg>
          </div>
          <div className="text-2xl font-bold text-white mb-2">알림</div>
        </div>
        
        {/* 알림 목록 */}
        <div className="w-full max-w-sm space-y-3 relative z-10">
          <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-2xl p-4">
            <div className="flex items-center space-x-3">
              <div className="w-3 h-3 bg-red-500 rounded-full"></div>
              <div>
                <div className="text-white font-medium text-sm">새로운 메시지</div>
                <div className="text-white text-opacity-70 text-xs">5분 전</div>
              </div>
            </div>
          </div>
          
          <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-2xl p-4">
            <div className="flex items-center space-x-3">
              <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
              <div>
                <div className="text-white font-medium text-sm">일정 알림</div>
                <div className="text-white text-opacity-70 text-xs">15분 전</div>
              </div>
            </div>
          </div>
          
          <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-2xl p-4">
            <div className="flex items-center space-x-3">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <div>
                <div className="text-white font-medium text-sm">업데이트 완료</div>
                <div className="text-white text-opacity-70 text-xs">1시간 전</div>
              </div>
            </div>
          </div>
        </div>
        
        {/* 하단 텍스트 */}
        <div className="mt-6 text-center relative z-10">
          <div className="text-white text-opacity-80 text-sm">
            왼쪽 위젯이 숨겨졌을 때 나타나는<br/>알림 위젯입니다
          </div>
        </div>
      </div>
    </Widget>
  );
} 