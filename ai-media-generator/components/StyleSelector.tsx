"use client";

import { StylePreset } from '@/types';

interface StyleSelectorProps {
  selectedStyle: string;
  onStyleChange: (styleId: string) => void;
}

const styles: StylePreset[] = [
  {
    id: 'realistic',
    name: 'Realistic',
    description: 'Photorealistic images',
    preview: '🖼️',
  },
  {
    id: 'artistic',
    name: 'Artistic',
    description: 'Painterly and artistic',
    preview: '🎨',
  },
  {
    id: 'cinematic',
    name: 'Cinematic',
    description: 'Movie-like quality',
    preview: '🎬',
  },
  {
    id: 'cartoon',
    name: 'Cartoon',
    description: 'Animated style',
    preview: '🎭',
  },
  {
    id: 'abstract',
    name: 'Abstract',
    description: 'Abstract art',
    preview: '🌈',
  },
  {
    id: 'minimalist',
    name: 'Minimalist',
    description: 'Clean and simple',
    preview: '⚪',
  },
];

export default function StyleSelector({ selectedStyle, onStyleChange }: StyleSelectorProps) {
  return (
    <div className="space-y-3">
      <label className="block text-sm font-semibold text-gray-900 dark:text-white">
        Style Preset
      </label>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        {styles.map((style) => (
          <button
            key={style.id}
            onClick={() => onStyleChange(style.id)}
            className={`p-4 rounded-xl border-2 transition-all duration-200 ${
              selectedStyle === style.id
                ? 'border-purple-500 bg-purple-50 dark:bg-purple-900/20 shadow-md'
                : 'border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 hover:border-purple-300 dark:hover:border-purple-700'
            }`}
          >
            <div className="text-3xl mb-2">{style.preview}</div>
            <div className="text-sm font-medium text-gray-900 dark:text-white">
              {style.name}
            </div>
            <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
              {style.description}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
