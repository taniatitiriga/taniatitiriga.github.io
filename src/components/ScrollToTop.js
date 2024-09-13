// src/components/ScrollToTop.js

import React, { useState, useEffect } from 'react';
import { FaArrowUp } from 'react-icons/fa';

const ScrollToTop = () => {
    const [showScrollTop, setShowScrollTop] = useState(false);

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    useEffect(() => {
        const handleScroll = () => {
            setShowScrollTop(window.scrollY > 300);
        };

        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        showScrollTop && (
            <button
                className="fixed bottom-20 right-4 bg-wisteria hover:bg-africanviolet text-white p-3 rounded-full shadow-md transition"
                onClick={scrollToTop}
            >
                <FaArrowUp />
            </button>
        )
    );
};

export default ScrollToTop;
