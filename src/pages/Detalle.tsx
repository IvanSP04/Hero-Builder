import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from '../firebase/firebaseConfig';
import { useAuth } from '../AuthContext';
import type { Hero } from '../type';

function Detalle() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [heroe, setHeroe] = useState<Hero | null>(null);
  const [esFavorito, setEsFavorito] = useState(false);

  useEffect(() => {
    const cargar = async () => {
      try {
        const res = await fetch(
          'https://raw.githubusercontent.com/akabab/superhero-api/master/api/all.json'
        );
        const data: Hero[] = await res.json();
        const encontrado = data.find(h => h.id === Number(id));
        setHeroe(encontrado || null);

        if (user) {
          const docRef = doc(db, 'usuarios', user.uid);
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
            const favs: number[] = docSnap.data().favoritos || [];
            setEsFavorito(favs.includes(Number(id)));
          }
        } else {
          const favoritos: number[] = JSON.parse(
            localStorage.getItem('favoritos') || '[]'
          );
          setEsFavorito(favoritos.includes(Number(id)));
        }
      } catch (error) {
        console.error('Error cargando héroe:', error);
      }
    };

    cargar();
  }, [id, user]);

  const toggleFavorito = async () => {
    try {
      if (user) {
        const docRef = doc(db, 'usuarios', user.uid);
        const docSnap = await getDoc(docRef);
        if (!docSnap.exists()) return;
        const favs: number[] = docSnap.data().favoritos || [];

        if (esFavorito) {
          await updateDoc(docRef, { favoritos: favs.filter(f => f !== Number(id)) });
        } else {
          await updateDoc(docRef, { favoritos: [...favs, Number(id)] });
        }
        setEsFavorito(!esFavorito);
      } else {
        const favoritos: number[] = JSON.parse(
          localStorage.getItem('favoritos') || '[]'
        );
        if (esFavorito) {
          localStorage.setItem(
            'favoritos',
            JSON.stringify(favoritos.filter(f => f !== Number(id)))
          );
        } else {
          localStorage.setItem(
            'favoritos',
            JSON.stringify([...favoritos, Number(id)])
          );
        }
        setEsFavorito(!esFavorito);
      }
    } catch (error) {
      console.error('Error toggling favorito:', error);
    }
  };

  if (!heroe) return <p className="cargando">Cargando héroe...</p>;

  return (
    <div className="detalle-container">
      <button onClick={() => navigate(-1)}>← Volver</button>
      <h2>{heroe.name}</h2>
      <img src={heroe.images.md} alt={heroe.name} />

      <button
        onClick={toggleFavorito}
        className={esFavorito ? 'activo' : ''}
      >
        {esFavorito ? '❤️ Quitar de favoritos' : '🤍 Agregar a favoritos'}
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
  );
}

export default Detalle;