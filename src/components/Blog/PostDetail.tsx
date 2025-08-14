import { motion } from 'framer-motion';
import { ArrowLeft, Clock, User, Calendar, Tag } from 'lucide-react';
import { Link } from 'react-router-dom';
import { BlogPost } from '@/types/blog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';

interface PostDetailProps {
  post: BlogPost;
}

export const PostDetail = ({ post }: PostDetailProps) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const formatContent = (content: string) => {
    return content.split('\n').map((paragraph, index) => {
      if (paragraph.startsWith('# ')) {
        return (
          <h1 key={index} className="text-3xl font-bold text-gray-900 mb-6 mt-8 first:mt-0">
            {paragraph.replace('# ', '')}
          </h1>
        );
      } else if (paragraph.startsWith('## ')) {
        return (
          <h2 key={index} className="text-2xl font-semibold text-gray-800 mb-4 mt-6">
            {paragraph.replace('## ', '')}
          </h2>
        );
      } else if (paragraph.startsWith('### ')) {
        return (
          <h3 key={index} className="text-xl font-semibold text-gray-800 mb-3 mt-5">
            {paragraph.replace('### ', '')}
          </h3>
        );
      } else if (paragraph.startsWith('```')) {
        return null; // Handle code blocks separately
      } else if (paragraph.trim() === '') {
        return <br key={index} />;
      } else {
        return (
          <p key={index} className="text-gray-700 mb-4 leading-relaxed text-lg">
            {paragraph}
          </p>
        );
      }
    });
  };

  return (
    <>
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="max-w-4xl mx-auto"
    >
      <div className="mb-8">

        {post.imageUrl && (
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="relative h-64 md:h-96 rounded-xl overflow-hidden mb-8 shadow-2xl"
          >
            <img
              src={post.imageUrl}
              alt={post.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
          </motion.div>
        )}
        
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
            {post.title}
          </h1>
          
          <div className="flex flex-wrap items-center gap-6 text-gray-600 mb-6">
            <div className="flex items-center space-x-2">
              <User className="h-5 w-5" />
              <span className="font-medium">{post.author}</span>
            </div>
            
            <div className="flex items-center space-x-2">
              <Calendar className="h-5 w-5" />
              <span>{formatDate(post.publishedAt)}</span>
            </div>
            
            <div className="flex items-center space-x-2">
              <Clock className="h-5 w-5" />
              <span>{post.readTime} min read</span>
            </div>
          </div>
          
          <div className="flex flex-wrap gap-2 mb-8">
            {post.tags.map((tag) => (
              <Badge key={tag} variant="secondary" className="flex items-center space-x-1">
                <Tag className="h-3 w-3" />
                <span>{tag}</span>
              </Badge>
            ))}
          </div>
          
          <Separator className="mb-8" />
        </motion.div>
      </div>
      
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.6 }}
        className="prose prose-lg max-w-none prose-gray prose-headings:text-gray-900 prose-p:text-gray-700 prose-strong:text-gray-900"
      >
        {formatContent(post.content)}
      </motion.div>
    </motion.article>
   <div className="fixed bottom-6 right-6 z-50">
  <Link to="/">
    <Button variant="ghost" className="mb-6 hover:bg-gray-100">
      <ArrowLeft className="h-4 w-4 mr-2" />
      Back to Blog
    </Button>
  </Link>
</div>
</>
  );
};