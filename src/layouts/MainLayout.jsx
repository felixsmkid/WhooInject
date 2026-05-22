import TitleBar from '../components/TitleBar'
import Sidebar from '../components/Sidebar'

function MainLayout({ children, onLogout }) {
  return (
    <div className="h-screen flex flex-col bg-dark-900">
      <TitleBar />
      <div className="flex flex-1 pt-8">
        <Sidebar onLogout={onLogout} />
        <main className="flex-1 overflow-y-auto p-6">
          {children}
        </main>
      </div>
    </div>
  )
}

export default MainLayout
