import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { BlogPost } from '@/types/blog';
import { blogService } from '@/services/blogService';
import { PostDetail } from '@/components/Blog/PostDetail';
import { LoadingSpinner } from '@/components/Layout/LoadingSpinner';

export const PostDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPost = async () => {
      if (!id) {
        setError('Post ID not provided');
        setLoading(false);
        return;
      }

      try {
        const fetchedPost = await blogService.getPostById(id);
        if (fetchedPost) {
          setPost(fetchedPost);
        } else {
          setError('Post not found');
        }
      } catch (err) {
        setError('Failed to fetch post');
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [id]);

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-center py-12"
      >
        <div className="text-red-600 text-lg mb-4">Error: {error}</div>
        <button
          onClick={() => window.history.back()}
          className="text-blue-600 hover:underline"
        >
          Go Back
        </button>
      </motion.div>
    );
  }

  if (!post) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-center py-12"
      >
        <div className="text-gray-600 text-lg">Post not found</div>
      </motion.div>
    );
  }

  return <PostDetail post={post} />;
};