import { useRef, useState, useEffect } from 'react'
import { toPng } from 'html-to-image'
import { useThumbnail } from './hooks/useThumbnail'
import { ThumbnailCanvas } from './components/ThumbnailCanvas'
import { ControlPanel } from './components/ControlPanel'

function App() {
  const { state, actions } = useThumbnail()
  const canvasRef = useRef<HTMLDivElement>(null)

  const [scale, setScale] = useState(1)
  const previewContainerRef = useRef<HTMLDivElement>(null)
  const [showGrid, setShowGrid] = useState(true)
  const [isBackgroundEditMode, setIsBackgroundEditMode] = useState(false)

  useEffect(() => {
    if (!previewContainerRef.current) return

    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const containerWidth = entry.contentRect.width
        // キャンパス幅 1280px に対して、コンテナ幅に収まる倍率を計算
        const newScale = Math.min(containerWidth / 1280, 1)
        setScale(newScale)
      }
    })

    observer.observe(previewContainerRef.current)
    return () => observer.disconnect()
  }, [])

  const handleExport = async () => {
    if (!canvasRef.current) return

    try {
      // html-to-image でキャプチャ
      const dataUrl = await toPng(canvasRef.current, {
        cacheBust: true,
        width: 1280,
        height: 670,
        pixelRatio: 1,
        style: {
          transform: 'scale(1)',
          transformOrigin: 'top left',
          width: '1280px',
          height: '670px',
        },
        filter: (node) => {
          if (node instanceof HTMLElement && node.getAttribute('data-ignore-export')) {
            return false
          }
          return true
        },
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
    <div className="min-h-screen bg-gray-100 flex flex-col px-4 pb-4 pt-14 lg:p-8 font-sans text-gray-800">
      <header className="mb-4 lg:mb-8 flex justify-between items-center">
        <div>
          <h1 className="text-xl lg:text-3xl font-bold text-gray-900">Thumbnail Studio</h1>
          <p className="text-gray-600">note用サムネイル作成ツール</p>
        </div>
        <button
          onClick={handleExport}
          className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-6 rounded shadow transition-colors flex items-center cursor-pointer"
        >
          <span className="mr-2">↓</span> 画像を書き出し
        </button>
      </header>

      <main className="flex flex-col lg:flex-row gap-8 items-start lg:h-[calc(100vh-100px)]">
        {/* Left: Preview Area */}
        <div
          ref={previewContainerRef}
          className="flex-1 bg-gray-200 p-4 lg:p-8 rounded-xl shadow-inner flex justify-center items-center overflow-hidden w-full aspect-[1280/670] lg:aspect-auto lg:h-auto"
        >
          {/* ラッパーでサイズを確保 */}
          <div style={{ width: 1280 * scale, height: 670 * scale, transition: 'width 0.2s, height 0.2s' }}>
            <ThumbnailCanvas
              ref={canvasRef}
              state={state}
              scale={scale} // 計算したscaleを渡す
              showGrid={showGrid}
              isBackgroundEditMode={isBackgroundEditMode}
              onUpdateMeshPoint={(id, updates) => {
                const newPoints = state.background.gradient.meshPoints.map(p =>
                  p.id === id ? { ...p, ...updates } : p
                );
                actions.updateGradient({ meshPoints: newPoints });
              }}
            />
          </div>
        </div>

        {/* Right: Control Panel */}
        <ControlPanel
          state={state}
          onAdd={actions.addText}
          onRemove={actions.removeText}
          onUpdate={actions.updateElement}
          onStyleUpdate={actions.updateStyle}
          onUpdateBackground={actions.updateBackground}
          onUpdateGradient={actions.updateGradient}
          showGrid={showGrid}
          onToggleGrid={setShowGrid}
          isBackgroundEditMode={isBackgroundEditMode}
          onToggleBackgroundEditMode={setIsBackgroundEditMode}
          onRandomizeMeshPoints={actions.randomizeMeshPoints}
        />
      </main>
    </div>
  )
}

export default App