import { useState } from 'react'
import { useAuth } from '../context/AuthContext'
import { useNavigate, Link } from 'react-router-dom'

export default function Register() {
  const { register }          = useAuth()
  const navigate              = useNavigate()
  const [form, setForm]       = useState({
    login: '', password: '', nom: '', prenom: '', email: '', tel: '',
  })
  const [errors, setErrors]   = useState({})
  const [loading, setLoading] = useState(false)

  const handleChange = (e) =>
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }))

  const handleSubmit = async (e) => {
    e.preventDefault()
    setErrors({})
    setLoading(true)
    try {
      await register(form)
      navigate('/')
    } catch (err) {
      setErrors(err.response?.data?.errors || { general: ['Erreur inscription.'] })
    } finally {
      setLoading(false)
    }
  }

  const fieldError = (name) =>
    errors[name] ? (
      <div style={{ color: '#C62828', fontSize: '0.8rem', marginTop: 4 }}>
        {errors[name][0]}
      </div>
    ) : null

  const inputStyle = {
    borderRadius: 8, borderColor: '#D0DCE8',
    fontSize: '0.9rem', padding: '0.55rem 0.75rem',
  }

  const labelStyle = {
    fontWeight: 500, fontSize: '0.875rem', color: '#1B3A5C', marginBottom: 4,
  }

  return (
    <div className="row justify-content-center mt-4 mb-5">
      <div className="col-md-7 col-lg-6">

        {/* En-tête */}
        <div className="text-center mb-4">
          <h2 style={{ fontFamily: 'Georgia, serif', color: '#1B3A5C', fontWeight: 700 }}>
            Créer un compte
          </h2>
          <p style={{ color: '#607D8B', fontSize: '0.875rem' }}>
            Rejoignez ONCF et réservez en ligne
          </p>
        </div>

        <div className="card-oncf p-4">
          {errors.general && (
            <div className="alert rounded-3 mb-3"
              style={{ background: '#FFEBEE', color: '#C62828', border: '1px solid #FFCDD2', fontSize: '0.875rem' }}>
              {errors.general[0]}
            </div>
          )}

          <form onSubmit={handleSubmit}>

            {/* Section identité */}
            <div className="mb-3 pb-3" style={{ borderBottom: '1px solid #EEF2F6' }}>
              <p style={{ fontSize: '0.8rem', color: '#607D8B', fontWeight: 600,
                textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: 12 }}>
                Identité
              </p>
              <div className="row g-3">
                <div className="col-md-6">
                  <label className="form-label" style={labelStyle}>Nom</label>
                  <input className="form-control" name="nom" style={inputStyle}
                    value={form.nom} onChange={handleChange}
                    placeholder="Alaoui" required />
                  {fieldError('nom')}
                </div>
                <div className="col-md-6">
                  <label className="form-label" style={labelStyle}>Prénom</label>
                  <input className="form-control" name="prenom" style={inputStyle}
                    value={form.prenom} onChange={handleChange}
                    placeholder="Mohamed" required />
                  {fieldError('prenom')}
                </div>
              </div>
            </div>

            {/* Section compte */}
            <div className="mb-3 pb-3" style={{ borderBottom: '1px solid #EEF2F6' }}>
              <p style={{ fontSize: '0.8rem', color: '#607D8B', fontWeight: 600,
                textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: 12 }}>
                Compte
              </p>
              <div className="row g-3">
                <div className="col-12">
                  <label className="form-label" style={labelStyle}>Login</label>
                  <input className="form-control" name="login" style={inputStyle}
                    value={form.login} onChange={handleChange}
                    placeholder="mon_login" required />
                  {fieldError('login')}
                </div>
                <div className="col-md-6">
                  <label className="form-label" style={labelStyle}>Email</label>
                  <input className="form-control" type="email" name="email" style={inputStyle}
                    value={form.email} onChange={handleChange}
                    placeholder="email@mail.com" required />
                  {fieldError('email')}
                </div>
                <div className="col-md-6">
                  <label className="form-label" style={labelStyle}>Téléphone</label>
                  <input className="form-control" name="tel" style={inputStyle}
                    value={form.tel} onChange={handleChange}
                    placeholder="06XXXXXXXX" required />
                  {fieldError('tel')}
                </div>
                <div className="col-12">
                  <label className="form-label" style={labelStyle}>Mot de passe</label>
                  <input className="form-control" type="password" name="password" style={inputStyle}
                    value={form.password} onChange={handleChange}
                    placeholder="minimum 6 caractères" required />
                  {fieldError('password')}
                </div>
              </div>
            </div>

            <button type="submit" disabled={loading}
              className="w-100 btn"
              style={{
                background: '#1B3A5C', color: 'white',
                borderRadius: 8, border: 'none',
                padding: '0.65rem', fontWeight: 600, fontSize: '0.95rem',
              }}>
              {loading
                ? <><span className="spinner-border spinner-border-sm me-2" />Création…</>
                : 'Créer mon compte'}
            </button>
          </form>

          <div className="text-center mt-3 pt-3" style={{ borderTop: '1px solid #E8EDF2' }}>
            <span style={{ color: '#607D8B', fontSize: '0.875rem' }}>Déjà inscrit ? </span>
            <Link to="/login"
              style={{ color: '#2E6DA4', fontWeight: 600, fontSize: '0.875rem', textDecoration: 'none' }}>
              Se connecter →
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}