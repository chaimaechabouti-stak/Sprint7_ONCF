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
    <div className="fade-in">

      {/* ─── Hero ─────────────────────────────────────────── */}
      <div className="search-hero">
        <div className="row align-items-center" style={{ position: 'relative', zIndex: 1 }}>
          <div className="col-md-4 mb-3 mb-md-0">
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8 }}>
              <span style={{ fontSize: '2rem' }}>🚂</span>
              <div>
                <h1 style={{ marginBottom: 2 }}>Réservez votre trajet</h1>
                <p>Rapide, simple et sécurisé</p>
              </div>
            </div>
            <div className="d-flex gap-3 mt-3" style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.6)' }}>
              <span>🏙️ 5 villes</span>
              <span>💳 Paiement sécurisé</span>
            </div>
          </div>
          <div className="col-md-8">
            <form onSubmit={handleSearch} className="row g-2 align-items-end">
              <div className="col-md-4">
                <label className="form-label text-white mb-1" style={{ fontSize: '0.85rem', fontWeight: 600 }}>
                  🏁 Ville de départ
                </label>
                <select className="form-select"
                  value={form.ville_depart}
                  onChange={(e) => setForm((f) => ({ ...f, ville_depart: e.target.value }))}
                  style={{ borderRadius: 10, border: 'none', boxShadow: '0 2px 8px rgba(0,0,0,0.15)' }}
                  required>
                  <option value="">-- Choisir --</option>
                  {villes.depart.map((v) => (
                    <option key={v} value={v}>{v}</option>
                  ))}
                </select>
              </div>

              <div className="col-md-1 text-center pb-1">
                <button type="button" onClick={inverser}
                  style={{
                    background: 'rgba(255,107,53,0.2)',
                    color: '#FF6B35',
                    border: '1.5px solid rgba(255,107,53,0.4)',
                    borderRadius: '50%',
                    width: 36, height: 36,
                    fontSize: '1.1rem',
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                  }}>
                  ⇄
                </button>
              </div>

              <div className="col-md-4">
                <label className="form-label text-white mb-1" style={{ fontSize: '0.85rem', fontWeight: 600 }}>
                  🎯 Ville d'arrivée
                </label>
                <select className="form-select"
                  value={form.ville_arrivee}
                  onChange={(e) => setForm((f) => ({ ...f, ville_arrivee: e.target.value }))}
                  style={{ borderRadius: 10, border: 'none', boxShadow: '0 2px 8px rgba(0,0,0,0.15)' }}
                  required>
                  <option value="">-- Choisir --</option>
                  {villes.arrivee.map((v) => (
                    <option key={v} value={v}>{v}</option>
                  ))}
                </select>
              </div>

              <div className="col-md-3">
                <button type="submit" className="btn w-100" disabled={loading}
                  style={{
                    background: 'linear-gradient(135deg, #FF6B35, #E85A25)',
                    color: 'white', fontWeight: 700,
                    borderRadius: 10, border: 'none',
                    padding: '0.6rem',
                    boxShadow: '0 4px 14px rgba(255,107,53,0.4)',
                  }}>
                  {loading
                    ? <span className="spinner-border spinner-border-sm" />
                    : '🔍 Rechercher'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* ─── Erreur ───────────────────────────────────────── */}
      {error && (
        <div className="alert rounded-3" style={{ background: '#FFEBEE', color: '#C62828', border: '1px solid #FFCDD2' }}>
          ⚠️ {error}
        </div>
      )}

      {/* ─── Résultats ────────────────────────────────────── */}
      {searched && !loading && (
        voyages.length === 0 ? (
          <div className="text-center py-5 card-oncf" style={{ padding: '3rem' }}>
            <div style={{ fontSize: '3rem', marginBottom: 16 }}>🚫</div>
            <h5 style={{ color: '#0A2342', fontFamily: 'Georgia, serif' }}>Aucun voyage disponible</h5>
            <p style={{ color: '#607D8B', fontSize: '0.9rem' }}>
              Aucun trajet trouvé pour {form.ville_depart} → {form.ville_arrivee}
            </p>
          </div>
        ) : (
          <div className="card-oncf fade-in">
            <div className="px-4 py-3 d-flex justify-content-between align-items-center"
              style={{ borderBottom: '1px solid #E0E7EF', background: '#FAFBFC' }}>
              <div>
                <span style={{ color: '#0A2342', fontWeight: 700, fontSize: '1rem' }}>
                  {voyages.length} voyage(s) disponible(s)
                </span>
                <span className="ms-2" style={{ color: '#607D8B', fontSize: '0.875rem' }}>
                  {form.ville_depart} → {form.ville_arrivee}
                </span>
              </div>
              <span style={{ background: '#FFF4EF', color: '#FF6B35', fontSize: '0.8rem',
                fontWeight: 600, padding: '0.3rem 0.8rem', borderRadius: 20,
                border: '1px solid #FFD5C2' }}>
                Résultats en direct
              </span>
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
                      <td style={{ color: '#607D8B', fontSize: '0.875rem' }}>{v.heureDepart}</td>
                      <td style={{ color: '#607D8B', fontSize: '0.875rem' }}>{v.heureDarrivee}</td>
                      <td><span className="badge-prix">{v.prixVoyage} DH</span></td>
                      <td style={{ width: 90 }}>
                        <input type="number" min="1" max="10"
                          className="form-control form-control-sm text-center"
                          value={qtes[v.id] || 1}
                          style={{ borderRadius: 8 }}
                          onChange={(e) =>
                            setQtes((q) => ({ ...q, [v.id]: parseInt(e.target.value) }))
                          }
                        />
                      </td>
                      <td>
                        <button onClick={() => handleAddToCart(v)}
                          style={{
                            background: 'linear-gradient(135deg, #FF6B35, #E85A25)',
                            color: 'white', border: 'none',
                            borderRadius: 8, padding: '0.4rem 1rem',
                            fontSize: '0.85rem', fontWeight: 600,
                            cursor: 'pointer',
                            boxShadow: '0 2px 6px rgba(255,107,53,0.3)',
                            transition: 'all 0.2s',
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

      {/* ─── Toast ────────────────────────────────────────── */}
      {toast && <div className="toast-oncf">{toast}</div>}
    </div>
  )
}
