export interface Author {
  id: string;
  name: string;
  avatarUrl: string;
}

export interface BlogPost {
  id: string;
  title: string;
  content: string;
  author: Author;
  createdAt: string;
  likes: number;
}
