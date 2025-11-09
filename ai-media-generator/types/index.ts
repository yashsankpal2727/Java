export type MediaType = 'image' | 'video';

export type StylePreset = {
  id: string;
  name: string;
  description: string;
  preview: string;
};

export type UseCase = {
  id: string;
  name: string;
  description: string;
  icon: string;
};

export type GeneratedMedia = {
  id: string;
  type: MediaType;
  prompt: string;
  style: string;
  url: string;
  thumbnail?: string;
  createdAt: Date;
  duration?: number;
};

export type GenerationRequest = {
  prompt: string;
  type: MediaType;
  style: string;
  duration?: number;
};

export type BatchGenerationRequest = {
  items: GenerationRequest[];
};
