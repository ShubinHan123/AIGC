'use client'

import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'

interface BuyEffect {
  id: number
  x: number
  y: number
}

interface Challenger {
  id: number
  src: string
  name: string
}

const PixelArena = () => {
  const [selectedChallenger, setSelectedChallenger] = useState<Challenger | null>(null)
  const [attackCount, setAttackCount] = useState(0)
  const [showSuccess, setShowSuccess] = useState(false)
  const [isAttacking, setIsAttacking] = useState(false)
  const [buyEffects, setBuyEffects] = useState<BuyEffect[]>([])
  const [effectId, setEffectId] = useState(0)

  const challengers: Challenger[] = [
    { id: 1, src: '/images/1.png', name: 'Challenger 1' },
    { id: 2, src: '/images/2.png', name: 'Challenger 2' },
    { id: 3, src: '/images/3.png', name: 'Challenger 3' },
    { id: 4, src: '/images/4.png', name: 'Challenger 4' },
    { id: 5, src: '/images/5.png', name: 'Challenger 5' },
    { id: 6, src: '/images/6.png', name: 'Challenger 6' },
    { id: 7, src: '/images/7.png', name: 'Challenger 7' },
  ]

  const handleChallengerClick = (challenger: Challenger) => {
    setSelectedChallenger(challenger)
    setAttackCount(0)
    setShowSuccess(false)
  }

  const handleDefenderClick = () => {
    if (!selectedChallenger) return
    
    setIsAttacking(true)
    const newAttackCount = attackCount + 1
    setAttackCount(newAttackCount)
    
    setTimeout(() => {
      setIsAttacking(false)
      if (newAttackCount >= 3) {
        setShowSuccess(true)
      }
    }, 500)
  }

  const handleGlobalClick = useCallback((e: MouseEvent) => {
    const newEffect: BuyEffect = {
      id: effectId,
      x: e.clientX,
      y: e.clientY,
    }
    
    setBuyEffects(prev => [...prev, newEffect])
    setEffectId(prev => prev + 1)
    
    // Remove effect after animation
    setTimeout(() => {
      setBuyEffects(prev => prev.filter(effect => effect.id !== newEffect.id))
    }, 1000)
  }, [effectId])

  useEffect(() => {
    document.addEventListener('click', handleGlobalClick)
    return () => {
      document.removeEventListener('click', handleGlobalClick)
    }
  }, [handleGlobalClick])

  const resetGame = () => {
    setSelectedChallenger(null)
    setAttackCount(0)
    setShowSuccess(false)
  }

  return (
    <div 
      className="min-h-screen arena-background relative overflow-hidden"
      style={{
        backgroundImage: "url('/images/background.png')",
      }}
    >
      {/* Buy Effects */}
      {buyEffects.map((effect) => (
        <div
          key={effect.id}
          className="buy-text"
          style={{
            left: effect.x - 25,
            top: effect.y - 20,
          }}
        >
          BUY
        </div>
      ))}

      {/* Main Content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen p-8">
        
        {/* Arena Section */}
        <div className="flex items-center justify-center mb-16 gap-8">
          {/* Selected Challenger */}
          <motion.div
            initial={false}
            animate={selectedChallenger ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className={`${isAttacking ? 'attack-animation' : ''}`}
          >
            {selectedChallenger && (
              <div className="relative">
                <Image
                  src={selectedChallenger.src}
                  alt={selectedChallenger.name}
                  width={120}
                  height={120}
                  className="selected-challenger rounded-2xl"
                />
                <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 text-neon-blue font-bold text-sm">
                  挑战者
                </div>
              </div>
            )}
          </motion.div>

          {/* VS Text */}
          {selectedChallenger && (
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-neon-pink font-bold text-3xl mx-8"
            >
              VS
            </motion.div>
          )}

          {/* Defender */}
          <div className="relative">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleDefenderClick}
              className="cursor-pointer"
            >
              <Image
                src="/images/main.png"
                alt="Defender"
                width={160}
                height={160}
                className="glow-effect rounded-2xl"
              />
            </motion.div>
            <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 text-neon-purple font-bold text-sm">
              守擂者
            </div>
            {selectedChallenger && (
              <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 text-white text-sm">
                攻击次数: {attackCount}/3
              </div>
            )}
          </div>
        </div>

        {/* Instructions */}
        <div className="mb-8 text-center">
          <p className="text-white/80 text-lg mb-2">
            {!selectedChallenger 
              ? "选择一个挑战者开始游戏" 
              : "点击守擂者进行攻击"
            }
          </p>
        </div>

        {/* Challengers Row */}
        <div className="flex flex-wrap justify-center gap-6 max-w-4xl">
          {challengers.map((challenger) => (
            <motion.div
              key={challenger.id}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleChallengerClick(challenger)}
              className="cursor-pointer"
            >
              <Image
                src={challenger.src}
                alt={challenger.name}
                width={100}
                height={100}
                className={`challenger-glow rounded-2xl ${
                  selectedChallenger?.id === challenger.id ? 'opacity-50' : ''
                }`}
              />
            </motion.div>
          ))}
        </div>

        {/* Disclaimer */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-white/60 text-sm text-center">
          <p>Promotional/educational only, not financial advice.</p>
        </div>
      </div>

      {/* Success Modal */}
      <AnimatePresence>
        {showSuccess && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 flex items-center justify-center z-50"
          >
            <motion.div
              initial={{ scale: 0, rotateY: 180 }}
              animate={{ scale: 1, rotateY: 0 }}
              exit={{ scale: 0, rotateY: 180 }}
              transition={{ duration: 0.5 }}
              className="bg-gradient-to-br from-purple-900/90 to-blue-900/90 p-12 rounded-3xl border border-neon-purple/50 text-center backdrop-blur-lg"
            >
              <motion.h2
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="text-4xl font-bold text-neon-blue mb-6"
              >
                🎉 你已经成功了！🎉
              </motion.h2>
              <motion.p
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="text-white/90 mb-8 text-lg"
              >
                恭喜你击败了挑战者！
              </motion.p>
              <motion.button
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.7 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={resetGame}
                className="bg-gradient-to-r from-neon-purple to-neon-blue text-white font-bold py-3 px-8 rounded-2xl hover:shadow-lg hover:shadow-neon-purple/50 transition-all duration-300"
              >
                再来一次
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default PixelArena
