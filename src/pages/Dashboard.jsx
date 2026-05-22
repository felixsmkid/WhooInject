import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { 
  Zap, Shield, RotateCcw, Plus, Trash2, X, RefreshCw,
  FolderOpen, Gamepad2, CheckCircle2
} from 'lucide-react'

const featureCards = [
  {
    icon: Zap,
    title: 'Instant Access',
    description: 'Get access to games within seconds',
    color: 'from-neon-cyan to-cyan-600',
    glow: 'shadow-neon-cyan',
  },
  {
    icon: Shield,
    title: 'Safe to Use',
    description: 'Undetected and regularly updated',
    color: 'from-neon-purple to-purple-600',
    glow: 'shadow-neon-purple',
  },
  {
    icon: RotateCcw,
    title: 'Easy Revert',
    description: 'Restore original state anytime',
    color: 'from-neon-pink to-pink-600',
    glow: 'shadow-neon-pink',
  },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
}

function Dashboard() {
  const [steamPath, setSteamPath] = useState('')
  const [gameId, setGameId] = useState('')
  const [games, setGames] = useState([
    { id: '730', name: 'Counter-Strike 2' },
    { id: '570', name: 'Dota 2' },
  ])

  useEffect(() => {
    const fetchSteamPath = async () => {
      if (window.electronAPI?.getSteamPath) {
        const path = await window.electronAPI.getSteamPath()
        setSteamPath(path)
      } else {
        setSteamPath('C:\\Program Files (x86)\\Steam')
      }
    }
    fetchSteamPath()
  }, [])

  const addGame = () => {
    if (!gameId.trim()) return
    setGames([...games, { id: gameId, name: `Game ${gameId}` }])
    setGameId('')
  }

  const removeGame = (id) => {
    setGames(games.filter(g => g.id !== id))
  }

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-6"
    >
      {/* Header */}
      <motion.div variants={itemVariants} className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Bang Menu</h1>
          <p className="text-white/40 text-sm mt-1">Manage your game injections</p>
        </div>
        <div className="flex items-center gap-2">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="btn-secondary flex items-center gap-2"
          >
            <RefreshCw size={14} />
            <span className="text-xs">Restart</span>
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="btn-secondary flex items-center gap-2 text-red-400 border-red-400/20 hover:border-red-400/40"
          >
            <X size={14} />
            <span className="text-xs">Close</span>
          </motion.button>
        </div>
      </motion.div>

      {/* Steam Path Badge */}
      <motion.div variants={itemVariants} className="glass-card p-4 flex items-center gap-3">
        <div className="w-8 h-8 rounded-lg bg-neon-cyan/10 flex items-center justify-center">
          <FolderOpen size={16} className="text-neon-cyan" />
        </div>
        <div className="flex-1">
          <p className="text-xs text-white/40">Steam Installation Detected</p>
          <p className="text-sm font-medium text-white/80">{steamPath}</p>
        </div>
        <CheckCircle2 size={16} className="text-green-400" />
      </motion.div>

      {/* Game Input */}
      <motion.div variants={itemVariants} className="glass-card p-5">
        <h3 className="text-sm font-semibold mb-4 flex items-center gap-2">
          <Gamepad2 size={16} className="text-neon-cyan" />
          Add Game by AppID
        </h3>
        <div className="flex gap-3">
          <input
            type="text"
            value={gameId}
            onChange={(e) => setGameId(e.target.value)}
            placeholder="Enter Steam AppID (e.g., 730)"
            className="input-field flex-1"
            onKeyDown={(e) => e.key === 'Enter' && addGame()}
          />
          <motion.button
            onClick={addGame}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="btn-primary flex items-center gap-2"
          >
            <Plus size={16} />
            Add Game
          </motion.button>
        </div>

        {/* Games List */}
        {games.length > 0 && (
          <div className="mt-4 space-y-2">
            {games.map((game) => (
              <motion.div
                key={game.id}
                layout
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="flex items-center justify-between p-3 bg-white/3 rounded-xl border border-white/5 hover:border-neon-cyan/20 transition-all"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-neon-cyan/20 to-neon-purple/20 flex items-center justify-center">
                    <Gamepad2 size={14} className="text-neon-cyan" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">{game.name}</p>
                    <p className="text-[10px] text-white/40">AppID: {game.id}</p>
                  </div>
                </div>
                <motion.button
                  onClick={() => removeGame(game.id)}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="p-2 rounded-lg hover:bg-red-500/10 text-white/40 hover:text-red-400 transition-all"
                >
                  <Trash2 size={14} />
                </motion.button>
              </motion.div>
            ))}
          </div>
        )}
      </motion.div>

      {/* Feature Cards */}
      <motion.div variants={itemVariants} className="grid grid-cols-3 gap-4">
        {featureCards.map((card) => {
          const Icon = card.icon
          return (
            <motion.div
              key={card.title}
              whileHover={{ y: -5, scale: 1.02 }}
              transition={{ duration: 0.2 }}
              className={`glass-card p-5 relative overflow-hidden group cursor-pointer`}
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${card.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500`} />
              <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${card.color} flex items-center justify-center mb-4 ${card.glow}`}>
                <Icon size={20} className="text-white" />
              </div>
              <h3 className="text-sm font-semibold mb-1">{card.title}</h3>
              <p className="text-xs text-white/40">{card.description}</p>
            </motion.div>
          )
        })}
      </motion.div>
    </motion.div>
  )
}

export default Dashboard
