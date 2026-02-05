import React, { useRef } from 'react'
import { toPng } from 'html-to-image'
import { useThumbnail } from './hooks/useThumbnail'
import { ThumbnailCanvas } from './components/ThumbnailCanvas'
import { ControlPanel } from './components/ControlPanel'

function App() {
  const { state, actions } = useThumbnail()
  const canvasRef = useRef<HTMLDivElement>(null)

  const handleExport = async () => {
    if (!canvasRef.current) return

    try {
      // html-to-image でキャプチャ
      const dataUrl = await toPng(canvasRef.current, {
        cacheBust: true,
      })

      // ダウンロードリンクを作成してクリック
      const link = document.createElement('a')
      link.href = dataUrl
      link.download = 'thumbnail.png'
      link.click()
    } catch (error) {
      console.error('Export failed:', error)
      alert('画像の書き出しに失敗しました。')
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col p-8 font-sans text-gray-800">
      <header className="mb-8 flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Thumbnail Studio</h1>
          <p className="text-gray-600">note用サムネイル作成ツール</p>
        </div>
        <button
          onClick={handleExport}
          className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-6 rounded shadow transition-colors flex items-center cursor-pointer"
        >
          <span className="mr-2">↓</span> 画像を書き出し
        </button>
      </header>

      <main className="flex flex-col lg:flex-row gap-8 items-start">
        {/* Left: Preview Area */}
        <div className="flex-1 bg-gray-200 p-8 rounded-x1 shadow-inner flex justify-center overflow-auto w-full">
          <div className="scale-50 origin-top-left lg:scale-75 xl:scale-90 transition-transform shadow-2xl">
            <ThumbnailCanvas ref={canvasRef} state={state} />
          </div>
        </div>

        {/* Right: Control Panel */}
        <ControlPanel
          state={state}
          onAdd={actions.addText}
          onRemove={actions.removeText}
          onUpdate={actions.updateElement}
          onStyleUpdate={actions.updateStyle}
        />
      </main>
    </div>
  )
}

export default App