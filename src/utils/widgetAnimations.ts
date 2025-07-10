// Widget Animation Management System
export interface AnimationConfig {
  duration: number;
  easing: string;
  delay?: number;
  stagger?: number;
}

export interface WidgetAnimationState {
  activeWidget: string | null;
  leftWidgetsOpacity: number;
  rightWidgetsOpacity: number;
}

export interface WidgetPosition {
  left?: number;
  right?: number;
  top?: number;
  bottom?: number;
}

export interface WidgetDimensions {
  width: number;
  height: number;
}

// Animation presets
export const ANIMATION_PRESETS = {
  // 기본 애니메이션 설정
  default: {
    duration: 0.25,
    easing: 'cubic-bezier(0.23, 1, 0.32, 1)',
    delay: 0,
  },
  
  // 빠른 애니메이션 (위젯 숨김/표시)
  fast: {
    duration: 0.15,
    easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
    delay: 0,
  },
  
  // 부드러운 애니메이션 (위젯 확대/축소)
  smooth: {
    duration: 0.35,
    easing: 'cubic-bezier(0.23, 1, 0.32, 1)',
    delay: 0,
  },
  
  // 스프링 애니메이션 (등장)
  spring: {
    duration: 0.4,
    easing: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)',
    delay: 0,
  },
  
  // 계단식 애니메이션 (순차 등장)
  stagger: {
    duration: 0.25,
    easing: 'cubic-bezier(0.23, 1, 0.32, 1)',
    delay: 0,
    stagger: 0.05,
  }
} as const;

// 위젯 타입 정의
export type WidgetType = 'clock' | 'spotify' | 'cool' | 'haven' | 'notification' | 'settings';

// 위젯 기본 설정
export const WIDGET_CONFIGS = {
  clock: {
    id: 'widget1',
    side: 'left',
    position: 'top',
    baseSize: { width: 418, height: 418 },
    expandedSize: { width: 2378, height: 1485 },
    basePosition: { left: 64, top: 64 },
  },
  spotify: {
    id: 'widget2',
    side: 'left',
    position: 'bottom',
    baseSize: { width: 418, height: 877 },
    expandedSize: { width: 2378, height: 1485 },
    basePosition: { left: 64, bottom: 64 },
  },
  cool: {
    id: 'widget3',
    side: 'right',
    position: 'top',
    baseSize: { width: 418, height: 877 },
    expandedSize: { width: 2378, height: 1485 },
    basePosition: { right: 64, top: 64 },
  },
  haven: {
    id: 'widget4',
    side: 'right',
    position: 'bottom',
    baseSize: { width: 418, height: 418 },
    expandedSize: { width: 2378, height: 1485 },
    basePosition: { right: 64, bottom: 64 },
  },
  notification: {
    id: 'notification',
    side: 'left-replacement',
    position: 'center',
    baseSize: { width: 418, height: 558 },
    expandedSize: { width: 2378, height: 1485 },
    basePosition: { right: 64, top: 64 },
  },
  settings: {
    id: 'settings',
    side: 'right-replacement',
    position: 'center',
    baseSize: { width: 418, height: 418 },
    expandedSize: { width: 2378, height: 1485 },
    basePosition: { left: 64, top: 64 },
  },
} as const;

// 위치 계산 함수들
export class WidgetAnimationController {
  private static screenWidth = typeof window !== 'undefined' ? window.innerWidth : 2560;
  
  // 화면 너비 업데이트
  static updateScreenWidth(width: number) {
    this.screenWidth = width;
  }
  
  // 위젯 위치 계산
  static calculatePosition(
    widgetType: WidgetType,
    state: WidgetAnimationState
  ): WidgetPosition {
    const config = WIDGET_CONFIGS[widgetType];
    const { activeWidget, leftWidgetsOpacity, rightWidgetsOpacity } = state;
    
    // 활성 위젯인 경우 전체 화면
    if (activeWidget === config.id) {
      return { left: 0, top: 0, right: 0, bottom: 0 };
    }
    
    // 메인 위젯들의 위치 계산
    switch (widgetType) {
      case 'clock':
        return {
          ...this.calculateLeftWidgetPosition(rightWidgetsOpacity),
          top: 64
        };
        
      case 'spotify':
        return {
          ...this.calculateLeftWidgetPosition(rightWidgetsOpacity),
          bottom: 64
        };
        
      case 'cool':
        return {
          ...this.calculateRightWidgetPosition(leftWidgetsOpacity),
          top: 64
        };
        
      case 'haven':
        return {
          ...this.calculateRightWidgetPosition(leftWidgetsOpacity),
          bottom: 64
        };
        
      case 'notification':
        return {
          ...this.calculateNotificationPosition(leftWidgetsOpacity),
          top: 64
        };
        
      case 'settings':
        return {
          ...this.calculateSettingsPosition(rightWidgetsOpacity),
          top: 64
        };
        
      default:
        return {};
    }
  }
  
  // 왼쪽 위젯 위치 계산
  private static calculateLeftWidgetPosition(rightWidgetsOpacity: number): WidgetPosition {
    if (rightWidgetsOpacity === 0) {
      return { left: this.screenWidth / 2 + 209 }; // 중앙으로 이동
    }
    return { left: 64 }; // 기본 위치
  }
  
  // 오른쪽 위젯 위치 계산
  private static calculateRightWidgetPosition(leftWidgetsOpacity: number): WidgetPosition {
    if (leftWidgetsOpacity === 0) {
      return { right: this.screenWidth / 2 + 209 }; // 중앙으로 이동
    }
    return { right: 64 }; // 기본 위치
  }
  
  // 알림 위젯 위치 계산
  private static calculateNotificationPosition(leftWidgetsOpacity: number): WidgetPosition {
    if (leftWidgetsOpacity === 0) {
      return { right: this.screenWidth / 2 - 273 }; // 중앙으로 이동
    }
    return { right: 64 }; // 기본 위치
  }
  
  // 설정 위젯 위치 계산
  private static calculateSettingsPosition(rightWidgetsOpacity: number): WidgetPosition {
    if (rightWidgetsOpacity === 0) {
      return { left: this.screenWidth / 2 - 273 }; // 중앙으로 이동
    }
    return { left: 64 }; // 기본 위치
  }
  
  // 위젯 크기 계산
  static calculateDimensions(
    widgetType: WidgetType,
    state: WidgetAnimationState
  ): WidgetDimensions {
    const config = WIDGET_CONFIGS[widgetType];
    const { activeWidget } = state;
    
    if (activeWidget === config.id) {
      return config.expandedSize;
    }
    
    return config.baseSize;
  }
  
  // 위젯 투명도 계산
  static calculateOpacity(
    widgetType: WidgetType,
    state: WidgetAnimationState
  ): number {
    const config = WIDGET_CONFIGS[widgetType];
    const { activeWidget, leftWidgetsOpacity, rightWidgetsOpacity } = state;
    
    // 활성 위젯이거나 해당 위젯이 아닌 경우
    if (activeWidget && activeWidget !== config.id) {
      return 0;
    }
    
    // 교체 위젯들의 가시성 조건
    if (widgetType === 'notification') {
      return leftWidgetsOpacity === 0 ? 1 : 0;
    }
    
    if (widgetType === 'settings') {
      return rightWidgetsOpacity === 0 ? 1 : 0;
    }
    
    return 1;
  }
  
  // 애니메이션 스타일 생성
  static generateAnimationStyle(
    widgetType: WidgetType,
    state: WidgetAnimationState,
    preset: keyof typeof ANIMATION_PRESETS = 'default',
    customDelay: number = 0
  ): React.CSSProperties {
    const position = this.calculatePosition(widgetType, state);
    const dimensions = this.calculateDimensions(widgetType, state);
    const opacity = this.calculateOpacity(widgetType, state);
    const config = ANIMATION_PRESETS[preset];
    
    // 기본 스타일
    const baseStyle: React.CSSProperties = {
      position: 'absolute',
      ...position,
      width: dimensions.width,
      height: dimensions.height,
      borderRadius: 260,
      opacity,
      transition: `all ${config.duration}s ${config.easing}${customDelay > 0 ? ` ${customDelay}s` : ''}`,
      zIndex: state.activeWidget === WIDGET_CONFIGS[widgetType].id ? 200 : 1,
      margin: '-2px',
    };
    
    // SVG 렌더링 방해하는 위젯들은 특별 처리
    if (this.hasSVGRenderingIssues(widgetType)) {
      return {
        ...baseStyle,
        // SVG 친화적 속성만 사용
        overflow: 'visible', // 블러 효과 보이게
        willChange: 'transform, opacity', // 성능 최적화는 이것으로
      };
    }
    
    // 일반 위젯은 GPU 가속 적용
    return {
      ...baseStyle,
      transform: 'translate3d(0, 0, 0)',
      backfaceVisibility: 'hidden' as const,
      perspective: 1000,
      overflow: 'hidden' as const,
    };
  }
  
  // SVG 렌더링 문제가 있는 위젯 판별
  private static hasSVGRenderingIssues(widgetType: WidgetType): boolean {
    // SVG 필터나 클립패스 사용하는 위젯들
    return ['clock'].includes(widgetType);
  }
  
  // 순차 애니메이션 (스태거) 지연 시간 계산
  static calculateStaggerDelay(index: number, staggerTime: number = 0.05): number {
    return index * staggerTime;
  }
  
  // 위젯 그룹별 애니메이션 타이밍 관리
  static getWidgetGroupTimings() {
    return {
      leftWidgets: {
        hide: { delay: 0, duration: 0.25 },
        show: { delay: 0.1, duration: 0.3 },
      },
      rightWidgets: {
        hide: { delay: 0.05, duration: 0.25 },
        show: { delay: 0.15, duration: 0.3 },
      },
      replacementWidgets: {
        show: { delay: 0.2, duration: 0.35 },
        hide: { delay: 0, duration: 0.2 },
      },
    };
  }
}

// 커스텀 훅 (옵션)
export function useWidgetAnimation(
  widgetType: WidgetType,
  state: WidgetAnimationState,
  preset: keyof typeof ANIMATION_PRESETS = 'default'
) {
  const style = WidgetAnimationController.generateAnimationStyle(
    widgetType,
    state,
    preset
  );
  
  const position = WidgetAnimationController.calculatePosition(widgetType, state);
  const dimensions = WidgetAnimationController.calculateDimensions(widgetType, state);
  const opacity = WidgetAnimationController.calculateOpacity(widgetType, state);
  
  return {
    style,
    position,
    dimensions,
    opacity,
  };
}

// 애니메이션 시퀀스 관리
export class AnimationSequence {
  private sequences: Array<{
    widgets: WidgetType[];
    timing: AnimationConfig;
    action: 'show' | 'hide' | 'move';
  }> = [];
  
  addSequence(widgets: WidgetType[], timing: AnimationConfig, action: 'show' | 'hide' | 'move') {
    this.sequences.push({ widgets, timing, action });
    return this;
  }
  
  execute() {
    let totalDelay = 0;
    
    this.sequences.forEach((sequence, index) => {
      sequence.widgets.forEach((widget, widgetIndex) => {
        const delay = totalDelay + (sequence.timing.stagger ? widgetIndex * sequence.timing.stagger : 0);
        // 실제 애니메이션 실행 로직 (필요시 구현)
        console.log(`${sequence.action} ${widget} at ${delay}s`);
      });
      
      totalDelay += sequence.timing.duration + (sequence.timing.delay || 0);
    });
    
    return totalDelay;
  }
  
  clear() {
    this.sequences = [];
    return this;
  }
} 