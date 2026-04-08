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

        {/* Titre */}
        <div className="text-center mb-4">
          <div style={{
            width: 64, height: 64, borderRadius: '50%',
            background: 'linear-gradient(135deg, #FF6B35, #E85A25)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            margin: '0 auto 14px',
            boxShadow: '0 8px 24px rgba(255,107,53,0.4)',
          }}>
            <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
              <circle cx="12" cy="7" r="4"/>
            </svg>
          </div>
          <h2 style={{ fontFamily: "'Raleway', sans-serif", fontWeight: 900, color: 'white', fontSize: '1.7rem', marginBottom: 4, textShadow: '0 2px 8px rgba(0,0,0,0.5)' }}>
            Connexion
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.75)', fontSize: '0.875rem', margin: 0 }}>
            Accédez à votre espace ONCF voyages
          </p>
        </div>

        {/* Card */}
        <div className="card-oncf p-4">
          {error && (
            <div className="mb-3 px-3 py-2 rounded-3 d-flex align-items-center gap-2"
              style={{ background: '#FFEBEE', color: '#C62828', border: '1px solid #FFCDD2', fontSize: '0.875rem' }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#C62828" strokeWidth="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label d-flex align-items-center gap-2"
                style={{ fontWeight: 600, fontSize: '0.85rem', color: '#1A1A2E' }}>
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#FF6B35" strokeWidth="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                Login
              </label>
              <input className="form-control" name="login"
                value={form.login} onChange={handleChange}
                placeholder="votre_login"
                required autoFocus
                style={{ borderRadius: 10, borderColor: '#E0E7EF', fontSize: '0.9rem', padding: '0.6rem 0.85rem' }} />
            </div>

            <div className="mb-4">
              <label className="form-label d-flex align-items-center gap-2"
                style={{ fontWeight: 600, fontSize: '0.85rem', color: '#1A1A2E' }}>
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#FF6B35" strokeWidth="2"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
                Mot de passe
              </label>
              <input className="form-control" type="password" name="password"
                value={form.password} onChange={handleChange}
                placeholder="••••••••"
                required
                style={{ borderRadius: 10, borderColor: '#E0E7EF', fontSize: '0.9rem', padding: '0.6rem 0.85rem' }} />
            </div>

            <button type="submit" disabled={loading} className="w-100 btn"
              style={{
                background: 'linear-gradient(135deg, #FF6B35, #E85A25)',
                color: 'white', borderRadius: 10, border: 'none',
                padding: '0.7rem', fontWeight: 700, fontSize: '0.95rem',
                boxShadow: '0 4px 14px rgba(255,107,53,0.4)',
              }}>
              {loading
                ? <><span className="spinner-border spinner-border-sm me-2" />Connexion…</>
                : <span className="d-flex align-items-center justify-content-center gap-2">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2"><path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"/><polyline points="10 17 15 12 10 7"/><line x1="15" y1="12" x2="3" y2="12"/></svg>
                    Se connecter
                  </span>}
            </button>
          </form>

          <div className="text-center mt-3 pt-3" style={{ borderTop: '1px solid #F0F4F8' }}>
            <span style={{ color: '#607D8B', fontSize: '0.875rem' }}>Pas de compte ? </span>
            <Link to="/register" style={{ color: '#FF6B35', fontWeight: 700, fontSize: '0.875rem', textDecoration: 'none' }}>
              Créer un compte →
            </Link>
          </div>
        </div>

        <div className="text-center mt-3"
          style={{ background: 'rgba(255,255,255,0.15)', backdropFilter: 'blur(8px)', borderRadius: 10,
            padding: '0.75rem 1rem', fontSize: '0.8rem', color: 'white', border: '1px solid rgba(255,255,255,0.2)' }}>
          🧪 Compte test : <strong>client1</strong> / <strong>123456</strong>
        </div>
      </div>
    </div>
  )
}
