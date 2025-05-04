'use client'

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { personalData } from '@/lib/dummy-data';
import Image from 'next/image';
import { useTheme } from 'next-themes';
import { NeumorphCard } from '@/components/ui/neumorph-card';

export default function ModernProfilePhoto() {
  const [hovered, setHovered] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  // Handle mouse movement for 3D tilt effect
  const handleMouseMove = (e: React.MouseEvent) => {
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - left) / width - 0.5;
    const y = (e.clientY - top) / height - 0.5;
    setMousePosition({ x, y });
  };

  // Animated particles around the profile
  const particleCount = 10;
  const [particles, setParticles] = useState<{ x: number, y: number, delay: number, duration: number }[]>([]);

  useEffect(() => {
    if (hovered) {
      const newParticles = Array.from({ length: particleCount }).map(() => ({
        x: Math.random() * 200 - 100,
        y: Math.random() * 200 - 100,
        delay: Math.random() * 0.5,
        duration: Math.random() * 1 + 1
      }));
      setParticles(newParticles);
    }
  }, [hovered]);

  return (
    <div className="relative w-full max-w-md mx-auto">
      {/* Decorative elements */}
      <div className="absolute w-full h-full">
        <motion.div 
          className={`absolute -top-10 -right-10 w-64 h-64 rounded-full ${
            isDark ? 'bg-primary-500/10' : 'bg-primary-400/10'
          } blur-[80px] z-0`}
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.3, 0.4, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            repeatType: "reverse"
          }}
        />
        
        <motion.div 
          className={`absolute -bottom-16 -left-16 w-80 h-80 rounded-full ${
            isDark ? 'bg-primary-700/10' : 'bg-primary-600/8'
          } blur-[100px] z-0`}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.4, 0.3],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            repeatType: "reverse",
            delay: 1
          }}
        />
      </div>
      
      {/* Modern neumorphic profile frame */}
      <NeumorphCard 
        depth="high" 
        rounded="lg"
        className="relative z-10 perspective overflow-hidden"
        interactive={true}
      >
        <div className="group"
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
        >
          {/* Profile image with custom outline and enhanced shadow */}
          <motion.div
            className="transform-style-3d relative overflow-hidden rounded-xl z-10"
            animate={{ 
              z: hovered ? 20 : 0,
            }}
            transition={{ type: "spring", stiffness: 400, damping: 40 }}
          >
            <div className="relative h-[400px] w-full overflow-hidden">
              {personalData.profileImage ? (
                <>
                  {/* Duplicate image for outline effect that exactly matches photo shape */}
                  <div className="absolute inset-0 z-0">
                    <Image
                      src={personalData.profileImage}
                      alt=""
                      fill
                      className="object-cover scale-[1.03]"
                      style={{
                        filter: 'blur(4px) brightness(0.7) drop-shadow(0 0 8px rgba(59, 130, 246, 0.8))'
                      }}
                    />
                  </div>

                  {/* Actual image */}
                  <Image
                    src={personalData.profileImage}
                    alt={personalData.name}
                    fill
                    className="object-cover transform transition-transform duration-700 relative z-10 group-hover:scale-110"
                    priority
                    sizes="(max-width: 768px) 100vw, 400px"
                  />
                </>
              ) : (
                <div className="absolute inset-0 bg-gradient-to-br from-primary-500 to-primary-700 flex items-center justify-center">
                  <div className="text-white text-5xl font-bold">
                    {personalData.name.split(' ').map(n => n[0]).join('')}
                  </div>
                </div>
              )}
            </div>
            
            {/* Subtle pulsing glow */}
            <motion.div 
              className="absolute inset-0 pointer-events-none z-5"
              animate={{ 
                boxShadow: ['0 0 10px 0px rgba(59, 130, 246, 0.3)', 
                            '0 0 15px 2px rgba(59, 130, 246, 0.5)', 
                            '0 0 10px 0px rgba(59, 130, 246, 0.3)']
              }}
              transition={{ 
                duration: 2,
                repeat: Infinity,
                repeatType: "reverse" 
              }}
            />
          </motion.div>
          
          {/* Interactive overlay - moved to bottom with improved styling */}
          <AnimatePresence>
            {hovered && (
              <motion.div 
                className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent flex flex-col justify-end p-6 backdrop-blur-sm z-20"
                initial={{ opacity: 0, height: '0%' }}
                animate={{ opacity: 1, height: '40%' }}
                exit={{ opacity: 0, height: '0%' }}
                transition={{ duration: 0.3 }}
              >
                <motion.div className="relative overflow-hidden">
                  <motion.h3 
                    className="text-2xl font-bold text-white mb-1"
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.1 }}
                  >
                    {personalData.name}
                  </motion.h3>
                  <motion.p 
                    className="text-primary-300 mb-3"
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                  >
                    {personalData.role}
                  </motion.p>
                  <motion.div 
                    className="flex gap-2"
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.3 }}
                  >
                    {personalData.socials && Object.entries(personalData.socials).slice(0, 3).map(([platform], index) => (
                      <motion.a
                        key={platform}
                        className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center hover:bg-primary-500 transition-all"
                        whileHover={{ y: -2, scale: 1.1 }}
                        href={personalData.socials?.[platform] || '#'}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {platform === 'github' && (
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>
                        )}
                      </motion.a>
                    ))}
                  </motion.div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
          
          {/* Animated particles */}
          <AnimatePresence>
            {hovered && [...Array(10)].map((_, index) => (
              <motion.div
                key={index}
                className="absolute w-1 h-1 rounded-full bg-primary-500"
                initial={{ 
                  x: 0, 
                  y: 0, 
                  opacity: 0,
                  scale: 0
                }}
                animate={{ 
                  x: Math.random() * 400 - 200, 
                  y: Math.random() * 400 - 200,
                  opacity: [0, 0.8, 0],
                  scale: [0, 1.5, 0]
                }}
                exit={{ opacity: 0 }}
                transition={{ 
                  duration: Math.random() * 1 + 1,
                  delay: Math.random() * 0.3,
                  ease: "easeOut"
                }}
                style={{
                  top: "50%",
                  left: "50%",
                }}
              />
            ))}
          </AnimatePresence>
        </div>
      </NeumorphCard>
      
      {/* Enhanced shadow underneath the photo */}
      <div 
        className="absolute -bottom-4 left-[10%] right-[10%] h-10 blur-xl bg-black/25 rounded-full z-0"
        style={{ transform: 'perspective(1000px) rotateX(75deg)' }}
      ></div>
      
      {/* Modern decorative elements */}
      <motion.div
        className="absolute -bottom-6 -right-6 w-12 h-12"
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.5, duration: 0.5 }}
      >
        <NeumorphCard className="w-full h-full" rounded="lg" interactive>
          <div className="w-full h-full flex items-center justify-center">
            <motion.div 
              className="w-5 h-5 rounded-full bg-primary-500"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </div>
        </NeumorphCard>
      </motion.div>
      
      <motion.div
        className="absolute -top-6 -left-6 w-16 h-16"
        initial={{ opacity: 0, rotate: -45, scale: 0 }}
        animate={{ opacity: 1, rotate: 0, scale: 1 }}
        transition={{ delay: 0.6, duration: 0.5 }}
      >
        <NeumorphCard className="w-full h-full p-2" rounded="lg" interactive>
          <div className="w-full h-full border-2 border-dashed border-primary-500/50 rounded-lg flex items-center justify-center">
            <motion.div 
              className="text-primary-500 text-xl font-bold"
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            >
              +
            </motion.div>
          </div>
        </NeumorphCard>
      </motion.div>
    </div>
  )
}
