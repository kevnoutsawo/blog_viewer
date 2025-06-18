import React from 'react';
import type { BlogPost } from '../types/blog';
import { Link } from 'react-router-dom';

interface BlogPostCardProps {
  post: BlogPost & { body?: string; userId?: string | number };
}

const BlogPostCard: React.FC<BlogPostCardProps> = ({ post }) => {
  return (
    <div className="bg-white rounded-lg shadow p-4 mb-4 dark:bg-gray-800">
      <Link to={`/posts/${post.id}`}>
        <h2 className="text-xl font-semibold mb-2 hover:underline">{post.title}</h2>
      </Link>
      <p className="text-gray-600 dark:text-gray-300 mb-2">{post.body || post.content}</p>
      <div className="flex items-center gap-2 mt-2">
        <span className="text-sm text-gray-500">By User {post.userId || post.author?.name}</span>
        <span className="text-xs text-gray-400 ml-2">{post.createdAt ? new Date(post.createdAt).toLocaleDateString() : ''}</span>
      </div>
    </div>
  );
};

export default BlogPostCard;
