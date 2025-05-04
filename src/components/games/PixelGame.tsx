'use client'

import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { X } from 'lucide-react'
import { useTheme } from 'next-themes'

interface GameState {
  playerPosition: { x: number, y: number };
  obstacles: { x: number, y: number }[];
  isPlaying: boolean;
  score: number;
  gameOver: boolean;
}

export default function PixelGame() {
  const [isOpen, setIsOpen] = useState(false)
  const [gameState, setGameState] = useState<GameState>({
    playerPosition: { x: 5, y: 10 },
    obstacles: [],
    isPlaying: false,
    score: 0,
    gameOver: false
  })
  const gameLoopRef = useRef<number | null>(null)
  const { theme } = useTheme()
  const isDark = theme === 'dark'
  
  const canvasSize = { width: 300, height: 400 }
  const gridSize = 20
  const playerSize = gridSize - 2
  
  // Game initialization
  const startGame = () => {
    setGameState({
      playerPosition: { x: Math.floor(canvasSize.width / 2 / gridSize), y: Math.floor(canvasSize.height * 0.8 / gridSize) },
      obstacles: [],
      isPlaying: true,
      score: 0,
      gameOver: false
    })
  }
  
  // Game loop
  useEffect(() => {
    if (!gameState.isPlaying) return
    
    const gameLoop = () => {
      setGameState(prevState => {
        // Update player position based on keys
        let newPlayerPosition = { ...prevState.playerPosition }
        
        // Move existing obstacles down
        const updatedObstacles = prevState.obstacles.map(obs => ({ 
          x: obs.x,
          y: obs.y + 1
        })).filter(obs => obs.y < canvasSize.height / gridSize)
        
        // Generate new obstacles randomly
        if (Math.random() < 0.1) {
          const newObstacleX = Math.floor(Math.random() * (canvasSize.width / gridSize))
          updatedObstacles.push({ x: newObstacleX, y: 0 })
        }
        
        // Check for collisions
        const collision = updatedObstacles.some(
          obs => obs.x === prevState.playerPosition.x && obs.y === prevState.playerPosition.y
        )
        
        if (collision) {
          return {
            ...prevState,
            isPlaying: false,
            gameOver: true
          }
        }
        
        // Update score
        const newScore = prevState.score + 1
        
        return {
          ...prevState,
          obstacles: updatedObstacles,
          score: newScore
        }
      })
      
      gameLoopRef.current = requestAnimationFrame(gameLoop)
    }
    
    gameLoopRef.current = requestAnimationFrame(gameLoop)
    
    return () => {
      if (gameLoopRef.current) {
        cancelAnimationFrame(gameLoopRef.current)
      }
    }
  }, [gameState.isPlaying])
  
  // Keyboard controls
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!gameState.isPlaying) return
      
      setGameState(prevState => {
        let newX = prevState.playerPosition.x
        
        if (e.key === 'ArrowLeft' && newX > 0) {
          newX -= 1
        } else if (e.key === 'ArrowRight' && newX < (canvasSize.width / gridSize) - 1) {
          newX += 1
        }
        
        return {
          ...prevState,
          playerPosition: {
            ...prevState.playerPosition,
            x: newX
          }
        }
      })
    }
    
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [gameState.isPlaying])
  
  // Mobile touch controls
  const handleTouchMove = (e: React.TouchEvent) => {
    if (!gameState.isPlaying) return
    
    const touch = e.touches[0]
    const gameCanvas = e.currentTarget.getBoundingClientRect()
    const touchX = touch.clientX - gameCanvas.left
    
    setGameState(prevState => {
      const gridX = Math.floor(touchX / gridSize)
      const boundedX = Math.max(0, Math.min(gridX, (canvasSize.width / gridSize) - 1))
      
      return {
        ...prevState,
        playerPosition: {
          ...prevState.playerPosition,
          x: boundedX
        }
      }
    })
  }
  
  return (
    <>
      {/* Game toggle button */}
      <motion.button
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-24 right-6 z-40 p-3 rounded-full ${
          isDark ? 'bg-dark-800 text-primary-400' : 'bg-light-200 text-primary-600'
        }`}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        title="Play a game"
        aria-label="Open game"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M6 13v-2h6V5h2v6h6v2h-6v6h-2v-6z"/>
        </svg>
      </motion.button>
      
      {/* Game modal */}
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setIsOpen(false)}
          />
          
          {/* Game container */}
          <motion.div 
            className={`relative ${isDark ? 'bg-dark-800' : 'bg-light-100'} p-4 rounded-xl shadow-xl max-w-sm w-full overflow-hidden border ${isDark ? 'border-dark-700' : 'border-light-300'}`}
            initial={{ scale: 0.9, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            transition={{ type: 'spring', damping: 15 }}
          >
            {/* Close button */}
            <button 
              onClick={() => setIsOpen(false)} 
              className="absolute top-2 right-2 p-1 rounded-full hover:bg-black/10 z-10"
              aria-label="Close game"
            >
              <X size={20} />
            </button>
            
            <h3 className={`text-xl font-bold mb-4 ${isDark ? 'text-white' : 'text-dark-900'}`}>
              Pixel Dodge Game
            </h3>
            
            {/* Game canvas */}
            <div 
              className={`relative w-[300px] h-[400px] mx-auto mb-4 overflow-hidden ${isDark ? 'bg-dark-900' : 'bg-light-200'} rounded-lg border ${isDark ? 'border-dark-700' : 'border-light-300'}`}
              onTouchMove={handleTouchMove}
            >
              {/* Player */}
              <motion.div
                className={`absolute rounded-sm ${isDark ? 'bg-primary-500' : 'bg-primary-600'}`}
                style={{
                  width: playerSize,
                  height: playerSize,
                  left: gameState.playerPosition.x * gridSize + 1,
                  top: gameState.playerPosition.y * gridSize + 1,
                }}
                animate={{
                  left: gameState.playerPosition.x * gridSize + 1,
                }}
                transition={{ type: 'spring', damping: 20, stiffness: 300 }}
              />
              
              {/* Obstacles */}
              {gameState.obstacles.map((obs, index) => (
                <div
                  key={index}
                  className="absolute bg-red-500 rounded-sm"
                  style={{
                    width: playerSize,
                    height: playerSize,
                    left: obs.x * gridSize + 1,
                    top: obs.y * gridSize + 1,
                  }}
                />
              ))}
              
              {/* Game over overlay */}
              {gameState.gameOver && (
                <div className="absolute inset-0 bg-black/70 flex flex-col items-center justify-center">
                  <p className="text-white text-2xl font-bold mb-4">Game Over!</p>
                  <p className="text-white mb-6">Score: {gameState.score}</p>
                  <button
                    onClick={startGame}
                    className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700"
                  >
                    Play Again
                  </button>
                </div>
              )}
              
              {/* Start screen */}
              {!gameState.isPlaying && !gameState.gameOver && (
                <div className="absolute inset-0 bg-black/70 flex flex-col items-center justify-center">
                  <p className="text-white text-xl font-bold mb-6">Dodge the falling blocks!</p>
                  <button
                    onClick={startGame}
                    className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700"
                  >
                    Start Game
                  </button>
                </div>
              )}
            </div>
            
            {/* Score */}
            {gameState.isPlaying && (
              <p className={`text-center ${isDark ? 'text-gray-300' : 'text-dark-700'}`}>
                Score: {gameState.score}
              </p>
            )}
            
            {/* Instructions */}
            <div className={`text-sm mt-4 ${isDark ? 'text-gray-400' : 'text-dark-600'}`}>
              <p>Use left/right arrow keys or touch to move.</p>
              <p>Avoid the red blocks falling from above!</p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </>
  )
}
