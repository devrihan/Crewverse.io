
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MessageSquare, ThumbsUp, Share2 } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import { useCommunityStore } from '../store/communityStore';
import { format } from 'date-fns';
import TextareaAutosize from 'react-textarea-autosize';
import ReactMarkdown from 'react-markdown';
import { useNavigate } from 'react-router-dom';

const TAGS = [
  'Content Writing',
  'Video Editing',
  'Copywriting',
  'Music',
  'Instagram',
];

export const Community = () => {
  const { user } = useAuth();
  const { posts, createPost, likePost } = useCommunityStore();
  const [newPost, setNewPost] = useState('');
  const [selectedTag, setSelectedTag] = useState('');
  const [filterTag, setFilterTag] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPost.trim() || !selectedTag) return;

    await createPost({
      content: newPost,
      userId: user?.uid || '',
      userName: user?.displayName || 'Anonymous',
      createdAt: new Date().toISOString(),
      likes: 0,
      comments: [],
      tag: selectedTag,
    });

    setNewPost('');
    setSelectedTag('');
  };

  const filteredPosts = filterTag
    ? posts.filter((post) => post.tag === filterTag)
    : posts;

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      {/* Posting Section */}
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
          <div className="flex flex-wrap gap-2 mt-4">
            {TAGS.map((tag) => (
              <button
                type="button"
                key={tag}
                className={`px-4 py-2 rounded-lg font-semibold ${
                  selectedTag === tag
                    ? 'bg-neon text-gray-900'
                    : 'bg-gray-700 text-gray-400 hover:bg-gray-600'
                }`}
                onClick={() => setSelectedTag(tag)}
              >
                {tag}
              </button>
            ))}
          </div>
          <div className="flex justify-end mt-4">
            <button
              type="submit"
              className="bg-neon text-gray-900 px-6 py-2 rounded-lg font-semibold hover:bg-opacity-90 transition-all"
              disabled={!selectedTag}
            >
              Post
            </button>
          </div>
        </form>
      </motion.div>

      {/* Filter Section */}
      <div className="flex flex-wrap gap-2 mb-6">
        <button
          className={`px-4 py-2 rounded-lg font-semibold ${
            filterTag === ''
              ? 'bg-neon text-gray-900'
              : 'bg-gray-700 text-gray-400 hover:bg-gray-600'
          }`}
          onClick={() => setFilterTag('')}
        >
          All
        </button>
        {TAGS.map((tag) => (
          <button
            key={tag}
            className={`px-4 py-2 rounded-lg font-semibold ${
              filterTag === tag
                ? 'bg-neon text-gray-900'
                : 'bg-gray-700 text-gray-400 hover:bg-gray-600'
            }`}
            onClick={() => setFilterTag(tag)}
          >
            {tag}
          </button>
        ))}
      </div>

      {/* Posts Section */}
      <div className="space-y-6">
        {filteredPosts.length === 0 ? (
          <div className="text-gray-400 text-center mt-6">
            No posts found for this tag.
          </div>
        ) : (
          filteredPosts.map((post, index) => (
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
                    <span className="px-2 py-1 bg-gray-700 text-gray-400 text-xs rounded-lg">
                      {post.tag}
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
          ))
        )}
      </div>

      {/* Careers Button */}
      <div className="mt-8 flex justify-center">
        <button
          onClick={() => navigate('/careers')}
          className="bg-neon text-gray-900 px-6 py-2 rounded-lg font-semibold hover:bg-opacity-90 transition-all"
        >
          Careers
        </button>
      </div>
    </div>
  );
};
