import React from 'react';

const Footer = () => {
  return (
    <div className="footer bg-gray-900 text-white py-8 mt-8 w-full">
      <div className="container mx-auto text-center">
        <p className="text-lg mb-4">&copy; 2024 Your Company Name. All rights reserved.</p>
        <div className="mt-4 flex justify-center gap-6">
          <a 
            href="/about" 
            className="text-gray-400 hover:text-green-500 hover:underline transition-all duration-300 ease-in-out"
          >
            About
          </a>
          <a 
            href="/contact" 
            className="text-gray-400 hover:text-green-500 hover:underline transition-all duration-300 ease-in-out"
          >
            Contact
          </a>
          <a 
            href="/privacy" 
            className="text-gray-400 hover:text-green-500 hover:underline transition-all duration-300 ease-in-out"
          >
            Privacy Policy
          </a>
        </div>
        <div className="mt-6 text-gray-400 text-sm">
          <p>Designed with 💚 by Your Team</p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
