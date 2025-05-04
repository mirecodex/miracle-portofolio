import React from 'react';
import Card from '../ui/Card';

const projects = [
  {
    title: 'Project One',
    description: 'A brief description of Project One.',
    link: '#',
  },
  {
    title: 'Project Two',
    description: 'A brief description of Project Two.',
    link: '#',
  },
  {
    title: 'Project Three',
    description: 'A brief description of Project Three.',
    link: '#',
  },
];

const ProjectShowcase: React.FC = () => {
  return (
    <section className="py-16 bg-gray-900 text-white">
      <div className="container mx-auto text-center">
        <h2 className="text-4xl font-bold mb-8 text-orange-500">Projects Showcase</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <Card key={index} title={project.title} description={project.description} link={project.link} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectShowcase;