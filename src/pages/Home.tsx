import { useEffect, useState } from 'react'
import { Link } from 'react-router'
import type { Hero } from '../type'

type FiltroAlineacion = 'todos' | 'good' | 'bad' | 'neutral'

function Home() {
  const [heroes, setHeroes] = useState<Hero[]>([])
  const [busqueda, setBusqueda] = useState('')
  const [filtro, setFiltro] = useState<FiltroAlineacion>('todos')

  const filtros: FiltroAlineacion[] = ['todos', 'good', 'bad', 'neutral']

  useEffect(() => {
    fetch('https://raw.githubusercontent.com/akabab/superhero-api/master/api/all.json')
      .then((res) => res.json())
      .then((data: Hero[]) => setHeroes(data))
      .catch((err) => console.error('Error cargando heroes:', err))
  }, [])

  const heroesFiltrados = heroes.filter((heroe) => {
    const coincideBusqueda =
      busqueda.length < 3
        ? true
        : heroe.name.toLowerCase().includes(busqueda.toLowerCase())

    const coincideFiltro =
      filtro === 'todos' ? true : heroe.biography.alignment === filtro

    return coincideBusqueda && coincideFiltro
  })

  return (
    <>
      <div className="filtros">
        {filtros.map((f) => (
          <button
            key={f}
            onClick={() => setFiltro(f)}
            className={filtro === f ? 'activo' : ''}
          >
            {f}
          </button>
        ))}
        <br />
        <input
          type="text"
          placeholder="Buscar héroe..."
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
        />
      </div>

      <div className="tabla-container">
        <h2>Heroes ({heroesFiltrados.length})</h2>
        <div className="heroes-grid">
          {heroesFiltrados.map((heroe) => (
            <Link to={`/heroe/${heroe.id}`} key={heroe.id} className="heroe-card">
              <img src={heroe.images.sm} alt={heroe.name} />
              <p>{heroe.name}</p>
              <span className={`badge ${heroe.biography.alignment}`}>
                {heroe.biography.alignment}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </>
  )
}

export default Home