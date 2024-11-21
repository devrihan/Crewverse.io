// import React, { useState } from 'react';

// interface Gig {
//   id: string;
//   title: string;
//   description: string;
//   postedBy: string;
//   appliedUsers: string[];
// }

// export const Careers = () => {
//   const [gigs, setGigs] = useState<Gig[]>([]);
//   const [appliedGigs, setAppliedGigs] = useState<string[]>([]);
//   const [newGigTitle, setNewGigTitle] = useState('');
//   const [newGigDescription, setNewGigDescription] = useState('');

//   const user = {
//     id: 'user1', // Simulating logged-in user
//     name: 'John Doe',
//   };

//   const handlePostGig = () => {
//     if (!newGigTitle.trim() || !newGigDescription.trim()) return;

//     const newGig: Gig = {
//       id: Date.now().toString(),
//       title: newGigTitle,
//       description: newGigDescription,
//       postedBy: user.name,
//       appliedUsers: [],
//     };

//     setGigs((prev) => [...prev, newGig]);
//     setNewGigTitle('');
//     setNewGigDescription('');
//   };

//   const handleApply = (gigId: string) => {
//     const updatedGigs = gigs.map((gig) =>
//       gig.id === gigId
//         ? {
//             ...gig,
//             appliedUsers: gig.appliedUsers.includes(user.id)
//               ? gig.appliedUsers
//               : [...gig.appliedUsers, user.id],
//           }
//         : gig
//     );

//     setGigs(updatedGigs);
//     if (!appliedGigs.includes(gigId)) {
//       setAppliedGigs((prev) => [...prev, gigId]);
//       alert('Applied successfully');
//     }
//   };

//   const postedGigs = gigs.filter((gig) => gig.postedBy === user.name);
//   const appliedGigDetails = gigs.filter((gig) => appliedGigs.includes(gig.id));

//   return (
//     <div className="max-w-4xl mx-auto px-4 py-8">
//       <h1 className="text-3xl font-bold mb-6">Careers</h1>

//       {/* Post a Gig Section */}
//       <div className="glass-panel p-6 mb-8">
//         <h2 className="text-2xl font-bold mb-4">Post a Gig</h2>
//         <div className="mb-4">
//           <input
//             type="text"
//             value={newGigTitle}
//             onChange={(e) => setNewGigTitle(e.target.value)}
//             placeholder="Gig Title"
//             className="w-full px-4 py-2 rounded-lg bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-neon"
//           />
//         </div>
//         <div className="mb-4">
//           <textarea
//             value={newGigDescription}
//             onChange={(e) => setNewGigDescription(e.target.value)}
//             placeholder="Gig Description"
//             className="w-full px-4 py-2 rounded-lg bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-neon"
//             rows={3}
//           />
//         </div>
//         <button
//           onClick={handlePostGig}
//           className="bg-neon text-gray-900 px-6 py-2 rounded-lg font-semibold hover:bg-opacity-90 transition-all"
//         >
//           Post Gig
//         </button>
//       </div>

//       {/* Gigs List */}
//       <div className="mb-8">
//         <h2 className="text-2xl font-bold mb-4">Available Gigs</h2>
//         {gigs.length === 0 ? (
//           <p>No gigs posted yet.</p>
//         ) : (
//           <div className="space-y-4">
//             {gigs.map((gig) => (
//               <div key={gig.id} className="glass-panel p-6">
//                 <h3 className="text-xl font-bold mb-2">{gig.title}</h3>
//                 <p className="text-gray-400 mb-2">{gig.description}</p>
//                 <p className="text-gray-500 mb-4">Posted by: {gig.postedBy}</p>
//                 {gig.appliedUsers.includes(user.id) ? (
//                   <button className="bg-gray-700 text-gray-400 px-6 py-2 rounded-lg font-semibold cursor-not-allowed">
//                     Already Applied
//                   </button>
//                 ) : (
//                   <button
//                     onClick={() => handleApply(gig.id)}
//                     className="bg-neon text-gray-900 px-6 py-2 rounded-lg font-semibold hover:bg-opacity-90 transition-all"
//                   >
//                     Apply
//                   </button>
//                 )}
//               </div>
//             ))}
//           </div>
//         )}
//       </div>

//       {/* Dashboard Section */}
//       <div>
//         <h2 className="text-2xl font-bold mb-4">Your Dashboard</h2>
//         <h3 className="text-xl font-semibold mb-2">Posted Gigs</h3>
//         {postedGigs.length === 0 ? (
//           <p>No gigs posted by you.</p>
//         ) : (
//           <div className="space-y-4 mb-6">
//             {postedGigs.map((gig) => (
//               <div key={gig.id} className="glass-panel p-4">
//                 <h4 className="text-lg font-bold">{gig.title}</h4>
//                 <p className="text-gray-400">{gig.description}</p>
//               </div>
//             ))}
//           </div>
//         )}
//         <h3 className="text-xl font-semibold mb-2">Applied Gigs</h3>
//         {appliedGigDetails.length === 0 ? (
//           <p>You have not applied for any gigs.</p>
//         ) : (
//           <div className="space-y-4">
//             {appliedGigDetails.map((gig) => (
//               <div key={gig.id} className="glass-panel p-4">
//                 <h4 className="text-lg font-bold">{gig.title}</h4>
//                 <p className="text-gray-400">{gig.description}</p>
//                 <p className="text-gray-500">Posted by: {gig.postedBy}</p>
//               </div>
//             ))}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const Careers = () => {
  const [selection, setSelection] = useState<'hire' | 'work' | null>(null);
  const navigate = useNavigate();

  // Animations for the onboarding process
  const onboardingVariants = {
    initial: { opacity: 0, y: 50 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  const handleWorkSelection = () => {
    setSelection('work');
    navigate('/careers/gigs');
  };

  const handleHireSelection = () => {
    setSelection('hire');
    navigate('/careers/post');
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      {/* Onboarding Section */}
      <motion.div
        initial="initial"
        animate="animate"
        variants={onboardingVariants}
        className="glass-panel p-6 mb-8 text-center"
      >
        <h2 className="text-3xl font-bold mb-6">Welcome to Careers</h2>
        <p className="text-lg text-gray-400 mb-4">
          Are you looking for paid gigs to work or are you here to hire anyone?
        </p>
        <div className="flex justify-center gap-8">
          <button
            onClick={handleWorkSelection}
            className="bg-neon text-gray-900 px-6 py-3 rounded-lg font-semibold hover:bg-opacity-90 transition-all"
          >
            Looking for Gigs
          </button>
          <button
            onClick={handleHireSelection}
            className="bg-neon text-gray-900 px-6 py-3 rounded-lg font-semibold hover:bg-opacity-90 transition-all"
          >
            Looking to Hire
          </button>
        </div>
      </motion.div>

      {/* Conditional Content Based on Selection */}
      {selection && (
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0, transition: { duration: 0.5 } }}
          className="glass-panel p-6 text-center"
        >
          <h3 className="text-2xl font-bold mb-4">
            {selection === 'work' ? 'Available Gigs' : 'Post a Gig'}
          </h3>
          <p className="text-lg text-gray-400">
            {selection === 'work'
              ? 'Browse and apply for available gigs below.'
              : 'Post a gig for others to apply.'}
          </p>

          {/* If user is looking for gigs, show a list of gigs */}
          {selection === 'work' ? (
            <div className="mt-8 space-y-4">
              {/* Example Gig Listings */}
              <div className="bg-gray-800 p-4 rounded-lg">
                <h4 className="font-semibold">Content Writing</h4>
                <p className="text-gray-400">A paid gig for content writing. Apply now!</p>
                <button className="bg-neon text-gray-900 px-4 py-2 mt-4 rounded-lg font-semibold">
                  Apply
                </button>
              </div>
              <div className="bg-gray-800 p-4 rounded-lg">
                <h4 className="font-semibold">Video Editing</h4>
                <p className="text-gray-400">A paid gig for video editing. Apply now!</p>
                <button className="bg-neon text-gray-900 px-4 py-2 mt-4 rounded-lg font-semibold">
                  Apply
                </button>
              </div>
            </div>
          ) : (
            <div className="mt-8">
              {/* If user is hiring, show option to post a gig */}
              <textarea
                placeholder="Describe the gig you're offering"
                className="w-full bg-gray-800 p-4 rounded-lg text-gray-300 resize-none focus:outline-none focus:ring-2 focus:ring-neon"
                rows={4}
              />
              <div className="flex justify-end mt-4">
                <button
                  className="bg-neon text-gray-900 px-6 py-2 rounded-lg font-semibold hover:bg-opacity-90 transition-all"
                >
                  Post Gig
                </button>
              </div>
            </div>
          )}
        </motion.div>
      )}
    </div>
  );
};

export default Careers;
