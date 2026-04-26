import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router'
import type { Hero } from '../type'

function Detalle() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [heroe, setHeroe] = useState<Hero | null>(null)
  const [esFavorito, setEsFavorito] = useState(false)

  useEffect(() => {
    fetch('https://raw.githubusercontent.com/akabab/superhero-api/master/api/all.json')
      .then((res) => res.json())
      .then((data: Hero[]) => {
        const encontrado = data.find((h) => h.id === Number(id))
        setHeroe(encontrado || null)

        const favoritos: number[] = JSON.parse(localStorage.getItem('favoritos') || '[]')
        setEsFavorito(favoritos.includes(Number(id)))
      })
  }, [id])

  const toggleFavorito = () => {
    const favoritos: number[] = JSON.parse(localStorage.getItem('favoritos') || '[]')

    if (esFavorito) {
      const nuevos = favoritos.filter((fav) => fav !== Number(id))
      localStorage.setItem('favoritos', JSON.stringify(nuevos))
      setEsFavorito(false)
    } else {
      favoritos.push(Number(id))
      localStorage.setItem('favoritos', JSON.stringify(favoritos))
      setEsFavorito(true)
    }
  }

  if (!heroe) return <p>Cargando...</p>

  return (
    <div className="detalle-container">
      <button onClick={() => navigate(-1)}>Volver</button>
      <h2>{heroe.name}</h2>
      <img src={heroe.images.md} alt={heroe.name} />

      <button onClick={toggleFavorito} className={esFavorito ? 'activo' : ''}>
        {esFavorito ? 'Quitar de favoritos' : 'Agregar a favoritos'}
      </button>

      <div className="stats">
        <h3>Powerstats</h3>
        {Object.entries(heroe.powerstats).map(([stat, valor]) => (
          <div key={stat} className="stat-barra">
            <span>{stat}</span>
            <div className="barra">
              <div className="relleno" style={{ width: `${valor}%` }}></div>
            </div>
            <span>{valor}</span>
          </div>
        ))}
      </div>

      <div className="bio">
        <h3>Biografia</h3>
        <p>Nombre real: {heroe.biography.fullName || 'Desconocido'}</p>
        <p>Editorial: {heroe.biography.publisher || 'Desconocida'}</p>
        <p>Alineacion: {heroe.biography.alignment}</p>
        <p>Raza: {heroe.appearance.race || 'Desconocida'}</p>
        <p>Genero: {heroe.appearance.gender}</p>
      </div>
    </div>
  )
}

export default Detalle