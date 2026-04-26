import { Link, useLocation } from 'react-router'

function Navbar() {
  const location = useLocation()

  const tabs = [
    { path: '/', label: 'Home' },
    { path: '/favoritos', label: 'Favoritos' },
    { path: '/builder', label: 'Builder' },
    { path: '/informativa', label: 'Info' },
    { path: '/peleas', label: 'Peleas' },
    { path: '/usuario', label: 'Usuario' },
  ]

  return (
    <nav className="navbar">
      {tabs.map((tab) => (
        <Link
          key={tab.path}
          to={tab.path}
          className={location.pathname === tab.path ? 'activo' : ''}
        >
          {tab.label}
        </Link>
      ))}
    </nav>
  )
}

export default Navbar