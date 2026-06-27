// src/components/Footer.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { Info, Home, List } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 border-t border-gray-800 text-gray-400 py-12 px-4 sm:px-6 lg:px-8 mt-auto">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">

        {/* Info & Branding */}
        <div className="flex flex-col space-y-4">
          <div className="flex items-center space-x-2">
            <span className="text-xl font-bold text-white tracking-tight">
              Faculty<span className="text-purple-400">Ranker</span>
            </span>
          </div>
          <p className="text-sm text-gray-400 leading-relaxed max-w-sm">
            Discover, rate, and share feedback on faculty members at VIT-AP University.
            Empowering students to make informed academic decisions.
          </p>
        </div>

        {/* Quick Links */}
        <div className="flex flex-col space-y-4">
          <h3 className="text-sm font-semibold text-gray-200 uppercase tracking-wider">Navigation</h3>
          <ul className="space-y-2 text-sm">
            <li>
              <Link to="/" className="flex items-center space-x-2 hover:text-white transition-colors duration-200">
                <Home className="w-4 h-4 text-purple-400" />
                <span>Home</span>
              </Link>
            </li>
            <li>
              <Link to="/about" className="flex items-center space-x-2 hover:text-white transition-colors duration-200">
                <Info className="w-4 h-4 text-purple-400" />
                <span>About Us</span>
              </Link>
            </li>
            <li>
              <Link to="/directory" className="flex items-center space-x-2 hover:text-white transition-colors duration-200">
                <List className="w-4 h-4 text-purple-400" />
                <span>Faculty Directory</span>
              </Link>
            </li>
          </ul>
        </div>

        {/* Social / Info */}
        <div className="flex flex-col space-y-4">
          <h3 className="text-sm font-semibold text-gray-200 uppercase tracking-wider">Community</h3>
          <p className="text-sm leading-relaxed max-w-sm">
            Help improve our community by adding verified faculty or submitting reviews.
          </p>
        </div>

      </div>

      <div className="max-w-6xl mx-auto border-t border-gray-800 mt-8 pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-gray-500">
        <p>&copy; {new Date().getFullYear()} VIT-AP Faculty Ranker. All rights reserved.</p>
        <p className="mt-2 sm:mt-0">
          Built with passion by the student community.
        </p>
      </div>
    </footer >
  );
};

export default Footer;
