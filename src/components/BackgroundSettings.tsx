import React from 'react'
import { v4 as uuidv4 } from 'uuid'
import type { ThumbnailState, GradientType, MeshPoint } from '../types'

interface BackgroundSettingsProps {
    state: ThumbnailState
    onUpdate: (updates: any) => void
    onGradientUpdate: (updates: any) => void
    isEditMode?: boolean
    onToggleEditMode?: (v: boolean) => void
    onRandomize?: () => void
}

export const BackgroundSettings: React.FC<BackgroundSettingsProps> = ({
    state,
    onUpdate,
    onGradientUpdate,
    isEditMode = false,
    onToggleEditMode,
    onRandomize
}) => {
    const { background } = state

    const handleAddMeshPoint = () => {
        const newPoint: MeshPoint = {
            id: uuidv4(),
            x: 50,
            y: 50,
            color: '#0000ff',
            radius: 150,
        }
        onGradientUpdate({
            meshPoints: [...background.gradient.meshPoints, newPoint],
        })
    }

    const updateMeshPoint = (id: string, updates: Partial<MeshPoint>) => {
        const newPoints = background.gradient.meshPoints.map(p =>
            p.id === id ? { ...p, ...updates } : p
        )
        onGradientUpdate({ meshPoints: newPoints })
    }

    const removeMeshPoint = (id: string) => {
        const newPoints = background.gradient.meshPoints.filter(p => p.id !== id);
        onGradientUpdate({ meshPoints: newPoints });
    };

    return (
        <div>
            <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">背景タイプ</label>
                <div className="flex space-x-2">
                    {['solid', 'gradient'].map(type => (
                        <button
                            key={type}
                            onClick={() => onUpdate({ type: type as any })}
                            className={`px-3 py-1 rounded border ${background.type === type ? 'bg-blue-600 text-white' : 'bg-gray-100'}`}
                        >
                            {type === 'solid' ? '単色' : 'グラデ'}
                        </button>
                    ))}
                </div>
            </div>
            {background.type === 'solid' && (
                <div>
                    <input
                        type="color"
                        value={background.solidColor}
                        onChange={(e) => onUpdate({ solidColor: e.target.value })}
                    />
                </div>
            )}
            {background.type === 'gradient' && (
                <div>
                    <div className="mb-4">
                        <label className="block text-xs text-gray-500 mb-1">グラデーションタイプ</label>
                        <select
                            value={background.gradient.type}
                            onChange={(e) => onGradientUpdate({ type: e.target.value as GradientType })}
                            className="w-full p-2 border rounded"
                        >
                            <option value="linear">Linear</option>
                            <option value="radial">Radial</option>
                            <option value="mesh">Mesh (ふんわり)</option>
                        </select>
                    </div>
                    {/* Mesh Gradient Settings */}
                    {background.gradient.type === 'mesh' && (
                        <div>
                            <div className="flex space-x-2 mb-3">
                                {onToggleEditMode && (
                                    <button
                                        onClick={() => onToggleEditMode(!isEditMode)}
                                        className={`flex-1 text-xs py-1 rounded border ${isEditMode ? 'bg-green-600 text-white border-green-700' : 'bg-white text-gray-700 hover:bg-gray-50'}`}
                                    >
                                        {isEditMode ? '調整終了' : 'キャンバスで調整'}
                                    </button>
                                )}
                                {onRandomize && (
                                    <button
                                        onClick={onRandomize}
                                        className="text-xs bg-purple-50 text-purple-700 border border-purple-200 px-3 py-1 rounded hover:bg-purple-100 transition-colors"
                                    >
                                        ランダム配置
                                    </button>
                                )}
                            </div>

                            <button onClick={handleAddMeshPoint} className="text-sm bg-gray-200 px-2 py-1 rounded mb-2 hover:bg-gray-300 transition-colors">+ ポイント追加</button>
                            <div className="space-y-3">
                                {background.gradient.meshPoints.map(point => (
                                    <div key={point.id} className="border p-3 rounded bg-gray-50">
                                        <div className="flex items-center space-x-2 mb-2">
                                            <input
                                                type="color"
                                                value={point.color}
                                                onChange={(e) => updateMeshPoint(point.id, { color: e.target.value })}
                                                className="w-8 h-8 p-0 border-0 rounded cursor-pointer"
                                            />
                                            <button onClick={() => removeMeshPoint(point.id)} className="text-xs text-red-500 hover:text-red-700 ml-auto bg-white px-2 py-1 border rounded">削除</button>
                                        </div>
                                        <div className="grid grid-cols-2 gap-2 text-xs">
                                            <div className="flex flex-col">
                                                <span className="text-gray-500 mb-1">X位置 (%)</span>
                                                <input
                                                    type="number"
                                                    value={point.x}
                                                    onChange={(e) => updateMeshPoint(point.id, { x: Number(e.target.value) })}
                                                    className="p-1 border rounded"
                                                    min={0} max={100}
                                                />
                                            </div>
                                            <div className="flex flex-col">
                                                <span className="text-gray-500 mb-1">Y位置 (%)</span>
                                                <input
                                                    type="number"
                                                    value={point.y}
                                                    onChange={(e) => updateMeshPoint(point.id, { y: Number(e.target.value) })}
                                                    className="p-1 border rounded"
                                                    min={0} max={100}
                                                />
                                            </div>
                                            <div className="flex flex-col col-span-2">
                                                <span className="text-gray-500 mb-1">半径 (px)</span>
                                                <input
                                                    type="range"
                                                    value={point.radius}
                                                    onChange={(e) => updateMeshPoint(point.id, { radius: Number(e.target.value) })}
                                                    min={10} max={500}
                                                    className="w-full"
                                                />
                                                <div className="flex justify-between text-[10px] text-gray-400">
                                                    <span>10px</span>
                                                    <span>{point.radius}px</span>
                                                    <span>500px</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <p className="text-xs text-gray-400 mt-2">※位置はプレビューで確認してください</p>
                        </div>
                    )}

                    {/* Linear/Radial Gradient Settings */}
                    {(background.gradient.type === 'linear' || background.gradient.type === 'radial') && (
                        <div>
                            {background.gradient.type === 'linear' && (
                                <div className="mb-4">
                                    <label className="block text-xs text-gray-500 mb-1">角度 ({background.gradient.angle}°)</label>
                                    <input
                                        type="range"
                                        min="0" max="360"
                                        value={background.gradient.angle}
                                        onChange={(e) => onGradientUpdate({ angle: Number(e.target.value) })}
                                        className="w-full"
                                    />
                                </div>
                            )}

                            <div>
                                <div className="flex justify-between items-center mb-2">
                                    <span className="text-xs text-gray-500">色設定</span>
                                    <button
                                        onClick={() => {
                                            const newStop = { id: uuidv4(), color: '#ffffff', position: 100 };
                                            onGradientUpdate({ stops: [...background.gradient.stops, newStop] });
                                        }}
                                        className="text-xs bg-blue-50 text-blue-600 px-2 py-1 rounded hover:bg-blue-100 transition-colors"
                                    >
                                        + 追加
                                    </button>
                                </div>
                                <div className="space-y-2">
                                    {background.gradient.stops.map((stop) => (
                                        <div key={stop.id} className="flex items-center space-x-2 border p-2 rounded bg-gray-50">
                                            <input
                                                type="color"
                                                value={stop.color}
                                                onChange={(e) => {
                                                    const newStops = background.gradient.stops.map(s => s.id === stop.id ? { ...s, color: e.target.value } : s);
                                                    onGradientUpdate({ stops: newStops });
                                                }}
                                                className="w-6 h-6 p-0 border-0 rounded cursor-pointer"
                                            />

                                            <div className="flex-1 flex flex-col">
                                                <input
                                                    type="range"
                                                    min="0" max="100"
                                                    value={stop.position}
                                                    onChange={(e) => {
                                                        const newStops = background.gradient.stops.map(s => s.id === stop.id ? { ...s, position: Number(e.target.value) } : s);
                                                        onGradientUpdate({ stops: newStops });
                                                    }}
                                                    className="w-full h-1 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                                                />
                                                <span className="text-[10px] text-right text-gray-500">{stop.position}%</span>
                                            </div>

                                            {background.gradient.stops.length > 2 && (
                                                <button
                                                    onClick={() => {
                                                        const newStops = background.gradient.stops.filter(s => s.id !== stop.id);
                                                        onGradientUpdate({ stops: newStops });
                                                    }}
                                                    className="text-gray-400 hover:text-red-500 px-1"
                                                >
                                                    ×
                                                </button>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};
