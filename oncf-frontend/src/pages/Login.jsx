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
    <div className="row justify-content-center mt-5 fade-in">
      <div className="col-md-5 col-lg-4">

        {/* Logo + titre */}
        <div className="text-center mb-4">
          <img src="/logo.png" alt="ONCF Logo"
            style={{ width: 80, height: 80, objectFit: 'contain', margin: '0 auto 14px', display: 'block' }} />
          <h2 style={{ fontFamily: 'Georgia, serif', color: '#0A2342', fontWeight: 700, fontSize: '1.7rem', marginBottom: 4 }}>
            ONCF
          </h2>
          <p style={{ color: '#607D8B', fontSize: '0.875rem', margin: 0 }}>
            Connectez-vous à votre espace
          </p>
        </div>

        {/* Card */}
        <div className="card-oncf p-4">
          {error && (
            <div className="mb-3 px-3 py-2 rounded-3"
              style={{ background: '#FFEBEE', color: '#C62828', border: '1px solid #FFCDD2', fontSize: '0.875rem' }}>
              ⚠️ {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label"
                style={{ fontWeight: 600, fontSize: '0.85rem', color: '#0A2342' }}>
                Login
              </label>
              <input className="form-control" name="login"
                value={form.login} onChange={handleChange}
                placeholder="votre_login"
                required autoFocus
                style={{ borderRadius: 10, borderColor: '#E0E7EF', fontSize: '0.9rem', padding: '0.6rem 0.85rem' }} />
            </div>

            <div className="mb-4">
              <label className="form-label"
                style={{ fontWeight: 600, fontSize: '0.85rem', color: '#0A2342' }}>
                Mot de passe
              </label>
              <input className="form-control" type="password" name="password"
                value={form.password} onChange={handleChange}
                placeholder="••••••••"
                required
                style={{ borderRadius: 10, borderColor: '#E0E7EF', fontSize: '0.9rem', padding: '0.6rem 0.85rem' }} />
            </div>

            <button type="submit" disabled={loading}
              className="w-100 btn"
              style={{
                background: 'linear-gradient(135deg, #FF6B35, #E85A25)',
                color: 'white',
                borderRadius: 10, border: 'none',
                padding: '0.7rem', fontWeight: 700,
                fontSize: '0.95rem',
                boxShadow: '0 4px 14px rgba(255,107,53,0.35)',
                transition: 'all 0.2s',
              }}>
              {loading
                ? <><span className="spinner-border spinner-border-sm me-2" />Connexion…</>
                : 'Se connecter →'}
            </button>
          </form>

          <div className="text-center mt-3 pt-3" style={{ borderTop: '1px solid #F0F4F8' }}>
            <span style={{ color: '#607D8B', fontSize: '0.875rem' }}>Pas de compte ? </span>
            <Link to="/register"
              style={{ color: '#FF6B35', fontWeight: 700, fontSize: '0.875rem', textDecoration: 'none' }}>
              Créer un compte →
            </Link>
          </div>
        </div>

        {/* Info test */}
        <div className="text-center mt-3"
          style={{ background: '#FFF4EF', borderRadius: 10, padding: '0.75rem 1rem',
            fontSize: '0.8rem', color: '#FF6B35', border: '1px solid #FFD5C2' }}>
          🧪 Compte test : <strong>client1</strong> / <strong>123456</strong>
        </div>

      </div>
    </div>
  )
}
