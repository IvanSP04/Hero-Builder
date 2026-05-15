import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router'
import { useAuth } from '../AuthContext'

function Usuario() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const [nombre, setNombre] = useState('')
  const [heroeFav, setHeroeFav] = useState('')
  const [guardado, setGuardado] = useState(false)

  const profileKey = user ? `hero-builder-profile-${user.username}` : 'hero-builder-profile-guest'

  useEffect(() => {
    if (!user) return
    const datos = JSON.parse(localStorage.getItem(profileKey) || '{}')
    setNombre(datos.nombre || user.username)
    setHeroeFav(datos.heroeFav || '')
  }, [profileKey, user])

  const guardarDatos = () => {
    localStorage.setItem('usuario', JSON.stringify({ nombre, heroeFav }))
    setGuardado(true)
    setTimeout(() => setGuardado(false), 2000)
  }

  return (
    <div className="tabla-container">
      <h2>Mi perfil</h2>

      <div className="usuario-form">
        <label>Nombre</label>
        <input
          type="text"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          placeholder="Tu nombre"
        />

        <label>Heroe favorito</label>
        <input
          type="text"
          value={heroeFav}
          onChange={(e) => setHeroeFav(e.target.value)}
          placeholder="Nombre de tu heroe favorito"
        />

        <button onClick={guardarDatos}>Guardar</button>
        {guardado && <p>Guardado correctamente</p>}
      </div>

      {nombre && (
        <div className="usuario-info">
          <h3>Hola, {nombre}</h3>
          {heroeFav && <p>Tu heroe favorito es: {heroeFav}</p>}
        </div>
      )}
    </div>
  )
}

export default Usuario