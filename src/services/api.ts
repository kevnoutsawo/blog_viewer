import axios from 'axios';

export type DummyJsonPost = {
  id: number;
  title: string;
  body: string;
  userId: number;
  tags: string[];
  reactions: {
    likes: number;
    dislikes: number;
  };
  views: number;
};

export type DummyJsonUser = {
  id: number;
  firstName: string;
  lastName: string;
  maidenName: string;
  age: number;
  gender: string;
  email: string;
  phone: string;
  username: string;
  image: string;
  // Add other properties as needed, but we mainly need the above for the blog
};

export const api = {
  async getPosts(): Promise<DummyJsonPost[]> {
    const response = await axios.get('https://dummyjson.com/posts');
    return response.data.posts;
  },

  async getUsers(): Promise<DummyJsonUser[]> {
    const response = await axios.get('https://dummyjson.com/users');
    return response.data.users;
  },

  async getUser(userId: number): Promise<DummyJsonUser> {
    const response = await axios.get(`https://dummyjson.com/users/${userId}`);
    return response.data;
  },

  async getPost(id: number): Promise<DummyJsonPost> {
    const response = await axios.get(`https://dummyjson.com/posts/${id}`);
    return response.data;
  }
};
