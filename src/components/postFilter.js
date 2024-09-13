import React from 'react';

const PostFilter = ({ dropdownOpen, setDropdownOpen, uniqueTags, selectedTag, setSelectedTag }) => {
    return (
        <div className="lg:w-1/4 lg:pr-6 w-full mb-6 lg:mb-0">
            <div className="mb-6">
                <h3 className="text-xl font-semibold mb-4">Filter by Tag</h3>
                <div className="relative inline-block text-left w-full">
                    <button
                        type="button"
                        className="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700"
                        onClick={() => setDropdownOpen(!dropdownOpen)}
                    >
                        {selectedTag || 'Select a Tag'}
                        <svg
                            className={`-mr-1 ml-2 h-5 w-5 transform transition-transform duration-300 ${dropdownOpen ? 'rotate-180' : 'rotate-0'}`}
                            viewBox="0 0 20 20"
                            fill="currentColor"
                        >
                            <path
                                fillRule="evenodd"
                                d="M5.292 7.707a1 1 0 011.415 0L10 11.414l3.293-3.707a1 1 0 011.415 0l.086.086a1 1 0 010 1.415l-4 4.001a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.415l.086-.086z"
                                clipRule="evenodd"
                            />
                        </svg>
                    </button>
                    {dropdownOpen && (
                        <div className="origin-top-right mt-2 w-full rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                            <div className="py-1">
                                <button
                                    onClick={() => setSelectedTag('')}
                                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full"
                                >
                                    All
                                </button>
                                {uniqueTags.map((tag) => (
                                    <button
                                        key={tag}
                                        onClick={() => {
                                            setSelectedTag(tag);
                                            setDropdownOpen(false);
                                        }}
                                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full"
                                    >
                                        {tag}
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default PostFilter;
