import { Routes, Route } from 'react-router'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Favoritos from './pages/Favoritos'
import Builder from './pages/Builder'
import Informativa from './pages/Informativa'
import Usuario from './pages/Usuario'
import Detalle from './pages/Detalle'
import Peleas from './pages/Peleas'

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/favoritos" element={<Favoritos />} />
        <Route path="/builder" element={<Builder />} />
        <Route path="/peleas" element={<Peleas />} />
        <Route path="/informativa" element={<Informativa />} />
        <Route path="/usuario" element={<Usuario />} />
        <Route path="/heroe/:id" element={<Detalle />} />
      </Routes>
      <Navbar />
    </>
  )
}

export default App