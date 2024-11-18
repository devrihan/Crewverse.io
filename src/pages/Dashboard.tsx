import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { FileText, Users, Star, Trash2 } from 'lucide-react';
import { useContentStore } from '../store/contentStore';
import { useAuth } from '../hooks/useAuth';
import { format } from 'date-fns';

export const Dashboard = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { contents, deleteContent } = useContentStore();

  const stats = [
    { label: 'Total Posts', value: contents.length, icon: FileText },
    { label: 'Followers', value: 142, icon: Users },
    { label: 'Saved', value: 23, icon: Star },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="grid md:grid-cols-3 gap-6 mb-8">
        {stats.map((stat, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="glass-panel p-6"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400">{stat.label}</p>
                <p className="text-3xl font-bold">{stat.value}</p>
              </div>
              <stat.icon className="w-8 h-8 text-neon opacity-80" />
            </div>
          </motion.div>
        ))}
      </div>

      <div className="glass-panel p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Recent Content</h2>
          <button
            onClick={() => navigate('/create')}
            className="bg-neon text-gray-900 px-4 py-2 rounded-lg font-semibold"
          >
            Create New
          </button>
        </div>

        <div className="space-y-4">
          {contents.map((content, index) => (
            <motion.div
              key={content.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="glass-panel p-4 hover:border-neon/30 transition-all"
            >
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-lg font-semibold mb-2">{content.title}</h3>
                  <p className="text-gray-400 text-sm">
                    Created {format(new Date(content.createdAt), 'PPP')}
                  </p>
                </div>
                <button
                  onClick={() => deleteContent(content.id)}
                  className="text-gray-400 hover:text-red-500 transition-colors"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};