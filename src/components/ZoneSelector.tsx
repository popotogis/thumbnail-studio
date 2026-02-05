import React from 'react'
import type { Zone } from '../types'

interface ZoneSelectorProps {
    value: Zone
    onChange: (zone: Zone) => void
}

const ZONES: Zone[] = [
    'top-left', 'top-center', 'top-right',
    'middle-left', 'middle-center', 'middle-right',
    'bottom-left', 'bottom-center', 'bottom-right',
]

export const ZoneSelector: React.FC<ZoneSelectorProps> = ({ value, onChange }) => {
    return (
        <div className="grid grid-cols-3 gap-1 w-full max-w-[120px] aspect-square mx-auto">
            {ZONES.map((zone) => (
                <button
                    key={zone}
                    onClick={() => onChange(zone)}
                    className={`
                        border rounded-md transition-all
                        ${value === zone
                            ? 'bg-blue-500 border-blue-600 shadow-inner'
                            : 'bg-white border-gray-300 hover:bg-gray-50 hover:border-gray-400'
                        }
                    `}
                    aria-label={`Select ${zone} zone`}
                    title={zone}
                />
            ))}
        </div>
    )
}