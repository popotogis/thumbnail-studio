import React from 'react'
import type { ThumbnailState, Zone } from '../types'

interface ThumbnailCanvasProps {
    state: ThumbnailState
    scale?: number // プレビュー用の縮小率
}

// ゾーンごとのFlex配置設定
const ZONE_STYLES: Record<Zone, string> = {
    'top-left': 'justify-start items-start',
    'top-center': 'justify-start items-center',
    'top-right': 'justify-start items-end',
    'middle-left': 'justify-center items-start',
    'middle-center': 'justify-center items-center',
    'middle-right': 'justify-center items-end',
    'bottom-left': 'justify-end items-start',
    'bottom-center': 'justify-end items-center',
    'bottom-right': 'justify-end items-end',
}

export const ThumbnailCanvas: React.FC<ThumbnailCanvasProps> = ({ state, scale = 1 }) => {
    const { resolution, backgroundColor, elements } = state

    return (
        <div
            className="overflow-hidden shadow-lg"
            style={{
                width: resolution.width,
                height: resolution.height,
                backgroundColor: backgroundColor,
                transform: `scale(${scale})`,
                transformOrigin: 'top left',
            }}
        >
            {/* 3x3 Grid Layout */}
            <div className="grid grid-cols-3 grid-rows-3 w-full h-full">
                {(Object.keys(ZONE_STYLES) as Zone[]).map((zone) => {
                    // そのゾーンにある要素を抽出し、優先順位でソート
                    const zoneElements = elements
                        .filter((e) => e.zone === zone)
                        .sort((a, b) => a.priority - b.priority)

                    return (
                        <div key={zone} className={`flex flex-col p-4 ${ZONE_STYLES[zone]}`}>
                            {zoneElements.map((element) => (
                                <div
                                    key={element.id}
                                    style={{
                                        fontFamily: element.style.family,
                                        fontSize: element.style.size,
                                        color: element.style.color,
                                        opacity: element.style.opacity,
                                        fontWeight: element.style.weight,
                                        lineHeight: element.style.lineHeight,
                                        letterSpacing: `${element.style.letterSpacing}em`,
                                        marginBottom: '0.5rem', // 要素間のGap (仮)
                                    }}
                                >
                                    {element.content}
                                </div>
                            ))}
                        </div>
                    )
                })}
            </div>
        </div>
    )
}