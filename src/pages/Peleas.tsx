import { useEffect, useState } from 'react'
import type { Hero } from '../type'

function Peleas() {
  const [heroes, setHeroes] = useState<Hero[]>([])
  const [busqueda1, setBusqueda1] = useState('')
  const [busqueda2, setBusqueda2] = useState('')
  const [heroe1, setHeroe1] = useState<Hero | null>(null)
  const [heroe2, setHeroe2] = useState<Hero | null>(null)
  const [resultado, setResultado] = useState<string | null>(null)

  useEffect(() => {
    fetch('https://raw.githubusercontent.com/akabab/superhero-api/master/api/all.json')
      .then((res) => res.json())
      .then((data: Hero[]) => setHeroes(data))
  }, [])

  const buscarHeroe1 = heroes.filter((h) =>
    busqueda1.length < 3
      ? false
      : h.name.toLowerCase().includes(busqueda1.toLowerCase())
  )

  const buscarHeroe2 = heroes.filter((h) =>
    busqueda2.length < 3
      ? false
      : h.name.toLowerCase().includes(busqueda2.toLowerCase())
  )

  const calcularPoder = (heroe: Hero) => {
    const stats = Object.values(heroe.powerstats)
    return Math.round(stats.reduce((a, b) => a + b, 0) / stats.length)
  }

  const pelear = () => {
    if (!heroe1 || !heroe2) return
    const poder1 = calcularPoder(heroe1)
    const poder2 = calcularPoder(heroe2)

    if (poder1 > poder2) setResultado(`${heroe1.name} gana con ${poder1} vs ${poder2}`)
    else if (poder2 > poder1) setResultado(`${heroe2.name} gana con ${poder2} vs ${poder1}`)
    else setResultado('Empate')
  }

  const stats: (keyof Hero['powerstats'])[] = [
    'intelligence', 'strength', 'speed', 'durability', 'power', 'combat'
  ]

  return (
    <div className="tabla-container">
      <h2>Peleas</h2>
      <p>Elige dos heroes y ve quien gana</p>

      <div className="peleas-grid">
        <div className="pelea-slot">
          <h3>Heroe 1</h3>
          <input
            type="text"
            placeholder="Buscar heroe..."
            value={busqueda1}
            onChange={(e) => {
              setBusqueda1(e.target.value)
              setResultado(null)
            }}
          />
          {buscarHeroe1.slice(0, 5).map((h) => (
            <div
              key={h.id}
              className="heroe-opcion"
              onClick={() => {
                setHeroe1(h)
                setBusqueda1(h.name)
                setResultado(null)
              }}
            >
              <img src={h.images.sm} alt={h.name} />
              <span>{h.name}</span>
            </div>
          ))}
          {heroe1 && (
            <div className="heroe-seleccionado">
              <img src={heroe1.images.md} alt={heroe1.name} />
              <p>{heroe1.name}</p>
              <p>Poder promedio: {calcularPoder(heroe1)}</p>
            </div>
          )}
        </div>

        <div className="pelea-slot">
          <h3>Heroe 2</h3>
          <input
            type="text"
            placeholder="Buscar heroe..."
            value={busqueda2}
            onChange={(e) => {
              setBusqueda2(e.target.value)
              setResultado(null)
            }}
          />
          {buscarHeroe2.slice(0, 5).map((h) => (
            <div
              key={h.id}
              className="heroe-opcion"
              onClick={() => {
                setHeroe2(h)
                setBusqueda2(h.name)
                setResultado(null)
              }}
            >
              <img src={h.images.sm} alt={h.name} />
              <span>{h.name}</span>
            </div>
          ))}
          {heroe2 && (
            <div className="heroe-seleccionado">
              <img src={heroe2.images.md} alt={heroe2.name} />
              <p>{heroe2.name}</p>
              <p>Poder promedio: {calcularPoder(heroe2)}</p>
            </div>
          )}
        </div>
      </div>

      {heroe1 && heroe2 && (
        <>
          <div className="stats">
            <h3>Comparacion de stats</h3>
            {stats.map((stat) => (
              <div key={stat} className="stat-comparacion">
                <span>{heroe1.powerstats[stat]}</span>
                <span className="stat-nombre">{stat}</span>
                <span>{heroe2.powerstats[stat]}</span>
              </div>
            ))}
          </div>

          <button className="btn-pelear" onClick={pelear}>
            Pelear
          </button>
        </>
      )}

      {resultado && (
        <div className="resultado">
          <h3>{resultado}</h3>
        </div>
      )}
    </div>
  )
}

export default Peleas