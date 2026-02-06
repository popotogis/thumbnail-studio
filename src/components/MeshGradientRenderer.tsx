import React from 'react';
import type { BackgroundConfig } from '../types';

interface MeshGradientRendererProps {
    config: BackgroundConfig;
    width: number;
    height: number;
}

export const MeshGradientRenderer: React.FC<MeshGradientRendererProps> = ({ config, width, height }) => {
    if (config.type !== 'gradient' || config.gradient.type !== 'mesh') return null;

    return (
        <div
            className="absolute inset-0 overflow-hidden"
            style={{ width, height, pointerEvents: 'none' }} // 背景なのでイベントを透過
        >
            {config.gradient.meshPoints.map((point) => (
                <div
                    key={point.id}
                    style={{
                        position: 'absolute',
                        left: `${point.x}%`,
                        top: `${point.y}%`,
                        width: `${point.radius * 4}px`, // blurの広がりを考慮して大きめにする
                        height: `${point.radius * 4}px`,
                        background: `radial-gradient(circle, ${point.color} 0%, transparent 70%)`,
                        transform: 'translate(-50%, -50%)',
                        pointerEvents: 'none',
                        willChange: 'transform', // パフォーマンス向上のヒント
                        opacity: 0.8,
                    }}
                />
            ))}
        </div>
    );
};