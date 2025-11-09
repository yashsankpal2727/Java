"use client";

import { useState } from 'react';
import StyleSelector from '@/components/StyleSelector';
import MediaCard from '@/components/MediaCard';
import { GeneratedMedia, MediaType } from '@/types';

export default function GeneratePage() {
  const [mediaType, setMediaType] = useState<MediaType>('image');
  const [prompt, setPrompt] = useState('');
  const [style, setStyle] = useState('realistic');
  const [duration, setDuration] = useState(5);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedMedia, setGeneratedMedia] = useState<GeneratedMedia[]>([]);
  const [isBatchMode, setIsBatchMode] = useState(false);
  const [batchPrompts, setBatchPrompts] = useState(['', '', '', '']);

  const handleGenerate = async () => {
    if (!prompt.trim()) return;

    setIsGenerating(true);
    try {
      const response = await fetch(`/api/generate-${mediaType}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt,
          style,
          duration: mediaType === 'video' ? duration : undefined,
        }),
      });

      const data = await response.json();
      setGeneratedMedia([data, ...generatedMedia]);
      setPrompt('');
    } catch (error) {
      console.error('Generation failed:', error);
      alert('Failed to generate media. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleBatchGenerate = async () => {
    const validPrompts = batchPrompts.filter(p => p.trim());
    if (validPrompts.length === 0) return;

    setIsGenerating(true);
    try {
      const response = await fetch('/api/batch-generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          items: validPrompts.map(p => ({
            prompt: p,
            type: mediaType,
            style,
            duration: mediaType === 'video' ? duration : undefined,
          })),
        }),
      });

      const data = await response.json();
      setGeneratedMedia([...data.results, ...generatedMedia]);
      setBatchPrompts(['', '', '', '']);
    } catch (error) {
      console.error('Batch generation failed:', error);
      alert('Failed to generate media. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleDownload = (media: GeneratedMedia) => {
    const link = document.createElement('a');
    link.href = media.url;
    link.download = `${media.type}-${media.id}.${media.type === 'image' ? 'png' : 'mp4'}`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
          Generate Media
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Transform your ideas into stunning visuals and videos
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Controls Panel */}
        <div className="lg:col-span-2 space-y-6">
          {/* Media Type Toggle */}
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
            <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-3">
              Media Type
            </label>
            <div className="flex gap-3">
              <button
                onClick={() => setMediaType('image')}
                className={`flex-1 px-6 py-3 rounded-lg font-medium transition-all duration-200 ${
                  mediaType === 'image'
                    ? 'bg-gradient-to-r from-purple-600 to-blue-500 text-white shadow-lg'
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                }`}
              >
                🖼️ Image
              </button>
              <button
                onClick={() => setMediaType('video')}
                className={`flex-1 px-6 py-3 rounded-lg font-medium transition-all duration-200 ${
                  mediaType === 'video'
                    ? 'bg-gradient-to-r from-purple-600 to-blue-500 text-white shadow-lg'
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                }`}
              >
                🎬 Video
              </button>
            </div>
          </div>

          {/* Batch Mode Toggle */}
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
            <div className="flex items-center justify-between mb-4">
              <label className="text-sm font-semibold text-gray-900 dark:text-white">
                Batch Generation
              </label>
              <button
                onClick={() => setIsBatchMode(!isBatchMode)}
                className={`px-4 py-2 rounded-lg font-medium text-sm transition-all duration-200 ${
                  isBatchMode
                    ? 'bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300'
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
                }`}
              >
                {isBatchMode ? 'Enabled' : 'Disabled'}
              </button>
            </div>

            {!isBatchMode ? (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Prompt
                  </label>
                  <textarea
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    placeholder="Describe what you want to create..."
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"
                    rows={4}
                  />
                  <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                    {prompt.length} / 500 characters
                  </div>
                </div>
              </div>
            ) : (
              <div className="space-y-3">
                {batchPrompts.map((p, index) => (
                  <div key={index}>
                    <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Prompt {index + 1}
                    </label>
                    <input
                      type="text"
                      value={p}
                      onChange={(e) => {
                        const newPrompts = [...batchPrompts];
                        newPrompts[index] = e.target.value;
                        setBatchPrompts(newPrompts);
                      }}
                      placeholder={`Describe item ${index + 1}...`}
                      className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Style Selector */}
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
            <StyleSelector selectedStyle={style} onStyleChange={setStyle} />
          </div>

          {/* Video Duration */}
          {mediaType === 'video' && (
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
              <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-3">
                Duration: {duration} seconds
              </label>
              <input
                type="range"
                min="3"
                max="10"
                value={duration}
                onChange={(e) => setDuration(Number(e.target.value))}
                className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer accent-purple-600"
              />
              <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-1">
                <span>3s</span>
                <span>10s</span>
              </div>
            </div>
          )}

          {/* Generate Button */}
          <button
            onClick={isBatchMode ? handleBatchGenerate : handleGenerate}
            disabled={isGenerating || (!isBatchMode && !prompt.trim()) || (isBatchMode && !batchPrompts.some(p => p.trim()))}
            className="w-full px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-500 text-white rounded-xl font-semibold text-lg hover:shadow-xl hover:scale-[1.02] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
          >
            {isGenerating ? (
              <span className="flex items-center justify-center gap-2">
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                Generating...
              </span>
            ) : (
              `Generate ${isBatchMode ? 'Batch' : mediaType === 'image' ? 'Image' : 'Video'}`
            )}
          </button>
        </div>

        {/* Preview Panel */}
        <div className="lg:col-span-1">
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg sticky top-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Recent Generations
            </h3>
            {generatedMedia.length === 0 ? (
              <div className="text-center py-12 text-gray-500 dark:text-gray-400">
                <div className="text-4xl mb-2">✨</div>
                <p className="text-sm">Your generated media will appear here</p>
              </div>
            ) : (
              <div className="space-y-4 max-h-[600px] overflow-y-auto">
                {generatedMedia.slice(0, 3).map((media) => (
                  <MediaCard
                    key={media.id}
                    media={media}
                    onDownload={handleDownload}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
