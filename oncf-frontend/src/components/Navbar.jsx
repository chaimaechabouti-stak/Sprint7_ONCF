import { Link, useNavigate, useLocation } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { useCart } from '../context/CartContext'

function OncfLogo() {
  return (
    <img src="/logo.png" alt="ONCF Logo"
      style={{ width: 48, height: 48, objectFit: 'contain' }} />
  )
}

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
          <OncfLogo />
          <div>
            <span style={{ fontFamily: 'Georgia, serif', letterSpacing: '3px', fontSize: '1.25rem', display: 'block', lineHeight: 1 }}>
              ONCF
            </span>
            <span style={{ fontSize: '0.6rem', letterSpacing: '1px', color: 'rgba(255,255,255,0.5)', fontWeight: 400 }}>
              RÉSERVATION EN LIGNE
            </span>
          </div>
        </Link>

        <button className="navbar-toggler border-0" type="button"
          data-bs-toggle="collapse" data-bs-target="#navContent"
          style={{ filter: 'invert(1)' }}>
          <span className="navbar-toggler-icon" />
        </button>

        <div className="collapse navbar-collapse" id="navContent">
          <ul className="navbar-nav ms-auto align-items-lg-center gap-lg-1">

            <li className="nav-item">
              <Link className="nav-link px-3" to="/"
                style={{ color: isActive('/') ? '#FF6B35' : undefined, fontWeight: isActive('/') ? 600 : undefined }}>
                🔍 Rechercher
              </Link>
            </li>

            {user ? (
              <>
                <li className="nav-item">
                  <Link className="nav-link px-3 position-relative" to="/panier"
                    style={{ color: isActive('/panier') ? '#FF6B35' : undefined, fontWeight: isActive('/panier') ? 600 : undefined }}>
                    🛒 Panier
                    {itemCount > 0 && (
                      <span style={{
                        background: '#FF6B35',
                        color: 'white',
                        fontSize: '0.68rem',
                        fontWeight: 700,
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
                      background: 'rgba(255,107,53,0.15)',
                      border: '1.5px solid rgba(255,107,53,0.4)',
                      color: 'white',
                      borderRadius: '24px',
                      padding: '0.4rem 1.1rem',
                      fontSize: '0.875rem',
                      fontWeight: 500,
                    }}
                    data-bs-toggle="dropdown">
                    👤 {user.prenom} {user.nom}
                  </button>
                  <ul className="dropdown-menu dropdown-menu-end shadow border-0"
                    style={{ borderRadius: '12px', minWidth: '170px', padding: '0.5rem 0' }}>
                    <li>
                      <div className="px-3 py-2" style={{ fontSize: '0.78rem', color: '#607D8B', borderBottom: '1px solid #F0F0F0' }}>
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
                  <Link className="nav-link px-3" to="/login"
                    style={{ color: isActive('/login') ? '#FF6B35' : undefined }}>
                    Connexion
                  </Link>
                </li>
                <li className="nav-item ms-lg-2">
                  <Link to="/register"
                    className="btn btn-sm"
                    style={{
                      background: 'linear-gradient(135deg, #FF6B35, #E85A25)',
                      color: 'white',
                      borderRadius: '24px',
                      padding: '0.4rem 1.3rem',
                      fontWeight: 600,
                      border: 'none',
                      boxShadow: '0 2px 8px rgba(255,107,53,0.35)',
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
