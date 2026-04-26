import { useEffect, useState } from 'react'
import { Link } from 'react-router'
import type { Hero } from '../type'

function Builder() {
  const [heroes, setHeroes] = useState<Hero[]>([])
  const [busqueda, setBusqueda] = useState('')
  const [equipo, setEquipo] = useState<Hero[]>([])

  useEffect(() => {
    fetch('https://raw.githubusercontent.com/akabab/superhero-api/master/api/all.json')
      .then((res) => res.json())
      .then((data: Hero[]) => setHeroes(data))
  }, [])

  const agregarAlEquipo = (heroe: Hero) => {
    if (equipo.length >= 5) return
    if (equipo.find((h) => h.id === heroe.id)) return
    setEquipo([...equipo, heroe])
  }

  const quitarDelEquipo = (id: number) => {
    setEquipo(equipo.filter((h) => h.id !== id))
  }

  const calcularPromedio = (stat: keyof Hero['powerstats']) => {
    if (equipo.length === 0) return 0
    const suma = equipo.reduce((acc, h) => acc + h.powerstats[stat], 0)
    return Math.round(suma / equipo.length)
  }

  const stats: (keyof Hero['powerstats'])[] = [
    'intelligence', 'strength', 'speed', 'durability', 'power', 'combat'
  ]

  const heroesFiltrados = heroes.filter((h) =>
    busqueda.length < 3
      ? false
      : h.name.toLowerCase().includes(busqueda.toLowerCase())
  )

  return (
    <div className="tabla-container">
      <h2>Hero Builder</h2>
      <p>Arma tu equipo de 5 heroes</p>

      <input
        type="text"
        placeholder="Buscar heroe para agregar..."
        value={busqueda}
        onChange={(e) => setBusqueda(e.target.value)}
      />

      {heroesFiltrados.length > 0 && (
        <div className="heroes-grid">
          {heroesFiltrados.slice(0, 10).map((heroe) => (
            <div key={heroe.id} className="heroe-card">
              <Link to={`/heroe/${heroe.id}`}>
                <img src={heroe.images.sm} alt={heroe.name} />
                <p>{heroe.name}</p>
              </Link>
              <button
                onClick={() => agregarAlEquipo(heroe)}
                disabled={equipo.length >= 5 || !!equipo.find((h) => h.id === heroe.id)}
              >
                {equipo.find((h) => h.id === heroe.id) ? 'En equipo' : 'Agregar'}
              </button>
            </div>
          ))}
        </div>
      )}

      <h3>Mi equipo ({equipo.length}/5)</h3>
      {equipo.length === 0 ? (
        <p>Busca heroes para agregar al equipo</p>
      ) : (
        <>
          <div className="heroes-grid">
            {equipo.map((heroe) => (
              <div key={heroe.id} className="heroe-card">
                <img src={heroe.images.sm} alt={heroe.name} />
                <p>{heroe.name}</p>
                <button onClick={() => quitarDelEquipo(heroe.id)}>Quitar</button>
              </div>
            ))}
          </div>

          <div className="stats">
            <h3>Promedio del equipo</h3>
            {stats.map((stat) => (
              <div key={stat} className="stat-barra">
                <span>{stat}</span>
                <div className="barra">
                  <div
                    className="relleno"
                    style={{ width: `${calcularPromedio(stat)}%` }}
                  ></div>
                </div>
                <span>{calcularPromedio(stat)}</span>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  )
}

export default Builder