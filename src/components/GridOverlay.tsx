import React from 'react'

export const GridOverlay: React.FC = () => {
    return (
        <div
            className="absolute inset-0 pointer-events-none z-10"
            data-ignore-export="true"
        >
            <div className="w-full h-full grid grid-cols-3 grid-rows-3">
                {Array.from({ length: 9 }).map((_, i) => (
                    <div
                        key={i}
                        className={`
                            border-gray-400 border-opacity-50 border-dashed
                            ${i % 3 !== 2 ? 'border-r' : ''}
                            ${i < 6 ? 'border-b' : ''}
                        `}
                    />
                ))}
            </div>
        </div>
    )
}