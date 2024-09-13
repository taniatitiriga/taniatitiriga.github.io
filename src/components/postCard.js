import React from 'react';

const PostCard = ({ post, onClick }) => {
    return (
        <div
            className="bg-white w-11/12 max-w-xl mb-4 p-4 rounded-lg shadow-md cursor-pointer hover:bg-gray-100 transition"
            onClick={onClick}
        >
            <h2 className="text-xl font-semibold mb-2">{post.title}</h2>
            <p className="text-m text-slate-700 mb-2">{post.date}</p>
            <div className="flex flex-wrap gap-2">
                {post.tags.map((tag) => (
                    <span
                        key={tag}
                        className="bg-lightwisteria text-indigo text-sm font-medium py-1 px-2 rounded"
                    >
                        {tag}
                    </span>
                ))}
            </div>
        </div>
    );
};

export default PostCard;
