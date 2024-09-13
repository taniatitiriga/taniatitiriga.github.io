import React from 'react';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaDiscord, FaGithub } from 'react-icons/fa'; // Import icons

export const Footer = () => (
    <footer className="bg-slate-800 text-white py-2">
        <div className="container mx-auto flex justify-between items-center">
            <p className="text-center pt-3 text-sm text-frenchgray">&copy; {new Date().getFullYear()} Tania Titirigă.</p>
            <div className="flex items-center">
                <a href="https://www.linkedin.com/in/tania-titiriga/" className="mx-2 text-wisteria" aria-label="LinkedIn" target="_blank" rel="noopener noreferrer">
                    <FaLinkedin size={24} />
                </a>
                <a href="https://github.com/taniatitiriga" className="mx-2 text-wisteria" aria-label="Github" target="_blank" rel="noopener noreferrer">
                    <FaGithub size={24} />
                </a>
                <a href="https://x.com/tania_titiriga" className="mx-2 text-wisteria" aria-label="Twitter" target="_blank" rel="noopener noreferrer">
                    <FaTwitter size={24} />
                </a>
            </div>
        </div>
    </footer>
);
