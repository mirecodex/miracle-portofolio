'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { testimonialsData } from '@/lib/dummy-data'
import { Quote, ChevronLeft, ChevronRight } from 'lucide-react'

export default function Testimonials() {
  const [current, setCurrent] = useState(0)
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true,
  })

  // Auto-slide every 5 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent(prev => (prev + 1) % testimonialsData.length)
    }, 5000)
    
    return () => clearInterval(timer)
  }, [])

  const next = () => {
    setCurrent(prev => (prev + 1) % testimonialsData.length)
  }

  const prev = () => {
    setCurrent(prev => (prev - 1 + testimonialsData.length) % testimonialsData.length)
  }

  return (
    <section id="testimonials" className="bg-dark-800 py-20 overflow-hidden">
      <div className="section-container" ref={ref}>
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="heading-lg mb-4">
            <span className="orange-gradient">Client Testimonials</span>
          </h2>
          <p className="text-lg text-gray-300 max-w-3xl mx-auto">
            Feedback from clients and colleagues I've worked with over the years.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="max-w-5xl mx-auto px-4"
        >
          <div className="relative">
            {testimonialsData.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0 }}
                animate={{ opacity: current === index ? 1 : 0 }}
                transition={{ duration: 0.5 }}
                className={`${current === index ? 'block' : 'hidden'}`}
              >
                <div className="bg-dark-700 rounded-xl p-8 md:p-12 shadow-lg relative">
                  <Quote className="absolute top-6 left-6 text-primary-500 h-12 w-12 opacity-25" />
                  
                  <div className="ml-8 mt-8">
                    <p className="text-xl text-gray-300 italic mb-8">
                      "{testimonial.content}"
                    </p>
                    
                    <div className="flex items-center">
                      <div className="relative w-16 h-16 rounded-full overflow-hidden mr-4 border-2 border-primary-500/50 bg-primary-500/50 flex items-center justify-center">
                        <span className="text-xl font-bold text-white">
                          {testimonial.name.split(' ').map(n => n[0]).join('')}
                        </span>
                      </div>
                      <div>
                        <h4 className="font-bold text-lg">{testimonial.name}</h4>
                        <p className="text-sm text-primary-500">{testimonial.role}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
          
          <div className="flex justify-center mt-8">
            <button 
              onClick={prev}
              className="w-10 h-10 flex items-center justify-center rounded-full bg-dark-700 hover:bg-primary-500 text-white transition-colors mr-4"
              aria-label="Previous testimonial"
            >
              <ChevronLeft size={20} />
            </button>
            <button 
              onClick={next}
              className="w-10 h-10 flex items-center justify-center rounded-full bg-dark-700 hover:bg-primary-500 text-white transition-colors"
              aria-label="Next testimonial"
            >
              <ChevronRight size={20} />
            </button>
          </div>

          {/* Indicators */}
          <div className="flex justify-center space-x-2 mt-4">
            {testimonialsData.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrent(index)}
                className={`w-3 h-3 rounded-full transition-colors ${
                  current === index ? 'bg-primary-500' : 'bg-dark-600'
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
