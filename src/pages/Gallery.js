// src/pages/Gallery.js

import React, { useState } from 'react';
import ScrollToTop from '../components/ScrollToTop'; 
import '../output.css';
import GoBackButton from '../components/goBackButton';



// Modal Component
import Modal from '../components/Modal';

// Import images
import digitaldrawing1 from '../components/galleryPics/digitaldrawing1.jpg';
import digitaldrawing2 from '../components/galleryPics/digitaldrawing2.jpg';
import digitaldrawing3 from '../components/galleryPics/digitaldrawing3.jpg';
import digitaldrawing4 from '../components/galleryPics/digitaldrawing4.jpg';
import digitaldrawing5 from '../components/galleryPics/digitaldrawing5.jpg';
import sketches1 from '../components/galleryPics/sketches1.jpg';
import sketches2 from '../components/galleryPics/sketches2.jpg';
import sketches3 from '../components/galleryPics/sketches3.jpg';
import sketchface from '../components/galleryPics/sketchface.jpg';
import sketchstatue from '../components/galleryPics/sketchstatue.jpg';
import sketchcars from '../components/galleryPics/sketchcars.jpg';

import pencilsketchboy from '../components/galleryPics/pencilsketchboy.jpg';
import pencilsketchtwo from '../components/galleryPics/pencilsketchtwo.jpg';
import pencilsketchdogs from '../components/galleryPics/pencilsketchdogs.jpg';
// Add more pics here

// Arrays of images
const digitalDrawings = [
    digitaldrawing1,
    digitaldrawing2,
    digitaldrawing3,
    digitaldrawing4,
    digitaldrawing5
];

const sketches = [
    sketches1,
    sketches2,
    sketches3,
    sketchface,
    sketchstatue,
    pencilsketchtwo,
    pencilsketchboy,
    pencilsketchdogs,
    sketchcars
    // Add more pics here
];

export const Gallery = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentImage, setCurrentImage] = useState('');

    const openModal = (imageSrc) => {
        setCurrentImage(imageSrc);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    return (
        <div className="min-h-screen">
            {/* Call to Action Section */}
            <div className="bg-platinum py-10">
                <div className="container mx-auto px-4 text-center">
                    <h2 className="text-2xl font-bold text-darkviolet mb-3">Explore My Art Blog</h2>
                    <p className="text-gray-700 mb-4">
                        All my advice and resources for art beginners, in one place.
                    </p>
                    <a href="#/art-blog" className="inline-block px-6 py-3 bg-wisteria hover:bg-africanviolet text-white font-semibold text-m no-underline rounded-lg shadow-md  transition duration-300">
                        Read the Blog
                    </a>
                </div>
            </div>

            {/* Digital drawings */}
            <div className="bg-teagreen py-12">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl font-bold text-slate-800 mb-6 text-center">Digital Drawings</h2>
                    <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                        {digitalDrawings.map((img, index) => (
                            <div
                                key={index}
                                className="flex items-center justify-center overflow-hidden rounded-lg shadow-lg bg-gray-200 cursor-pointer"
                                onClick={() => openModal(img)}
                            >
                                <img
                                    src={img}
                                    alt={`Digital Drawing ${index + 1}`}
                                    className="object-contain h-full w-full"
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            
            {/* Sketches */}
            <div className="bg-lavander py-12">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl font-bold text-darkviolet mb-6 text-center">Sketches</h2>
                    <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                        {sketches.map((img, index) => (
                            <div
                                key={index}
                                className="flex items-center justify-center overflow-hidden rounded-lg shadow-lg bg-transparent cursor-pointer"
                                onClick={() => openModal(img)}
                            >
                                <img
                                    src={img}
                                    alt={`Sketch ${index + 1}`}
                                    className="object-contain h-full w-full"
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <ScrollToTop />

            {/* Modal */}
            <Modal
                isOpen={isModalOpen}
                onClose={closeModal}
                imageSrc={currentImage}
            />

            <GoBackButton path="/" />
        </div>
    );
};
