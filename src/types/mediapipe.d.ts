declare module '@mediapipe/hands' {
  export interface HandLandmark {
    x: number;
    y: number;
    z: number;
  }

  export interface HandResults {
    image: HTMLVideoElement | HTMLImageElement | HTMLCanvasElement;
    multiHandLandmarks?: HandLandmark[][];
    multiHandedness?: Array<{
      label: string;
      score: number;
    }>;
  }

  export interface HandsOptions {
    maxNumHands?: number;
    modelComplexity?: number;
    minDetectionConfidence?: number;
    minTrackingConfidence?: number;
  }

  export interface HandsConfig {
    locateFile: (file: string) => string;
  }

  export class Hands {
    constructor(config: HandsConfig);
    setOptions(options: HandsOptions): void;
    onResults(callback: (results: HandResults) => void): void;
    send(inputs: { image: HTMLVideoElement | HTMLImageElement | HTMLCanvasElement }): Promise<void>;
    close(): void;
  }
} 