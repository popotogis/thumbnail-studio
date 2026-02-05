import { TextEditor } from './TextEditor'
import type { ThumbnailState, Zone, TextElement, FontConfig } from '../types'

interface ControlPanelProps {
    state: ThumbnailState
    // Actions
    onAdd: (zone: Zone) => void
    onRemove: (id: string) => void
    onUpdate: (id: string, updates: Partial<Omit<TextElement, 'style'>>) => void
    onStyleUpdate: (id: string, styleUpdates: Partial<FontConfig>) => void
}

export const ControlPanel: React.FC<ControlPanelProps> = ({
    state,
    onAdd,
    onRemove,
    onUpdate,
    onStyleUpdate,
}) => {
    return (
        <div className="bg-white p-6 rounded-xl shadow-xl h-full overflow-y-auto w-full lg:w-96">
            <h2 className="text-xl font-bold mb-6 border-b pb-2 text-gray-800">編集パネル</h2>
            {/* Add Button Area */}
            <div className="mb-8">
                <h3 className="font-semibold mb-3 text-xs text-gray-500 uppercase tracking-wider">
                    アクション
                </h3>
                <button
                    onClick={() => onAdd('middle-center')}
                    className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 font-bold transition-colors shadow-md flex items-center justify-center"
                >
                    <span className="mr-2 text-xl">+</span> テキストを追加
                </button>
            </div>
            {/* Elements List */}
            <div>
                <div className="flex justify-between items-end mb-3">
                    <h3 className="font-semibold text-xs text-gray-500 uppercase tracking-wider">
                        レイヤー ({state.elements.length}/5)
                    </h3>
                </div>
                {state.elements.length === 0 && (
                    <div className="text-gray-400 text-sm text-center py-12 border-2 border-dashed border-gray-200 rounded-lg">
                        要素がありません。<br />
                        まずは「テキストを追加」してください。
                    </div>
                )}
                <div className="space-y-6">
                    {state.elements.map((el) => (
                        <div key={el.id} className="relative group animate-fade-in">
                            {/* Header with Delete Button */}
                            <div className="flex justify-between items-center mb-1 px-1">
                                <span className="text-xs font-bold text-gray-400 font-mono">
                                    #{el.priority + 1}
                                </span>
                                <button
                                    onClick={() => onRemove(el.id)}
                                    className="text-xs text-red-500 hover:text-red-700 hover:underline transition-colors"
                                >
                                    削除
                                </button>
                            </div>
                            <TextEditor
                                element={el}
                                onUpdate={onUpdate}
                                onStyleUpdate={onStyleUpdate}
                            />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}