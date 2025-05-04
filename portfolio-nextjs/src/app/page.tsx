import React from 'react';
import Hero from '../components/sections/Hero';
import ProjectShowcase from '../components/sections/ProjectShowcase';
import Contact from '../components/sections/Contact';

const HomePage = () => {
    return (
        <main className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white">
            <Hero />
            <ProjectShowcase />
            <Contact />
        </main>
    );
};

export default HomePage;