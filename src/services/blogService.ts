import axios from 'axios';
import type { BlogPost } from '../types/blog';

const API_URL = 'https://dummyjson.com';

export const fetchBlogPosts = async (): Promise<BlogPost[]> => {
  const response = await axios.get(`${API_URL}/posts`);
  return response.data.posts;
};

export const fetchBlogPostById = async (id: string): Promise<BlogPost> => {
  const response = await axios.get(`${API_URL}/posts/${id}`);
  return response.data;
};

export const fetchUserById = async (id: string) => {
  const response = await axios.get(`${API_URL}/users/${id}`);
  return response.data;
};
