import React from 'react';

interface CardProps {
    title: string;
    description: string;
    imageUrl: string;
    link: string;
}

const Card: React.FC<CardProps> = ({ title, description, imageUrl, link }) => {
    return (
        <div className="max-w-sm rounded overflow-hidden shadow-lg bg-gray-800 text-white">
            <img className="w-full" src={imageUrl} alt={title} />
            <div className="px-6 py-4">
                <div className="font-bold text-xl mb-2">{title}</div>
                <p className="text-gray-400 text-base">{description}</p>
            </div>
            <div className="px-6 pt-4 pb-2">
                <a href={link} className="inline-block bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-4 rounded">
                    View More
                </a>
            </div>
        </div>
    );
};

export default Card;