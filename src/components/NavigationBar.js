import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export const NavigationBar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <nav className="bg-forestgreen text-platinum relative">
      <div className="container mx-auto px-4 py-2 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="logo text-xl text-platinum">
          ITania
        </Link>

        {/* Hamburger Button */}
        <button
          onClick={toggleMenu}
          className="text-frenchgray hover:text-white focus:outline-none lg:hidden"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16m-7 6h7"
            />
          </svg>
        </button>

        {/* Navbar Links for Desktop */}
        <div className="hidden lg:flex space-x-4">
          <Link to="/" className="text-platinum hover:text-africanviolet no-underline">
            Home
          </Link>
          <Link to="/about" className="text-platinum hover:text-africanviolet no-underline">
            About
          </Link>
          <Link to="/contact" className="text-platinum hover:text-africanviolet no-underline">
            Contact
          </Link>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`lg:hidden ${isOpen ? 'block' : 'hidden'} absolute top-full right-0 bg-forestgreen w-full py-4 px-6`}
      >
        <Link
          to="/"
          className="block text-white py-2 pl-1 hover:bg-cambridgeblue no-underline"
          onClick={() => setIsOpen(false)}
        >
          Home
        </Link>
        <Link
          to="/about"
          className="block text-white py-2 pl-1 hover:bg-cambridgeblue no-underline"
          onClick={() => setIsOpen(false)}
        >
          About
        </Link>
        <Link
          to="/contact"
          className="block text-white py-2 pl-1 hover:bg-cambridgeblue no-underline"
          onClick={() => setIsOpen(false)}
        >
          Contact
        </Link>
      </div>
    </nav>
  );
};
