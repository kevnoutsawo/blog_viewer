import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import BlogPostCard from './BlogPostCard';
import { SkeletonCard } from './ui/skeleton';
import type { BlogPost } from '../types/blog';

interface LazyBlogPostCardProps {
  post: BlogPost & { body?: string; userId?: string | number };
  index?: number;
  threshold?: number;
  rootMargin?: string;
}

const LazyBlogPostCard: React.FC<LazyBlogPostCardProps> = ({
  post,
  index = 0,
  threshold = 0.1,
  rootMargin = '100px',
}) => {
  const [isInView, setIsInView] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    const currentCard = cardRef.current;
    if (!currentCard) return;

    // Create intersection observer
    observerRef.current = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting) {
          setIsInView(true);
          // Disconnect observer once card is in view
          observerRef.current?.disconnect();
        }
      },
      {
        threshold,
        rootMargin,
      }
    );

    // Start observing
    observerRef.current.observe(currentCard);

    // Cleanup
    return () => {
      observerRef.current?.disconnect();
    };
  }, [threshold, rootMargin]);

  return (
    <div ref={cardRef} className="min-h-[300px]">
      {isInView ? (
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.5,
            delay: index * 0.05,
            ease: [0.25, 0.46, 0.45, 0.94]
          }}
        >
          <BlogPostCard post={post} index={index} />
        </motion.div>
      ) : (
        // Skeleton placeholder while not in view
        <motion.div
          className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg border border-slate-200/50 dark:border-slate-700/50 overflow-hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          {/* Skeleton header */}
          <div className="h-32 bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-700 dark:to-slate-600 animate-shimmer" />

          {/* Skeleton content */}
          <SkeletonCard />
        </motion.div>
      )}
    </div>
  );
};

export default LazyBlogPostCard;
