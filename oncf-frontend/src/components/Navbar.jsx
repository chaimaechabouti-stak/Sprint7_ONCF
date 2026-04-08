import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { useCart } from '../context/CartContext'

function OncfLogo() {
  return (
    <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
      <rect width="36" height="36" rx="8" fill="#2E6DA4"/>
      <rect x="7" y="10" width="15" height="10" rx="3" fill="white"/>
      <rect x="9" y="12" width="4" height="4" rx="1" fill="#1B3A5C"/>
      <rect x="15" y="12" width="4" height="4" rx="1" fill="#1B3A5C"/>
      <rect x="5" y="13" width="2" height="2" rx="1" fill="white" opacity="0.5"/>
      <rect x="5" y="16" width="3" height="2" rx="1" fill="white" opacity="0.4"/>
      <circle cx="10" cy="23" r="2.5" fill="white" stroke="#1B3A5C" strokeWidth="1"/>
      <circle cx="18" cy="23" r="2.5" fill="white" stroke="#1B3A5C" strokeWidth="1"/>
      <rect x="22" y="18" width="9" height="6" rx="2" fill="white" opacity="0.9"/>
      <circle cx="26" cy="23" r="2" fill="white" stroke="#1B3A5C" strokeWidth="1"/>
      <rect x="7" y="20" width="22" height="1.5" rx="0.75" fill="white" opacity="0.3"/>
    </svg>
  )
}

export default function Navbar() {
  const { user, logout } = useAuth()
  const { itemCount }    = useCart()
  const navigate         = useNavigate()

  const handleLogout = async () => {
    await logout()
    navigate('/login')
  }

  return (
    <nav className="navbar navbar-expand-lg navbar-oncf shadow-sm">
      <div className="container">

        {/* ─── Logo ─── */}
        <Link className="navbar-brand" to="/">
          <OncfLogo />
          <span style={{ fontFamily: 'Georgia, serif', letterSpacing: '3px', fontSize: '1.3rem' }}>
            ONCF
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
              <Link className="nav-link px-3" to="/">
                <svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor" style={{marginRight:6,marginBottom:2}}>
                  <path d="M8 1a7 7 0 1 0 0 14A7 7 0 0 0 8 1zm0 12.5A5.5 5.5 0 1 1 8 2.5a5.5 5.5 0 0 1 0 11zM7 6.5l1-1.5 1 1.5H8.5v3h-1v-3H7z"/>
                </svg>
                Rechercher
              </Link>
            </li>

            {user ? (
              <>
                <li className="nav-item">
                  <Link className="nav-link px-3 position-relative" to="/panier">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" style={{marginRight:5,marginBottom:2}}>
                      <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4z"/>
                    </svg>
                    Panier
                    {itemCount > 0 && (
                      <span className="badge bg-warning text-dark ms-1"
                        style={{ fontSize: '0.7rem', borderRadius: '20px' }}>
                        {itemCount}
                      </span>
                    )}
                  </Link>
                </li>

                <li className="nav-item dropdown ms-lg-2">
                  <button
                    className="btn btn-sm dropdown-toggle"
                    style={{
                      background: 'rgba(255,255,255,0.12)',
                      border: '1px solid rgba(255,255,255,0.25)',
                      color: 'white',
                      borderRadius: '20px',
                      padding: '0.35rem 1rem',
                      fontSize: '0.875rem',
                    }}
                    data-bs-toggle="dropdown">
                    <svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor" style={{marginRight:6,marginBottom:1}}>
                      <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0zm4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4z"/>
                    </svg>
                    {user.prenom} {user.nom}
                  </button>
                  <ul className="dropdown-menu dropdown-menu-end shadow-sm border-0"
                    style={{ borderRadius: '10px', minWidth: '160px' }}>
                    <li>
                      <div className="px-3 py-2 border-bottom"
                        style={{ fontSize: '0.8rem', color: '#607D8B' }}>
                        {user.email}
                      </div>
                    </li>
                    <li>
                      <button className="dropdown-item text-danger py-2"
                        onClick={handleLogout}
                        style={{ fontSize: '0.875rem' }}>
                        <svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor" style={{marginRight:8,marginBottom:1}}>
                          <path d="M10 12.5a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v2a.5.5 0 0 0 1 0v-2A1.5 1.5 0 0 0 9.5 2h-8A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-2a.5.5 0 0 0-1 0v2z"/>
                          <path d="M15.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 0 0-.708.708L14.293 7.5H5.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3z"/>
                        </svg>
                        Déconnexion
                      </button>
                    </li>
                  </ul>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item">
                  <Link className="nav-link px-3" to="/login">Connexion</Link>
                </li>
                <li className="nav-item ms-lg-2">
                  <Link to="/register"
                    className="btn btn-sm"
                    style={{
                      background: '#2E6DA4',
                      color: 'white',
                      borderRadius: '20px',
                      padding: '0.4rem 1.2rem',
                      fontWeight: 500,
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