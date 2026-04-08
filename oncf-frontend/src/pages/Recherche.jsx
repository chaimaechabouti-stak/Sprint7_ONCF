import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../api/axios'
import { useCart } from '../context/CartContext'
import { useAuth } from '../context/AuthContext'

export default function Recherche() {
  const [villes, setVilles]     = useState({ depart: [], arrivee: [] })
  const [form, setForm]         = useState({ ville_depart: '', ville_arrivee: '' })
  const [voyages, setVoyages]   = useState([])
  const [qtes, setQtes]         = useState({})
  const [loading, setLoading]   = useState(false)
  const [searched, setSearched] = useState(false)
  const [error, setError]       = useState('')
  const [toast, setToast]       = useState('')
  const { addToCart }           = useCart()
  const { user }                = useAuth()
  const navigate                = useNavigate()

  useEffect(() => {
    api.get('/voyages/villes').then((res) => setVilles(res.data))
  }, [])

  const showToast = (msg) => {
    setToast(msg)
    setTimeout(() => setToast(''), 3000)
  }

  const inverser = () =>
    setForm((f) => ({ ville_depart: f.ville_arrivee, ville_arrivee: f.ville_depart }))

  const handleSearch = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    setSearched(true)
    try {
      const { data } = await api.get('/voyages/recherche', { params: form })
      setVoyages(data.voyages)
      const initQtes = {}
      data.voyages.forEach((v) => (initQtes[v.id] = 1))
      setQtes(initQtes)
    } catch {
      setError('Erreur lors de la recherche.')
    } finally {
      setLoading(false)
    }
  }

  const handleAddToCart = (voyage) => {
    if (!user) { navigate('/login'); return }
    addToCart(voyage, qtes[voyage.id] || 1)
    showToast(`✅ ${voyage.code_voyage} ajouté au panier !`)
  }

  return (
    <div className="fade-in" style={{ margin: '-1.5rem -12px 0' }}>

      {/* ─── Hero transparent ────────────────────────────── */}
      <div style={{ background: 'rgba(255,107,53,0.82)', padding: '2.5rem 0 0', backdropFilter: 'blur(4px)' }}>
        <div className="container d-flex flex-column align-items-center text-center">
          <h1 style={{ color: 'white', fontWeight: 900, fontSize: '2rem', marginBottom: 4 }}>
            ONCF <span style={{ fontWeight: 300 }}>voyages</span>
          </h1>
          <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: '0.95rem', marginBottom: '1.5rem' }}>
            Réservez votre billet de train en ligne
          </p>

          {/* ─── Tab ─── */}
          <div style={{ width: '100%', maxWidth: 800 }}>
            <button className="tab-oncf active">
              🎫 J'achète mon billet
            </button>
          </div>

          {/* ─── Carte blanche ─── */}
          <div style={{
            background: 'white',
            borderRadius: '0 20px 20px 20px',
            padding: '2rem',
            boxShadow: '0 8px 32px rgba(0,0,0,0.12)',
            marginBottom: 0,
            width: '100%',
            maxWidth: 800,
          }}>
            <form onSubmit={handleSearch}>
              <div className="row g-3 align-items-end justify-content-center">

                {/* Gare départ */}
                <div className="col-md-3">
                  <label style={{ fontSize: '0.8rem', fontWeight: 600, color: '#6B7280', marginBottom: 6, display: 'block' }}>
                    📍 Ma gare de départ
                  </label>
                  <select className="form-select input-oncf"
                    value={form.ville_depart}
                    onChange={(e) => setForm((f) => ({ ...f, ville_depart: e.target.value }))}
                    required>
                    <option value="">Ma gare de départ</option>
                    {villes.depart.map((v) => (
                      <option key={v} value={v}>{v}</option>
                    ))}
                  </select>
                </div>

                {/* Inverser */}
                <div className="col-md-auto text-center" style={{ paddingBottom: 2 }}>
                  <button type="button" onClick={inverser}
                    style={{
                      background: '#FEF2F2',
                      color: '#FF6B35',
                      border: '1.5px solid #FECACA',
                      borderRadius: '50%',
                      width: 40, height: 40,
                      fontSize: '1.1rem',
                      cursor: 'pointer',
                      fontWeight: 700,
                    }}>
                    ⇄
                  </button>
                </div>

                {/* Gare arrivée */}
                <div className="col-md-3">
                  <label style={{ fontSize: '0.8rem', fontWeight: 600, color: '#6B7280', marginBottom: 6, display: 'block' }}>
                    📍 Ma gare d'arrivée
                  </label>
                  <select className="form-select input-oncf"
                    value={form.ville_arrivee}
                    onChange={(e) => setForm((f) => ({ ...f, ville_arrivee: e.target.value }))}
                    required>
                    <option value="">Ma gare d'arrivée</option>
                    {villes.arrivee.map((v) => (
                      <option key={v} value={v}>{v}</option>
                    ))}
                  </select>
                </div>

                {/* Bouton recherche */}
                <div className="col-md-auto ms-auto">
                  <button type="submit" className="btn-search" disabled={loading}
                    title="Rechercher">
                    {loading
                      ? <span className="spinner-border spinner-border-sm" style={{ color: 'white' }} />
                      : '🔍'}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* ─── Contenu ──────────────────────────────────────── */}
      <div className="container mt-4">

        {error && (
          <div className="px-3 py-2 rounded-3 mb-3"
            style={{ background: '#FEF2F2', color: '#DC2626', border: '1px solid #FECACA' }}>
            ⚠️ {error}
          </div>
        )}

        {searched && !loading && (
          voyages.length === 0 ? (
            <div className="text-center py-5 card-oncf">
              <div style={{ fontSize: '3rem', marginBottom: 16 }}>🚫</div>
              <h5 style={{ color: '#1A1A2E', fontWeight: 700 }}>Aucun voyage disponible</h5>
              <p style={{ color: '#6B7280', fontSize: '0.9rem' }}>
                Aucun trajet trouvé pour {form.ville_depart} → {form.ville_arrivee}
              </p>
            </div>
          ) : (
            <div className="card-oncf fade-in">
              <div className="px-4 py-3 d-flex justify-content-between align-items-center"
                style={{ borderBottom: '1px solid #F3F4F6', background: '#FAFAFA' }}>
                <div>
                  <span style={{ color: '#1A1A2E', fontWeight: 700 }}>
                    {voyages.length} voyage(s) disponible(s)
                  </span>
                  <span className="ms-2" style={{ color: '#6B7280', fontSize: '0.875rem' }}>
                    {form.ville_depart} → {form.ville_arrivee}
                  </span>
                </div>
                <span className="badge-oncf">Résultats</span>
              </div>

              <div className="table-responsive">
                <table className="table table-oncf mb-0">
                  <thead>
                    <tr>
                      <th>Code</th>
                      <th>Départ</th>
                      <th>Arrivée</th>
                      <th>H. départ</th>
                      <th>H. arrivée</th>
                      <th>Prix</th>
                      <th>Qté</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {voyages.map((v) => (
                      <tr key={v.id}>
                        <td><span className="badge-oncf">{v.code_voyage}</span></td>
                        <td style={{ fontWeight: 600 }}>{v.villeDepart}</td>
                        <td style={{ fontWeight: 600 }}>{v.villeDarrivee}</td>
                        <td style={{ color: '#6B7280' }}>{v.heureDepart}</td>
                        <td style={{ color: '#6B7280' }}>{v.heureDarrivee}</td>
                        <td><span className="badge-prix">{v.prixVoyage} DH</span></td>
                        <td style={{ width: 90 }}>
                          <input type="number" min="1" max="10"
                            className="form-control form-control-sm text-center"
                            value={qtes[v.id] || 1}
                            style={{ borderRadius: 50, borderColor: '#E5E7EB' }}
                            onChange={(e) =>
                              setQtes((q) => ({ ...q, [v.id]: parseInt(e.target.value) }))
                            }
                          />
                        </td>
                        <td>
                          <button onClick={() => handleAddToCart(v)}
                            style={{
                              background: '#FF6B35',
                              color: 'white', border: 'none',
                              borderRadius: 50, padding: '0.4rem 1rem',
                              fontSize: '0.85rem', fontWeight: 700,
                              cursor: 'pointer',
                              boxShadow: '0 2px 8px rgba(232,25,44,0.3)',
                            }}>
                            + Panier
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )
        )}
      </div>

      {toast && <div className="toast-oncf">{toast}</div>}
    </div>
  )
}
