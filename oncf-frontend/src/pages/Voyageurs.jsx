import { useState, useEffect } from 'react'
import { useCart } from '../context/CartContext'
import { useNavigate } from 'react-router-dom'

const STEPS = ['Recherche', 'Panier', 'Voyageurs', 'Paiement', 'Billets']

export default function Voyageurs() {
  const { items, total } = useCart()
  const navigate         = useNavigate()

  const buildVoyageurs = () => {
    const list = []
    items.forEach(({ voyage, qte }) => {
      for (let i = 0; i < qte; i++) {
        list.push({
          voyage_id:   voyage.id,
          code_voyage: voyage.code_voyage,
          trajet:      `${voyage.villeDepart} → ${voyage.villeDarrivee}`,
          nom:         '',
          passport:    '',
        })
      }
    })
    return list
  }

  const [voyageurs, setVoyageurs] = useState(buildVoyageurs)
  useEffect(() => { setVoyageurs(buildVoyageurs()) }, [items.length])
  if (items.length === 0) { navigate('/'); return null }

  const update = (idx, field, val) =>
    setVoyageurs((prev) => prev.map((v, i) => i === idx ? { ...v, [field]: val } : v))

  const handleSubmit = (e) => {
    e.preventDefault()
    sessionStorage.setItem('oncf_voyageurs', JSON.stringify(voyageurs))
    navigate('/paiement')
  }

  const inputStyle = { borderRadius: 10, borderColor: '#E0E7EF', fontSize: '0.9rem', padding: '0.6rem 0.85rem' }
  const labelStyle = { fontWeight: 600, fontSize: '0.85rem', color: '#0A2342', marginBottom: 4 }

  return (
    <div className="fade-in">
      {/* En-tête */}
      <div className="mb-4">
        <h2 style={{ fontFamily: 'Georgia, serif', color: '#0A2342', fontWeight: 700, marginBottom: 4 }}>
          Informations des voyageurs
        </h2>
        <p style={{ color: '#607D8B', fontSize: '0.9rem', margin: 0 }}>
          Renseignez les informations pour chaque billet avant de procéder au paiement.
        </p>
      </div>

      {/* Étapes */}
      <div className="d-flex align-items-center gap-2 mb-4 flex-wrap"
        style={{ fontSize: '0.8rem' }}>
        {STEPS.map((step, i) => (
          <div key={step} className="d-flex align-items-center gap-2">
            <div style={{
              width: 28, height: 28, borderRadius: '50%',
              background: i === 2 ? '#FF6B35' : i < 2 ? '#2E7D32' : '#E0E7EF',
              color: i <= 2 ? 'white' : '#999',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: '0.75rem', fontWeight: 700,
              boxShadow: i === 2 ? '0 2px 8px rgba(255,107,53,0.4)' : 'none',
            }}>
              {i < 2 ? '✓' : i + 1}
            </div>
            <span style={{
              color: i === 2 ? '#FF6B35' : i < 2 ? '#2E7D32' : '#999',
              fontWeight: i === 2 ? 700 : 400,
            }}>
              {step}
            </span>
            {i < 4 && <span style={{ color: '#D0DCE8', fontSize: '1rem' }}>›</span>}
          </div>
        ))}
      </div>

      <form onSubmit={handleSubmit}>
        <div className="row g-4">
          <div className="col-lg-8">
            {voyageurs.map((v, idx) => (
              <div key={idx} className="card-oncf mb-3">
                <div style={{
                  padding: '0.75rem 1.25rem',
                  background: 'linear-gradient(135deg, #0A2342, #163A6B)',
                  borderBottom: '3px solid #FF6B35',
                  display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                }}>
                  <span style={{ fontWeight: 700, color: 'white', fontSize: '0.9rem' }}>
                    👤 Voyageur {idx + 1}
                  </span>
                  <span className="badge-oncf">{v.code_voyage} — {v.trajet}</span>
                </div>
                <div className="row g-3 p-3">
                  <div className="col-md-6">
                    <label className="form-label" style={labelStyle}>Nom complet</label>
                    <input className="form-control" style={inputStyle}
                      placeholder="Ex: Mohamed Alaoui"
                      value={v.nom}
                      onChange={(e) => update(idx, 'nom', e.target.value)}
                      required />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label" style={labelStyle}>CIN / Passeport</label>
                    <input className="form-control" style={inputStyle}
                      placeholder="Ex: AB123456"
                      value={v.passport}
                      onChange={(e) => update(idx, 'passport', e.target.value)}
                      required />
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Résumé latéral */}
          <div className="col-lg-4">
            <div className="card-oncf p-4" style={{ position: 'sticky', top: 20 }}>
              <h6 style={{ color: '#FF6B35', textTransform: 'uppercase',
                fontSize: '0.75rem', letterSpacing: '1px', fontWeight: 700, marginBottom: 16 }}>
                Résumé commande
              </h6>
              {items.map(({ voyage, qte }) => (
                <div key={voyage.id} className="d-flex justify-content-between mb-2"
                  style={{ fontSize: '0.875rem' }}>
                  <span style={{ color: '#546E7A' }}>{voyage.code_voyage} ×{qte}</span>
                  <span style={{ color: '#0A2342', fontWeight: 600 }}>{(voyage.prixVoyage * qte).toFixed(2)} DH</span>
                </div>
              ))}
              <div style={{ borderTop: '2px solid #FF6B35', marginTop: 12, paddingTop: 12 }}
                className="d-flex justify-content-between align-items-center">
                <span style={{ fontWeight: 700, color: '#0A2342' }}>Total</span>
                <span style={{ fontWeight: 800, color: '#FF6B35', fontSize: '1.3rem' }}>
                  {total.toFixed(2)} DH
                </span>
              </div>

              <button type="submit" className="w-100 btn mt-4"
                style={{
                  background: 'linear-gradient(135deg, #FF6B35, #E85A25)',
                  color: 'white', borderRadius: 10, border: 'none',
                  padding: '0.7rem', fontWeight: 700,
                  boxShadow: '0 4px 14px rgba(255,107,53,0.35)',
                }}>
                💳 Passer au paiement
              </button>
              <button type="button" className="w-100 btn mt-2"
                onClick={() => navigate('/panier')}
                style={{ background: 'white', color: '#0A2342', borderRadius: 10,
                  border: '1.5px solid #E0E7EF', padding: '0.6rem', fontSize: '0.875rem', fontWeight: 500 }}>
                ← Retour panier
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  )
}
