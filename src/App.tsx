import { Routes, Route } from 'react-router'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Favoritos from './pages/Favoritos'
import Builder from './pages/Builder'
import Informativa from './pages/Informativa'
import Usuario from './pages/Usuario'
import Detalle from './pages/Detalle'
import Peleas from './pages/Peleas'
import Login from './pages/Login'
import Register from './pages/Register'
import { AuthProvider } from './AuthContext'

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/favoritos" element={<Favoritos />} />
        <Route path="/builder" element={<Builder />} />
        <Route path="/peleas" element={<Peleas />} />
        <Route path="/informativa" element={<Informativa />} />
        <Route path="/usuario" element={<Usuario />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/heroe/:id" element={<Detalle />} />
      </Routes>
      <Navbar />
    </AuthProvider>
  )
}

export default App