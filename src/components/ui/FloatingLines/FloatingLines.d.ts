import type { CSSProperties } from "react";

export interface WavePosition {
  x: number;
  y: number;
  rotate: number;
}

export interface FloatingLinesProps {
  linesGradient?: string[];
  enabledWaves?: Array<"top" | "middle" | "bottom">;
  lineCount?: number | number[];
  lineDistance?: number | number[];
  topWavePosition?: WavePosition;
  middleWavePosition?: WavePosition;
  bottomWavePosition?: WavePosition;
  animationSpeed?: number;
  interactive?: boolean;
  bendRadius?: number;
  bendStrength?: number;
  mouseDamping?: number;
  parallax?: boolean;
  parallaxStrength?: number;
  mixBlendMode?: CSSProperties["mixBlendMode"];
}

declare function FloatingLines(props: FloatingLinesProps): JSX.Element;

export default FloatingLines;
