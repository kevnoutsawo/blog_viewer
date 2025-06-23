import React, { useEffect } from 'react';
import { usePosts } from '../hooks/usePosts';

const AvatarDebug: React.FC = () => {
  const { posts, loading } = usePosts();

  useEffect(() => {
    if (!loading && posts.length > 0) {
      console.log('Avatar URLs Debug:');
      posts.slice(0, 5).forEach((post, index) => {
        console.log(`Post ${index + 1}:`, {
          author: post.author.name,
          avatarUrl: post.author.avatarUrl,
          fallbackText: post.author.name.split(' ').map(n => n[0]).join('').toUpperCase()
        });
      });
    }
  }, [posts, loading]);

  if (loading) return <div>Loading debug info...</div>;

  return (
    <div className="p-4 bg-gray-100 dark:bg-gray-800 rounded-lg">
      <h3 className="font-bold mb-2">Avatar Debug Info</h3>
      {posts.slice(0, 3).map((post, index) => (
        <div key={post.id} className="mb-2 text-sm">
          <strong>{post.author.name}:</strong> {post.author.avatarUrl}
        </div>
      ))}
    </div>
  );
};

export default AvatarDebug;
