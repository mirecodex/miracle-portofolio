import React from 'react';
import Link from 'next/link';

const Header: React.FC = () => {
    return (
        <header className="bg-dark-gray text-white p-4">
            <div className="container mx-auto flex justify-between items-center">
                <h1 className="text-2xl font-bold">My Portfolio</h1>
                <nav>
                    <ul className="flex space-x-4">
                        <li>
                            <Link href="/" className="hover:text-orange">Home</Link>
                        </li>
                        <li>
                            <Link href="/about" className="hover:text-orange">About</Link>
                        </li>
                        <li>
                            <Link href="/projects" className="hover:text-orange">Projects</Link>
                        </li>
                        <li>
                            <Link href="/contact" className="hover:text-orange">Contact</Link>
                        </li>
                        <li>
                            <Link href="/blog" className="hover:text-orange">Blog</Link>
                        </li>
                    </ul>
                </nav>
            </div>
        </header>
    );
};

export default Header;