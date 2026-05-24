import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router'
import { useAuth } from '../AuthContext'
import { doc, getDoc, updateDoc } from 'firebase/firestore'
import { db } from '../firebase/firebaseConfig'

function Usuario() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const [nombre, setNombre] = useState('')
  const [heroeFav, setHeroeFav] = useState('')
  const [guardado, setGuardado] = useState(false)
  const [cargando, setCargando] = useState(true)

  useEffect(() => {
    const cargarDatos = async () => {
      if (!user) return
      try {
        const docRef = doc(db, 'usuarios', user.uid)
        const docSnap = await getDoc(docRef)
        if (docSnap.exists()) {
          const data = docSnap.data()
          setNombre(data.nombre || '')
          setHeroeFav(data.heroeFav || '')
        }
      } catch (error) {
        console.error('Error cargando perfil:', error)
      } finally {
        setCargando(false)
      }
    }
    cargarDatos()
  }, [user])

  const guardarDatos = async () => {
    if (!user) return
    try {
      const docRef = doc(db, 'usuarios', user.uid)
      await updateDoc(docRef, { nombre, heroeFav })
      setGuardado(true)
      setTimeout(() => setGuardado(false), 2000)
    } catch (error) {
      console.error('Error guardando:', error)
    }
  }

  const handleLogout = async () => {
    await logout()
    navigate('/login')
  }

  if (cargando) return <p className="cargando">Cargando perfil...</p>

  return (
    <div className="tabla-container">
      <h2>Mi perfil</h2>

      <div className="usuario-info-header">
        <p>{user?.email}</p>
      </div>

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
        {guardado && <p className="guardado">Guardado correctamente</p>}
      </div>

      {nombre && (
        <div className="usuario-info">
          <h3>Hola, {nombre}</h3>
          {heroeFav && <p>Tu heroe favorito es: <strong>{heroeFav}</strong></p>}
        </div>
      )}

      <button className="btn-logout-usuario" onClick={handleLogout}>
        Cerrar sesion
      </button>
    </div>
  )
}

export default Usuario