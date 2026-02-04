import React from 'react'
import { useThumbnail } from './hooks/useThumbnail'
import { ThumbnailCanvas } from './components/ThumbnailCanvas'

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
          {/*
            実際は1280pxあるので、画面に収まるように縮小表示するロジックが必要ですが、
            一旦はそのまま、あるいはCSSで縮小させて表示確認します。
          */}
          <div className="scale-50 origin-top-left lg:scale-75 xl:scale-90 transition-transform">
            <ThumbnailCanvas state={state} />
          </div>
        </div>

        {/* Right: Control Panel (Temporary) */}
        <div className="w-full lg:w-96 bg-white p-6 rounded-xl shadow-xl">
          <h2 className="text-xl font-bold mb-4 border-b pb-2">Debug Controls</h2>

          <div className="space-y-4">
            <div className="p-4 bg-gray-50 rounded border">
              <h3 className="font-semibold mb-2">テキスト追加</h3>
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => actions.addText('top-left')}
                  className="px-3 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 text-sm"
                >
                  Top Left
                </button>
                <button
                  onClick={() => actions.addText('middle-center')}
                  className="px-3 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 text-sm"
                >
                  Center
                </button>
                <button
                  onClick={() => actions.addText('bottom-right')}
                  className="px-3 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 text-sm"
                >
                  Bottom Right
                </button>
              </div>
            </div>

            <div className="p-4 bg-gray-50 rounded border">
              <h3 className="font-semibold mb-2">現在の要素 ({state.elements.length}/5)</h3>
              <ul className='space-y-2'>
                {state.elements.map((el) => (
                  <li key={el.id} className="flex justify-between items-center text-sm bg-white p-2 rounded border">
                    <span>{el.content} ({el.zone})</span>
                    <button
                      onClick={() => actions.removeText(el.id)}
                      className="text-red-500 hover:text-red-700"
                    >
                      削除
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

export default App