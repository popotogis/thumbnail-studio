import React, { useRef, useState, useEffect } from 'react';
import type { BackgroundConfig, MeshPoint } from '../types';

interface MeshControlOverlayProps {
    config: BackgroundConfig;
    width: number;
    height: number;
    onUpdatePoint: (id: string, updates: Partial<MeshPoint>) => void;
}

export const MeshControlOverlay: React.FC<MeshControlOverlayProps> = ({ config, width, height, onUpdatePoint }) => {
    const [draggingId, setDraggingId] = useState<string | null>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    // Only render if it's a mesh gradient
    if (config.type !== 'gradient' || config.gradient.type !== 'mesh') return null;

    const handlePointerDown = (e: React.PointerEvent, id: string) => {
        e.stopPropagation();
        e.currentTarget.setPointerCapture(e.pointerId);
        setDraggingId(id);
    };

    const handlePointerMove = (e: React.PointerEvent) => {
        if (!draggingId || !containerRef.current) return;
        e.stopPropagation();

        const rect = containerRef.current.getBoundingClientRect();
        const x = Math.min(100, Math.max(0, ((e.clientX - rect.left) / rect.width) * 100));
        const y = Math.min(100, Math.max(0, ((e.clientY - rect.top) / rect.height) * 100));

        onUpdatePoint(draggingId, { x, y });
    };

    const handlePointerUp = (e: React.PointerEvent) => {
        if (draggingId) {
            e.stopPropagation();
            setDraggingId(null);
        }
    };

    return (
        <div
            ref={containerRef}
            className="absolute inset-0 z-50 cursor-crosshair"
            onPointerUp={handlePointerUp}
            onPointerLeave={handlePointerUp}
        >
            {config.gradient.meshPoints.map((point) => (
                <div
                    key={point.id}
                    onPointerDown={(e) => handlePointerDown(e, point.id)}
                    onPointerMove={handlePointerMove}
                    style={{
                        position: 'absolute',
                        left: `${point.x}%`,
                        top: `${point.y}%`,
                        transform: 'translate(-50%, -50%)',
                        width: '24px',
                        height: '24px',
                        backgroundColor: point.color,
                        border: '3px solid white',
                        borderRadius: '50%',
                        boxShadow: '0 2px 5px rgba(0,0,0,0.3)',
                        cursor: 'move',
                        zIndex: 60,
                    }}
                />
            ))}
        </div>
    );
};
