import React from 'react';
import Link from 'next/link';

const Navbar: React.FC = () => {
    return (
        <nav className="bg-dark-gray p-4">
            <div className="container mx-auto flex justify-between items-center">
                <div className="text-orange text-2xl font-bold">
                    <Link href="/">My Portfolio</Link>
                </div>
                <ul className="flex space-x-4">
                    <li>
                        <Link href="/" className="text-white hover:text-orange">Home</Link>
                    </li>
                    <li>
                        <Link href="/about" className="text-white hover:text-orange">About</Link>
                    </li>
                    <li>
                        <Link href="/projects" className="text-white hover:text-orange">Projects</Link>
                    </li>
                    <li>
                        <Link href="/contact" className="text-white hover:text-orange">Contact</Link>
                    </li>
                    <li>
                        <Link href="/blog" className="text-white hover:text-orange">Blog</Link>
                    </li>
                </ul>
            </div>
        </nav>
    );
};

export default Navbar;