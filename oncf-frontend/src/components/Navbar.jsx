import { Link, useNavigate, useLocation } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { useCart } from '../context/CartContext'

export default function Navbar() {
  const { user, logout } = useAuth()
  const { itemCount }    = useCart()
  const navigate         = useNavigate()
  const location         = useLocation()

  const handleLogout = async () => {
    await logout()
    navigate('/login')
  }

  const isActive = (path) => location.pathname === path

  return (
    <nav className="navbar navbar-expand-lg navbar-oncf">
      <div className="container">

        {/* ─── Logo ─── */}
        <Link className="navbar-brand" to="/">
          <span style={{ fontWeight: 900, fontSize: '1.5rem', letterSpacing: '0.5px' }}>
            ONCF
          </span>
          <span className="voyages" style={{ fontWeight: 300, fontSize: '1.1rem', marginLeft: 2 }}>
            voyages
          </span>
        </Link>

        <button className="navbar-toggler border-0" type="button"
          data-bs-toggle="collapse" data-bs-target="#navContent"
          style={{ filter: 'invert(1)' }}>
          <span className="navbar-toggler-icon" />
        </button>

        <div className="collapse navbar-collapse" id="navContent">
          <ul className="navbar-nav ms-auto align-items-lg-center gap-lg-1">

            <li className="nav-item">
              <Link className={`nav-link px-3 ${isActive('/') ? 'active' : ''}`} to="/">
                🔍 Rechercher
              </Link>
            </li>

            {user ? (
              <>
                <li className="nav-item">
                  <Link className={`nav-link px-3 position-relative ${isActive('/panier') ? 'active' : ''}`} to="/panier">
                    🛒 Panier
                    {itemCount > 0 && (
                      <span style={{
                        background: 'white',
                        color: '#FF6B35',
                        fontSize: '0.68rem',
                        fontWeight: 800,
                        borderRadius: '50%',
                        width: 18, height: 18,
                        display: 'inline-flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginLeft: 6,
                        verticalAlign: 'middle',
                      }}>
                        {itemCount}
                      </span>
                    )}
                  </Link>
                </li>

                <li className="nav-item dropdown ms-lg-2">
                  <button
                    className="btn btn-sm dropdown-toggle"
                    style={{
                      background: 'rgba(255,255,255,0.2)',
                      border: '1.5px solid rgba(255,255,255,0.35)',
                      color: 'white',
                      borderRadius: '50px',
                      padding: '0.4rem 1.1rem',
                      fontSize: '0.875rem',
                      fontWeight: 600,
                    }}
                    data-bs-toggle="dropdown">
                    👤 {user.prenom} {user.nom}
                  </button>
                  <ul className="dropdown-menu dropdown-menu-end shadow border-0"
                    style={{ borderRadius: '14px', minWidth: '170px', padding: '0.5rem 0' }}>
                    <li>
                      <div className="px-3 py-2" style={{ fontSize: '0.78rem', color: '#6B7280', borderBottom: '1px solid #F0F0F0' }}>
                        {user.email}
                      </div>
                    </li>
                    <li>
                      <button className="dropdown-item py-2 text-danger"
                        onClick={handleLogout}
                        style={{ fontSize: '0.875rem' }}>
                        🚪 Déconnexion
                      </button>
                    </li>
                  </ul>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item">
                  <Link className={`nav-link px-3 ${isActive('/login') ? 'active' : ''}`} to="/login">
                    Connexion
                  </Link>
                </li>
                <li className="nav-item ms-lg-2">
                  <Link to="/register" className="btn btn-sm"
                    style={{
                      background: 'white',
                      color: '#FF6B35',
                      borderRadius: '50px',
                      padding: '0.4rem 1.3rem',
                      fontWeight: 700,
                      border: 'none',
                    }}>
                    S'inscrire
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  )
}
