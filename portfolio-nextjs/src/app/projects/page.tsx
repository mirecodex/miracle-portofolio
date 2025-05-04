import React from 'react';
import ProjectShowcase from '@/components/sections/ProjectShowcase';

const ProjectsPage = () => {
    return (
        <div className="min-h-screen bg-gray-900 text-white">
            <header className="py-10 text-center">
                <h1 className="text-4xl font-bold text-orange-500">My Projects</h1>
                <p className="mt-4 text-lg">Explore the projects I've worked on.</p>
            </header>
            <main className="px-4">
                <ProjectShowcase />
            </main>
        </div>
    );
};

export default ProjectsPage;