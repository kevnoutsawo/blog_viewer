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
  createdAt: new Date().toISOString(), // TODO: Use actual creation date from API when available
  likes: post.reactions?.likes || 0,
});
