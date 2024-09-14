// src/App.js
import React, { Component } from 'react';
import { HashRouter as Router, Route, Routes } from 'react-router-dom'; // Import HashRouter here
import { Home } from './pages/Home';
import About from './pages/About';
import { Contact } from './pages/Contact';
import { NavigationBar } from './components/NavigationBar';
import { Footer } from './components/Footer';
import { Blog } from './pages/Blog';
import ArtBlog from './pages/ArtBlog';
import { Gallery } from './pages/Gallery';
import Post1 from './pages/ITblog/HashBreaker';
import KrotatePost from './pages/ITblog/Krotate';
import OspreyPost from './pages/ITblog/Osprey';

import './App.css';

class App extends Component {
  render() {
    return (
      <Router> {/* Using HashRouter instead of BrowserRouter */}
        <React.Fragment>
          <NavigationBar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/art-blog" element={<ArtBlog />} />
            <Route path="/blog/HashBreaker" element={<Post1 />} />
            <Route path="/blog/Krotate" element={<KrotatePost />} />
            <Route path="/blog/Osprey" element={<OspreyPost />} />
            <Route path="/gallery" element={<Gallery />} />
            {/* <Route path="*" element={<NoMatch />} /> */}
          </Routes>
        </React.Fragment>
        <Footer />
      </Router>
    );
  }
}

export default App;
