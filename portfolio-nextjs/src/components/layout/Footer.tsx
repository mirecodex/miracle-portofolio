import React from 'react';

const Footer: React.FC = () => {
    return (
        <footer className="bg-dark-gray text-white py-6">
            <div className="container mx-auto text-center">
                <p className="text-sm">
                    &copy; {new Date().getFullYear()} Your Name. All rights reserved.
                </p>
                <div className="flex justify-center space-x-4 mt-2">
                    <a href="/about" className="text-orange hover:underline">About</a>
                    <a href="/projects" className="text-orange hover:underline">Projects</a>
                    <a href="/contact" className="text-orange hover:underline">Contact</a>
                    <a href="/blog" className="text-orange hover:underline">Blog</a>
                </div>
            </div>
        </footer>
    );
};

export default Footer;