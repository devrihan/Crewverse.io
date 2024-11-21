import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

export const PostGig = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title || !description) return;

    // Add your logic to post the gig, e.g., an API request to save the gig
    console.log('Gig posted:', { title, description });

    // Redirect after successful posting
    navigate('/careers');
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-panel p-6 mb-8"
      >
        <h2 className="text-3xl font-bold mb-4">Post a Gig</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="title" className="block text-gray-400 mb-2">
              Gig Title
            </label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full bg-gray-800 p-4 rounded-lg text-gray-300 focus:outline-none focus:ring-2 focus:ring-neon"
              placeholder="Enter gig title"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="description" className="block text-gray-400 mb-2">
              Gig Description
            </label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full bg-gray-800 p-4 rounded-lg text-gray-300 focus:outline-none focus:ring-2 focus:ring-neon"
              placeholder="Enter gig description"
              rows={4}
            />
          </div>
          <button
            type="submit"
            className="bg-neon text-gray-900 px-6 py-2 rounded-lg font-semibold hover:bg-opacity-90 transition-all"
          >
            Post Gig
          </button>
        </form>
      </motion.div>
    </div>
  );
};
