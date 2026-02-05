import React from 'react'
import type { TextElement, FontConfig, Zone } from '../types'
import { ZoneSelector } from './ZoneSelector'

interface TextEditorProps {
    element: TextElement
    onUpdate: (id: string, updates: Partial<Omit<TextElement, 'style'>>) => void
    onStyleUpdate: (id: string, styleUpdates: Partial<FontConfig>) => void
}

const FONT_FAMILIES = [
    { label: '標準（sans）', value: 'sans-serif' },
    { label: 'Noto Sans JP', value: '"Noto Sans JP", sans-serif' },
    { label: 'Noto Serif JP', value: '"Noto Serif JP", serif' },
    { label: 'Zen Maru Gothic', value: '"Zen Maru Gothic", sans-serif' },
    { label: 'Dela Gothic One', value: '"Dela Gothic One", cursive' },
]

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
                <ZoneSelector
                    value={element.zone}
                    onChange={(z) => onUpdate(element.id, { zone: z })}
                />
            </div>
            {/* Style Controls */}
            <div className="space-y-3">
                {/* 1. フォント & 太さ */}
                <div className="grid grid-cols-2 gap-2">
                    <div>
                        <label className="block text-xs text-gray-600 mb-1">フォント</label>
                        <select
                            className="w-full p-1 border rounded text-sm"
                            value={element.style.family}
                            onChange={(e) => onStyleUpdate(element.id, { family: e.target.value })}
                        >
                            {FONT_FAMILIES.map((f) => (
                                <option key={f.value} value={f.value}>{f.label}</option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label className="block text-xs text-gray-600 mb-1">太さ</label>
                        <select
                            className="w-full p-1 border rounded text-sm"
                            value={element.style.weight}
                            onChange={(e) => onStyleUpdate(element.id, { weight: e.target.value as any })}
                        >
                            <option value="normal">普通</option>
                            <option value="bold">太字</option>
                            <option value="800">極太</option>
                        </select>
                    </div>
                </div>
                {/* 2. サイズ & 色 & 透明度 (既存機能の並び替え) */}
                <div className="grid grid-cols-3 gap-2">
                    <div>
                        <label className="block text-xs text-gray-600 mb-1">サイズ</label>
                        <input
                            type="number"
                            className="w-full p-1 border rounded text-sm"
                            value={element.style.size}
                            onChange={(e) => onStyleUpdate(element.id, { size: Number(e.target.value) })}
                        />
                    </div>
                    <div>
                        <label className="block text-xs text-gray-600 mb-1">色</label>
                        <input
                            type="color"
                            className="w-full h-8 p-0 border rounded cursor-pointer"
                            value={element.style.color}
                            onChange={(e) => onStyleUpdate(element.id, { color: e.target.value })}
                        />
                    </div>
                    <div>
                        <label className="block text-xs text-gray-600 mb-1">透明度</label>
                        <input
                            type="number"
                            min="0" max="1" step="0.1"
                            className="w-full p-1 border rounded text-sm"
                            value={element.style.opacity}
                            onChange={(e) => onStyleUpdate(element.id, { opacity: Number(e.target.value) })}
                        />
                    </div>
                </div>
                {/* 3. 行間 & 文字間隔 (新規) */}
                <div className="grid grid-cols-2 gap-2">
                    <div>
                        <label className="block text-xs text-gray-600 mb-1">行間 (em)</label>
                        <input
                            type="number"
                            step="0.1"
                            className="w-full p-1 border rounded text-sm"
                            value={element.style.lineHeight}
                            onChange={(e) => onStyleUpdate(element.id, { lineHeight: Number(e.target.value) })}
                        />
                    </div>
                    <div>
                        <label className="block text-xs text-gray-600 mb-1">文字間隔 (em)</label>
                        <input
                            type="number"
                            step="0.05"
                            className="w-full p-1 border rounded text-sm"
                            value={element.style.letterSpacing}
                            onChange={(e) => onStyleUpdate(element.id, { letterSpacing: Number(e.target.value) })}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}