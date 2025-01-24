// src/components/goBackButton.js

import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';

const GoBackButton = ({ path }) => {
    const navigate = useNavigate();

    const goBack = () => {
        navigate(path); // Navigate to the provided path
    };

    return (
        <button
            className="fixed left-4 top-20 transform -translate-y-1/2 bg-wisteria hover:bg-africanviolet text-white p-2 rounded-full shadow-md transition"
            onClick={goBack}
        >
            <FaArrowLeft />
        </button>
    );
};

export default GoBackButton;
