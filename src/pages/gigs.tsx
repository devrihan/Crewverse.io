import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

export const Gigs = () => {
  const [gigs, setGigs] = useState<any[]>([]); // You can replace 'any' with a proper type
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch gigs from the database (for example, from an API)
    // Replace this with your API call logic
    setGigs([
      { id: 1, title: 'Content Writing', description: 'Write articles for a tech blog.' },
      { id: 2, title: 'Video Editing', description: 'Edit videos for YouTube.' },
      { id: 3, title: 'Social Media Management', description: 'Manage social media accounts for businesses.' },
    ]);
  }, []);

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-panel p-6 mb-8"
      >
        <h2 className="text-3xl font-bold mb-4">Available Gigs</h2>
        {gigs.length === 0 ? (
          <p className="text-gray-400">No gigs available at the moment.</p>
        ) : (
          <div className="space-y-6">
            {gigs.map((gig) => (
              <div key={gig.id} className="bg-gray-800 p-4 rounded-lg">
                <h3 className="text-xl font-semibold">{gig.title}</h3>
                <p className="text-gray-400">{gig.description}</p>
                <button
                  onClick={() => navigate(`/careers/gigs/${gig.id}`)}
                  className="bg-neon text-gray-900 px-4 py-2 mt-4 rounded-lg font-semibold"
                >
                  Apply
                </button>
              </div>
            ))}
          </div>
        )}
      </motion.div>
    </div>
  );
};
