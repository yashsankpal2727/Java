"use client";

import { useState, useEffect } from 'react';
import MediaCard from '@/components/MediaCard';
import { GeneratedMedia, MediaType } from '@/types';

export default function GalleryPage() {
  const [media, setMedia] = useState<GeneratedMedia[]>([]);
  const [filter, setFilter] = useState<'all' | MediaType>('all');

  useEffect(() => {
    // Load from localStorage
    const stored = localStorage.getItem('generatedMedia');
    if (stored) {
      setMedia(JSON.parse(stored));
    }
  }, []);

  const filteredMedia = filter === 'all' 
    ? media 
    : media.filter(m => m.type === filter);

  const handleDownload = (mediaItem: GeneratedMedia) => {
    const link = document.createElement('a');
    link.href = mediaItem.url;
    link.download = `${mediaItem.type}-${mediaItem.id}.${mediaItem.type === 'image' ? 'png' : 'mp4'}`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleDelete = (id: string) => {
    const updated = media.filter(m => m.id !== id);
    setMedia(updated);
    localStorage.setItem('generatedMedia', JSON.stringify(updated));
  };

  const handleDownloadAll = () => {
    filteredMedia.forEach((mediaItem, index) => {
      setTimeout(() => {
        handleDownload(mediaItem);
      }, index * 500);
    });
  };

  const handleClearAll = () => {
    if (confirm('Are you sure you want to clear all media from the gallery?')) {
      setMedia([]);
      localStorage.removeItem('generatedMedia');
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
          Gallery
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          View and manage your generated media
        </p>
      </div>

      {/* Filters and Actions */}
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg mb-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div className="flex gap-2">
            <button
              onClick={() => setFilter('all')}
              className={`px-4 py-2 rounded-lg font-medium text-sm transition-all duration-200 ${
                filter === 'all'
                  ? 'bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300'
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
              }`}
            >
              All ({media.length})
            </button>
            <button
              onClick={() => setFilter('image')}
              className={`px-4 py-2 rounded-lg font-medium text-sm transition-all duration-200 ${
                filter === 'image'
                  ? 'bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300'
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
              }`}
            >
              Images ({media.filter(m => m.type === 'image').length})
            </button>
            <button
              onClick={() => setFilter('video')}
              className={`px-4 py-2 rounded-lg font-medium text-sm transition-all duration-200 ${
                filter === 'video'
                  ? 'bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300'
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
              }`}
            >
              Videos ({media.filter(m => m.type === 'video').length})
            </button>
          </div>

          <div className="flex gap-2">
            {filteredMedia.length > 0 && (
              <>
                <button
                  onClick={handleDownloadAll}
                  className="px-4 py-2 bg-gradient-to-r from-purple-600 to-blue-500 text-white rounded-lg font-medium hover:shadow-lg transition-all duration-200"
                >
                  Download All
                </button>
                <button
                  onClick={handleClearAll}
                  className="px-4 py-2 bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 rounded-lg font-medium hover:bg-red-200 dark:hover:bg-red-900/50 transition-colors duration-200"
                >
                  Clear All
                </button>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Gallery Grid */}
      {filteredMedia.length === 0 ? (
        <div className="bg-white dark:bg-gray-800 rounded-xl p-12 shadow-lg text-center">
          <div className="text-6xl mb-4">🎨</div>
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
            No media yet
          </h3>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Start creating amazing images and videos
          </p>
          <a
            href="/generate"
            className="inline-block px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-500 text-white rounded-lg font-medium hover:shadow-lg transition-all duration-200"
          >
            Generate Now
          </a>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredMedia.map((mediaItem) => (
            <MediaCard
              key={mediaItem.id}
              media={mediaItem}
              onDownload={handleDownload}
              onDelete={handleDelete}
            />
          ))}
        </div>
      )}
    </div>
  );
}
