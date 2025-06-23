import React from 'react';
import { Avatar, AvatarFallback } from './ui/avatar';
import LazyImage from './LazyImage';
import { cn } from '../lib/utils';

interface LazyAvatarProps {
  src?: string;
  alt: string;
  fallbackText: string;
  className?: string;
  threshold?: number;
  rootMargin?: string;
}

const LazyAvatar: React.FC<LazyAvatarProps> = ({
  src,
  alt,
  fallbackText,
  className,
  threshold = 0,
  rootMargin = '200px',
}) => {
  // Generate a fallback avatar URL using ui-avatars.com
  const generateFallbackUrl = (text: string) => {
    const cleanText = text.replace(/[^a-zA-Z0-9]/g, '+');
    return `https://ui-avatars.com/api/?name=${cleanText}&background=6366f1&color=ffffff&size=128`;
  };

  const fallbackUrl = generateFallbackUrl(fallbackText);

  return (
    <Avatar className={className}>
      <LazyImage
        src={src || fallbackUrl}
        alt={alt}
        className="w-full h-full"
        threshold={threshold}
        rootMargin={rootMargin}
        fallback={
          <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-500 text-white font-semibold">
            {fallbackText}
          </AvatarFallback>
        }
        onError={() => {
          console.warn(`Failed to load avatar: ${src || 'no src'}, fallback: ${fallbackUrl}`);
        }}
      />
    </Avatar>
  );
};

export default LazyAvatar;
