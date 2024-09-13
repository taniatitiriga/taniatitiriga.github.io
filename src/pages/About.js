import React, { useState } from 'react';
import '../output.css';
import pictureofme from '../assets/pictureofme.jpg';
import ScrollToTop from '../components/ScrollToTop';

const About = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className="container mx-auto my-12 p-6 max-w-4xl">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row items-center">
          {/* Left side: pic */}
          <img
            src={pictureofme}
            alt="Your Name"
            className="w-48 h-48 object-cover rounded-full mb-4 md:mb-0 md:mr-6"
          />

          {/* Right side: description */}
          <div className="flex-1 px-12">
            <h1 className="text-3xl font-bold mb-4">About Me</h1>
            <p className={`mb-4 text-lg transition-all duration-300 ease-in-out ${isExpanded ? '' : 'line-clamp-2'}`}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec sit amet nisl vitae risus bibendum interdum. Vivamus convallis lorem nec lectus suscipit, id sollicitudin nisl blandit. Etiam id nisl vel justo condimentum volutpat a sit amet mauris. Vestibulum nec nunc sit amet eros aliquam feugiat. Cras vehicula orci neque, non feugiat nisl pharetra quis. Nullam ullamcorper lacus sit amet lorem sagittis pharetra.
            </p>
            <button
              onClick={toggleExpand}
              className="text-africanviolet hover:text-codepurple"
            >
              {isExpanded ? 'Read Less' : 'Read More'}
            </button>
          </div>
        </div>

        {/* exp table */}
        <div className="mt-8">
          <h2 className="text-2xl font-bold mb-4">Work Experience</h2>
          <table className="min-w-full table-auto border-collapse border border-gray-400">
            <thead>
              <tr>
                <th className="px-4 py-2 border border-gray-400">Workplace</th>
                <th className="px-4 py-2 border border-gray-400">Post</th>
                <th className="px-4 py-2 border border-gray-400">Time Period</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="px-4 py-2 border border-gray-400">Opswat</td>
                <td className="px-4 py-2 border border-gray-400">
                  <a href="https://labs.ligaac.ro/" className='no-underline text-africanviolet hover:text-codepurple' target="_blank" rel="noopener noreferrer">
                    LigaAC Labs Intern
                  </a>
                </td>
                <td className="px-4 py-2 border border-gray-400">2024</td>
              </tr>
              <tr>
                <td className="px-4 py-2 border border-gray-400">SC Felsta Com Intl SRL</td>
                <td className="px-4 py-2 border border-gray-400">Commercial Worker</td>
                <td className="px-4 py-2 border border-gray-400">2023</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* studies table */}
        <div className="mt-8">
          <h2 className="text-2xl font-bold mb-4">Studies</h2>
          <table className="min-w-full table-auto border-collapse border border-gray-400">
            <thead>
              <tr>
                <th className="px-4 py-2 border border-gray-400">Institution</th>
                <th className="px-4 py-2 border border-gray-400">Degree</th>
                <th className="px-4 py-2 border border-gray-400">Study Program</th>
                <th className="px-4 py-2 border border-gray-400">Time Period</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="px-4 py-2 border border-gray-400">West University of Timișoara</td>
                <td className="px-4 py-2 border border-gray-400">Bachelor's</td>
                <td className="px-4 py-2 border border-gray-400">Computer Science (eng.)</td>
                <td className="px-4 py-2 border border-gray-400">2023 - present</td>
              </tr>
              <tr>
                <td className="px-4 py-2 border border-gray-400">"Grigore Moisil" Theoretical Highschool Timișoara</td>
                <td className="px-4 py-2 border border-gray-400">Undergrad.</td>
                <td className="px-4 py-2 border border-gray-400">Mathematics and CS</td>
                <td className="px-4 py-2 border border-gray-400">2019 - 2023</td>
              </tr>
            </tbody>
          </table>
        </div>

        <ScrollToTop />
      </div>
    </div>
  );
};

export default About;