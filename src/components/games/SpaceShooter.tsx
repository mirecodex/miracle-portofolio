'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useTheme } from 'next-themes'
import { GlassCard } from '@/components/ui/glass-card'
import { LiquidButton } from '@/components/ui/liquid-button'
import { NeumorphCard } from '@/components/ui/neumorph-card'

// Game entities interfaces
interface Entity {
  x: number
  y: number
  width: number
  height: number
  speed: number
}

interface Player extends Entity {
  lives: number
  score: number
  powerLevel: number
  isShooting: boolean
  lastShot: number
}

interface Enemy extends Entity {
  type: 'standard' | 'fast' | 'tank'
  health: number
}

interface Bullet extends Entity {
  isPlayer: boolean
}

interface PowerUp extends Entity {
  type: 'health' | 'power' | 'speed'
  rotation: number
}

interface Explosion {
  x: number
  y: number
  size: number
  frame: number
  maxFrames: number
}

interface GameState {
  status: 'menu' | 'playing' | 'paused' | 'gameOver'
  level: number
  player: Player
  enemies: Enemy[]
  playerBullets: Bullet[]
  enemyBullets: Bullet[]
  powerUps: PowerUp[]
  explosions: Explosion[]
  lastEnemySpawn: number
  lastPowerUpSpawn: number
}

export default function SpaceShooter() {
  const { theme } = useTheme()
  const isDark = theme === 'dark'
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [gameState, setGameState] = useState<GameState>({
    status: 'menu',
    level: 1,
    player: {
      x: 0, y: 0, width: 40, height: 40, speed: 5,
      lives: 3, score: 0, powerLevel: 1, isShooting: false, lastShot: 0
    },
    enemies: [],
    playerBullets: [],
    enemyBullets: [],
    powerUps: [],
    explosions: [],
    lastEnemySpawn: 0,
    lastPowerUpSpawn: 0
  })
  const [highScore, setHighScore] = useState<number>(0)
  const [controls, setControls] = useState({
    isLeft: false, 
    isRight: false, 
    isUp: false, 
    isDown: false, 
    isShoot: false
  })
  const gameLoopRef = useRef<number>()
  const [canvasSize, setCanvasSize] = useState({ width: 600, height: 700 })
  
  // Initialize game
  const initGame = () => {
    const savedHighScore = localStorage.getItem('spaceShooterHighScore')
    if (savedHighScore) {
      setHighScore(parseInt(savedHighScore))
    }
    
    setGameState(prev => ({
      ...prev,
      status: 'playing',
      player: {
        ...prev.player,
        x: canvasSize.width / 2 - 20,
        y: canvasSize.height - 80,
        lives: 3,
        score: 0,
        powerLevel: 1
      },
      enemies: [],
      playerBullets: [],
      enemyBullets: [],
      powerUps: [],
      explosions: [],
      level: 1
    }))
  }
  
  // Game rendering function
  const renderGame = (ctx: CanvasRenderingContext2D) => {
    ctx.clearRect(0, 0, canvasSize.width, canvasSize.height)
    ctx.fillStyle = isDark ? '#111827' : '#f9fafb'
    ctx.fillRect(0, 0, canvasSize.width, canvasSize.height)
    
    gameState.enemies.forEach(enemy => {
      let color
      switch (enemy.type) {
        case 'standard': color = '#ef4444'; break
        case 'fast': color = '#10b981'; break
        case 'tank': color = '#8b5cf6'; break
      }
      
      ctx.fillStyle = color
      
      if (enemy.type === 'standard') {
        ctx.beginPath()
        ctx.moveTo(enemy.x + enemy.width / 2, enemy.y + enemy.height)
        ctx.lineTo(enemy.x, enemy.y)
        ctx.lineTo(enemy.x + enemy.width, enemy.y)
        ctx.closePath()
        ctx.fill()
      } else if (enemy.type === 'fast') {
        ctx.beginPath()
        ctx.moveTo(enemy.x + enemy.width / 2, enemy.y)
        ctx.lineTo(enemy.x + enemy.width, enemy.y + enemy.height / 2)
        ctx.lineTo(enemy.x + enemy.width / 2, enemy.y + enemy.height)
        ctx.lineTo(enemy.x, enemy.y + enemy.height / 2)
        ctx.closePath()
        ctx.fill()
      } else if (enemy.type === 'tank') {
        ctx.beginPath()
        ctx.moveTo(enemy.x + enemy.width / 4, enemy.y)
        ctx.lineTo(enemy.x + enemy.width * 3/4, enemy.y)
        ctx.lineTo(enemy.x + enemy.width, enemy.y + enemy.height / 2)
        ctx.lineTo(enemy.x + enemy.width * 3/4, enemy.y + enemy.height)
        ctx.lineTo(enemy.x + enemy.width / 4, enemy.y + enemy.height)
        ctx.lineTo(enemy.x, enemy.y + enemy.height / 2)
        ctx.closePath()
        ctx.fill()
      }
      
      ctx.shadowColor = color
      ctx.shadowBlur = 5
      ctx.stroke()
      ctx.shadowBlur = 0
    })
  }
  
  // Game loop
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    
    const handleResize = () => {
      const container = canvas.parentElement
      if (container) {
        const containerWidth = Math.min(container.clientWidth, 800)
        setCanvasSize({
          width: containerWidth,
          height: containerWidth * 1.2
        })
      }
    }
    
    handleResize()
    window.addEventListener('resize', handleResize)
    
    if (gameState.status === 'playing') {
      const runGameLoop = () => {
        // Update player position based on controls
      }
      
      gameLoopRef.current = requestAnimationFrame(function gameLoop() {
        runGameLoop()
        renderGame(ctx)
        gameLoopRef.current = requestAnimationFrame(gameLoop)
      })
      
      return () => {
        if (gameLoopRef.current) {
          cancelAnimationFrame(gameLoopRef.current)
        }
      }
    }
    
    return () => {
      window.removeEventListener('resize', handleResize)
      if (gameLoopRef.current) {
        cancelAnimationFrame(gameLoopRef.current)
      }
    }
  }, [gameState.status, controls, canvasSize.width, canvasSize.height, highScore])
  
  // Handle keyboard controls
  useEffect(() => {
    // Keyboard controls logic
  }, [])
  
  // Touch controls
  const handleTouchMove = (e: React.TouchEvent) => {
    // Touch move logic
  }
  
  const handleTouchEnd = () => {
    setControls(prev => ({ ...prev, isShoot: false }))
  }
  
  // On-screen controls for touch devices
  const TouchControls = () => {
    return (
      <div className="absolute bottom-4 left-0 right-0 flex justify-between px-8">
        <div className="flex gap-2">
          <button
            className="w-14 h-14 rounded-full bg-dark-800/70 backdrop-blur-md border border-primary-500/30 text-primary-500 flex items-center justify-center"
            onTouchStart={() => setControls(prev => ({ ...prev, isLeft: true }))}
            onTouchEnd={() => setControls(prev => ({ ...prev, isLeft: false }))}
          >
            ←
          </button>
          <button
            className="w-14 h-14 rounded-full bg-dark-800/70 backdrop-blur-md border border-primary-500/30 text-primary-500 flex items-center justify-center"
            onTouchStart={() => setControls(prev => ({ ...prev, isRight: true }))}
            onTouchEnd={() => setControls(prev => ({ ...prev, isRight: false }))}
          >
            →
          </button>
        </div>
        <div className="flex gap-2">
          <button
            className="w-14 h-14 rounded-full bg-dark-800/70 backdrop-blur-md border border-primary-500/30 text-primary-500 flex items-center justify-center"
            onTouchStart={() => setControls(prev => ({ ...prev, isShoot: true }))}
            onTouchEnd={() => setControls(prev => ({ ...prev, isShoot: false }))}
          >
            🔥
          </button>
        </div>
      </div>
    )
  }
  
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
            <span className="blue-gradient">Cosmic Defender</span>
          </h2>
          <p className={`text-lg max-w-2xl mx-auto ${isDark ? 'text-gray-300' : 'text-dark-600'}`}>
            Defend the galaxy from waves of alien invaders in this action-packed space shooter!
          </p>
        </motion.div>
        
        <div className="max-w-3xl mx-auto">
          <NeumorphCard 
            className="p-4 relative overflow-hidden"
            depth="high"
            interactive={false}
          >
            <div className="relative">
              <canvas
                ref={canvasRef}
                width={canvasSize.width}
                height={canvasSize.height}
                className="mx-auto border border-dark-700 rounded-lg"
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
              />
              
              <AnimatePresence>
                {gameState.status === 'menu' && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0 flex flex-col items-center justify-center bg-dark-900/80 backdrop-blur-md rounded-lg"
                  >
                    <motion.div
                      initial={{ scale: 0.9, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ delay: 0.2, type: "spring" }}
                      className="mb-6 text-6xl"
                    >
                      🚀
                    </motion.div>
                    <motion.h3
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.3 }}
                      className="text-4xl font-bold mb-4 blue-gradient"
                    >
                      Cosmic Defender
                    </motion.h3>
                    <motion.p
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.4 }}
                      className="text-lg text-gray-300 mb-8 max-w-sm text-center"
                    >
                      Navigate through space, collect power-ups, and destroy alien ships to protect your galaxy!
                    </motion.p>
                    {highScore > 0 && (
                      <motion.div
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.5 }}
                        className="mb-8 text-xl"
                      >
                        <span className="text-gray-400">High Score: </span>
                        <span className="text-primary-500 font-bold">{highScore}</span>
                      </motion.div>
                    )}
                    <motion.div
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.6 }}
                    >
                      <LiquidButton onClick={initGame} variant="primary" size="lg">
                        Start Game
                      </LiquidButton>
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>
              
              {gameState.status === 'playing' && <TouchControls />}
            </div>
            
            <div className={`mt-8 text-sm ${isDark ? 'text-gray-400' : 'text-dark-600'}`}>
              <h4 className="font-bold mb-2">Controls:</h4>
              <ul className="grid grid-cols-2 gap-x-8 gap-y-1">
                <li>Move: Arrow keys or WASD</li>
                <li>Shoot: Spacebar</li>
                <li>Pause: P key</li>
                <li>Mobile: Touch screen to move and shoot</li>
              </ul>
              <h4 className="font-bold mt-4 mb-2">Power-Ups:</h4>
              <div className="grid grid-cols-3 gap-4">
                <GlassCard className="p-2 text-center">
                  <div className="text-red-500 text-lg mb-1">+</div>
                  <div>Extra Life</div>
                </GlassCard>
                <GlassCard className="p-2 text-center">
                  <div className="text-orange-500 text-lg mb-1">⚡</div>
                  <div>Weapon</div>
                </GlassCard>
                <GlassCard className="p-2 text-center">
                  <div className="text-green-500 text-lg mb-1">▶</div>
                  <div>Speed</div>
                </GlassCard>
              </div>
            </div>
          </NeumorphCard>
        </div>
      </div>
    </section>
  )
}