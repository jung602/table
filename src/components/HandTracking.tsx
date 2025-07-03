'use client';

import { useEffect, useRef, useState } from 'react';

// 손가락 연결선 정의
const HAND_CONNECTIONS = [
  [0, 1], [1, 2], [2, 3], [3, 4], // 엄지
  [0, 5], [5, 6], [6, 7], [7, 8], // 검지
  [5, 9], [9, 10], [10, 11], [11, 12], // 중지
  [9, 13], [13, 14], [14, 15], [15, 16], // 약지
  [13, 17], [17, 18], [18, 19], [19, 20], // 새끼
  [0, 17] // 손목과 새끼 연결
];

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
  onPinchDetected?: (widgetId: string) => void;
  onPinchEnd?: () => void;
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

// 핀치 제스처 감지 함수
function isPinchGesture(landmarks: HandLandmark[]): boolean {
  if (!landmarks || landmarks.length < 21) return false;
  
  const thumbTip = landmarks[4];
  const indexTip = landmarks[8];
  
  // 엄지와 검지 끝점 사이의 거리 계산
  const distance = Math.sqrt(
    Math.pow(thumbTip.x - indexTip.x, 2) + 
    Math.pow(thumbTip.y - indexTip.y, 2)
  );
  
  // 거리가 임계값보다 작으면 핀치로 간주 (조정 가능)
  return distance < 0.05;
}

// 점이 위젯 영역 안에 있는지 확인
function isPointInWidget(x: number, y: number, widget: WidgetArea, canvasWidth: number, canvasHeight: number): boolean {
  const pixelX = x * canvasWidth;
  const pixelY = y * canvasHeight;
  
  return pixelX >= widget.x && 
         pixelX <= widget.x + widget.width && 
         pixelY >= widget.y && 
         pixelY <= widget.y + widget.height;
}

export default function HandTracking({ 
  width = 320, 
  height = 240, 
  onPinchDetected,
  onPinchEnd,
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
  const pinchStateRef = useRef<{ 
    isPinching: boolean; 
    widgetId: string | null;
    lastPinchState: boolean;
  }>({ 
    isPinching: false, 
    widgetId: null,
    lastPinchState: false
  });

  useEffect(() => {
    let mounted = true;

    const initializeHandTracking = async () => {
      try {
        if (!videoRef.current || !canvasRef.current) {
          console.log('Video 또는 Canvas ref가 준비되지 않음');
          return;
        }

        console.log('카메라 권한 요청 중...');
        setLoadingMessage('카메라 권한 요청 중...');

        // 웹캠 스트림 가져오기
        const stream = await navigator.mediaDevices.getUserMedia({
          video: {
            width: width,
            height: height,
            facingMode: 'user'
          }
        });

        console.log('카메라 스트림 획득 성공');
        setLoadingMessage('카메라 연결됨, MediaPipe 로딩 중...');

        videoRef.current.srcObject = stream;
        await videoRef.current.play();

        console.log('비디오 재생 시작');
        setLoadingMessage('MediaPipe 모델 로딩 중...');

        // MediaPipe Hands 동적 import
        const { Hands } = await import('@mediapipe/hands');
        console.log('MediaPipe Hands 모듈 로드 완료');

        // MediaPipe Hands 초기화
        const hands = new Hands({
          locateFile: (file: string) => {
            const url = `https://cdn.jsdelivr.net/npm/@mediapipe/hands/${file}`;
            console.log('파일 로딩:', url);
            return url;
          }
        });

        console.log('MediaPipe Hands 인스턴스 생성 완료');
        setLoadingMessage('모델 설정 중...');

        hands.setOptions({
          maxNumHands: 2,
          modelComplexity: 1,
          minDetectionConfidence: 0.5,
          minTrackingConfidence: 0.5
        });

        console.log('MediaPipe 옵션 설정 완료');

        // 손 감지 결과 처리
        hands.onResults((results: HandResults) => {
          if (!mounted || !canvasRef.current) return;

          const canvas = canvasRef.current;
          const ctx = canvas.getContext('2d');
          if (!ctx) return;

          // 캔버스 클리어 (투명 배경)
          ctx.clearRect(0, 0, canvas.width, canvas.height);

          // 실제 비디오는 그리지 않음 - 뼈대만 표시

          // 손 랜드마크 그리기
          if (results.multiHandLandmarks && results.multiHandLandmarks.length > 0) {
            console.log(`${results.multiHandLandmarks.length}개의 손 감지됨`);
            
            let anyPinching = false;
            
            // 각 손에 대해 처리 (오른손만)
            for (let handIndex = 0; handIndex < results.multiHandLandmarks.length; handIndex++) {
              // 손의 좌우 정보 확인
              const handedness = results.multiHandedness?.[handIndex];
              if (!handedness || handedness.label !== 'Right') {
                console.log(`손 ${handIndex + 1}: ${handedness?.label || 'Unknown'} - 건너뜀 (오른손만 처리)`);
                continue; // 오른손이 아니면 건너뜀
              }
              
              console.log(`손 ${handIndex + 1}: ${handedness.label} - 처리함`);
              const landmarks = results.multiHandLandmarks[handIndex];
              
              // 핀치 제스처 감지
              const isPinching = isPinchGesture(landmarks);
              
              if (isPinching) {
                anyPinching = true;
                
                // 핀치가 시작되었는지 확인 (이전에 핀치하지 않았는데 지금 핀치함)
                if (!pinchStateRef.current.lastPinchState) {
                  // 핀치하는 손의 중심점 계산 (엄지와 검지 끝점의 중점)
                  const thumbTip = landmarks[4];
                  const indexTip = landmarks[8];
                  // x 좌표 반전 (미러링된 화면에 맞춤)
                  const pinchCenterX = 1 - (thumbTip.x + indexTip.x) / 2;
                  const pinchCenterY = (thumbTip.y + indexTip.y) / 2;
                  
                  // 핀치 중심점이 어떤 위젯 위에 있는지 확인
                  const detectedWidget = widgetAreas.find(widget => 
                    isPointInWidget(pinchCenterX, pinchCenterY, widget, canvas.width, canvas.height)
                  );
                  
                  if (detectedWidget) {
                    console.log(`핀치 시작: ${detectedWidget.id} (손 ${handIndex + 1})`);
                    
                    // 토글 방식: 이미 활성화된 위젯이 있으면 해제, 없으면 활성화
                    if (activeWidget === detectedWidget.id) {
                      // 같은 위젯을 다시 핀치하면 해제
                      console.log(`위젯 ${detectedWidget.id} 해제`);
                      onPinchEnd?.();
                    } else if (!activeWidget) {
                      // 활성화된 위젯이 없으면 새로 활성화
                      console.log(`위젯 ${detectedWidget.id} 활성화`);
                      onPinchDetected?.(detectedWidget.id);
                    }
                    
                    pinchStateRef.current = { 
                      isPinching: true, 
                      widgetId: detectedWidget.id, 
                      lastPinchState: true 
                    };
                  } else {
                    // 위젯 밖에서 핀치하면 현재 활성화된 위젯 해제
                    if (activeWidget) {
                      console.log('위젯 밖에서 핀치 - 현재 위젯 해제');
                      onPinchEnd?.();
                    }
                    pinchStateRef.current = { 
                      isPinching: true, 
                      widgetId: null, 
                      lastPinchState: true 
                    };
                  }
                }
              }

              // 검지 끝과 엄지 끝에만 흰색 원 그리기
              const thumbTip = landmarks[4]; // 엄지 끝
              const indexTip = landmarks[8]; // 검지 끝
              
              // 엄지 끝 흰색 원
              ctx.beginPath();
              ctx.arc(
                thumbTip.x * canvas.width,
                thumbTip.y * canvas.height,
                12,
                0,
                2 * Math.PI
              );
              ctx.fillStyle = '#FFFFFF';
              ctx.fill();
              
              // 검지 끝 흰색 원
              ctx.beginPath();
              ctx.arc(
                indexTip.x * canvas.width,
                indexTip.y * canvas.height,
                12,
                0,
                2 * Math.PI
              );
              ctx.fillStyle = '#FFFFFF';
              ctx.fill();
            }
            
            // 핀치가 끝났는지 확인
            if (!anyPinching && pinchStateRef.current.lastPinchState) {
              console.log('핀치 종료 - 상태 유지');
              pinchStateRef.current = { 
                isPinching: false, 
                widgetId: pinchStateRef.current.widgetId, 
                lastPinchState: false 
              };
            }
          }
        });

        handsRef.current = hands;
        console.log('결과 콜백 설정 완료');
        setLoadingMessage('초기화 완료, 프레임 처리 시작...');

        // 프레임 처리 루프
        const processFrame = async () => {
          if (!mounted || !videoRef.current || !hands) return;

          try {
            await hands.send({ image: videoRef.current });
            animationRef.current = requestAnimationFrame(processFrame);
          } catch (err) {
            console.error('프레임 처리 오류:', err);
          }
        };

        // 프레임 처리 시작
        console.log('프레임 처리 시작');
        processFrame();

        if (mounted) {
          setIsLoading(false);
          console.log('핸드트래킹 초기화 완료');
        }
      } catch (err) {
        console.error('핸드트래킹 초기화 오류:', err);
        if (mounted) {
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

    console.log('핸드트래킹 초기화 시작');
    initializeHandTracking();

    return () => {
      mounted = false;
      console.log('컴포넌트 cleanup 시작');
      
      // 애니메이션 프레임 취소
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      
      // 웹캠 스트림 정리
      if (videoRef.current && videoRef.current.srcObject) {
        const stream = videoRef.current.srcObject as MediaStream;
        stream.getTracks().forEach(track => {
          track.stop();
          console.log('카메라 트랙 중지됨');
        });
      }
      
      // MediaPipe Hands 정리
      if (handsRef.current) {
        handsRef.current.close();
        console.log('MediaPipe Hands 종료됨');
      }
    };
  }, [width, height, onPinchDetected, onPinchEnd, widgetAreas, activeWidget]);

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