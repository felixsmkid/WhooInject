import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Zap, Key, Monitor, ExternalLink } from 'lucide-react'
import TitleBar from '../components/TitleBar'

function LoginPage({ onLogin }) {
  const [licenseKey, setLicenseKey] = useState('')
  const [deviceId, setDeviceId] = useState('LOADING...')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    const fetchDeviceId = async () => {
      if (window.electronAPI?.getDeviceId) {
        const id = await window.electronAPI.getDeviceId()
        setDeviceId(id)
      } else {
        setDeviceId('WEB-' + Math.random().toString(36).substring(2, 10).toUpperCase())
      }
    }
    fetchDeviceId()
  }, [])

  const handleLogin = async (e) => {
    e.preventDefault()
    setError('')
    
    if (!licenseKey.trim()) {
      setError('Please enter your license key')
      return
    }

    setIsLoading(true)
    
    // Simulate verification delay
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    // Accept any key for demo purposes
    localStorage.setItem('whoo_session', JSON.stringify({
      key: licenseKey,
      deviceId,
      loginTime: Date.now()
    }))
    
    setIsLoading(false)
    onLogin()
  }

  return (
    <div className="h-screen flex flex-col bg-dark-900 relative overflow-hidden">
      <TitleBar />
      
      {/* Animated background */}
      <div className="absolute inset-0 pt-8">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-neon-purple/10 rounded-full blur-[128px] animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-neon-cyan/10 rounded-full blur-[128px] animate-pulse" />
        <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-neon-pink/5 rounded-full blur-[100px] animate-float" />
      </div>

      <div className="flex-1 flex pt-8 relative z-10">
        {/* Left side - Branding */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="flex-1 flex flex-col items-center justify-center p-12"
        >
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
            className="mb-8"
          >
            <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-neon-cyan via-neon-purple to-neon-pink flex items-center justify-center shadow-neon-cyan">
              <Zap size={48} className="text-white" />
            </div>
          </motion.div>
          
          <h1 className="text-4xl font-bold mb-3 bg-gradient-to-r from-neon-cyan via-neon-purple to-neon-pink bg-clip-text text-transparent">
            Whoo Inject
          </h1>
          <p className="text-white/40 text-center max-w-xs">
            Advanced Game Management System
          </p>
          
          <div className="mt-12 flex items-center gap-6">
            <div className="text-center">
              <p className="text-2xl font-bold neon-text-cyan">500+</p>
              <p className="text-[10px] text-white/40 uppercase">Games</p>
            </div>
            <div className="w-px h-8 bg-white/10" />
            <div className="text-center">
              <p className="text-2xl font-bold neon-text-purple">24/7</p>
              <p className="text-[10px] text-white/40 uppercase">Support</p>
            </div>
            <div className="w-px h-8 bg-white/10" />
            <div className="text-center">
              <p className="text-2xl font-bold neon-text-pink">Fast</p>
              <p className="text-[10px] text-white/40 uppercase">Updates</p>
            </div>
          </div>
        </motion.div>

        {/* Right side - Login Form */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex-1 flex items-center justify-center p-12"
        >
          <div className="w-full max-w-md glass-card p-8">
            <h2 className="text-2xl font-bold mb-2">Welcome Back</h2>
            <p className="text-white/40 text-sm mb-8">Enter your license key to continue</p>

            <form onSubmit={handleLogin} className="space-y-5">
              <div>
                <label className="text-xs text-white/60 mb-2 block">License Key</label>
                <div className="relative">
                  <Key size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30" />
                  <input
                    type="text"
                    value={licenseKey}
                    onChange={(e) => setLicenseKey(e.target.value)}
                    placeholder="XXXX-XXXX-XXXX-XXXX"
                    className="input-field pl-11"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs text-white/60 mb-2 block">Device ID</label>
                <div className="relative">
                  <Monitor size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30" />
                  <input
                    type="text"
                    value={deviceId}
                    readOnly
                    className="input-field pl-11 text-white/40 cursor-not-allowed"
                  />
                </div>
              </div>

              {error && (
                <motion.p
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-red-400 text-sm"
                >
                  {error}
                </motion.p>
              )}

              <motion.button
                type="submit"
                disabled={isLoading}
                className="btn-primary w-full flex items-center justify-center gap-2 disabled:opacity-50"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {isLoading ? (
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <>
                    <Zap size={16} />
                    Verify & Sign In
                  </>
                )}
              </motion.button>
            </form>

            {/* Footer links */}
            <div className="mt-8 pt-6 border-t border-white/5 flex items-center justify-center gap-6">
              <button
                onClick={() => window.electronAPI?.openExternal('https://discord.gg')}
                className="flex items-center gap-1.5 text-xs text-white/40 hover:text-neon-cyan transition-colors"
              >
                <ExternalLink size={12} />
                Discord
              </button>
              <button
                onClick={() => window.electronAPI?.openExternal('https://whoo.inject')}
                className="flex items-center gap-1.5 text-xs text-white/40 hover:text-neon-purple transition-colors"
              >
                <ExternalLink size={12} />
                Website
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default LoginPage
