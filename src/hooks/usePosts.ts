import { useState, useEffect } from 'react';
import { api } from '../services/api';
import { mapDummyJsonPostToBlogPost } from '../utils/dataMapper';
import type { BlogPost } from '../types/blog';

export interface UsePostsResult {
  posts: BlogPost[];
  loading: boolean;
  error: Error | null;
}

export const usePosts = (): UsePostsResult => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);
        setError(null);

        // Fetch posts first
        const postsResponse = await api.getPosts();

        // Get unique user IDs from posts
        const uniqueUserIds = [...new Set(postsResponse.map(post => post.userId))];

        // Fetch users individually for each unique user ID
        const userPromises = uniqueUserIds.map(userId =>
          api.getUser(userId).catch(err => {
            console.warn(`Failed to fetch user ${userId}:`, err);
            return {
              id: userId,
              firstName: 'Unknown',
              lastName: 'User',
              maidenName: '',
              age: 0,
              gender: 'unknown',
              email: '',
              phone: '',
              username: 'unknown',
              image: `https://ui-avatars.com/api/?name=Unknown+User&background=6366f1&color=ffffff`
            };
          })
        );

        const users = await Promise.all(userPromises);

        // Create a map of users for quick lookup
        const userMap = new Map(users.map(user => [user.id, user]));

        // Map posts with their respective authors
        const mappedPosts = postsResponse.map(post => {
          const user = userMap.get(post.userId);
          return mapDummyJsonPostToBlogPost(post, user!);
        });

        setPosts(mappedPosts);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Failed to fetch posts'));
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  return { posts, loading, error };
};
