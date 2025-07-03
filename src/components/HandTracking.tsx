'use client';

import { useEffect, useRef, useState } from 'react';

interface WidgetArea {
  id: string;
  x: number;
  y: number;
  width: number;
  height: number;
}

interface HandTrackingProps {
  width?: number;
  height?: number;
  onHoverDetected?: (widgetId: string) => void;
  onHoverEnd?: () => void;
  onBackButtonHover?: () => void;
  widgetAreas?: WidgetArea[];
  activeWidget?: string | null;
}

interface HandLandmark {
  x: number;
  y: number;
  z: number;
}

interface HandResults {
  image: HTMLVideoElement | HTMLImageElement | HTMLCanvasElement;
  multiHandLandmarks?: HandLandmark[][];
  multiHandedness?: Array<{
    score: number;
    label: string;
  }>;
}



export default function HandTracking({ 
  width = 320, 
  height = 240, 
  onHoverDetected,
  onHoverEnd,
  onBackButtonHover,
  widgetAreas = [],
  activeWidget
}: HandTrackingProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [loadingMessage, setLoadingMessage] = useState('초기화 중...');
  const [error, setError] = useState<string | null>(null);
  const handsRef = useRef<any>(null);
  const animationRef = useRef<number | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const isInitializedRef = useRef<boolean>(false);
  const cleanupRef = useRef<boolean>(false);
  const hoverStateRef = useRef<{ 
    isHovering: boolean; 
    widgetId: string | null;
    startTime: number | null;
    timerRef: number | null;
  }>({ 
    isHovering: false, 
    widgetId: null,
    startTime: null,
    timerRef: null
  });

  useEffect(() => {
    let mounted = true;
    
    // 이미 초기화 중이거나 완료된 경우 중복 실행 방지
    if (isInitializedRef.current || cleanupRef.current) {
      return;
    }

    const initializeHandTracking = async () => {
      try {
        if (cleanupRef.current || !mounted) return;
        
        // ref 체크를 더 안전하게
        if (!videoRef.current || !canvasRef.current) {
          // 잠시 후 다시 시도
          setTimeout(() => {
            if (mounted && !cleanupRef.current) {
              initializeHandTracking();
            }
          }, 100);
          return;
        }

        setLoadingMessage('카메라 연결 중...');

        // 웹캠 스트림 가져오기
        const stream = await navigator.mediaDevices.getUserMedia({
          video: {
            width: width,
            height: height,
            facingMode: 'user'
          }
        });

        if (!mounted || cleanupRef.current) {
          // 컴포넌트가 언마운트되었으면 스트림 정리
          stream.getTracks().forEach(track => track.stop());
          return;
        }

        // 스트림 참조 저장
        streamRef.current = stream;

        // video element 재확인
        if (!videoRef.current) {
          stream.getTracks().forEach(track => track.stop());
          setError('비디오 엘리먼트를 찾을 수 없습니다.');
          return;
        }

        videoRef.current.srcObject = stream;
        await videoRef.current.play();

        if (!mounted || cleanupRef.current) return;

        setLoadingMessage('핸드트래킹 모델 로딩 중...');

        // MediaPipe Hands 동적 import
        const { Hands } = await import('@mediapipe/hands');

        if (!mounted || cleanupRef.current) return;

        // MediaPipe Hands 초기화
        const hands = new Hands({
          locateFile: (file: string) => {
            return `https://cdn.jsdelivr.net/npm/@mediapipe/hands/${file}`;
          }
        });

        if (!mounted || cleanupRef.current) {
          hands.close();
          return;
        }

        hands.setOptions({
          maxNumHands: 2,
          modelComplexity: 0, // 0으로 낮춰서 성능 향상
          minDetectionConfidence: 0.7, // 높여서 안정성 향상
          minTrackingConfidence: 0.7, // 높여서 안정성 향상
        });

        // 손 감지 결과 처리
        hands.onResults((results: HandResults) => {
          if (!mounted || cleanupRef.current || !canvasRef.current) return;

          const canvas = canvasRef.current;
          const ctx = canvas.getContext('2d');
          if (!ctx) return;

          // 캔버스 클리어 (투명 배경)
          ctx.clearRect(0, 0, canvas.width, canvas.height);

          // 손 랜드마크 그리기
          if (results.multiHandLandmarks && results.multiHandLandmarks.length > 0) {
            let anyHandDetected = false;
            
            // 각 손에 대해 처리 (양손 모두)
            for (let handIndex = 0; handIndex < results.multiHandLandmarks.length; handIndex++) {
              if (cleanupRef.current || !mounted) break; // 추가 안전 체크
              
              const landmarks = results.multiHandLandmarks[handIndex];
              anyHandDetected = true;
              
              // 검지 끝 위치 가져오기
              const indexTip = landmarks[8];
              // x 좌표 반전 (미러링된 화면에 맞춤)
              const indexX = 1 - indexTip.x;
              const indexY = indexTip.y;
              
              // 검지가 어떤 위젯 위에 있는지 확인
              const pixelX = indexX * canvas.width;
              const pixelY = indexY * canvas.height;
              
              let detectedWidget: WidgetArea | undefined;
              for (const widget of widgetAreas) {
                if (pixelX >= widget.x && 
                    pixelX <= widget.x + widget.width && 
                    pixelY >= widget.y && 
                    pixelY <= widget.y + widget.height) {
                  detectedWidget = widget;
                  break;
                }
              }
              
              // 뒤로가기 버튼 영역 체크 (위젯이 활성화되어 있을 때만)
              const backButtonArea = { x: 120, y: 120, width: 120, height: 120 }; // 좌측 상단
              const isOnBackButton = activeWidget && 
                pixelX >= backButtonArea.x && 
                pixelX <= backButtonArea.x + backButtonArea.width && 
                pixelY >= backButtonArea.y && 
                pixelY <= backButtonArea.y + backButtonArea.height;

              // 호버 상태 관리
              if (detectedWidget && !cleanupRef.current && mounted && !activeWidget) {
                // 위젯 위에 검지가 있음 (위젯이 활성화되어 있지 않을 때만)
                if (!hoverStateRef.current.isHovering || hoverStateRef.current.widgetId !== detectedWidget.id) {
                  // 새로운 호버 시작
                  if (hoverStateRef.current.timerRef) {
                    clearTimeout(hoverStateRef.current.timerRef);
                  }
                  
                  hoverStateRef.current.isHovering = true;
                  hoverStateRef.current.widgetId = detectedWidget.id;
                  hoverStateRef.current.startTime = Date.now();
                  
                  // 3초 후 선택
                  hoverStateRef.current.timerRef = window.setTimeout(() => {
                    if (hoverStateRef.current.widgetId === detectedWidget.id && !cleanupRef.current && mounted) {
                      // 위젯 활성화 (토글 기능 제거)
                      onHoverDetected?.(detectedWidget.id);
                    }
                  }, 3000);
                }
              } else if (isOnBackButton && !cleanupRef.current && mounted) {
                // 뒤로가기 버튼 위에 검지가 있음
                if (!hoverStateRef.current.isHovering || hoverStateRef.current.widgetId !== 'back-button') {
                  // 새로운 호버 시작
                  if (hoverStateRef.current.timerRef) {
                    clearTimeout(hoverStateRef.current.timerRef);
                  }
                  
                  hoverStateRef.current.isHovering = true;
                  hoverStateRef.current.widgetId = 'back-button';
                  hoverStateRef.current.startTime = Date.now();
                  
                  // 3초 후 뒤로가기
                  hoverStateRef.current.timerRef = window.setTimeout(() => {
                    if (hoverStateRef.current.widgetId === 'back-button' && !cleanupRef.current && mounted) {
                      onBackButtonHover?.();
                    }
                  }, 3000);
                }
              } else {
                // 위젯 밖으로 벗어남 또는 위젯이 이미 활성화됨
                if (hoverStateRef.current.isHovering) {
                  if (hoverStateRef.current.timerRef) {
                    clearTimeout(hoverStateRef.current.timerRef);
                    hoverStateRef.current.timerRef = null;
                  }
                  hoverStateRef.current.isHovering = false;
                  hoverStateRef.current.widgetId = null;
                  hoverStateRef.current.startTime = null;
                }
              }

              // 검지 끝에 원과 프로그레스바 그리기
              const indexPixelX = indexTip.x * canvas.width;
              const indexPixelY = indexTip.y * canvas.height;
              
              // 호버 중이면 프로그레스바 표시
              if (hoverStateRef.current.isHovering && hoverStateRef.current.startTime) {
                const elapsed = Date.now() - hoverStateRef.current.startTime;
                const progress = Math.min(elapsed / 3000, 1); // 3초 동안 0에서 1로
                
                // 프로그레스에 따른 색상 계산 (흰색 → 노란색 → 초록색)
                let r, g, b;
                if (progress < 0.5) {
                  // 흰색(255,255,255) → 노란색(255,255,0)
                  const p = progress * 2; // 0 ~ 1
                  r = 255;
                  g = 255;
                  b = Math.round(255 * (1 - p));
                } else {
                  // 노란색(255,255,0) → 초록색(0,255,0)
                  const p = (progress - 0.5) * 2; // 0 ~ 1
                  r = Math.round(255 * (1 - p));
                  g = 255;
                  b = 0;
                }
                
                // 프로그레스바 링 그리기
                ctx.strokeStyle = `rgb(${r}, ${g}, ${b})`;
                ctx.lineWidth = 4;
                ctx.beginPath();
                ctx.arc(
                  indexPixelX,
                  indexPixelY,
                  20, // 원보다 큰 반지름
                  -1.5708, // -90도 (12시 방향 시작)
                  -1.5708 + (6.28318530718 * progress), // 진행률만큼 호 그리기
                  false
                );
                ctx.stroke();
              }
              
              // 검지 끝 흰색 원 그리기
              ctx.fillStyle = '#FFFFFF';
              ctx.beginPath();
              ctx.arc(
                indexPixelX,
                indexPixelY,
                12,
                0,
                6.28318530718 // 2 * Math.PI 상수로 대체
              );
              ctx.fill();
            }
            
            // 손이 감지되지 않으면 호버 상태 초기화
            if (!anyHandDetected && hoverStateRef.current.isHovering && !cleanupRef.current && mounted) {
              if (hoverStateRef.current.timerRef) {
                clearTimeout(hoverStateRef.current.timerRef);
                hoverStateRef.current.timerRef = null;
              }
              hoverStateRef.current.isHovering = false;
              hoverStateRef.current.widgetId = null;
              hoverStateRef.current.startTime = null;
            }
          }
        });

        handsRef.current = hands;
        setLoadingMessage('초기화 완료, 프레임 처리 시작...');

        // 프레임 처리 루프 (60fps 제한)
        let lastFrameTime = 0;
        const targetFPS = 60;
        const frameInterval = 1000 / targetFPS;

        const processFrame = async (currentTime: number = performance.now()) => {
          if (!mounted || cleanupRef.current || !videoRef.current || !handsRef.current) return;

          // FPS 제한
          if (currentTime - lastFrameTime >= frameInterval) {
            try {
              await handsRef.current.send({ image: videoRef.current });
              lastFrameTime = currentTime;
            } catch (err) {
              if (!cleanupRef.current) {
                console.error('프레임 처리 오류:', err);
              }
            }
          }
          
          if (!cleanupRef.current && mounted) {
            animationRef.current = requestAnimationFrame(processFrame);
          }
        };

        // 프레임 처리 시작
        if (!cleanupRef.current && mounted) {
          processFrame();
          isInitializedRef.current = true;
        }

        if (mounted && !cleanupRef.current) {
          setIsLoading(false);
        }
      } catch (err) {
        console.error('핸드트래킹 초기화 오류:', err);
        if (mounted && !cleanupRef.current) {
          if (err instanceof Error) {
            if (err.name === 'NotAllowedError') {
              setError('카메라 권한이 거부되었습니다. 브라우저 설정에서 카메라 접근을 허용해주세요.');
            } else if (err.name === 'NotFoundError') {
              setError('카메라를 찾을 수 없습니다. 카메라가 연결되어 있는지 확인해주세요.');
            } else {
              setError(`초기화 오류: ${err.message}`);
            }
          } else {
            setError('알 수 없는 오류가 발생했습니다.');
          }
          setIsLoading(false);
        }
      }
    };

    initializeHandTracking();

    return () => {
      mounted = false;
      cleanupRef.current = true;
      
      // 호버 타이머 정리
      if (hoverStateRef.current.timerRef) {
        clearTimeout(hoverStateRef.current.timerRef);
        hoverStateRef.current.timerRef = null;
      }
      
      // 애니메이션 프레임 취소
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
        animationRef.current = null;
      }
      
      // 웹캠 스트림 정리
      if (streamRef.current) {
        try {
          streamRef.current.getTracks().forEach(track => track.stop());
        } catch (err) {
          console.warn('스트림 정리 중 오류:', err);
        }
        streamRef.current = null;
      }
      
      // video element srcObject 정리
      if (videoRef.current && videoRef.current.srcObject) {
        try {
          videoRef.current.srcObject = null;
        } catch (err) {
          console.warn('비디오 정리 중 오류:', err);
        }
      }
      
      // MediaPipe Hands 정리 (안전하게)
      if (handsRef.current && isInitializedRef.current) {
        try {
          handsRef.current.close();
        } catch (err) {
          // MediaPipe가 이미 정리된 경우 무시
          console.warn('MediaPipe 정리 중 오류 (무시됨):', err);
        } finally {
          handsRef.current = null;
          isInitializedRef.current = false;
        }
      }
      
      // 상태 완전 리셋
      setTimeout(() => {
        cleanupRef.current = false;
      }, 100);
    };
  }, [width, height, onHoverDetected, onHoverEnd, onBackButtonHover, widgetAreas, activeWidget]);

  if (error) {
    return (
      <div className="fixed top-4 right-4 bg-red-500 text-white p-4 rounded-lg shadow-lg z-50 max-w-xs">
        <p className="text-sm font-bold mb-2">핸드트래킹 오류</p>
        <p className="text-xs">{error}</p>
      </div>
    );
  }

  return (
    <div 
      className="absolute inset-0 pointer-events-none"
      style={{
        width: `${width}px`,
        height: `${height}px`,
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)'
      }}
    >
      {isLoading && (
        <div className="absolute top-4 left-4 bg-black bg-opacity-75 text-white text-xs px-3 py-2 rounded z-50">
          <div className="mb-1">핸드트래킹</div>
          <div>{loadingMessage}</div>
        </div>
      )}
      
      {/* 숨겨진 비디오 엘리먼트 */}
      <video
        ref={videoRef}
        style={{ display: 'none' }}
        playsInline
        muted
        autoPlay
      />
      
      {/* 트래킹 결과를 보여주는 캔버스 (투명 배경에 뼈대만) */}
      <canvas
        ref={canvasRef}
        width={width}
        height={height}
        className="block"
        style={{ 
          width: `${width}px`,
          height: `${height}px`,
          transform: 'scaleX(-1)', // 미러 효과
        }}
      />
      
      {/* 인포 텍스트 */}
      <div className="absolute bottom-4 left-4 bg-black bg-opacity-75 text-white text-xs px-2 py-1 rounded">
        Hand Tracking: {width}x{height}
      </div>
    </div>
  );
} 