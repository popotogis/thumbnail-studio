import { useState, useCallback } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { DEFAULT_RESOLUTION } from '../types';
import type { ThumbnailState, TextElement, Zone, FontConfig, BackgroundConfig } from '../types';

const INITIAL_FONT_STYLE: FontConfig = {
    family: 'sans-serif',
    size: 32,
    color: '#333333',
    opacity: 1,
    weight: 'bold',
    lineHeight: 1.5,
    letterSpacing: 0,
};

const INITIAL_BACKGROUND: BackgroundConfig = {
    type: 'solid',
    solidColor: '#ffffff',
    gradient: {
        type: 'linear',
        angle: 135,
        stops: [
            { id: '1', color: '#ff9a9e', position: 0 },
            { id: '2', color: '#fad0c4', position: 100 },
        ],
        meshPoints: [],
    },
};


export const useThumbnail = () => {
    const [state, setState] = useState<ThumbnailState>({
        resolution: DEFAULT_RESOLUTION,
        background: INITIAL_BACKGROUND,
        elements: [],
    });

    // 背景色を更新する関数
    const updateBackground = useCallback((updates: Partial<BackgroundConfig>) => {
        setState((prev) => ({
            ...prev,
            background: { ...prev.background, ...updates },
        }));
    }, []);

    const updateGradient = useCallback((updates: Partial<BackgroundConfig['gradient']>) => {
        setState((prev) => ({
            ...prev,
            background: {
                ...prev.background,
                type: 'gradient',
                gradient: { ...prev.background.gradient, ...updates },
            },
        }));
    }, []);

    // テキスト要素を追加
    const addText = useCallback((zone: Zone = 'middle-center') => {
        setState((prev) => {
            // 要素数制限のチェック
            if (prev.elements.length >= 5) {
                alert('テキストは最大5つまでです');
                return prev;
            }

            // 同一ゾーン内の要素数をカウントして優先順位を決定
            const zoneCount = prev.elements.filter((e) => e.zone === zone).length;

            const newElement: TextElement = {
                id: uuidv4(),
                content: '新規テキスト',
                zone,
                priority: zoneCount,
                style: { ...INITIAL_FONT_STYLE },
            };

            return {
                ...prev,
                elements: [...prev.elements, newElement],
            };
        });
    }, []);

    // テキスト要素を削除
    const removeText = useCallback((id: string) => {
        setState((prev) => ({
            ...prev,
            elements: prev.elements.filter((e) => e.id !== id),
        }));
    }, []);

    // テキストの基本情報を更新 (content, zone, priority)
    const updateElement = useCallback((id: string, updates: Partial<Omit<TextElement, 'style'>>) => {
        setState((prev) => ({
            ...prev,
            elements: prev.elements.map((e) =>
                e.id === id ? { ...e, ...updates } : e
            ),
        }));
    }, []);

    // スタイルのみを更新 (styleプロパティのマージ)
    const updateStyle = useCallback((id: string, styleUpdates: Partial<FontConfig>) => {
        setState((prev) => ({
            ...prev,
            elements: prev.elements.map((e) =>
                e.id === id ? { ...e, style: { ...e.style, ...styleUpdates } } : e
            ),
        }));
    }, []);

    return {
        state,
        actions: {
            addText,
            removeText,
            updateElement,
            updateStyle,
            updateBackground,
            updateGradient,
        },
    };
};