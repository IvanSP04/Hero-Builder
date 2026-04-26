import { useEffect, useState } from 'react'
import { Link } from 'react-router'
import type { Hero } from '../type'

function Favoritos() {
  const [heroes, setHeroes] = useState<Hero[]>([])

  useEffect(() => {
    const favoritos: number[] = JSON.parse(localStorage.getItem('favoritos') || '[]')

    if (favoritos.length === 0) return

    fetch('https://raw.githubusercontent.com/akabab/superhero-api/master/api/all.json')
      .then((res) => res.json())
      .then((data: Hero[]) => {
        const heroesFav = data.filter((h) => favoritos.includes(h.id))
        setHeroes(heroesFav)
      })
  }, [])

  return (
    <div className="tabla-container">
      <h2>Favoritos</h2>
      {heroes.length === 0 ? (
        <p>No tienes heroes favoritos</p>
      ) : (
        <div className="heroes-grid">
          {heroes.map((heroe) => (
            <Link to={`/heroe/${heroe.id}`} key={heroe.id} className="heroe-card">
              <img src={heroe.images.sm} alt={heroe.name} />
              <p>{heroe.name}</p>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}

export default Favoritos