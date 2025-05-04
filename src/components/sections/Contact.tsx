'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { personalData } from '@/lib/dummy-data'
import { Mail, Phone, MapPin } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitMessage, setSubmitMessage] = useState('')
  const [submitSuccess, setSubmitSuccess] = useState(false)
  
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true,
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false)
      setSubmitSuccess(true)
      setSubmitMessage('Thank you for your message! I will get back to you soon.')
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      })
    }, 1500)
  }

  return (
    <section id="contact" className="bg-dark-900 py-20">
      <div className="section-container" ref={ref}>
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="heading-lg mb-4">
            <span className="orange-gradient">Get In Touch</span>
          </h2>
          <p className="text-lg text-gray-300 max-w-3xl mx-auto">
            Interested in working together? Feel free to reach out for collaborations or just to say hi!
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="bg-dark-800 rounded-xl p-6 shadow-lg">
              <h3 className="text-2xl font-bold mb-6 pb-4 border-b border-dark-700">Contact Information</h3>
              
              <p className="text-gray-300 mb-8">
                Feel free to reach out through any of these channels. I'm always open to discussing new projects, creative ideas, or opportunities to be part of your vision.
              </p>

              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="bg-dark-700 p-4 rounded-lg mr-4">
                    <Mail className="text-primary-500" />
                  </div>
                  <div>
                    <h4 className="font-medium mb-1">Email</h4>
                    <p className="text-gray-400">{personalData.email}</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-dark-700 p-4 rounded-lg mr-4">
                    <Phone className="text-primary-500" />
                  </div>
                  <div>
                    <h4 className="font-medium mb-1">Phone</h4>
                    <p className="text-gray-400">{personalData.phone}</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-dark-700 p-4 rounded-lg mr-4">
                    <MapPin className="text-primary-500" />
                  </div>
                  <div>
                    <h4 className="font-medium mb-1">Location</h4>
                    <p className="text-gray-400">{personalData.location}</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <div className="bg-dark-800 rounded-xl p-6 shadow-lg">
              <h3 className="text-2xl font-bold mb-6 pb-4 border-b border-dark-700">Send Me a Message</h3>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label htmlFor="name" className="block text-sm font-medium text-gray-300">Name</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full bg-dark-700 border border-dark-600 focus:border-primary-500 rounded-lg p-3 text-white outline-none transition"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label htmlFor="email" className="block text-sm font-medium text-gray-300">Email</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full bg-dark-700 border border-dark-600 focus:border-primary-500 rounded-lg p-3 text-white outline-none transition"
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-300">Subject</label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="w-full bg-dark-700 border border-dark-600 focus:border-primary-500 rounded-lg p-3 text-white outline-none transition"
                  />
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="message" className="block text-sm font-medium text-gray-300">Message</label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    className="w-full bg-dark-700 border border-dark-600 focus:border-primary-500 rounded-lg p-3 text-white outline-none transition resize-none"
                  ></textarea>
                </div>

                {submitMessage && (
                  <div className={`p-4 rounded-md ${submitSuccess ? 'bg-green-900/20 text-green-500' : 'bg-red-900/20 text-red-500'}`}>
                    {submitMessage}
                  </div>
                )}
                
                <Button
                  type="submit"
                  variant="primary"
                  size="lg"
                  className="relative overflow-hidden group"
                  disabled={isSubmitting}
                >
                  <span className="relative z-10 flex items-center">
                    {isSubmitting ? 'Sending...' : 'Send Message'} 
                    {!isSubmitting && <Mail size={16} className="ml-2" />}
                  </span>
                  <span className="absolute inset-0 bg-gradient-to-r from-primary-600 to-primary-500 group-hover:opacity-90 transition-opacity"></span>
                </Button>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
