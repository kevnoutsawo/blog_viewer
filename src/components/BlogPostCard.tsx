import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Heart, Clock, Calendar } from 'lucide-react';
import NumberFlow, { continuous } from '@number-flow/react';
import type { BlogPost } from '../types/blog';
import { useLikedPosts } from '../hooks/useLikedPosts';
import LazyAvatar from './LazyAvatar';
import { cn } from '../lib/utils';

interface BlogPostCardProps {
  post: BlogPost & { body?: string; userId?: string | number };
  index?: number;
}

const BlogPostCard: React.FC<BlogPostCardProps> = ({ post, index = 0 }) => {
  const { isPostLiked, toggleLike, getLikeCount } = useLikedPosts();
  const isLiked = isPostLiked(post.id);

  // Calculate reading time (assuming 200 words per minute)
  const wordCount = (post.body || post.content || '').split(' ').length;
  const readingTime = Math.max(1, Math.ceil(wordCount / 200));

  // Get like count with localStorage persistence
  const originalLikeCount = post.likes || 0;
  const likeCount = getLikeCount(post.id, originalLikeCount);

  // Author info
  const authorName = post.author?.name || 'Anonymous';
  const authorInitials = authorName.split(' ').map(n => n[0]).join('').toUpperCase();

  // Format date
  const formatDate = (dateString: string) => {
    try {
      return new Date(dateString).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric'
      });
    } catch {
      return 'Recent';
    }
  };

  // Truncate content for preview
  const truncateContent = (content: string, maxLength: number = 150) => {
    if (content.length <= maxLength) return content;
    return content.substring(0, maxLength).trim() + '...';
  };

  const handleLikeClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleLike(post.id);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.5,
        delay: index * 0.1,
        ease: [0.25, 0.46, 0.45, 0.94]
      }}
      whileHover={{
        y: -8,
        transition: { duration: 0.2, ease: "easeOut" }
      }}
      className="group relative"
    >
      {/* Background gradient that appears on hover */}
      <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-2xl opacity-0 group-hover:opacity-20 transition-all duration-300 blur-sm" />

      <div className="relative bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl rounded-2xl border border-white/20 dark:border-slate-700/50 shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden">
        {/* Header with gradient background */}
        <div className="relative h-28 sm:h-32 bg-gradient-to-br from-blue-500/10 via-purple-500/10 to-pink-500/10 dark:from-blue-400/20 dark:via-purple-400/20 dark:to-pink-400/20">
          <div className="absolute inset-0 bg-gradient-to-br from-transparent via-white/5 to-white/10 dark:from-transparent dark:via-slate-900/5 dark:to-slate-900/10" />

          {/* Floating decorative elements */}
          <div className="absolute top-3 right-3 sm:top-4 sm:right-4 w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-full blur-xl opacity-60" />
          <div className="absolute bottom-1 left-3 sm:bottom-2 sm:left-4 w-8 h-8 sm:w-12 sm:h-12 bg-gradient-to-br from-pink-400/20 to-orange-400/20 rounded-full blur-lg opacity-40" />

          {/* Like button */}
          <motion.button
            onClick={handleLikeClick}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className={cn(
              "absolute top-3 right-3 sm:top-4 sm:right-4 p-1.5 sm:p-2 rounded-full backdrop-blur-sm transition-all duration-200 z-10",
              isLiked
                ? "bg-red-500/20 text-red-500 hover:bg-red-500/30"
                : "bg-white/20 text-slate-600 dark:text-slate-300 hover:bg-white/30 dark:hover:bg-slate-700/30"
            )}
          >
            <motion.div
              animate={isLiked ? { scale: [1, 1.2, 1] } : {}}
              transition={{ duration: 0.3 }}
            >
              <Heart
                className={cn(
                  "w-3.5 h-3.5 sm:w-4 sm:h-4 transition-all duration-200",
                  isLiked && "fill-current"
                )}
              />
            </motion.div>
          </motion.button>
        </div>

        {/* Content */}
        <div className="p-4 sm:p-6 space-y-3 sm:space-y-4">
          {/* Author info */}
          <div className="flex items-center gap-2 sm:gap-3">
            <LazyAvatar
              src={post.author?.avatarUrl}
              alt={authorName}
              fallbackText={authorInitials}
              className="w-8 h-8 sm:w-10 sm:h-10 border-2 border-white/50 dark:border-slate-600/50 shadow-lg"
            />
            <div className="flex-1 min-w-0">
              <p className="text-xs sm:text-sm font-semibold text-slate-800 dark:text-slate-200 truncate">
                {authorName}
              </p>
              <div className="flex items-center gap-1 sm:gap-2 text-xs text-slate-500 dark:text-slate-400">
                <Calendar className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
                <span className="text-xs">{formatDate(post.createdAt)}</span>
              </div>
            </div>
          </div>

          {/* Title */}
          <Link to={`/posts/${post.id}`} className="block group/title">
            <h3 className="text-base sm:text-lg font-bold text-slate-800 dark:text-slate-100 leading-tight line-clamp-2 group-hover/title:text-blue-600 dark:group-hover/title:text-blue-400 transition-colors duration-200">
              {post.title}
            </h3>
          </Link>

          {/* Content preview */}
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed line-clamp-3">
            {truncateContent(post.body || post.content || '', 120)}
          </p>

          {/* Footer */}
          <div className="flex items-center justify-between pt-3 sm:pt-4 border-t border-slate-200/50 dark:border-slate-700/50">
            <div className="flex items-center gap-2 sm:gap-4 text-xs text-slate-500 dark:text-slate-400">
              <div className="flex items-center gap-1">
                <Clock className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
                <span className="text-xs">
                  <NumberFlow
                    plugins={[continuous]}
                    value={readingTime}
                  /> min
                </span>
              </div>
              <div className="flex items-center gap-1">
                <Heart className={cn(
                  "w-2.5 h-2.5 sm:w-3 sm:h-3",
                  isLiked && "fill-current text-red-500"
                )} />
                <span className="text-xs">
                  <NumberFlow
                    plugins={[continuous]}
                    value={likeCount}
                  />
                </span>
              </div>
            </div>

            <Link
              to={`/posts/${post.id}`}
              className="text-xs font-semibold text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors duration-200"
            >
              Read →
            </Link>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default BlogPostCard;
