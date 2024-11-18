import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { MessageSquare, ThumbsUp, Share2 } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import { useCommunityStore } from '../store/communityStore';
import { format } from 'date-fns';
import TextareaAutosize from 'react-textarea-autosize';
import ReactMarkdown from 'react-markdown';

export const Community = () => {
  const { user } = useAuth();
  const { posts, createPost, likePost } = useCommunityStore();
  const [newPost, setNewPost] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPost.trim()) return;

    await createPost({
      content: newPost,
      userId: user!.uid,
      userName: user!.displayName || 'Anonymous',
      createdAt: new Date().toISOString(),
      likes: 0,
      comments: [],
    });

    setNewPost('');
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-panel p-6 mb-8"
      >
        <form onSubmit={handleSubmit}>
          <TextareaAutosize
            value={newPost}
            onChange={(e) => setNewPost(e.target.value)}
            placeholder="Share your thoughts with the community..."
            className="w-full bg-gray-800 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-neon resize-none"
            minRows={3}
          />
          <div className="flex justify-end mt-4">
            <button
              type="submit"
              className="bg-neon text-gray-900 px-6 py-2 rounded-lg font-semibold hover:bg-opacity-90 transition-all"
            >
              Post
            </button>
          </div>
        </form>
      </motion.div>

      <div className="space-y-6">
        {posts.map((post, index) => (
          <motion.div
            key={post.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="glass-panel p-6"
          >
            <div className="flex items-start gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <span className="font-semibold">{post.userName}</span>
                  <span className="text-gray-400 text-sm">
                    {format(new Date(post.createdAt), 'PPp')}
                  </span>
                </div>
                <ReactMarkdown className="prose prose-invert max-w-none">
                  {post.content}
                </ReactMarkdown>
                <div className="flex items-center gap-6 mt-4">
                  <button
                    onClick={() => likePost(post.id)}
                    className="flex items-center gap-2 text-gray-400 hover:text-neon transition-colors"
                  >
                    <ThumbsUp className="w-4 h-4" />
                    {post.likes}
                  </button>
                  <button className="flex items-center gap-2 text-gray-400 hover:text-neon transition-colors">
                    <MessageSquare className="w-4 h-4" />
                    {post.comments.length}
                  </button>
                  <button className="flex items-center gap-2 text-gray-400 hover:text-neon transition-colors">
                    <Share2 className="w-4 h-4" />
                    Share
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};