import { useEffect, useState } from 'react';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from '../firebase/firebaseConfig';
import { useAuth } from '../AuthContext';
import { Link } from 'react-router';
import type { Hero } from '../type';

export default function Favoritos() {
  const { user } = useAuth();
  const [heroes, setHeroes] = useState<Hero[]>([]);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    const cargarFavoritos = async () => {
      try {
        let ids: number[] = [];

        if (user) {
          const docRef = doc(db, 'usuarios', user.uid);
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
            ids = docSnap.data().favoritos || [];
          }
        } else {
          ids = JSON.parse(localStorage.getItem('favoritos') || '[]');
        }

        if (ids.length > 0) {
          const res = await fetch(
            'https://raw.githubusercontent.com/akabab/superhero-api/master/api/all.json'
          );
          const todos: Hero[] = await res.json();
          const misFavoritos = todos.filter(h => ids.includes(h.id));
          setHeroes(misFavoritos);
        }
      } catch (error) {
        console.error('Error cargando favoritos:', error);
      } finally {
        setCargando(false);
      }
    };

    cargarFavoritos();
  }, [user]);

  const quitarFavorito = async (id: number) => {
    try {
      if (user) {
        const docRef = doc(db, 'usuarios', user.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const favs: number[] = docSnap.data().favoritos || [];
          await updateDoc(docRef, { favoritos: favs.filter(f => f !== id) });
        }
      } else {
        const favs: number[] = JSON.parse(
          localStorage.getItem('favoritos') || '[]'
        );
        localStorage.setItem(
          'favoritos',
          JSON.stringify(favs.filter(f => f !== id))
        );
      }
      setHeroes(prev => prev.filter(h => h.id !== id));
    } catch (error) {
      console.error('Error quitando favorito:', error);
    }
  };

  if (cargando) return <p className="cargando">Cargando favoritos...</p>;

  return (
    <div className="favoritos-container">
      <h1>⭐ Mis Favoritos</h1>
      {heroes.length === 0 ? (
        <div className="sin-favoritos">
          <p>No tienes héroes favoritos aún.</p>
          <Link to="/">Explorar héroes</Link>
        </div>
      ) : (
        <div className="heroes-grid">
          {heroes.map(heroe => (
            <div key={heroe.id} className="heroe-card">
              <Link to={`/heroe/${heroe.id}`}>
                <img src={heroe.images.sm} alt={heroe.name} />
                <h3>{heroe.name}</h3>
                <span className={`alignment ${heroe.biography.alignment}`}>
                  {heroe.biography.alignment}
                </span>
              </Link>
              <button
                className="btn-quitar"
                onClick={() => quitarFavorito(heroe.id)}
              >
                Quitar
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}