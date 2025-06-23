import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { cn } from '../lib/utils';

interface LazyImageProps {
  src?: string;
  alt: string;
  className?: string;
  fallback?: React.ReactNode;
  placeholder?: string;
  onLoad?: () => void;
  onError?: () => void;
  threshold?: number;
  rootMargin?: string;
}

const LazyImage: React.FC<LazyImageProps> = ({
  src,
  alt,
  className,
  fallback,
  placeholder,
  onLoad,
  onError,
  threshold = 0.1,
  rootMargin = '50px',
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const hasObserved = useRef(false);

  useEffect(() => {
    const currentContainer = containerRef.current;
    if (!currentContainer || !src) {
      setIsInView(true); // Show immediately if no src
      return;
    }

    // If we've already observed this element, don't observe again
    if (hasObserved.current) {
      setIsInView(true);
      return;
    }

    // Check if Intersection Observer is supported
    if (!window.IntersectionObserver) {
      setIsInView(true); // Fallback for older browsers
      return;
    }

    // Create intersection observer
    observerRef.current = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting) {
          hasObserved.current = true;
          setIsInView(true);
          setIsLoading(true);

          // Set a timeout to show fallback if image takes too long
          timeoutRef.current = setTimeout(() => {
            if (!isLoaded) {
              console.warn('Image loading timeout, showing fallback');
              setHasError(true);
              setIsLoading(false);
            }
          }, 3000); // 3 second timeout

          // Disconnect observer once image is in view
          observerRef.current?.disconnect();
        }
      },
      {
        threshold: Math.max(0, Math.min(1, threshold)), // Ensure threshold is between 0 and 1
        rootMargin,
      }
    );

    // Start observing the container
    observerRef.current.observe(currentContainer);

    // Cleanup
    return () => {
      observerRef.current?.disconnect();
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [src, threshold, rootMargin, isLoaded]);

  const handleLoad = () => {
    setIsLoaded(true);
    setIsLoading(false);
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    onLoad?.();
  };

  const handleError = () => {
    setHasError(true);
    setIsLoading(false);
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    onError?.();
  };

  // If no src provided or error occurred, show fallback
  if (!src || hasError) {
    return (
      <div className={cn("flex items-center justify-center bg-slate-100 dark:bg-slate-800", className)}>
        {fallback || (
          <div className="text-slate-400 dark:text-slate-600 text-xs">
            No image
          </div>
        )}
      </div>
    );
  }

  return (
    <div ref={containerRef} className={cn("relative overflow-hidden", className)}>
      {/* Placeholder while loading */}
      {!isLoaded && (
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-800 dark:to-slate-700"
          initial={{ opacity: 1 }}
          animate={{ opacity: isInView ? 0.7 : 1 }}
          transition={{ duration: 0.3 }}
        >
          {placeholder ? (
            <img
              src={placeholder}
              alt=""
              className="w-full h-full object-cover opacity-50"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <motion.div
                className="w-6 h-6 border-2 border-slate-300 dark:border-slate-600 border-t-slate-500 dark:border-t-slate-400 rounded-full"
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              />
            </div>
          )}
        </motion.div>
      )}

      {/* Actual image - only load when in view */}
      {isInView && (
        <motion.img
          src={src}
          alt={alt}
          className={cn("w-full h-full object-cover")}
          onLoad={handleLoad}
          onError={handleError}
          initial={{ opacity: 0 }}
          animate={{ opacity: isLoaded ? 1 : 0 }}
          transition={{ duration: 0.3 }}
        />
      )}
    </div>
  );
};

export default LazyImage;
