import React from 'react'
import { useThumbnail } from './hooks/useThumbnail'
import { ThumbnailCanvas } from './components/ThumbnailCanvas'
import { ControlPanel } from './components/ControlPanel'

function App() {
  const { state, actions } = useThumbnail()

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col p-8 font-sans text-gray-800">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Thumbnail Studio</h1>
        <p className="text-gray-600">note用サムネイル作成ツール</p>
      </header>

      <main className="flex flex-col lg:flex-row gap-8 items-start">
        {/* Left: Preview Area */}
        <div className="flex-1 bg-gray-200 p-8 rounded-x1 shadow-inner flex justify-center overflow-auto w-full">
          <div className="scale-50 origin-top-left lg:scale-75 xl:scale-90 transition-transform shadow-2xl">
            <ThumbnailCanvas state={state} />
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