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
  const { addToCart }           = useCart()
  const { user }                = useAuth()
  const navigate                = useNavigate()

  useEffect(() => {
    api.get('/voyages/villes').then((res) => setVilles(res.data))
  }, [])

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
    navigate('/panier')
  }

  return (
    <div>

      {/* ─── Hero ─────────────────────────────────────────── */}
      <div className="search-hero">
        <div className="row align-items-center">
          <div className="col-md-4 mb-3 mb-md-0">
            <h1>Réservez votre trajet</h1>
            <p>Rapide, simple et sécurisé</p>
          </div>
          <div className="col-md-8">
            <form onSubmit={handleSearch} className="row g-2 align-items-end">
              <div className="col-md-4">
                <label className="form-label text-white mb-1"
                  style={{ fontSize: '0.85rem' }}>
                  Ville de départ
                </label>
                <select className="form-select"
                  value={form.ville_depart}
                  onChange={(e) => setForm((f) => ({ ...f, ville_depart: e.target.value }))}
                  required>
                  <option value="">-- Choisir --</option>
                  {villes.depart.map((v) => (
                    <option key={v} value={v}>{v}</option>
                  ))}
                </select>
              </div>

              <div className="col-md-1 text-center pb-1">
                <button type="button"
                  onClick={inverser}
                  style={{
                    background: 'rgba(255,255,255,0.15)',
                    color: 'white',
                    border: 'none',
                    borderRadius: '50%',
                    width: 34,
                    height: 34,
                    fontSize: '1rem',
                    cursor: 'pointer',
                  }}>
                  ⇄
                </button>
              </div>

              <div className="col-md-4">
                <label className="form-label text-white mb-1"
                  style={{ fontSize: '0.85rem' }}>
                  Ville d'arrivée
                </label>
                <select className="form-select"
                  value={form.ville_arrivee}
                  onChange={(e) => setForm((f) => ({ ...f, ville_arrivee: e.target.value }))}
                  required>
                  <option value="">-- Choisir --</option>
                  {villes.arrivee.map((v) => (
                    <option key={v} value={v}>{v}</option>
                  ))}
                </select>
              </div>

              <div className="col-md-3">
                <button type="submit"
                  className="btn w-100"
                  disabled={loading}
                  style={{
                    background: 'white',
                    color: '#1B3A5C',
                    fontWeight: 600,
                    borderRadius: '6px',
                    border: 'none',
                    padding: '0.5rem',
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
        <div className="alert alert-danger rounded-3">{error}</div>
      )}

      {/* ─── Résultats ────────────────────────────────────── */}
      {searched && !loading && (
        voyages.length === 0 ? (
          <div className="alert rounded-3"
            style={{ background: '#FFF3E0', color: '#E65100', border: '1px solid #FFCC80' }}>
            Aucun voyage trouvé pour ce trajet.
          </div>
        ) : (
          <div className="card-oncf">
            <div className="px-4 py-3 d-flex justify-content-between align-items-center"
              style={{ borderBottom: '1px solid #D0DCE8' }}>
              <div>
                <span style={{ color: '#1B3A5C', fontWeight: 600 }}>
                  {voyages.length} voyage(s) disponible(s)
                </span>
                <span className="ms-2" style={{ color: '#607D8B', fontSize: '0.875rem' }}>
                  {form.ville_depart} → {form.ville_arrivee}
                </span>
              </div>
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
                      <td>
                        <span className="badge-oncf">{v.code_voyage}</span>
                      </td>
                      <td style={{ fontWeight: 500 }}>{v.villeDepart}</td>
                      <td style={{ fontWeight: 500 }}>{v.villeDarrivee}</td>
                      <td style={{ color: '#607D8B', fontSize: '0.875rem' }}>
                        {v.heureDepart}
                      </td>
                      <td style={{ color: '#607D8B', fontSize: '0.875rem' }}>
                        {v.heureDarrivee}
                      </td>
                      <td>
                        <span className="badge-prix">{v.prixVoyage} DH</span>
                      </td>
                      <td style={{ width: 90 }}>
                        <input
                          type="number" min="1" max="10"
                          className="form-control form-control-sm text-center"
                          value={qtes[v.id] || 1}
                          onChange={(e) =>
                            setQtes((q) => ({ ...q, [v.id]: parseInt(e.target.value) }))
                          }
                        />
                      </td>
                      <td>
                        <button
                          onClick={() => handleAddToCart(v)}
                          style={{
                            background: '#1B3A5C',
                            color: 'white',
                            border: 'none',
                            borderRadius: '6px',
                            padding: '0.35rem 0.9rem',
                            fontSize: '0.85rem',
                            fontWeight: 500,
                            cursor: 'pointer',
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
  )
}