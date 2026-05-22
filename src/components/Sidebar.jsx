import { useLocation, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Gamepad2, Users, Settings, LogOut, Zap } from 'lucide-react'

const menuItems = [
  { path: '/', label: 'Bang Menu', icon: Gamepad2 },
  { path: '/shared-accounts', label: 'Shared Accounts', icon: Users },
  { path: '/settings', label: 'Settings', icon: Settings },
]

function Sidebar({ onLogout }) {
  const location = useLocation()
  const navigate = useNavigate()

  return (
    <motion.aside
      initial={{ x: -100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className="w-64 h-full bg-dark-800/50 backdrop-blur-xl border-r border-white/5 flex flex-col"
    >
      {/* Logo */}
      <div className="p-6 border-b border-white/5">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-neon-cyan to-neon-purple flex items-center justify-center shadow-neon-cyan">
            <Zap size={20} className="text-white" />
          </div>
          <div>
            <h1 className="text-sm font-bold text-white">Whoo Inject</h1>
            <p className="text-[10px] text-white/40">v0.1.0-beta</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2">
        <p className="text-[10px] uppercase tracking-wider text-white/30 px-4 mb-3">Navigation</p>
        {menuItems.map((item) => {
          const isActive = location.pathname === item.path
          const Icon = item.icon
          return (
            <motion.button
              key={item.path}
              onClick={() => navigate(item.path)}
              className={isActive ? 'sidebar-item-active w-full' : 'sidebar-item w-full'}
              whileHover={{ x: 4 }}
              whileTap={{ scale: 0.98 }}
            >
              <Icon size={18} />
              <span className="text-sm font-medium">{item.label}</span>
              {isActive && (
                <motion.div
                  layoutId="activeIndicator"
                  className="ml-auto w-1.5 h-1.5 rounded-full bg-neon-cyan shadow-neon-cyan"
                />
              )}
            </motion.button>
          )
        })}
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-white/5">
        <motion.button
          onClick={onLogout}
          className="sidebar-item w-full text-red-400/60 hover:text-red-400"
          whileHover={{ x: 4 }}
          whileTap={{ scale: 0.98 }}
        >
          <LogOut size={18} />
          <span className="text-sm font-medium">Logout</span>
        </motion.button>
      </div>
    </motion.aside>
  )
}

export default Sidebar
