"use client";

import { GeneratedMedia } from '@/types';
import Image from 'next/image';

interface MediaCardProps {
  media: GeneratedMedia;
  onDownload: (media: GeneratedMedia) => void;
  onDelete?: (id: string) => void;
}

export default function MediaCard({ media, onDownload, onDelete }: MediaCardProps) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-200">
      <div className="relative aspect-square bg-gray-100 dark:bg-gray-900">
        {media.type === 'image' ? (
          <Image
            src={media.url}
            alt={media.prompt}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        ) : (
          <video
            src={media.url}
            className="w-full h-full object-cover"
            controls
            poster={media.thumbnail}
          />
        )}
      </div>
      
      <div className="p-4 space-y-3">
        <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
          {media.prompt}
        </p>
        
        <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-500">
          <span className="px-2 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 rounded-full font-medium">
            {media.style}
          </span>
          <span>{media.type === 'video' ? `${media.duration}s` : 'Image'}</span>
        </div>

        <div className="flex gap-2">
          <button
            onClick={() => onDownload(media)}
            className="flex-1 px-4 py-2 bg-gradient-to-r from-purple-600 to-blue-500 text-white rounded-lg font-medium hover:shadow-lg transition-all duration-200"
          >
            Download
          </button>
          {onDelete && (
            <button
              onClick={() => onDelete(media.id)}
              className="px-4 py-2 bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 rounded-lg font-medium hover:bg-red-200 dark:hover:bg-red-900/50 transition-colors duration-200"
            >
              Delete
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
