import { BlogPost, CreatePostData } from '@/types/blog';
import { mockPosts } from '@/data/mockData';

class BlogService {
  private posts: BlogPost[] = [...mockPosts];

  async getAllPosts(): Promise<BlogPost[]> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    return [...this.posts].sort((a, b) => 
      new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
    );
  }

  async getPostById(id: string): Promise<BlogPost | null> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 300));
    return this.posts.find(post => post.id === id) || null;
  }

  async createPost(postData: CreatePostData): Promise<BlogPost> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 800));
    
    // Simulate image upload if provided
    let imageUrl: string | undefined;
    if (postData.imageFile) {
      // In a real implementation, this would upload to your server
      // For now, we'll create a mock URL using the file
      imageUrl = URL.createObjectURL(postData.imageFile);
    }
    
    const newPost: BlogPost = {
      id: Date.now().toString(),
      title: postData.title,
      content: postData.content,
      excerpt: this.generateExcerpt(postData.content),
      author: postData.author,
      publishedAt: new Date().toISOString(),
      readTime: this.calculateReadTime(postData.content),
      tags: postData.tags,
      imageUrl: imageUrl || this.getRandomImage()
    };

    this.posts.unshift(newPost);
    return newPost;
  }

  private generateExcerpt(content: string): string {
    // Remove markdown and get first 200 characters
    const plainText = content.replace(/[#*`_\[\]]/g, '').trim();
    const sentences = plainText.split('. ');
    let excerpt = sentences[0];
    
    for (let i = 1; i < sentences.length; i++) {
      if ((excerpt + '. ' + sentences[i]).length <= 200) {
        excerpt += '. ' + sentences[i];
      } else {
        break;
      }
    }
    
    return excerpt.length < plainText.length ? excerpt + '...' : excerpt;
  }

  private calculateReadTime(content: string): number {
    const wordsPerMinute = 200;
    const words = content.trim().split(/\s+/).length;
    return Math.ceil(words / wordsPerMinute);
  }

  private getRandomImage(): string {
    const images = [
      'https://images.pexels.com/photos/11035380/pexels-photo-11035380.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/270348/pexels-photo-270348.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/3727463/pexels-photo-3727463.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/177598/pexels-photo-177598.jpeg?auto=compress&cs=tinysrgb&w=800'
    ];
    return images[Math.floor(Math.random() * images.length)];
  }
}

export const blogService = new BlogService();