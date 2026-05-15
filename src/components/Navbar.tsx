import { Link, useLocation, useNavigate } from 'react-router'
import { useAuth } from '../AuthContext'

function Navbar() {
  const location = useLocation()
  const navigate = useNavigate()
  const { user, logout } = useAuth()

  const tabs = [
    { path: '/', label: 'Home' },
    { path: '/favoritos', label: 'Favoritos' },
    { path: '/builder', label: 'Builder' },
    { path: '/informativa', label: 'Info' },
    { path: '/peleas', label: 'Peleas' },
    { path: '/usuario', label: user ? user.username : 'Usuario' },
  ]

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  return (
    <nav className="navbar">
      <div className="navbar-links">
        {tabs.map((tab) => (
          <Link
            key={tab.path}
            to={tab.path}
            className={location.pathname === tab.path ? 'activo' : ''}
          >
            {tab.path === '/usuario' ? (
              <>
                <span className="nav-icon">👤</span>
                {tab.label}
              </>
            ) : (
              tab.label
            )}
          </Link>
        ))}
      </div>
      {user && (
        <button className="nav-logout" onClick={handleLogout}>
          Cerrar sesión
        </button>
      )}
    </nav>
  )
}

export default Navbar