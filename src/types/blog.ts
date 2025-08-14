export interface BlogPost {
  id: string;
  title: string;
  content: string;
  excerpt: string;
  author: string;
  publishedAt: string;
  readTime: number;
  tags: string[];
  imageUrl?: string;
}

export interface CreatePostData {
  title: string;
  content: string;
  author: string;
  tags: string[];
  imageFile?: File;
}