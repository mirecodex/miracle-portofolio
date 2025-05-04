import React from 'react';

const Contact = () => {
    return (
        <section className="bg-gray-800 text-white py-20">
            <div className="container mx-auto px-4">
                <h2 className="text-3xl font-bold text-center mb-8">Get in Touch</h2>
                <p className="text-center mb-12">I would love to hear from you! Please fill out the form below or reach out via email.</p>
                <form className="max-w-lg mx-auto bg-gray-700 p-8 rounded-lg shadow-lg">
                    <div className="mb-4">
                        <label className="block text-sm font-semibold mb-2" htmlFor="name">Name</label>
                        <input className="w-full p-2 rounded bg-gray-600 text-white" type="text" id="name" required />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-semibold mb-2" htmlFor="email">Email</label>
                        <input className="w-full p-2 rounded bg-gray-600 text-white" type="email" id="email" required />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-semibold mb-2" htmlFor="message">Message</label>
                        <textarea className="w-full p-2 rounded bg-gray-600 text-white" id="message" rows="4" required></textarea>
                    </div>
                    <button className="w-full bg-orange-500 text-white font-bold py-2 rounded hover:bg-orange-400 transition duration-300" type="submit">Send Message</button>
                </form>
            </div>
        </section>
    );
};

export default Contact;