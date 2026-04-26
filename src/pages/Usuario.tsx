import { useState, useEffect } from 'react'

function Usuario() {
  const [nombre, setNombre] = useState('')
  const [heroeFav, setHeroeFav] = useState('')
  const [guardado, setGuardado] = useState(false)

  useEffect(() => {
    const datos = JSON.parse(localStorage.getItem('usuario') || '{}')
    if (datos.nombre) setNombre(datos.nombre)
    if (datos.heroeFav) setHeroeFav(datos.heroeFav)
  }, [])

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