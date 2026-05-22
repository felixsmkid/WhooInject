import { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  Moon, Bell, Download, Shield, Palette, 
  Monitor, Info, ExternalLink, RotateCcw
} from 'lucide-react'

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

function ToggleSwitch({ enabled, onChange }) {
  return (
    <motion.button
      onClick={onChange}
      className={`relative w-11 h-6 rounded-full transition-colors duration-300 ${
        enabled ? 'bg-neon-cyan/30 border-neon-cyan/50' : 'bg-white/5 border-white/10'
      } border`}
      whileTap={{ scale: 0.95 }}
    >
      <motion.div
        className={`absolute top-0.5 w-5 h-5 rounded-full ${
          enabled ? 'bg-neon-cyan shadow-neon-cyan' : 'bg-white/30'
        }`}
        animate={{ left: enabled ? '20px' : '2px' }}
        transition={{ duration: 0.2, ease: 'easeInOut' }}
      />
    </motion.button>
  )
}

function Settings() {
  const [settings, setSettings] = useState({
    darkMode: true,
    autoUpdate: true,
    notifications: true,
    discordRPC: false,
    stealthMode: true,
    autoClose: false,
  })

  const toggleSetting = (key) => {
    setSettings(prev => ({ ...prev, [key]: !prev[key] }))
  }

  const settingsSections = [
    {
      title: 'Appearance',
      icon: Palette,
      items: [
        {
          key: 'darkMode',
          label: 'Dark Mode',
          description: 'Use dark theme (recommended)',
          icon: Moon,
        },
      ],
    },
    {
      title: 'General',
      icon: Monitor,
      items: [
        {
          key: 'autoUpdate',
          label: 'Auto Update',
          description: 'Automatically download and install updates',
          icon: Download,
        },
        {
          key: 'notifications',
          label: 'Notifications',
          description: 'Show desktop notifications',
          icon: Bell,
        },
        {
          key: 'autoClose',
          label: 'Auto Close on Inject',
          description: 'Minimize to tray after injection',
          icon: RotateCcw,
        },
      ],
    },
    {
      title: 'Integration',
      icon: ExternalLink,
      items: [
        {
          key: 'discordRPC',
          label: 'Discord Rich Presence',
          description: 'Show activity in Discord',
          icon: ExternalLink,
        },
        {
          key: 'stealthMode',
          label: 'Stealth Mode',
          description: 'Hide from task manager descriptions',
          icon: Shield,
        },
      ],
    },
  ]

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-6 max-w-2xl"
    >
      {/* Header */}
      <motion.div variants={itemVariants}>
        <h1 className="text-2xl font-bold">Settings</h1>
        <p className="text-white/40 text-sm mt-1">Configure your preferences</p>
      </motion.div>

      {/* Settings Sections */}
      {settingsSections.map((section) => {
        const SectionIcon = section.icon
        return (
          <motion.div
            key={section.title}
            variants={itemVariants}
            className="glass-card p-5"
          >
            <div className="flex items-center gap-2 mb-4">
              <SectionIcon size={16} className="text-neon-cyan" />
              <h3 className="text-sm font-semibold">{section.title}</h3>
            </div>
            <div className="space-y-4">
              {section.items.map((item) => {
                const ItemIcon = item.icon
                return (
                  <div
                    key={item.key}
                    className="flex items-center justify-between p-3 rounded-xl bg-white/3 hover:bg-white/5 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center">
                        <ItemIcon size={14} className="text-white/60" />
                      </div>
                      <div>
                        <p className="text-sm font-medium">{item.label}</p>
                        <p className="text-[10px] text-white/40">{item.description}</p>
                      </div>
                    </div>
                    <ToggleSwitch
                      enabled={settings[item.key]}
                      onChange={() => toggleSetting(item.key)}
                    />
                  </div>
                )
              })}
            </div>
          </motion.div>
        )
      })}

      {/* App Info */}
      <motion.div variants={itemVariants} className="glass-card p-5">
        <div className="flex items-center gap-2 mb-4">
          <Info size={16} className="text-neon-purple" />
          <h3 className="text-sm font-semibold">About</h3>
        </div>
        <div className="space-y-3">
          <div className="flex items-center justify-between p-3 rounded-xl bg-white/3">
            <span className="text-sm text-white/60">Version</span>
            <span className="text-sm font-mono text-neon-cyan">0.1.0-beta</span>
          </div>
          <div className="flex items-center justify-between p-3 rounded-xl bg-white/3">
            <span className="text-sm text-white/60">Build</span>
            <span className="text-sm font-mono text-white/40">BETA UNRELEASED</span>
          </div>
          <div className="flex items-center justify-between p-3 rounded-xl bg-white/3">
            <span className="text-sm text-white/60">Electron</span>
            <span className="text-sm font-mono text-white/40">v30.x</span>
          </div>
          <div className="flex items-center justify-between p-3 rounded-xl bg-white/3">
            <span className="text-sm text-white/60">ManifestHub API</span>
            <span className="text-sm font-mono text-green-400">Connected</span>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}

export default Settings
