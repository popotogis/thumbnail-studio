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
                        width: `${point.radius * 2}px`, // 直径にする
                        height: `${point.radius * 2}px`,
                        backgroundColor: point.color,
                        filter: 'blur(80px)', // 好みで調整。大きくすると馴染む
                        transform: 'translate(-50%, -50%)',
                        borderRadius: '50%',
                        opacity: 0.8,
                    }}
                />
            ))}
        </div>
    );
};