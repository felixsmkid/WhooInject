import { useState } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import LoginPage from './pages/LoginPage'
import MainLayout from './layouts/MainLayout'
import Dashboard from './pages/Dashboard'
import SharedAccounts from './pages/SharedAccounts'
import Settings from './pages/Settings'

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  if (!isLoggedIn) {
    return <LoginPage onLogin={() => setIsLoggedIn(true)} />
  }

  return (
    <MainLayout onLogout={() => setIsLoggedIn(false)}>
      <AnimatePresence mode="wait">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/shared-accounts" element={<SharedAccounts />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </AnimatePresence>
    </MainLayout>
  )
}

export default App
