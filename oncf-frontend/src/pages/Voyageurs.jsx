import { useState, useEffect } from 'react'
import { useCart } from '../context/CartContext'
import { useNavigate } from 'react-router-dom'

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

  const inputStyle = { borderRadius: 8, borderColor: '#D0DCE8', fontSize: '0.9rem' }
  const labelStyle = { fontWeight: 500, fontSize: '0.875rem', color: '#1B3A5C', marginBottom: 4 }

  return (
    <div>
      {/* En-tête */}
      <div className="mb-4">
        <h2 style={{ fontFamily: 'Georgia, serif', color: '#1B3A5C', marginBottom: 4 }}>
          Informations des voyageurs
        </h2>
        <p style={{ color: '#607D8B', fontSize: '0.9rem', margin: 0 }}>
          Renseignez les informations pour chaque billet avant de procéder au paiement.
        </p>
      </div>

      {/* Étapes */}
      <div className="d-flex align-items-center gap-3 mb-4"
        style={{ fontSize: '0.8rem' }}>
        {['Recherche', 'Panier', 'Voyageurs', 'Paiement', 'Billets'].map((step, i) => (
          <div key={step} className="d-flex align-items-center gap-2">
            <div style={{
              width: 26, height: 26, borderRadius: '50%',
              background: i === 2 ? '#1B3A5C' : i < 2 ? '#2E7D32' : '#D0DCE8',
              color: i <= 2 ? 'white' : '#999',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: '0.75rem', fontWeight: 600,
            }}>{i < 2 ? '✓' : i + 1}</div>
            <span style={{ color: i === 2 ? '#1B3A5C' : i < 2 ? '#2E7D32' : '#999',
              fontWeight: i === 2 ? 600 : 400 }}>
              {step}
            </span>
            {i < 4 && <span style={{ color: '#D0DCE8' }}>›</span>}
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
                  background: '#F4F8FC',
                  borderBottom: '1px solid #D0DCE8',
                  borderRadius: '11px 11px 0 0',
                  display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                }}>
                  <span style={{ fontWeight: 600, color: '#1B3A5C', fontSize: '0.9rem' }}>
                    Voyageur {idx + 1}
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
              <h6 style={{ color: '#607D8B', textTransform: 'uppercase',
                fontSize: '0.75rem', letterSpacing: '0.5px', marginBottom: 16 }}>
                Résumé
              </h6>
              {items.map(({ voyage, qte }) => (
                <div key={voyage.id} className="d-flex justify-content-between mb-2"
                  style={{ fontSize: '0.875rem' }}>
                  <span style={{ color: '#546E7A' }}>{voyage.code_voyage} ×{qte}</span>
                  <span style={{ color: '#1B3A5C' }}>{(voyage.prixVoyage * qte).toFixed(2)} DH</span>
                </div>
              ))}
              <div style={{ borderTop: '2px solid #1B3A5C', marginTop: 12, paddingTop: 12 }}
                className="d-flex justify-content-between">
                <span style={{ fontWeight: 700, color: '#1B3A5C' }}>Total</span>
                <span style={{ fontWeight: 700, color: '#1B3A5C', fontSize: '1.2rem' }}>
                  {total.toFixed(2)} DH
                </span>
              </div>

              <button type="submit" className="w-100 btn mt-4"
                style={{ background: '#1B3A5C', color: 'white', borderRadius: 8,
                  border: 'none', padding: '0.65rem', fontWeight: 600 }}>
                💳 Passer au paiement
              </button>
              <button type="button" className="w-100 btn mt-2"
                onClick={() => navigate('/panier')}
                style={{ background: 'white', color: '#1B3A5C', borderRadius: 8,
                  border: '1px solid #D0DCE8', padding: '0.55rem', fontSize: '0.875rem' }}>
                ← Retour panier
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  )
}