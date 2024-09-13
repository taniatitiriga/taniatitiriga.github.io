// src/components/Modal.js

import React from 'react';
import '../output.css'; 

const Modal = ({ isOpen, onClose, imageSrc }) => {
    if (!isOpen) return null;

    const handleClose = (e) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    };

    return (
        <div
            className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-80 z-50"
            onClick={handleClose}
        >
            <div className="relative">
                <button
                    onClick={onClose}
                    className="absolute top-3 right-4 w-10 h-10 pb-0.5 m-0 bg-taupegray text-white text-2xl flex items-center justify-center rounded-full shadow-md hover:bg-africanviolet transition-colors"
                >
                    &times;
                </button>



                <img
                    src={imageSrc}
                    alt="Full screen view"
                    className="max-w-screen-sm max-h-screen object-contain"
                />
            </div>
        </div>
    );
};

export default Modal;
