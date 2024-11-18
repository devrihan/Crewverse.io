import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { LogOut, Menu } from 'lucide-react';

export const Navbar = () => {
  const { user, signOut } = useAuth();

  return (
    <nav className="glass-panel sticky top-0 z-50 px-4 py-3">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link to="/" className="text-2xl font-bold neon-glow">Muse</Link>
        
        <div className="flex items-center gap-6">
          {user ? (
            <>
              <Link to="/dashboard" className="hover:text-neon transition-colors">
                Dashboard
              </Link>
              <Link to="/create" className="hover:text-neon transition-colors">
                Create
              </Link>
              <Link to="/community" className="hover:text-neon transition-colors">
                Community
              </Link>
              <button
                onClick={signOut}
                className="flex items-center gap-2 hover:text-neon transition-colors"
              >
                <LogOut className="w-4 h-4" />
                Sign Out
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="hover:text-neon transition-colors"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="bg-neon text-gray-900 px-4 py-2 rounded-full 
                          hover:bg-opacity-90 transition-colors"
              >
                Get Started
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};