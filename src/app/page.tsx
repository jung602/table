'use client';

import Image from "next/image";
import { Background } from "@/components/baseUI";
import MainContent from "@/components/MainContent";
import { useState, useCallback, useEffect, useRef } from "react";

export default function Home() {
  const [activeWidget, setActiveWidget] = useState<string | null>(null);
  const [leftWidgetsOpacity, setLeftWidgetsOpacity] = useState(1);
  const [rightWidgetsOpacity, setRightWidgetsOpacity] = useState(1);
  const [isRemoteOpen, setIsRemoteOpen] = useState(false);
  const remoteWindowRef = useRef<Window | null>(null);

  const toggleLeftWidgets = useCallback(() => {
    setLeftWidgetsOpacity(prev => prev === 1 ? 0 : 1);
  }, []);

  const toggleRightWidgets = useCallback(() => {
    setRightWidgetsOpacity(prev => prev === 1 ? 0 : 1);
  }, []);

  const resetAllWidgets = useCallback(() => {
    setLeftWidgetsOpacity(1);
    setRightWidgetsOpacity(1);
  }, []);

  const toggleWidget = useCallback((widgetId: string) => {
    setActiveWidget(activeWidget === widgetId ? null : widgetId);
  }, [activeWidget]);

  // 리모콘에 상태 업데이트 전송
  const sendStateToRemote = useCallback(() => {
    if (remoteWindowRef.current && !remoteWindowRef.current.closed) {
      remoteWindowRef.current.postMessage({
        type: 'STATE_UPDATE',
        data: {
          activeWidget,
          leftWidgetsOpacity,
          rightWidgetsOpacity
        }
      }, '*');
    }
  }, [activeWidget, leftWidgetsOpacity, rightWidgetsOpacity]);

  // 리모콘 창 열기
  const openRemote = useCallback(() => {
    if (remoteWindowRef.current && !remoteWindowRef.current.closed) {
      remoteWindowRef.current.focus();
      return;
    }

    const remote = window.open(
      '/remote',
      'remote',
      'width=400,height=800,resizable=yes,scrollbars=yes'
    );
    
    if (remote) {
      remoteWindowRef.current = remote;
      setIsRemoteOpen(true);
      
      // 리모콘 창이 로드되면 초기 상태 전송
      setTimeout(() => {
        sendStateToRemote();
      }, 1000);

      // 리모콘 창이 닫혔는지 주기적으로 확인
      const checkRemoteWindow = () => {
        if (remoteWindowRef.current && remoteWindowRef.current.closed) {
          setIsRemoteOpen(false);
          remoteWindowRef.current = null;
        } else if (remoteWindowRef.current) {
          setTimeout(checkRemoteWindow, 1000);
        }
      };
      setTimeout(checkRemoteWindow, 1000);
    }
  }, [sendStateToRemote]);

  // 리모콘으로부터 메시지 받기
  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (event.origin !== window.location.origin) return;

      switch (event.data.type) {
        case 'REQUEST_STATE':
          sendStateToRemote();
          break;
        case 'TOGGLE_LEFT_WIDGETS':
          toggleLeftWidgets();
          break;
        case 'TOGGLE_RIGHT_WIDGETS':
          toggleRightWidgets();
          break;
        case 'HIDE_LEFT_SHOW_RIGHT':
          setLeftWidgetsOpacity(0);
          setRightWidgetsOpacity(1);
          break;
        case 'SHOW_LEFT_WIDGETS':
          setLeftWidgetsOpacity(1);
          break;
        case 'HIDE_RIGHT_SHOW_LEFT':
          setRightWidgetsOpacity(0);
          setLeftWidgetsOpacity(1);
          break;
        case 'SHOW_RIGHT_WIDGETS':
          setRightWidgetsOpacity(1);
          break;
        case 'RESET_ALL_WIDGETS':
          resetAllWidgets();
          break;
        case 'TOGGLE_WIDGET':
          toggleWidget(event.data.data.widgetId);
          break;
        case 'REMOTE_CLOSED':
          setIsRemoteOpen(false);
          remoteWindowRef.current = null;
          break;
      }
    };

    window.addEventListener('message', handleMessage);
    return () => {
      window.removeEventListener('message', handleMessage);
    };
  }, [sendStateToRemote, toggleLeftWidgets, toggleRightWidgets, resetAllWidgets, toggleWidget]);

  // 상태 변경 시 리모콘에 업데이트 전송 (애니메이션 완료 후)
  useEffect(() => {
    const timer = setTimeout(() => {
      sendStateToRemote();
    }, 350); // 애니메이션 완료 후 전송 (0.3s + 여유시간)
    
    return () => clearTimeout(timer);
  }, [activeWidget, leftWidgetsOpacity, rightWidgetsOpacity]);

  // activeWidget 변경 시 투명도 초기화
  useEffect(() => {
    if (activeWidget) {
      setLeftWidgetsOpacity(1);
      setRightWidgetsOpacity(1);
    }
  }, [activeWidget]);

  // 창 닫힐 때 리모콘도 닫기
  useEffect(() => {
    const handleBeforeUnload = () => {
      if (remoteWindowRef.current && !remoteWindowRef.current.closed) {
        remoteWindowRef.current.close();
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-black">
      <Background>
        <MainContent 
          activeWidget={activeWidget} 
          setActiveWidget={setActiveWidget}
          leftWidgetsOpacity={leftWidgetsOpacity}
          rightWidgetsOpacity={rightWidgetsOpacity}
          resetAllWidgets={resetAllWidgets}
        />
      </Background>

      {/* 리모콘 열기 버튼 - 우측 상단 (리모콘이 닫혀있을 때만 표시) */}
      {!isRemoteOpen && (
        <button
          onClick={openRemote}
          style={{
            position: 'fixed',
            top: 60,
            right: 60,
            zIndex: 300,
            background: 'rgba(255, 255, 255, 0.2)',
            border: '1px solid rgba(255, 255, 255, 0.3)',
            borderRadius: '12px',
            padding: '16px 20px',
            color: 'white',
            fontSize: '16px',
            fontWeight: '600',
            cursor: 'pointer',
            transition: 'all 0.2s ease-out',
            backdropFilter: 'blur(10px)',
            minWidth: '140px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px'
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.background = 'rgba(255, 255, 255, 0.3)';
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.background = 'rgba(255, 255, 255, 0.2)';
          }}
        >
          <span style={{ fontSize: '20px' }}>🎮</span>
          리모콘 열기
        </button>
      )}
    </div>
  );
}
