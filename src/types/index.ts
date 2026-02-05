// 画面上の配置ゾーン（3x3グリッド + 特殊エリアを想定）
export type Zone =
    | 'top-left' | 'top-center' | 'top-right'
    | 'middle-left' | 'middle-center' | 'middle-right'
    | 'bottom-left' | 'bottom-center' | 'bottom-right';

// フォントや見た目の設定
export interface FontConfig {
    family: string;
    size: number;
    color: string;
    opacity: number; // 0 ~ 1
    weight: 'normal' | 'bold' | '800'; // 必要に応じて拡張
    lineHeight: number;
    letterSpacing: number; // em単位
}

// 1つのテキスト要素
export interface TextElement {
    id: string; // UUIDなど
    content: string; // 表示する文字 
    zone: Zone;
    priority: number; // 同一ゾーンでの表示順序（小さいほど上）
    style: FontConfig;
}

export type GradientType = 'linear' | 'radial' | 'mesh';

export interface GradientStop {
    id: string;
    color: string;
    position: number;
}

export interface MeshPoint {
    id: string;
    x: number;
    y: number;
    color: string;
    radius: number;
}

export interface BackgroundConfig {
    type: 'solid' | 'gradient';
    solidColor: string;
    gradient: {
        type: GradientType;
        angle: number;
        stops: GradientStop[];
        meshPoints: MeshPoint[];
    };
}

// アプリケーション全体のステート
export interface ThumbnailState {
    resolution: { width: number; height: number }; // 1280 x 670
    background: BackgroundConfig;
    elements: TextElement[];
}

// 初期定数
export const DEFAULT_RESOLUTION = { width: 1280, height: 670 };