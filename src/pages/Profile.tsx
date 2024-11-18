import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Camera, Save } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import { updateProfile } from '../store/userStore';
import toast from 'react-hot-toast';

export const Profile = () => {
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    displayName: user?.displayName || '',
    bio: '',
    website: '',
    twitter: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await updateProfile(user!.uid, formData);
      toast.success('Profile updated successfully');
    } catch (error) {
      toast.error('Failed to update profile');
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-panel p-8"
      >
        <div className="flex items-center gap-8 mb-8">
          <div className="relative">
            <div className="w-24 h-24 rounded-full bg-gray-800 flex items-center justify-center">
              {user?.photoURL ? (
                <img
                  src={user.photoURL}
                  alt="Profile"
                  className="w-full h-full rounded-full object-cover"
                />
              ) : (
                <span className="text-3xl">{user?.displayName?.[0] || '?'}</span>
              )}
            </div>
            <button className="absolute bottom-0 right-0 p-2 bg-neon text-gray-900 rounded-full">
              <Camera className="w-4 h-4" />
            </button>
          </div>
          <div>
            <h1 className="text-2xl font-bold mb-2">{user?.displayName || 'User'}</h1>
            <p className="text-gray-400">{user?.email}</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">
              Display Name
            </label>
            <input
              type="text"
              value={formData.displayName}
              onChange={(e) => setFormData({ ...formData, displayName: e.target.value })}
              className="w-full bg-gray-800 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-neon"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">
              Bio
            </label>
            <textarea
              value={formData.bio}
              onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
              className="w-full bg-gray-800 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-neon"
              rows={4}
            />
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">
                Website
              </label>
              <input
                type="url"
                value={formData.website}
                onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                className="w-full bg-gray-800 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-neon"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">
                Twitter
              </label>
              <input
                type="text"
                value={formData.twitter}
                onChange={(e) => setFormData({ ...formData, twitter: e.target.value })}
                className="w-full bg-gray-800 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-neon"
              />
            </div>
          </div>

          <button
            type="submit"
            className="flex items-center gap-2 bg-neon text-gray-900 px-6 py-2 rounded-lg font-semibold hover:bg-opacity-90 transition-all"
          >
            <Save className="w-4 h-4" />
            Save Changes
          </button>
        </form>
      </motion.div>
    </div>
  );
};