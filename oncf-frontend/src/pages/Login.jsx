import { useState } from 'react'
import { useAuth } from '../context/AuthContext'
import { useNavigate, Link } from 'react-router-dom'

export default function Login() {
  const { login }             = useAuth()
  const navigate              = useNavigate()
  const [form, setForm]       = useState({ login: '', password: '' })
  const [error, setError]     = useState('')
  const [loading, setLoading] = useState(false)

  const handleChange = (e) =>
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }))

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      await login(form.login, form.password)
      navigate('/')
    } catch (err) {
      setError(
        err.response?.data?.message ||
        Object.values(err.response?.data?.errors || {})[0]?.[0] ||
        'Identifiants incorrects.'
      )
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="row justify-content-center mt-4">
      <div className="col-md-5 col-lg-4">

        {/* Logo centré */}
        <div className="text-center mb-4">
          <div style={{
            width: 64, height: 64, borderRadius: 16,
            background: '#1B3A5C',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            margin: '0 auto 12px',
          }}>
            <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
              <rect x="7" y="10" width="15" height="10" rx="3" fill="white"/>
              <rect x="9" y="12" width="4" height="4" rx="1" fill="#1B3A5C"/>
              <rect x="15" y="12" width="4" height="4" rx="1" fill="#1B3A5C"/>
              <rect x="5" y="13" width="2" height="2" rx="1" fill="white" opacity="0.5"/>
              <circle cx="10" cy="23" r="2.5" fill="white" stroke="#1B3A5C" strokeWidth="1"/>
              <circle cx="18" cy="23" r="2.5" fill="white" stroke="#1B3A5C" strokeWidth="1"/>
              <rect x="22" y="18" width="9" height="6" rx="2" fill="white" opacity="0.9"/>
              <circle cx="26" cy="23" r="2" fill="white" stroke="#1B3A5C" strokeWidth="1"/>
            </svg>
          </div>
          <h2 style={{ fontFamily: 'Georgia, serif', color: '#1B3A5C', fontWeight: 700, fontSize: '1.6rem' }}>
            ONCF
          </h2>
          <p style={{ color: '#607D8B', fontSize: '0.875rem' }}>
            Connectez-vous à votre espace
          </p>
        </div>

        {/* Card */}
        <div className="card-oncf p-4">
          {error && (
            <div className="alert rounded-3 mb-3"
              style={{ background: '#FFEBEE', color: '#C62828', border: '1px solid #FFCDD2', fontSize: '0.875rem' }}>
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label"
                style={{ fontWeight: 500, fontSize: '0.875rem', color: '#1B3A5C' }}>
                Login
              </label>
              <input className="form-control" name="login"
                value={form.login} onChange={handleChange}
                placeholder="votre_login"
                required autoFocus
                style={{ borderRadius: 8, borderColor: '#D0DCE8', fontSize: '0.9rem' }} />
            </div>

            <div className="mb-4">
              <label className="form-label"
                style={{ fontWeight: 500, fontSize: '0.875rem', color: '#1B3A5C' }}>
                Mot de passe
              </label>
              <input className="form-control" type="password" name="password"
                value={form.password} onChange={handleChange}
                placeholder="••••••••"
                required
                style={{ borderRadius: 8, borderColor: '#D0DCE8', fontSize: '0.9rem' }} />
            </div>

            <button type="submit" disabled={loading}
              className="w-100 btn"
              style={{
                background: '#1B3A5C', color: 'white',
                borderRadius: 8, border: 'none',
                padding: '0.65rem', fontWeight: 600,
                fontSize: '0.95rem', letterSpacing: '0.3px',
              }}>
              {loading
                ? <><span className="spinner-border spinner-border-sm me-2" />Connexion…</>
                : 'Se connecter'}
            </button>
          </form>

          <div className="text-center mt-3 pt-3" style={{ borderTop: '1px solid #E8EDF2' }}>
            <span style={{ color: '#607D8B', fontSize: '0.875rem' }}>
              Pas de compte ?{' '}
            </span>
            <Link to="/register"
              style={{ color: '#2E6DA4', fontWeight: 600, fontSize: '0.875rem', textDecoration: 'none' }}>
              Créer un compte →
            </Link>
          </div>
        </div>

        {/* Info test */}
        <div className="text-center mt-3"
          style={{ background: '#E8F4FD', borderRadius: 8, padding: '0.75rem 1rem', fontSize: '0.8rem', color: '#2E6DA4' }}>
          Compte test : <strong>client1</strong> / <strong>123456</strong>
        </div>
      </div>
    </div>
  )
}