import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import NumberFlow, { continuous } from '@number-flow/react';
import { api } from '../services/api';
import { mapDummyJsonPostToBlogPost } from '../utils/dataMapper';
import type { BlogPost } from '../types/blog';
import { useLikedPosts } from '../hooks/useLikedPosts';
import { Button } from '../components/ui/button';
import { Avatar, AvatarImage, AvatarFallback } from '../components/ui/avatar';
import { Card, CardContent } from '../components/ui/card';
import { ArrowLeft, Heart, Clock, Calendar } from 'lucide-react';

const PostDetailContent = ({ post }: { post: BlogPost }) => {
  const { isPostLiked, toggleLike, getLikeCount } = useLikedPosts();
  const originalLikeCount = post.likes || 0;
  const likeCount = getLikeCount(post.id, originalLikeCount);
  const authorName = post?.author?.name || 'Anonymous';
  const authorInitials = authorName.split(' ').map(n => n[0]).join('').toUpperCase();

  // Calculate reading time
  const wordCount = (post?.content || '').split(' ').length;
  const readingTime = Math.max(1, Math.ceil(wordCount / 200));

  // Format date
  const formatDate = (dateString: string) => {
    try {
      return new Date(dateString).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    } catch {
      return 'Recent';
    }
  };

  return (
    <motion.div
      className="container mx-auto px-4 sm:px-6 py-6 sm:py-8 max-w-4xl"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <Button
          asChild
          variant="ghost"
          className="mb-6 group hover:bg-transparent"
        >
          <Link to="/" className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
            <ArrowLeft className="h-4 w-4" />
            Back to posts
          </Link>
        </Button>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <Card className="overflow-hidden">
          <div className="relative h-80 bg-gradient-to-br from-blue-500/20 via-purple-500/20 to-pink-500/20 dark:from-blue-400/30 dark:via-purple-400/30 dark:to-pink-400/30">
            {/* Animated background elements */}
            <div className="absolute inset-0">
              <motion.div
                className="absolute top-10 right-10 w-32 h-32 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-full blur-2xl"
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.3, 0.6, 0.3]
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
              <motion.div
                className="absolute bottom-10 left-10 w-24 h-24 bg-gradient-to-br from-pink-400/20 to-orange-400/20 rounded-full blur-xl"
                animate={{
                  scale: [1.2, 1, 1.2],
                  opacity: [0.4, 0.7, 0.4]
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 1
                }}
              />
            </div>

            <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-black/10 dark:from-slate-900/10 dark:via-transparent dark:to-slate-900/20 backdrop-blur-sm" />

            <div className="relative z-10 p-6 sm:p-8 flex flex-col h-full justify-between">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                  >
                    <Avatar className="h-16 w-16 border-3 border-white/50 dark:border-slate-600/50 shadow-xl">
                      <AvatarImage src={post?.author?.avatarUrl} alt={authorName} />
                      <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-500 text-white text-lg font-bold">
                        {authorInitials}
                      </AvatarFallback>
                    </Avatar>
                  </motion.div>
                  <div>
                    <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-100">{authorName}</h2>
                    <div className="flex items-center gap-3 text-slate-600 dark:text-slate-300">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        <span className="text-sm">
                          {formatDate(post.createdAt)}
                        </span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        <span className="text-sm">
                          <NumberFlow
                            plugins={[continuous]}
                            value={readingTime}
                          /> min read
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button
                    variant="ghost"
                    size="icon"
                    className={`rounded-full h-12 w-12 backdrop-blur-sm ${
                      isPostLiked(post.id)
                        ? 'bg-red-500/20 text-red-500 hover:bg-red-500/30'
                        : 'bg-white/20 text-slate-600 dark:text-slate-300 hover:bg-white/30 dark:hover:bg-slate-700/30'
                    }`}
                    onClick={(e) => {
                      e.preventDefault();
                      toggleLike(post.id);
                    }}
                  >
                    <motion.div
                      animate={isPostLiked(post.id) ? { scale: [1, 1.2, 1] } : {}}
                      transition={{ duration: 0.3 }}
                    >
                      <Heart className={`h-6 w-6 ${isPostLiked(post.id) ? 'fill-current' : ''}`} />
                    </motion.div>
                  </Button>
                </motion.div>
              </div>

              <div className="mt-6">
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-sm font-medium text-slate-700 dark:text-slate-300 bg-white/20 dark:bg-slate-800/20 backdrop-blur-sm px-4 py-2 rounded-full border border-white/30 dark:border-slate-600/30">
                    Article
                  </span>
                  <span className="text-sm text-slate-600 dark:text-slate-400">
                    <NumberFlow
                      plugins={[continuous]}
                      value={likeCount}
                    /> {likeCount === 1 ? 'like' : 'likes'}
                  </span>
                </div>
                <motion.h1
                  className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-slate-800 dark:text-slate-100 leading-tight"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.5 }}
                >
                  {post.title || 'Untitled Post'}
                </motion.h1>
              </div>
            </div>

            <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-slate-900/20 to-transparent dark:from-slate-900/40" />
          </div>

          <CardContent className="p-6 sm:p-8 pt-4 sm:pt-6">
            <motion.div
              className="prose prose-lg max-w-none dark:prose-invert prose-headings:font-semibold"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              <p className="text-lg leading-relaxed text-slate-700 dark:text-slate-300">
                {post.content || 'No content available.'}
              </p>
            </motion.div>

            <motion.div
              className="mt-12 pt-6 border-t border-slate-200 dark:border-slate-700"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.8 }}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Heart className={`h-5 w-5 ${isPostLiked(post.id) ? 'fill-current text-red-500' : 'text-slate-400'}`} />
                  <span className="text-sm font-medium text-slate-600 dark:text-slate-400">
                    <NumberFlow
                      plugins={[continuous]}
                      value={likeCount}
                    /> {likeCount === 1 ? 'Like' : 'Likes'}
                  </span>
                </div>
                <Button asChild variant="outline" className="group">
                  <Link to="/" className="flex items-center gap-1">
                    <ArrowLeft className="h-4 w-4 mr-1" />
                    Back to posts
                  </Link>
                </Button>
              </div>
            </motion.div>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  );
};

const PostDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPost = async () => {
      if (!id) {
        setError("Post ID is missing.");
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError(null);
        const postId = parseInt(id, 10);
        if (isNaN(postId)) {
          setError("Invalid Post ID.");
          setLoading(false);
          return;
        }
        const postResponse = await api.getPost(postId);
        const userResponse = await api.getUser(postResponse.userId);
        const postData = mapDummyJsonPostToBlogPost(postResponse, userResponse);
        setPost(postData);
      } catch (err) {
        console.error('Error fetching post:', err);
        setError(err instanceof Error ? err.message : 'Failed to load post. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [id]);

  if (loading) {
    return (
      <motion.div
        className="flex items-center justify-center min-h-[60vh]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        <div className="text-center space-y-6">
          <div className="relative">
            <motion.div
              className="w-12 h-12 border-4 border-purple-200 dark:border-purple-800 border-t-purple-500 dark:border-t-purple-400 rounded-full mx-auto"
              animate={{ rotate: -360 }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
            />
          </div>
          <div className="space-y-2">
            <h3 className="text-lg font-semibold text-slate-700 dark:text-slate-300">
              Loading article...
            </h3>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              Preparing your reading experience
            </p>
          </div>
        </div>
      </motion.div>
    );
  }

  if (error) {
    return (
      <motion.div
        className="container mx-auto px-4 py-8 max-w-4xl"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-2xl p-8 text-center">
          <div className="w-16 h-16 bg-red-100 dark:bg-red-900/50 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-red-600 dark:text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-red-800 dark:text-red-200 mb-2">Error loading post</h2>
          <p className="text-red-600 dark:text-red-300 mb-6">{error}</p>
          <Button asChild variant="outline">
            <Link to="/" className="flex items-center gap-2">
              <ArrowLeft className="h-4 w-4" />
              Back to home
            </Link>
          </Button>
        </div>
      </motion.div>
    );
  }

  if (!post) {
    return (
      <motion.div
        className="container mx-auto px-4 py-8 max-w-4xl"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="text-center py-12">
          <div className="w-24 h-24 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-12 h-12 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <h2 className="text-3xl font-bold text-slate-800 dark:text-slate-200 mb-3">Post not found</h2>
          <p className="text-slate-600 dark:text-slate-400 text-lg mb-8 max-w-md mx-auto">
            The post you're looking for doesn't exist or has been removed.
          </p>
          <Button asChild size="lg">
            <Link to="/" className="flex items-center gap-2">
              <ArrowLeft className="h-4 w-4" />
              Back to home
            </Link>
          </Button>
        </div>
      </motion.div>
    );
  }

  return <PostDetailContent post={post} />;
};

export default PostDetail;

