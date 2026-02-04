import React from 'react'
import type { TextElement, FontConfig, Zone } from '../types'

interface TextEditorProps {
    element: TextElement
    onUpdate: (id: string, updates: Partial<Omit<TextElement, 'style'>>) => void
    onStyleUpdate: (id: string, styleUpdates: Partial<FontConfig>) => void
}

const ZONES: Zone[] = [
    'top-left', 'top-center', 'top-right',
    'middle-left', 'middle-center', 'middle-right',
    'bottom-left', 'bottom-center', 'bottom-right',
]

export const TextEditor: React.FC<TextEditorProps> = ({ element, onUpdate, onStyleUpdate }) => {
    return (
        <div className="p-4 border rounded bg-gray-50 mb-4 shadow-sm">
            {/* Content Input */}
            <div className="mb-3">
                <label className="block text-xs font-bold text-gray-700 mb-1">テキスト内容</label>
                <textarea
                    className="w-full p-2 border rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                    rows={2}
                    value={element.content}
                    onChange={(e) => onUpdate(element.id, { content: e.target.value })}
                />
            </div>
            {/* Grid Zone Selection */}
            <div className="mb-3">
                <label className="block text-xs font-bold text-gray-700 mb-1">配置ゾーン</label>
                <select
                    className="w-full p-2 border rounded text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-400"
                    value={element.zone}
                    onChange={(e) => onUpdate(element.id, { zone: e.target.value as Zone })}
                >
                    {ZONES.map((z) => (
                        <option key={z} value={z}>
                            {z}
                        </option>
                    ))}
                </select>
            </div>
            {/* Style Controls */}
            <div className="grid grid-cols-2 gap-2">
                <div>
                    <label className="block text-xs text-gray-600 mb-1">サイズ (px)</label>
                    <input
                        type="number"
                        className="w-full p-1 border rounded text-sm focus:outline-none focus:ring-1 focus:ring-blue-400"
                        value={element.style.size}
                        onChange={(e) => onStyleUpdate(element.id, { size: Number(e.target.value) })}
                    />
                </div>
                <div>
                    <label className="block text-xs text-gray-600 mb-1">文字色</label>
                    <input
                        type="color"
                        className="w-full h-8 p-0 border rounded cursor-pointer"
                        value={element.style.color}
                        onChange={(e) => onStyleUpdate(element.id, { color: e.target.value })}
                    />
                </div>
                <div>
                    <label className="block text-xs text-gray-600 mb-1">不透明度</label>
                    <input
                        type="range"
                        min="0"
                        max="1"
                        step="0.1"
                        className="w-full accent-blue-600"
                        value={element.style.opacity}
                        onChange={(e) => onStyleUpdate(element.id, { opacity: Number(e.target.value) })}
                    />
                </div>
            </div>
        </div>
    )
}