

import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Sparkles, PenTool, BookOpen, Users, ChevronRight } from 'lucide-react';

export const Home = () => {
  const features = [
    {
      icon: <PenTool className="w-6 h-6 text-[#39FF14]" />,
      title: "AI Content Generation",
      description: "Create engaging content for any platform in seconds",
    },
    {
      icon: <BookOpen className="w-6 h-6 text-[#39FF14]" />,
      title: "Content Library",
      description: "Access trending topics and professional templates",
    },
    {
      icon: <Users className="w-6 h-6 text-[#39FF14]" />,
      title: "Community",
      description: "Connect with creators and share your content",
    },
  ];

  return (
    <div className="min-h-screen grid-background animate-grid">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <div className="glass-panel p-8 mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <div className="flex items-center justify-center mb-6">
              <Sparkles className="w-12 h-12 text-[#39FF14]" />
            </div>
            <h1 className="text-5xl font-bold mb-4 neon-glow">Muse AI Studio</h1>
            <p className="text-xl text-gray-400 mb-8">
              Create compelling content with the power of AI
            </p>
            <Link
              to="/register"
              className="bg-[#39FF14] text-gray-900 px-8 py-3 rounded-full font-semibold hover:bg-opacity-90 transition-all"
            >
              Start Creating
            </Link>
          </motion.div>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="glass-panel p-6 hover:border-[#39FF14]/30 transition-all cursor-pointer group"
            >
              <div className="mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-400 mb-4">{feature.description}</p>
              <div className="flex items-center text-[#39FF14] group-hover:translate-x-2 transition-transform">
                Learn more <ChevronRight className="w-4 h-4 ml-1" />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Content Creation Preview */}
        <div className="glass-panel p-8 mt-12">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="flex-1">
              <h2 className="text-3xl font-bold mb-4">
                AI-Powered Content Creation
              </h2>
              <p className="text-gray-400 mb-6">
                Transform your ideas into engaging content across multiple platforms.
                Choose your style, set your parameters, and let AI do the heavy lifting.
              </p>
              <div className="flex gap-4">
                <Link
                  to="/register"
                  className="bg-[#39FF14] text-gray-900 px-6 py-2 rounded-full font-semibold hover:bg-opacity-90 transition-all"
                >
                  Try Now
                </Link>
                <button className="border border-[#39FF14] text-[#39FF14] px-6 py-2 rounded-full font-semibold hover:bg-[#39FF14]/10 transition-all">
                  Learn More
                </button>
              </div>
            </div>
            <div className="flex-1">
              <div className="bg-gray-900 p-6 rounded-xl border border-gray-800">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-3 h-3 rounded-full bg-red-500"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                </div>
                <div className="space-y-2">
                  <div className="h-4 bg-gray-800 rounded w-3/4"></div>
                  <div className="h-4 bg-gray-800 rounded w-1/2"></div>
                  <div className="h-4 bg-gray-800 rounded w-5/6"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
