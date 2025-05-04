import React from 'react';

const AboutPage = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white">
            <h1 className="text-4xl font-bold mb-4 text-orange-500">About Me</h1>
            <p className="max-w-2xl text-center text-lg mb-6">
                I am a passionate web developer with a focus on creating modern and responsive web applications. 
                My journey in tech began with a fascination for coding and design, leading me to explore various 
                technologies and frameworks. I thrive on challenges and enjoy turning complex problems into 
                simple, beautiful, and intuitive designs.
            </p>
            <p className="max-w-2xl text-center text-lg mb-6">
                With experience in Next.js, Tailwind CSS, and other modern web technologies, I am dedicated to 
                delivering high-quality solutions that meet the needs of clients and users alike. 
                Let's connect and create something amazing together!
            </p>
        </div>
    );
};

export default AboutPage;