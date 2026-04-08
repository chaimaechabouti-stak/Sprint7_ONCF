import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import api from '../api/axios'

export default function Billets() {
  const { id }                  = useParams()
  const [commande, setCommande] = useState(null)
  const [loading, setLoading]   = useState(true)

  useEffect(() => {
    api.get(`/commandes/${id}/billets`)
      .then((res) => setCommande(res.data))
      .finally(() => setLoading(false))
  }, [id])

  if (loading) return (
    <div className="d-flex justify-content-center align-items-center" style={{ height: '60vh' }}>
      <div className="text-center">
        <div className="spinner-border mb-3" style={{ color: '#FF6B35', width: '3rem', height: '3rem' }} />
        <p style={{ color: '#607D8B' }}>Chargement des billets…</p>
      </div>
    </div>
  )

  if (!commande) return (
    <div className="px-3 py-2 rounded-3"
      style={{ background: '#FFEBEE', color: '#C62828', border: '1px solid #FFCDD2' }}>
      Commande introuvable.
    </div>
  )

  return (
    <div className="fade-in">
      {/* En-tête */}
      <div className="d-flex justify-content-between align-items-center mb-4 no-print">
        <div>
          <h2 style={{ fontFamily: 'Georgia, serif', color: '#1A1A2E', fontWeight: 700, marginBottom: 2 }}>
            🎫 Vos billets
          </h2>
          <span style={{ color: '#607D8B', fontSize: '0.875rem' }}>
            Commande #{commande.id} · {commande.date_comm}
          </span>
        </div>
        <div className="d-flex gap-2">
          <Link to="/"
            style={{ background: '#F5F7FA', color: '#1A1A2E', border: '1.5px solid #E0E7EF',
              borderRadius: 10, padding: '0.5rem 1.2rem', fontSize: '0.875rem',
              textDecoration: 'none', fontWeight: 600 }}>
            🔍 Nouveau voyage
          </Link>
          <button onClick={() => window.print()}
            style={{
              background: 'linear-gradient(135deg, #FF6B35, #E85A25)',
              color: 'white', border: 'none',
              borderRadius: 10, padding: '0.5rem 1.2rem', fontSize: '0.875rem',
              fontWeight: 700, cursor: 'pointer',
              boxShadow: '0 2px 8px rgba(232,25,44,0.35)',
            }}>
            🖨️ Imprimer
          </button>
        </div>
      </div>

      {/* Succès */}
      <div className="no-print mb-4" style={{
        background: 'linear-gradient(135deg, #E8F5E9, #F1F8E9)',
        border: '1.5px solid #A5D6A7',
        borderRadius: 12, padding: '1rem 1.25rem',
        color: '#2E7D32', display: 'flex', alignItems: 'center', gap: 12,
      }}>
        <span style={{ fontSize: 24 }}>✅</span>
        <div>
          <div style={{ fontWeight: 700, fontSize: '0.95rem' }}>Paiement confirmé !</div>
          <div style={{ fontSize: '0.85rem', opacity: 0.8 }}>Vos billets sont prêts à être imprimés.</div>
        </div>
      </div>

      {/* Billets */}
      {commande.billets.map((billet, billetIdx) =>
        Array.from({ length: billet.qte }).map((_, i) => (
          <div key={`${billetIdx}-${i}`} className="billet-card mb-4">

            {/* Header */}
            <div className="billet-header d-flex justify-content-between align-items-center">
              <div className="d-flex align-items-center gap-3">
                <div style={{
                  background: 'rgba(232,25,44,0.2)', borderRadius: 12,
                  width: 50, height: 50, display: 'flex', alignItems: 'center',
                  justifyContent: 'center', fontSize: 24,
                  border: '1.5px solid rgba(232,25,44,0.4)',
                }}>
                  🚂
                </div>
                <div>
                  <div style={{ fontWeight: 700, fontSize: '1rem', letterSpacing: '1px' }}>
                    ONCF — Billet de train
                  </div>
                  <div style={{ fontSize: '0.78rem', opacity: 0.65 }}>
                    Office National des Chemins de Fer
                  </div>
                </div>
              </div>
              <div style={{
                background: 'rgba(232,25,44,0.2)', borderRadius: 8,
                padding: '0.35rem 0.9rem', fontSize: '0.85rem', fontWeight: 700,
                border: '1px solid rgba(232,25,44,0.4)',
              }}>
                #{commande.id}-{billetIdx + 1}-{i + 1}
              </div>
            </div>

            {/* Corps */}
            <div className="row g-0" style={{ background: 'white' }}>
              {/* Voyageur */}
              <div className="col-md-4 p-4" style={{ borderRight: '1px dashed #E0E7EF' }}>
                <div style={{ fontSize: '0.7rem', color: '#FF6B35', textTransform: 'uppercase',
                  letterSpacing: '1px', marginBottom: 10, fontWeight: 700 }}>
                  Voyageur
                </div>
                <div style={{ fontWeight: 700, fontSize: '1.05rem', color: '#1A1A2E', marginBottom: 4 }}>
                  {billet.nom_voyageur}
                </div>
                <div style={{ fontSize: '0.8rem', color: '#607D8B', marginBottom: 2 }}>CIN / Passeport</div>
                <div style={{ fontWeight: 700, color: '#FF6B35', fontSize: '0.9rem' }}>
                  {billet.passport_voyageur}
                </div>
              </div>

              {/* Voyage */}
              <div className="col-md-5 p-4" style={{ borderRight: '1px dashed #E0E7EF' }}>
                <div style={{ fontSize: '0.7rem', color: '#FF6B35', textTransform: 'uppercase',
                  letterSpacing: '1px', marginBottom: 10, fontWeight: 700 }}>
                  Voyage
                </div>
                <div className="d-flex align-items-center gap-2 mb-2">
                  <span className="badge-oncf">{billet.voyage.code_voyage}</span>
                </div>
                <div style={{ fontWeight: 700, fontSize: '1.1rem', color: '#1A1A2E', marginBottom: 10 }}>
                  {billet.voyage.villeDepart}
                  <span style={{ color: '#FF6B35', margin: '0 8px' }}>→</span>
                  {billet.voyage.villeDarrivee}
                </div>
                <div className="d-flex gap-4">
                  <div>
                    <div style={{ fontSize: '0.7rem', color: '#607D8B', marginBottom: 2 }}>Départ</div>
                    <div style={{ fontWeight: 700, color: '#1A1A2E' }}>{billet.voyage.heureDepart}</div>
                  </div>
                  <div>
                    <div style={{ fontSize: '0.7rem', color: '#607D8B', marginBottom: 2 }}>Arrivée</div>
                    <div style={{ fontWeight: 700, color: '#1A1A2E' }}>{billet.voyage.heureDarrivee}</div>
                  </div>
                  <div>
                    <div style={{ fontSize: '0.7rem', color: '#607D8B', marginBottom: 2 }}>Prix</div>
                    <div style={{ fontWeight: 700, color: '#2E7D32' }}>{billet.voyage.prixVoyage} DH</div>
                  </div>
                </div>
              </div>

              {/* QR Code */}
              <div className="col-md-3 p-4 d-flex flex-column align-items-center justify-content-center">
                <img
                  src={`https://api.qrserver.com/v1/create-qr-code/?size=110x110&data=ONCF-${commande.id}-${billet.voyage.code_voyage}-${i + 1}`}
                  alt="QR Code"
                  style={{ borderRadius: 10, border: '2px solid #FFD5C2' }} />
                <div style={{ fontSize: '0.72rem', color: '#607D8B', marginTop: 8, textAlign: 'center' }}>
                  Présentez ce QR en gare
                </div>
              </div>
            </div>

            {/* Footer */}
            <div style={{
              background: '#FFF4EF', borderTop: '1px solid #FFD5C2',
              borderRadius: '0 0 12px 12px', padding: '0.65rem 1.5rem',
              display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem',
            }}>
              <span style={{ color: '#607D8B' }}>
                Réservé le : <strong style={{ color: '#1A1A2E' }}>{commande.date_comm}</strong>
              </span>
              <span style={{ color: '#2E7D32', fontWeight: 700 }}>
                ✅ Paiement confirmé
              </span>
            </div>
          </div>
        ))
      )}
    </div>
  )
}
