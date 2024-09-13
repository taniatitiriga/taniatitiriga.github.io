
// src/pages/Home.js
import React from 'react';
import '../output.css'
import ScrollToTop from '../components/ScrollToTop';
import bannerbg from '../assets/banner.png'

export const Home = () => (
  <div>
    <div
      className="min-h-screen flex items-center bg-cover bg-center"
      style={{ backgroundImage: `url(${bannerbg})` }}
    >
      <div className="w-full max-w-4xl px-4 py-8 flex">
        <div className='pt-10 pb-8 pl-16 pr-32 bg-forestgreen rounded-none'>
          <div className='pt-10 pb-8 pl-8 border-l-2 '>
            <h1 className=" text-platinum mb-4">
              A song of <div className='techtext'>&lt;tech&gt;</div> and <div className='arttext'>art</div>.
            </h1>
            <p className="text-m text-frenchgray">
              Explore write-ups on cybersecurity challenges, IT and art blogs, as well as a portfolio showcasing my projects.<br />
              Always ready to collaborate on design & dev projects, offer art critique and above all, participate in a CTF!
            </p>
          </div>

        </div>
      </div>
    </div>

    <div className="bg-platinum py-12">
      <div className="max-w-2xl mx-auto text-center px-4">
        <h2 className="text-3xl mb-4">IT & Tech</h2>
        <p className="text-lg mb-6">
          Discover my latest binary endeavours. CTF writeups, events, IT projects and blog await &darr;
        </p>
        <a
          href="/blog"
          className="inline-block px-6 py-3 bg-wisteria hover:bg-africanviolet text-white font-semibold text-m no-underline rounded-lg shadow-md  transition duration-300"
        >
          Read Blog
        </a>
      </div>
    </div>

    <div className="bg-platinum py-12">
      <div className="max-w-2xl mx-auto text-center px-4">
        <h2 className="text-3xl mb-4">Art Gallery</h2>
        <p className="text-lg mb-6">
          Find inspiration and follow the breadcrumbs on the road to becoming a self taught artist with my blog &darr;
        </p>
        <a
          href="/gallery"
          className="inline-block px-6 py-3 bg-wisteria hover:bg-africanviolet text-white font-semibold text-m no-underline rounded-lg shadow-md transition duration-300"
        >
          See Gallery
        </a>
      </div>
    </div>

    <ScrollToTop />

  </div>
);

