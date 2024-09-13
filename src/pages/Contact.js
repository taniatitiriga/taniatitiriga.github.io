import React from 'react';
import underconstruction from '../assets/underconstruction.jpg';


export const Contact = () => (
  <div className='flex flex-col items-center pt-5 px-5 min-h-screen'>
    <h2>Contact Page</h2>
    <p className='my-1'>Caution! Page under construction.</p>
    <p className='mb-0'>(In the meantime, contact me through one of the socials below!)</p>
    <a href="https://www.pinterest.com/pin/851110029560964551/" className='w-auto h-auto object-cover mb-6 md:mb-0 md:mr-6' target="_blank" rel="noopener noreferrer">
      <img
        src={underconstruction}
        alt="Construction site doodle"
        className="rounded-none"
      />
    </a>
  </div>
);
