import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export const NavigationBar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  const [showEmailBubble, setShowEmailBubble] = useState(false);

  const toggleEmailBubble = () => setShowEmailBubble(!showEmailBubble);

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
        <div className="hidden lg:flex space-x-4 items-center">
          <Link to="/" className="text-platinum hover:text-africanviolet no-underline">
            Home
          </Link>
          <Link to="/about" className="text-platinum hover:text-africanviolet no-underline">
            About
          </Link>

          {/* Email Bubble */}
          <div className="relative">
            <button
              onClick={toggleEmailBubble}
              className="text-platinum hover:text-africanviolet focus:outline-none"
            >
              Contact
            </button>
            {showEmailBubble && (
              <div
                className="absolute top-full mt-2 right-0 bg-platinum text-forestgreen p-2 rounded shadow-lg max-w-xs"
                style={{ right: "1rem" }} 
              >
                <a href="mailto:taniatitiriga21@gmail.com" className="text-forestgreen no-underline hover:underline">
                  taniatitiriga21@gmail.com
                </a>
              </div>
            )}
          </div>
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

        {/* Email Bubble for Mobile */}
        <div className="block py-2 pl-1 hover:bg-cambridgeblue no-underline">
          <a href="mailto:taniatitiriga21@gmail.com" className="text-white no-underline hover:underline">
            Contact: taniatitiriga21@gmail.com
          </a>
        </div>
      </div>
    </nav>
  );
};
