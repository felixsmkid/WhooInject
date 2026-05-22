import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, ChevronDown, ChevronUp, Users, Gamepad2 } from 'lucide-react'

const mockGames = [
  {
    id: 1,
    title: 'Cyberpunk 2077',
    appId: '1091500',
    banner: 'https://cdn.akamai.steamstatic.com/steam/apps/1091500/header.jpg',
    accounts: 12,
  },
  {
    id: 2,
    title: 'Elden Ring',
    appId: '1245620',
    banner: 'https://cdn.akamai.steamstatic.com/steam/apps/1245620/header.jpg',
    accounts: 8,
  },
  {
    id: 3,
    title: 'Red Dead Redemption 2',
    appId: '1174180',
    banner: 'https://cdn.akamai.steamstatic.com/steam/apps/1174180/header.jpg',
    accounts: 15,
  },
  {
    id: 4,
    title: 'God of War',
    appId: '1593500',
    banner: 'https://cdn.akamai.steamstatic.com/steam/apps/1593500/header.jpg',
    accounts: 6,
  },
  {
    id: 5,
    title: 'Hogwarts Legacy',
    appId: '990080',
    banner: 'https://cdn.akamai.steamstatic.com/steam/apps/990080/header.jpg',
    accounts: 10,
  },
  {
    id: 6,
    title: 'Baldurs Gate 3',
    appId: '1086940',
    banner: 'https://cdn.akamai.steamstatic.com/steam/apps/1086940/header.jpg',
    accounts: 20,
  },
  {
    id: 7,
    title: 'Starfield',
    appId: '1716740',
    banner: 'https://cdn.akamai.steamstatic.com/steam/apps/1716740/header.jpg',
    accounts: 5,
  },
  {
    id: 8,
    title: 'Spider-Man Remastered',
    appId: '1817070',
    banner: 'https://cdn.akamai.steamstatic.com/steam/apps/1817070/header.jpg',
    accounts: 9,
  },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.05 },
  },
}

const cardVariants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { opacity: 1, scale: 1 },
}

function SharedAccounts() {
  const [searchQuery, setSearchQuery] = useState('')
  const [expandedCard, setExpandedCard] = useState(null)

  const filteredGames = mockGames.filter(game =>
    game.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    game.appId.includes(searchQuery)
  )

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="space-y-6"
    >
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold">Shared Accounts</h1>
        <p className="text-white/40 text-sm mt-1">Browse available game accounts</p>
      </div>

      {/* Search */}
      <div className="relative">
        <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search games by title or AppID..."
          className="input-field pl-11"
        />
      </div>

      {/* Games Grid */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
      >
        {filteredGames.map((game) => (
          <motion.div
            key={game.id}
            variants={cardVariants}
            whileHover={{ y: -5 }}
            className="glass-card overflow-hidden group cursor-pointer"
            onClick={() => setExpandedCard(expandedCard === game.id ? null : game.id)}
          >
            {/* Banner */}
            <div className="relative h-28 overflow-hidden">
              <img
                src={game.banner}
                alt={game.title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                onError={(e) => {
                  e.target.style.display = 'none'
                  e.target.parentElement.classList.add('bg-gradient-to-br', 'from-neon-cyan/20', 'to-neon-purple/20')
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-dark-900 via-transparent to-transparent" />
            </div>

            {/* Info */}
            <div className="p-4">
              <h3 className="text-sm font-semibold truncate">{game.title}</h3>
              <div className="flex items-center justify-between mt-2">
                <p className="text-[10px] text-white/40">AppID: {game.appId}</p>
                <div className="flex items-center gap-1">
                  <Users size={10} className="text-neon-cyan" />
                  <span className="text-[10px] text-neon-cyan">{game.accounts}</span>
                </div>
              </div>

              {/* Expand/Collapse */}
              <AnimatePresence>
                {expandedCard === game.id && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="mt-3 pt-3 border-t border-white/5"
                  >
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-xs text-white/60">
                        <Gamepad2 size={12} />
                        <span>{game.accounts} accounts available</span>
                      </div>
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="w-full py-2 bg-gradient-to-r from-neon-cyan/20 to-neon-purple/20 border border-neon-cyan/20 rounded-lg text-xs text-neon-cyan font-medium hover:border-neon-cyan/40 transition-all"
                      >
                        View Accounts
                      </motion.button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Toggle Icon */}
              <div className="flex justify-center mt-2">
                {expandedCard === game.id ? (
                  <ChevronUp size={14} className="text-white/30" />
                ) : (
                  <ChevronDown size={14} className="text-white/30" />
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {filteredGames.length === 0 && (
        <div className="text-center py-12">
          <Gamepad2 size={48} className="mx-auto text-white/10 mb-4" />
          <p className="text-white/40 text-sm">No games found matching your search</p>
        </div>
      )}
    </motion.div>
  )
}

export default SharedAccounts
