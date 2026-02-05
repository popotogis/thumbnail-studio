import type { BackgroundConfig } from "../types"

export const getBackgroundStyle = (config: BackgroundConfig): React.CSSProperties => {
    if (config.type === 'solid') {
        return { backgroundColor: config.solidColor }
    }

    const { gradient } = config

    // Linear Gradient
    if (gradient.type === 'linear') {
        const stopsStr = gradient.stops
            .sort((a, b) => a.position - b.position)
            .map((s) => `${s.color} ${s.position}%`)
            .join(', ')
        return { backgroundImage: `linear-gradient(${gradient.angle}deg, ${stopsStr})` }
    }

    // Radial Gradient
    if (gradient.type === 'radial') {
        const stopsStr = gradient.stops
            .sort((a, b) => a.position - b.position)
            .map((s) => `${s.color} ${s.position}%`)
            .join(', ')
        return { backgroundImage: `radial-gradient(circle, ${stopsStr})` }
    }

    return { backgroundColor: '#ffffff' }
}