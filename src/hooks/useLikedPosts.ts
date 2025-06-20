import { useState, useCallback, useEffect } from 'react';

const LIKED_POSTS_KEY = 'likedPosts';

export const useLikedPosts = () => {
  // Simple array of post IDs that the user has liked
  const [likedPosts, setLikedPosts] = useState<string[]>(() => {
    const saved = localStorage.getItem(LIKED_POSTS_KEY);
    return saved ? JSON.parse(saved) : [];
  });

  const toggleLike = useCallback((postId: string) => {
    setLikedPosts(prev => {
      const newLikedPosts = prev.includes(postId)
        ? prev.filter(id => id !== postId) // Remove like
        : [...prev, postId]; // Add like

      localStorage.setItem(LIKED_POSTS_KEY, JSON.stringify(newLikedPosts));
      return newLikedPosts;
    });
  }, []);

  const isPostLiked = useCallback((postId: string) => {
    return likedPosts.includes(postId);
  }, [likedPosts]);

  const getLikeCount = useCallback((postId: string, apiCount: number) => {
    // API count + 1 if user has liked this post, otherwise just API count
    return apiCount + (likedPosts.includes(postId) ? 1 : 0);
  }, [likedPosts]);

  // Save to localStorage whenever likedPosts changes
  useEffect(() => {
    localStorage.setItem(LIKED_POSTS_KEY, JSON.stringify(likedPosts));
  }, [likedPosts]);

  return {
    toggleLike,
    isPostLiked,
    getLikeCount,
  };
};
