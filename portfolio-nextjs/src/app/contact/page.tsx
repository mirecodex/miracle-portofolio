import React from 'react';

const ContactPage = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white">
            <h1 className="text-4xl font-bold mb-6">Contact Me</h1>
            <p className="mb-4">I'm always open to discussing new projects or opportunities. Feel free to reach out!</p>
            <form className="w-full max-w-lg">
                <div className="mb-4">
                    <label className="block text-sm font-bold mb-2" htmlFor="name">
                        Name
                    </label>
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="name"
                        type="text"
                        placeholder="Your Name"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-bold mb-2" htmlFor="email">
                        Email
                    </label>
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="email"
                        type="email"
                        placeholder="Your Email"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-bold mb-2" htmlFor="message">
                        Message
                    </label>
                    <textarea
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="message"
                        rows="4"
                        placeholder="Your Message"
                    />
                </div>
                <div className="flex items-center justify-between">
                    <button
                        className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        type="submit"
                    >
                        Send Message
                    </button>
                </div>
            </form>
        </div>
    );
};

export default ContactPage;