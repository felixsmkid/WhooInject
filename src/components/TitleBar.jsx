import { Minus, Square, X } from 'lucide-react'

function TitleBar() {
  const handleMinimize = () => window.electronAPI?.minimizeWindow()
  const handleMaximize = () => window.electronAPI?.maximizeWindow()
  const handleClose = () => window.electronAPI?.closeWindow()

  return (
    <div className="drag-region h-8 flex items-center justify-between px-4 bg-dark-900/80 border-b border-white/5 fixed top-0 left-0 right-0 z-50">
      <div className="flex items-center gap-2">
        <div className="w-3 h-3 rounded-full bg-gradient-to-r from-neon-cyan to-neon-purple animate-glow-pulse" />
        <span className="text-xs text-white/40 font-medium">Whoo Inject System</span>
      </div>
      <div className="no-drag flex items-center gap-1">
        <button
          onClick={handleMinimize}
          className="p-1.5 rounded hover:bg-white/10 transition-colors"
        >
          <Minus size={12} className="text-white/60" />
        </button>
        <button
          onClick={handleMaximize}
          className="p-1.5 rounded hover:bg-white/10 transition-colors"
        >
          <Square size={10} className="text-white/60" />
        </button>
        <button
          onClick={handleClose}
          className="p-1.5 rounded hover:bg-red-500/80 transition-colors"
        >
          <X size={12} className="text-white/60" />
        </button>
      </div>
    </div>
  )
}

export default TitleBar
