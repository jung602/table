'use client';

import { useState, useEffect, useCallback } from "react";

export default function Remote() {
  const [activeWidget, setActiveWidget] = useState<string | null>(null);
  const [leftWidgetsOpacity, setLeftWidgetsOpacity] = useState(1);
  const [rightWidgetsOpacity, setRightWidgetsOpacity] = useState(1);
  const [isConnected, setIsConnected] = useState(false);

  // 메인 창에 메시지 전송
  const sendMessage = useCallback((type: string, data: any) => {
    if (window.opener) {
      window.opener.postMessage({ type, data }, '*');
    }
  }, []);

  // 메인 창으로부터 상태 업데이트 받기
  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (event.data.type === 'STATE_UPDATE') {
        const { activeWidget: newActiveWidget, leftWidgetsOpacity: newLeft, rightWidgetsOpacity: newRight } = event.data.data;
        setActiveWidget(newActiveWidget);
        setLeftWidgetsOpacity(newLeft);
        setRightWidgetsOpacity(newRight);
        setIsConnected(true);
      }
    };

    window.addEventListener('message', handleMessage);
    
    // 초기 상태 요청
    sendMessage('REQUEST_STATE', {});

    return () => {
      window.removeEventListener('message', handleMessage);
    };
  }, [sendMessage]);

  // 창 닫힐 때 메인 창에 알림
  useEffect(() => {
    const handleBeforeUnload = () => {
      sendMessage('REMOTE_CLOSED', {});
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [sendMessage]);

  // 토글 함수들 - 하나가 숨겨지면 다른 하나는 자동으로 보이도록
  const toggleLeftWidgets = useCallback(() => {
    if (leftWidgetsOpacity === 1) {
      // 왼쪽 위젯을 숨기면 오른쪽 위젯을 보이게
      sendMessage('HIDE_LEFT_SHOW_RIGHT', {});
    } else {
      // 왼쪽 위젯을 보이게 (오른쪽은 그대로)
      sendMessage('SHOW_LEFT_WIDGETS', {});
    }
  }, [sendMessage, leftWidgetsOpacity]);

  const toggleRightWidgets = useCallback(() => {
    if (rightWidgetsOpacity === 1) {
      // 오른쪽 위젯을 숨기면 왼쪽 위젯을 보이게
      sendMessage('HIDE_RIGHT_SHOW_LEFT', {});
    } else {
      // 오른쪽 위젯을 보이게 (왼쪽은 그대로)
      sendMessage('SHOW_RIGHT_WIDGETS', {});
    }
  }, [sendMessage, rightWidgetsOpacity]);

  const resetAllWidgets = useCallback(() => {
    sendMessage('RESET_ALL_WIDGETS', {});
  }, [sendMessage]);

  const toggleWidget = useCallback((widgetId: string) => {
    sendMessage('TOGGLE_WIDGET', { widgetId });
  }, [sendMessage]);

  return (
    <div className="min-h-screen bg-gray-900 p-6">
      <div className="max-w-md mx-auto">
        {/* 헤더 */}
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-white mb-2">리모콘</h1>
          <div className={`text-sm ${isConnected ? 'text-green-400' : 'text-red-400'}`}>
            {isConnected ? '🟢 연결됨' : '🔴 연결 끊김'}
          </div>
        </div>

        {/* 위젯 투명도 컨트롤 */}
        <div className="bg-gray-800 rounded-lg p-4 mb-6">
          <h2 className="text-lg font-semibold text-white mb-4">위젯 표시/숨김</h2>
          
          <button
            onClick={toggleLeftWidgets}
            className={`w-full mb-3 px-4 py-3 rounded-lg font-medium transition-all ${
              leftWidgetsOpacity === 1 
                ? 'bg-blue-600 hover:bg-blue-700 text-white' 
                : 'bg-gray-600 hover:bg-gray-500 text-gray-200'
            }`}
          >
            홈 위젯 {leftWidgetsOpacity === 1 ? '더보기' : '숨기기'}
          </button>
          
          <button
            onClick={toggleRightWidgets}
            className={`w-full mb-3 px-4 py-3 rounded-lg font-medium transition-all ${
              rightWidgetsOpacity === 1 
                ? 'bg-blue-600 hover:bg-blue-700 text-white' 
                : 'bg-gray-600 hover:bg-gray-500 text-gray-200'
            }`}
          >
            모바일 위젯 {rightWidgetsOpacity === 1 ? '더보기' : '숨기기'}
          </button>
          
          <button
            onClick={resetAllWidgets}
            className="w-full px-4 py-2 rounded-lg font-medium bg-gray-700 hover:bg-gray-600 text-gray-200 transition-all"
          >
            모두 보이기
          </button>
        </div>

        {/* 위젯 활성화 컨트롤 */}
        <div className="bg-gray-800 rounded-lg p-4">
          <h2 className="text-lg font-semibold text-white mb-4">위젯 활성화</h2>
          
          {/* 메인 위젯 */}
          <div className="mb-4">
            <h3 className="text-sm font-medium text-gray-400 mb-2">메인</h3>
            <div className="grid grid-cols-2 gap-2">
              {[
                { id: 'widget1', name: '시계' },
                { id: 'widget2', name: '음악' },
                { id: 'widget3', name: 'Cool' },
                { id: 'widget4', name: 'Haven' }
              ].map((widget) => (
                <button
                  key={widget.id}
                  onClick={() => toggleWidget(widget.id)}
                  className={`px-3 py-2 rounded-lg font-medium transition-all text-sm ${
                    activeWidget === widget.id 
                      ? 'bg-yellow-600 hover:bg-yellow-700 text-white border-2 border-yellow-400' 
                      : 'bg-gray-700 hover:bg-gray-600 text-gray-200 border-2 border-transparent'
                  }`}
                >
                  {widget.name}
                  {activeWidget === widget.id && ' ●'}
                </button>
              ))}
            </div>
          </div>

          {/* 모바일 위젯 */}
          <div className="mb-4">
            <h3 className="text-sm font-medium text-gray-400 mb-2">모바일</h3>
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => rightWidgetsOpacity === 0 ? toggleWidget('settings') : null}
                disabled={rightWidgetsOpacity === 1}
                className={`px-3 py-2 rounded-lg font-medium transition-all text-sm ${
                  rightWidgetsOpacity === 1 
                    ? 'bg-gray-600 text-gray-500 cursor-not-allowed border-2 border-transparent'
                    : activeWidget === 'settings' 
                      ? 'bg-yellow-600 hover:bg-yellow-700 text-white border-2 border-yellow-400' 
                      : 'bg-gray-700 hover:bg-gray-600 text-gray-200 border-2 border-transparent'
                }`}
              >
                설정
                {activeWidget === 'settings' && ' ●'}
              </button>
              <div></div> {/* 빈 공간 */}
            </div>
          </div>

          {/* 홈 위젯 */}
          <div>
            <h3 className="text-sm font-medium text-gray-400 mb-2">홈</h3>
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => leftWidgetsOpacity === 0 ? toggleWidget('notification') : null}
                disabled={leftWidgetsOpacity === 1}
                className={`px-3 py-2 rounded-lg font-medium transition-all text-sm ${
                  leftWidgetsOpacity === 1 
                    ? 'bg-gray-600 text-gray-500 cursor-not-allowed border-2 border-transparent'
                    : activeWidget === 'notification' 
                      ? 'bg-yellow-600 hover:bg-yellow-700 text-white border-2 border-yellow-400' 
                      : 'bg-gray-700 hover:bg-gray-600 text-gray-200 border-2 border-transparent'
                }`}
              >
                알림
                {activeWidget === 'notification' && ' ●'}
              </button>
              <div></div> {/* 빈 공간 */}
            </div>
          </div>
        </div>

        {/* 리모콘 닫기 */}
        <button
          onClick={() => window.close()}
          className="w-full mt-6 px-4 py-2 rounded-lg font-medium bg-red-600 hover:bg-red-700 text-white transition-all"
        >
          리모콘 닫기
        </button>
      </div>
    </div>
  );
} 