import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import MarcasPage from './pages/MarcasPage'
import CalzadosPage from './pages/CalzadosPage'

export default function App() {
  return (
    <div className="min-h-screen bg-[#0f0f0f]">
      <Navbar />
      <main className="max-w-7xl mx-auto px-4 py-8">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/marcas" element={<MarcasPage />} />
          <Route path="/calzados" element={<CalzadosPage />} />
        </Routes>
      </main>
    </div>
  )
}
