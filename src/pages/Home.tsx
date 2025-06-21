import React from 'react';
import { motion } from 'framer-motion';
import NumberFlow, { continuous } from '@number-flow/react';
import { usePosts } from '../hooks/usePosts';
import BlogPostCard from '../components/BlogPostCard';
import { useSearch } from '../hooks/useSearch';

const Home: React.FC = () => {
  const { posts, loading, error } = usePosts();
  const { searchTerm, setSearchTerm, isSearching } = useSearch();

  const filteredPosts = searchTerm
    ? posts.filter(post =>
        post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.author.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : posts;

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-slate-900 dark:via-slate-800 dark:to-indigo-900">
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center space-y-8">
            <div className="relative">
              {/* Animated loading rings */}
              <div className="animate-spin rounded-full h-20 w-20 border-4 border-blue-100 border-t-blue-500 mx-auto"></div>
              <div className="absolute inset-0 rounded-full h-20 w-20 border-4 border-transparent border-t-purple-400 animate-spin mx-auto" style={{ animationDelay: '0.3s', animationDuration: '2s' }}></div>
              <div className="absolute inset-2 rounded-full h-16 w-16 border-4 border-transparent border-t-pink-300 animate-spin mx-auto" style={{ animationDelay: '0.6s', animationDuration: '1.5s' }}></div>
            </div>
            <div className="space-y-3">
              <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Loading amazing content...
              </h2>
              <p className="text-slate-600 dark:text-slate-400 max-w-sm mx-auto">
                Curating the best stories just for you
              </p>
              {/* Loading dots */}
              <div className="flex justify-center space-x-1 mt-4">
                <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                <div className="w-2 h-2 bg-pink-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 via-orange-50 to-yellow-50 dark:from-slate-900 dark:via-red-900/10 dark:to-orange-900/10">
        <div className="flex items-center justify-center min-h-screen p-4">
          <div className="text-center max-w-lg space-y-8">
            <div className="relative">
              <div className="w-24 h-24 mx-auto bg-gradient-to-br from-red-400 to-orange-500 rounded-full flex items-center justify-center shadow-lg">
                <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                </svg>
              </div>
              <div className="absolute -top-1 -right-1 w-6 h-6 bg-red-100 dark:bg-red-900/50 rounded-full animate-ping"></div>
            </div>
            <div className="space-y-4">
              <h2 className="text-3xl font-bold text-slate-800 dark:text-slate-200">
                Oops! Something went wrong
              </h2>
              <p className="text-lg text-slate-600 dark:text-slate-400">
                We couldn't load the blog posts right now.
              </p>
              <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl p-4">
                <p className="text-sm text-red-700 dark:text-red-400 font-medium">
                  {error.message}
                </p>
              </div>
            </div>
            <button 
              onClick={() => window.location.reload()} 
              className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        {/* Background decorative elements */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-0 w-96 h-96 rounded-full opacity-30" style={{ 
            background: 'radial-gradient(circle, rgba(59, 130, 246, 0.15) 0%, rgba(147, 51, 234, 0.15) 100%)',
            filter: 'blur(40px)',
            transform: 'translate(-50%, -50%)',
            animation: 'pulse 4s ease-in-out infinite'
          }}></div>
          <div className="absolute top-0 right-0 w-80 h-80 rounded-full opacity-25" style={{ 
            background: 'radial-gradient(circle, rgba(236, 72, 153, 0.15) 0%, rgba(251, 146, 60, 0.15) 100%)',
            filter: 'blur(40px)',
            transform: 'translate(50%, -50%)',
            animation: 'pulse 4s ease-in-out infinite 1s'
          }}></div>
        </div>
        
        <div className="relative container mx-auto px-4 sm:px-6 py-16 sm:py-20 lg:py-32">
          <div className="text-center space-y-8 sm:space-y-10 mb-12 sm:mb-16">
            <div className="space-y-4 sm:space-y-6">
              <div className="inline-block">
                <span className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm font-medium rounded-full border" style={{
                  background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.1), rgba(147, 51, 234, 0.1))',
                  color: '#1e40af',
                  borderColor: 'rgba(59, 130, 246, 0.3)',
                  backdropFilter: 'blur(10px)'
                }}>
                  <svg className="w-3 h-3 sm:w-4 sm:h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  Premium Content Hub
                </span>
              </div>
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black leading-tight">
                <span style={{
                  background: 'linear-gradient(135deg, #1e293b, #1e40af, #7c3aed)',
                  backgroundClip: 'text',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent'
                }}>
                  Discover
                </span>
                <br />
                <span style={{
                  background: 'linear-gradient(135deg, #7c3aed, #ec4899, #f97316)',
                  backgroundClip: 'text',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent'
                }}>
                  Stories
                </span>
              </h1>
              <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl max-w-4xl mx-auto leading-relaxed font-light px-4" style={{ color: '#475569' }}>
                Explore our collection of
                <span className="font-semibold" style={{
                  background: 'linear-gradient(135deg, #2563eb, #7c3aed)',
                  backgroundClip: 'text',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent'
                }}> insightful articles</span>,
                stories, and ideas from amazing writers around the world.
              </p>
            </div>
            
            {/* Enhanced Search Bar */}
            <div className="max-w-3xl mx-auto px-4">
              <div className="relative group">
                <div className="absolute inset-0 rounded-xl sm:rounded-2xl opacity-30 group-hover:opacity-50 transition-all duration-500" style={{
                  background: 'linear-gradient(135deg, #3b82f6, #8b5cf6, #ec4899)',
                  filter: 'blur(20px)',
                  animation: 'pulse 3s ease-in-out infinite'
                }}></div>
                <div className="relative rounded-xl sm:rounded-2xl shadow-2xl border" style={{
                  background: 'rgba(255, 255, 255, 0.9)',
                  backdropFilter: 'blur(20px)',
                  borderColor: 'rgba(255, 255, 255, 0.3)'
                }}>
                  <div className="flex items-center p-2 sm:p-3">
                    <div className="flex items-center justify-center w-10 h-10 sm:w-14 sm:h-14" style={{ color: '#64748b' }}>
                      <svg className="w-5 h-5 sm:w-7 sm:h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                      </svg>
                    </div>
                    <input
                      type="text"
                      placeholder="Search posts, authors, content..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="flex-1 px-3 py-3 sm:px-6 sm:py-4 text-base sm:text-lg bg-transparent focus:outline-none font-medium"
                      style={{ color: '#1e293b' }}
                    />
                    {searchTerm && (
                      <button
                        onClick={() => setSearchTerm('')}
                        className="flex items-center justify-center w-10 h-10 sm:w-14 sm:h-14 transition-all duration-200 rounded-lg sm:rounded-xl group text-slate-500 hover:bg-slate-100/80 dark:hover:bg-slate-700/30"
                      >
                        <svg className="w-4 h-4 sm:w-6 sm:h-6 group-hover:scale-110 transition-transform duration-200" fill="currentColor" viewBox="0 0 20 20">
                          <path
                            fillRule="evenodd"
                            d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="container mx-auto px-4 sm:px-6 pb-16 sm:pb-20">
        {/* Search Results Header */}
        {searchTerm && (
          <motion.div
            className="mb-10"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-xl rounded-3xl shadow-xl border border-white/20 dark:border-slate-700/50 p-8">
              <div className="flex items-center justify-between">
                <div className="space-y-2">
                  <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-200">
                    Search Results
                  </h2>
                  <p className="text-slate-600 dark:text-slate-400 text-lg">
                    Found <span className="font-bold text-blue-600 dark:text-blue-400">
                      <NumberFlow
                        plugins={[continuous]}
                        value={filteredPosts.length}
                      />
                    </span> {filteredPosts.length === 1 ? 'post' : 'posts'} for "
                    <span className="font-semibold text-purple-600 dark:text-purple-400">{searchTerm}</span>"
                  </p>
                </div>
                {isSearching && (
                  <motion.div
                    className="animate-spin rounded-full h-8 w-8 border-3 border-blue-200 border-t-blue-600"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  />
                )}
              </div>
            </div>
          </motion.div>
        )}

        {/* Stats Bar */}
        {!searchTerm && (
          <motion.div
            className="mb-10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <div className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-xl rounded-3xl shadow-xl border border-white/20 dark:border-slate-700/50 p-8">
              <div className="flex items-center justify-between">
                <div className="space-y-2">
                  <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-200">
                    Latest Posts
                  </h2>
                  <p className="text-slate-600 dark:text-slate-400 text-lg">
                    Discover <span className="font-bold text-blue-600 dark:text-blue-400">
                      <NumberFlow
                        plugins={[continuous]}
                        value={posts.length}
                      />
                    </span> amazing {posts.length === 1 ? 'story' : 'stories'} from our community
                  </p>
                </div>
                <div className="hidden md:flex items-center gap-8">
                  <motion.div
                    className="text-center group"
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="text-3xl font-black bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                      {posts.length}
                    </div>
                    <div className="text-xs text-slate-500 dark:text-slate-400 uppercase tracking-wider font-semibold">Posts</div>
                  </motion.div>
                  <div className="w-px h-12 bg-gradient-to-b from-transparent via-slate-300 dark:via-slate-600 to-transparent"></div>
                  <motion.div
                    className="text-center group"
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="text-3xl font-black bg-gradient-to-r from-green-500 to-emerald-500 bg-clip-text text-transparent">
                      Live
                    </div>
                    <div className="text-xs text-slate-500 dark:text-slate-400 uppercase tracking-wider font-semibold">Status</div>
                  </motion.div>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Posts Grid */}
        {filteredPosts.length > 0 ? (
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4 sm:gap-6 lg:gap-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {filteredPosts.map((post, index) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.05,
                  ease: [0.25, 0.46, 0.45, 0.94]
                }}
              >
                <BlogPostCard post={post} index={index} />
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <div className="text-center py-20">
            <div className="max-w-lg mx-auto space-y-8">
              <div className="relative">
                <div className="w-32 h-32 mx-auto bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-800 dark:to-slate-700 rounded-full flex items-center justify-center shadow-xl">
                  <svg className="w-16 h-16 text-slate-400 dark:text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full animate-bounce"></div>
              </div>
              <div className="space-y-4">
                <h3 className="text-2xl font-bold text-slate-700 dark:text-slate-300">
                  No posts found
                </h3>
                <p className="text-lg text-slate-500 dark:text-slate-400 leading-relaxed">
                  {searchTerm 
                    ? `We couldn't find any posts matching "${searchTerm}". Try different keywords or explore our latest content.`
                    : "No posts are available at the moment. Check back later for fresh content!"
                  }
                </p>
              </div>
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm('')}
                  className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                  Clear Search & Explore
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;