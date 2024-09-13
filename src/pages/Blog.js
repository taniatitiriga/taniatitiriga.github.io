import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PostFilter from '../components/postFilter';
import PostCard from '../components/postCard';
import GoBackButton from '../components/goBackButton';



const listPosts = [
    { id: 3, title: 'DiverOSINT CTF writeup', date: 'June 8, 2024', tags: ['OSINT', 'AIP'], path: '/blog/Osprey' },
    { id: 2, title: 'UNbreakable CTF writeup', date: 'April 7, 2024', tags: ['Cryptography', 'SHA512'], path: '/blog/Krotate' },
    { id: 1, title: 'BSides CTF writeup', date: 'March 3, 2024', tags: ['Cryptography', 'Reverse Hashing'], path: '/blog/HashBreaker' },
    // Add other posts
];

export const Blog = () => {
    const navigate = useNavigate();
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [selectedTag, setSelectedTag] = useState('');

    const uniqueTags = [...new Set(listPosts.flatMap((post) => post.tags))];
    const handleCardClick = (path) => navigate(path);

    const filteredPosts = selectedTag
        ? listPosts.filter((post) => post.tags.includes(selectedTag))
        : listPosts;

    return (
        <div className="bg-gray-100 min-h-screen py-12">
            <div className="container mx-auto flex flex-col lg:flex-row">
                <PostFilter
                    dropdownOpen={dropdownOpen}
                    setDropdownOpen={setDropdownOpen}
                    uniqueTags={uniqueTags}
                    selectedTag={selectedTag}
                    setSelectedTag={setSelectedTag}
                />
                <div className="lg:w-3/4 w-full">
                    <div className="text-center mb-6">
                        <h2 className="text-3xl font-bold">All Posts</h2>
                    </div>
                    <div className="flex flex-col items-center">
                        {filteredPosts.map((post) => (
                            <PostCard
                                key={post.id}
                                post={post}
                                onClick={() => handleCardClick(post.path)}
                            />
                        ))}
                    </div>
                </div>
                <GoBackButton path="/" />
            </div>
        </div>
    );
};
