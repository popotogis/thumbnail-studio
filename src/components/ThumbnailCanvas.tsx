import { forwardRef } from 'react'
import type { ThumbnailState, Zone, MeshPoint } from '../types'
import { getBackgroundStyle } from '../utils/styleHelpers'
import { MeshGradientRenderer } from './MeshGradientRenderer'
import { GridOverlay } from './GridOverlay'
import { MeshControlOverlay } from './MeshControlOverlay'

interface ThumbnailCanvasProps {
    state: ThumbnailState
    scale?: number
    showGrid?: boolean
    isBackgroundEditMode?: boolean
    onUpdateMeshPoint?: (id: string, updates: Partial<MeshPoint>) => void
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

// forwardRef でラップして、親からDOMを参照できるようにする
export const ThumbnailCanvas = forwardRef<HTMLDivElement, ThumbnailCanvasProps>(
    ({ state, scale = 1, showGrid = false, isBackgroundEditMode = false, onUpdateMeshPoint }, ref) => {
        const { resolution, background, elements } = state

        const backgroundStyle = getBackgroundStyle(background)

        return (
            <div
                ref={ref}
                className="overflow-hidden relative"
                style={{
                    width: resolution.width,
                    height: resolution.height,
                    ...backgroundStyle,
                    transform: `scale(${scale})`,
                    transformOrigin: 'top left',
                }}
            >

                <MeshGradientRenderer config={background} width={resolution.width} height={resolution.height} />

                {isBackgroundEditMode && onUpdateMeshPoint && (
                    <MeshControlOverlay
                        config={background}
                        onUpdatePoint={onUpdateMeshPoint}
                    />
                )}

                <div className={`relative z-10 w-full h-full ${isBackgroundEditMode ? 'pointer-events-none opacity-50' : ''}`}>
                    {showGrid && <GridOverlay />}
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
                                                whiteSpace: 'pre',
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
            </div>
        )
    },
)

ThumbnailCanvas.displayName = 'ThumbnailCanvas'