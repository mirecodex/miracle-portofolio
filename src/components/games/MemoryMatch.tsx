'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useTheme } from 'next-themes'
import { GlassCard } from '@/components/ui/glass-card'
import { LiquidButton } from '@/components/ui/liquid-button'

// Programming icons for the memory game
const programmingIcons = [
  { id: 'react', icon: '⚛️', name: 'React' },
  { id: 'js', icon: 'JS', name: 'JavaScript' },
  { id: 'ts', icon: 'TS', name: 'TypeScript' },
  { id: 'python', icon: '🐍', name: 'Python' },
  { id: 'node', icon: 'Node', name: 'Node.js' },
  { id: 'html', icon: 'HTML', name: 'HTML' },
  { id: 'css', icon: 'CSS', name: 'CSS' },
  { id: 'git', icon: 'Git', name: 'Git' },
  { id: 'db', icon: 'DB', name: 'Database' },
  { id: 'api', icon: 'API', name: 'API' },
]

interface Card {
  id: string
  icon: string
  name: string
  isFlipped: boolean
  isMatched: boolean
}

export default function MemoryMatch() {
  const { theme } = useTheme()
  const isDark = theme === 'dark'
  const [cards, setCards] = useState<Card[]>([])
  const [flippedCards, setFlippedCards] = useState<number[]>([])
  const [moves, setMoves] = useState(0)
  const [gameStarted, setGameStarted] = useState(false)
  const [gameCompleted, setGameCompleted] = useState(false)
  const [timer, setTimer] = useState(0)
  const [difficulty, setDifficulty] = useState<'easy' | 'medium' | 'hard'>('medium')
  const [bestScore, setBestScore] = useState<number | null>(null)
  
  // Initialize the game
  const initializeGame = () => {
    // Select icons based on difficulty
    const pairsCount = difficulty === 'easy' ? 4 : difficulty === 'medium' ? 6 : 8
    const selectedIcons = [...programmingIcons].sort(() => 0.5 - Math.random()).slice(0, pairsCount)
    
    // Create pairs
    const cardPairs = [...selectedIcons, ...selectedIcons]
      .sort(() => Math.random() - 0.5)
      .map((item, index) => ({
        ...item,
        id: `${item.id}-${index}`,
        isFlipped: false,
        isMatched: false,
      }))
    
    setCards(cardPairs)
    setFlippedCards([])
    setMoves(0)
    setTimer(0)
    setGameStarted(true)
    setGameCompleted(false)
  }
  
  // Handle card click
  const handleCardClick = (index: number) => {
    // Prevent clicking if already flipped or if 2 cards are already flipped
    if (
      cards[index].isFlipped || 
      cards[index].isMatched || 
      flippedCards.length >= 2
    ) {
      return
    }
    
    // Flip the card
    const newCards = [...cards]
    newCards[index].isFlipped = true
    setCards(newCards)
    
    // Add to flipped cards
    const newFlipped = [...flippedCards, index]
    setFlippedCards(newFlipped)
    
    // If two cards are flipped, check for match
    if (newFlipped.length === 2) {
      setMoves(moves + 1)
      
      // Check if cards match
      const [first, second] = newFlipped
      if (cards[first].name === cards[second].name) {
        // Cards match
        setTimeout(() => {
          const matchedCards = [...cards]
          matchedCards[first].isMatched = true
          matchedCards[second].isMatched = true
          setCards(matchedCards)
          setFlippedCards([])
          
          // Check if game is completed
          if (matchedCards.every(card => card.isMatched)) {
            setGameCompleted(true)
            // Save score if it's better than previous best
            const currentScore = moves + 1
            if (bestScore === null || currentScore < bestScore) {
              setBestScore(currentScore)
              localStorage.setItem(`bestScore-${difficulty}`, currentScore.toString())
            }
          }
        }, 500)
      } else {
        // Cards don't match, flip them back
        setTimeout(() => {
          const unmatchedCards = [...cards]
          unmatchedCards[first].isFlipped = false
          unmatchedCards[second].isFlipped = false
          setCards(unmatchedCards)
          setFlippedCards([])
        }, 1000)
      }
    }
  }
  
  // Timer effect
  useEffect(() => {
    let interval: NodeJS.Timeout
    
    if (gameStarted && !gameCompleted) {
      interval = setInterval(() => {
        setTimer(prevTimer => prevTimer + 1)
      }, 1000)
    }
    
    return () => {
      if (interval) clearInterval(interval)
    }
  }, [gameStarted, gameCompleted])
  
  // Load best score from localStorage
  useEffect(() => {
    const savedBestScore = localStorage.getItem(`bestScore-${difficulty}`)
    if (savedBestScore) {
      setBestScore(parseInt(savedBestScore, 10))
    } else {
      setBestScore(null)
    }
  }, [difficulty])
  
  return (
    <section id="game" className={`py-20 ${isDark ? 'bg-dark-800' : 'bg-light-200'}`}>
      <div className="container mx-auto px-4">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-4xl font-bold mb-4">
            <span className="blue-gradient">Memory Match Challenge</span>
          </h2>
          <p className={`text-lg max-w-2xl mx-auto ${isDark ? 'text-gray-300' : 'text-dark-600'}`}>
            Test your memory by matching programming technologies. Flip cards and find matching pairs in as few moves as possible.
          </p>
        </motion.div>
        
        <div className="max-w-3xl mx-auto">
          {/* Game controls */}
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            <GlassCard className="px-4 py-3">
              <div className="flex items-center space-x-2">
                <span className={isDark ? 'text-gray-300' : 'text-dark-700'}>Difficulty:</span>
                <div className="flex rounded-lg overflow-hidden">
                  {(['easy', 'medium', 'hard'] as const).map((level) => (
                    <button
                      key={level}
                      onClick={() => setDifficulty(level)}
                      className={`px-3 py-1 text-sm transition-all ${
                        difficulty === level
                          ? 'bg-primary-500 text-white'
                          : isDark 
                            ? 'bg-dark-700 text-gray-300 hover:bg-dark-600' 
                            : 'bg-light-300 text-dark-700 hover:bg-light-400'
                      }`}
                    >
                      {level.charAt(0).toUpperCase() + level.slice(1)}
                    </button>
                  ))}
                </div>
              </div>
            </GlassCard>
            
            {gameStarted && (
              <GlassCard className="px-4 py-3">
                <div className="flex items-center space-x-4">
                  <div className="text-center">
                    <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-dark-600'}`}>Moves</p>
                    <p className="text-xl font-bold text-primary-500">{moves}</p>
                  </div>
                  <div className="text-center">
                    <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-dark-600'}`}>Time</p>
                    <p className="text-xl font-bold text-primary-500">{timer}s</p>
                  </div>
                  {bestScore !== null && (
                    <div className="text-center">
                      <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-dark-600'}`}>Best</p>
                      <p className="text-xl font-bold text-primary-500">{bestScore}</p>
                    </div>
                  )}
                </div>
              </GlassCard>
            )}
          </div>
          
          {/* Game board or start screen */}
          {!gameStarted ? (
            <div className="text-center py-10">
              <motion.div
                className="mb-8"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 260, damping: 20 }}
              >
                <div className={`text-6xl ${isDark ? 'text-primary-500' : 'text-primary-600'}`}>
                  🧠
                </div>
                <h3 className="text-2xl font-bold mt-4">Ready to test your memory?</h3>
                <p className={`mt-2 ${isDark ? 'text-gray-400' : 'text-dark-600'}`}>
                  Match programming technologies in as few moves as possible
                </p>
              </motion.div>
              <LiquidButton onClick={initializeGame} variant="primary" size="lg">
                Start Game
              </LiquidButton>
            </div>
          ) : gameCompleted ? (
            <div className="text-center py-10">
              <motion.div
                className="mb-8"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 260, damping: 20 }}
              >
                <div className="text-6xl">🎉</div>
                <h3 className="text-2xl font-bold mt-4">
                  Congratulations! You've completed the game!
                </h3>
                <div className="mt-4 flex justify-center gap-4">
                  <GlassCard className="px-4 py-2 text-center">
                    <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-dark-600'}`}>Total Moves</p>
                    <p className="text-xl font-bold text-primary-500">{moves}</p>
                  </GlassCard>
                  <GlassCard className="px-4 py-2 text-center">
                    <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-dark-600'}`}>Time</p>
                    <p className="text-xl font-bold text-primary-500">{timer}s</p>
                  </GlassCard>
                </div>
                {bestScore === moves && (
                  <p className="text-lg text-primary-500 font-bold mt-4">
                    🏆 New Best Score! 🏆
                  </p>
                )}
              </motion.div>
              <LiquidButton onClick={initializeGame} variant="primary" size="lg">
                Play Again
              </LiquidButton>
            </div>
          ) : (
            <div className="flex justify-center">
              <div 
                className={`grid gap-4 ${
                  difficulty === 'easy' ? 'grid-cols-4' : 
                  difficulty === 'medium' ? 'grid-cols-4' : 
                  'grid-cols-4 md:grid-cols-5'
                }`}
              >
                {cards.map((card, index) => (
                  <motion.div
                    key={card.id}
                    initial={{ opacity: 0, rotateY: 180 }}
                    animate={{ opacity: 1, rotateY: 0 }}
                    transition={{ delay: index * 0.05, duration: 0.3 }}
                    className="perspective"
                  >
                    <div 
                      onClick={() => handleCardClick(index)}
                      className="w-16 h-16 md:w-20 md:h-20 cursor-pointer transform-style-3d transition-all duration-500"
                      style={{
                        transform: card.isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
                      }}
                    >
                      {/* Card back */}
                      <GlassCard 
                        className="absolute inset-0 flex items-center justify-center backface-hidden h-full"
                        interactive={false}
                        intensity="high"
                      >
                        <div className="text-2xl text-primary-500">?</div>
                      </GlassCard>
                      
                      {/* Card front */}
                      <GlassCard 
                        className={`absolute inset-0 flex items-center justify-center backface-hidden h-full transform rotate-y-180 ${
                          card.isMatched ? 'bg-primary-500/20 border-primary-500/30' : ''
                        }`}
                        interactive={false}
                        glowColor={card.isMatched ? 'rgba(59, 130, 246, 0.7)' : undefined}
                      >
                        <div className={`text-2xl ${card.isMatched ? 'text-primary-400' : isDark ? 'text-gray-200' : 'text-dark-700'}`}>
                          {card.icon}
                        </div>
                      </GlassCard>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
