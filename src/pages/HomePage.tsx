import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Search, TrendingUp } from 'lucide-react';
import { BlogPost } from '@/types/blog';
import { blogService } from '@/services/blogService';
import { PostCard } from '@/components/Blog/PostCard';
import { LoadingSpinner } from '@/components/Layout/LoadingSpinner';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';

export const HomePage = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const fetchedPosts = await blogService.getAllPosts();
        setPosts(fetchedPosts);
      } catch (error) {
        console.error('Failed to fetch posts:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  const filteredPosts = posts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.author.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesTag = !selectedTag || post.tags.includes(selectedTag);
    
    return matchesSearch && matchesTag;
  });

  const allTags = Array.from(
    new Set(posts.flatMap(post => post.tags))
  ).sort();

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="space-y-8">
 

      {/* Search and Filter Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="space-y-4"
      >
        <div className="flex justify-around">
          <div className="flex items-center space-x-2">
            <TrendingUp className="h-5 w-5 text-blue-600" />
            <span>Trending Topics</span>
          </div>
       
        <div className="relative max-w-md mx-auto">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            type="text"
            placeholder="Search posts..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 bg-white/50 backdrop-blur-sm border-gray-200"
          />
        </div>
 </div>
        {allTags.length > 0 && (
          <div className="flex flex-wrap justify-center gap-2 max-w-4xl mx-auto">
            <Badge
              variant={selectedTag === null ? "default" : "outline"}
              className="cursor-pointer hover:bg-gray-100 transition-colors"
              onClick={() => setSelectedTag(null)}
            >
              All Posts
            </Badge>
            {allTags.map((tag) => (
              <Badge
                key={tag}
                variant={selectedTag === tag ? "default" : "outline"}
                className="cursor-pointer hover:bg-gray-100 transition-colors"
                onClick={() => setSelectedTag(selectedTag === tag ? null : tag)}
              >
                {tag}
              </Badge>
            ))}
          </div>
        )}
      </motion.div>

      {/* Posts Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredPosts.length > 0 ? (
          filteredPosts.map((post, index) => (
            <PostCard key={post.id} post={post} index={index} />
          ))
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="col-span-full text-center py-12"
          >
            <div className="text-gray-500 text-lg">
              {searchTerm || selectedTag ? (
                <>
                  <p>No posts found matching your criteria.</p>
                  <p className="text-sm mt-2">Try adjusting your search or filter.</p>
                </>
              ) : (
                <p>No posts available yet.</p>
              )}
            </div>
          </motion.div>
        )}
      </div>

      {/* Stats Section */}
      {posts.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-8 text-center"
        >
          <h3 className="text-2xl font-semibold text-gray-800 mb-4">
            Growing Knowledge Base
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <div className="text-3xl font-bold text-blue-600">{posts.length}</div>
              <div className="text-gray-600">Published Posts</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-purple-600">{allTags.length}</div>
              <div className="text-gray-600">Topics Covered</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-indigo-600">
                {posts.reduce((total, post) => total + post.readTime, 0)}
              </div>
              <div className="text-gray-600">Minutes of Content</div>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
};