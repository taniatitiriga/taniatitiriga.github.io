// src/pages/artblog.js
import React from 'react';
import { artPosts } from '../components/ArtPosts';
import GoBackButton from '../components/goBackButton';



const ArtBlog = () => {
    return (
        <div className="bg-gray-100 min-h-screen py-12">
            <div className="max-w-4xl mx-auto px-4">
                <div className="bg-white p-8 rounded-lg shadow-md">
                    <h1 className="text-3xl font-bold mb-4">Art Blog</h1>
                    {artPosts.map(post => (
                        <div key={post.id} className="my-4">
                            <h2 className="text-xl font-semibold mb-2">{post.title}</h2>
                            <p>{post.content}</p>
                        </div>
                    ))}
                </div>
            </div>
            <GoBackButton path="/" />
        </div>
    );
};

export default ArtBlog;
