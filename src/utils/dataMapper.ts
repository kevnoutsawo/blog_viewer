import type { DummyJsonPost, DummyJsonUser } from '../services/api';
import type { BlogPost, Author } from '../types/blog';

export const mapDummyJsonUserToAuthor = (user: DummyJsonUser): Author => ({
  id: user.id.toString(),
  name: `${user.firstName} ${user.lastName}`,
  avatarUrl: user.image,
});

export const mapDummyJsonPostToBlogPost = (post: DummyJsonPost, user: DummyJsonUser): BlogPost => ({
  id: post.id.toString(),
  title: post.title,
  content: post.body,
  author: mapDummyJsonUserToAuthor(user),
  createdAt: new Date().toISOString(), // Using current date for form but and actual date would have been used if available
  likes: post.reactions?.likes || 0,
});
