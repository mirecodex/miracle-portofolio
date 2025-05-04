import React from 'react';

const Hero: React.FC = () => {
    return (
        <section className="flex items-center justify-center h-screen bg-gray-800 text-white">
            <div className="text-center">
                <h1 className="text-5xl font-bold mb-4">Welcome to My Portfolio</h1>
                <p className="text-lg mb-8">Showcasing my work and experiences in the tech industry.</p>
                <a href="#projects" className="bg-orange-500 text-gray-800 px-6 py-3 rounded-lg shadow-lg hover:bg-orange-400 transition duration-300">
                    View My Projects
                </a>
            </div>
        </section>
    );
};

export default Hero;