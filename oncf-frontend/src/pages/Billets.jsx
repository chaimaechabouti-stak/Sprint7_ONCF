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
      <div>
        <div className="spinner-border mb-3" style={{ color: '#1B3A5C' }} />
        <p style={{ color: '#607D8B', textAlign: 'center' }}>Chargement des billets…</p>
      </div>
    </div>
  )

  if (!commande) return (
    <div className="alert" style={{ background: '#FFEBEE', color: '#C62828', border: '1px solid #FFCDD2', borderRadius: 10 }}>
      Commande introuvable.
    </div>
  )

  return (
    <div>
      {/* En-tête no-print */}
      <div className="d-flex justify-content-between align-items-center mb-4 no-print">
        <div>
          <h2 style={{ fontFamily: 'Georgia, serif', color: '#1B3A5C', marginBottom: 2 }}>
            Vos billets
          </h2>
          <span style={{ color: '#607D8B', fontSize: '0.875rem' }}>
            Commande #{commande.id} · {commande.date_comm}
          </span>
        </div>
        <div className="d-flex gap-2">
          <Link to="/"
            style={{ background: '#E8F4FD', color: '#1B3A5C', border: '1px solid #D0DCE8',
              borderRadius: 8, padding: '0.5rem 1.2rem', fontSize: '0.875rem',
              textDecoration: 'none', fontWeight: 500 }}>
            Nouveau voyage
          </Link>
          <button onClick={() => window.print()}
            style={{ background: '#1B3A5C', color: 'white', border: 'none',
              borderRadius: 8, padding: '0.5rem 1.2rem', fontSize: '0.875rem',
              fontWeight: 600, cursor: 'pointer' }}>
            🖨️ Imprimer
          </button>
        </div>
      </div>

      {/* Succès no-print */}
      <div className="no-print mb-4" style={{ background: '#E8F5E9', border: '1px solid #A5D6A7',
        borderRadius: 10, padding: '0.85rem 1.25rem', color: '#2E7D32',
        display: 'flex', alignItems: 'center', gap: 10, fontSize: '0.9rem' }}>
        <span style={{ fontSize: 20 }}>✅</span>
        <span>Paiement confirmé ! Vos billets sont prêts à être imprimés.</span>
      </div>

      {/* Billets */}
      {commande.billets.map((billet, billetIdx) =>
        Array.from({ length: billet.qte }).map((_, i) => (
          <div key={`${billetIdx}-${i}`} className="billet-card mb-4"
            style={{ background: 'white', borderRadius: 12 }}>

            {/* Header billet */}
            <div className="billet-header d-flex justify-content-between align-items-center">
              <div className="d-flex align-items-center gap-3">
                <div style={{ background: 'rgba(255,255,255,0.15)', borderRadius: 10,
                  width: 46, height: 46, display: 'flex', alignItems: 'center',
                  justifyContent: 'center', fontSize: 22 }}>
                  🚂
                </div>
                <div>
                  <div style={{ fontWeight: 700, fontSize: '1rem', letterSpacing: '1px' }}>
                    ONCF — Billet de train
                  </div>
                  <div style={{ fontSize: '0.78rem', opacity: 0.75 }}>
                    Office National des Chemins de Fer
                  </div>
                </div>
              </div>
              <div style={{ background: 'rgba(255,255,255,0.15)', borderRadius: 8,
                padding: '0.3rem 0.8rem', fontSize: '0.85rem', fontWeight: 600 }}>
                #{commande.id}-{billetIdx + 1}-{i + 1}
              </div>
            </div>

            {/* Corps billet */}
            <div className="row g-0">
              {/* Infos voyageur */}
              <div className="col-md-4 p-4" style={{ borderRight: '1px dashed #D0DCE8' }}>
                <div style={{ fontSize: '0.7rem', color: '#607D8B', textTransform: 'uppercase',
                  letterSpacing: '0.5px', marginBottom: 10, fontWeight: 600 }}>
                  Voyageur
                </div>
                <div style={{ fontWeight: 700, fontSize: '1rem', color: '#1B3A5C', marginBottom: 4 }}>
                  {billet.nom_voyageur}
                </div>
                <div style={{ fontSize: '0.875rem', color: '#607D8B' }}>
                  CIN / Passeport
                </div>
                <div style={{ fontWeight: 600, color: '#2E6DA4', fontSize: '0.9rem' }}>
                  {billet.passport_voyageur}
                </div>
              </div>

              {/* Infos voyage */}
              <div className="col-md-5 p-4" style={{ borderRight: '1px dashed #D0DCE8' }}>
                <div style={{ fontSize: '0.7rem', color: '#607D8B', textTransform: 'uppercase',
                  letterSpacing: '0.5px', marginBottom: 10, fontWeight: 600 }}>
                  Voyage
                </div>
                <div className="d-flex align-items-center gap-2 mb-2">
                  <span className="badge-oncf">{billet.voyage.code_voyage}</span>
                </div>
                <div style={{ fontWeight: 700, fontSize: '1.05rem', color: '#1B3A5C', marginBottom: 8 }}>
                  {billet.voyage.villeDepart}
                  <span style={{ color: '#2E6DA4', margin: '0 8px' }}>→</span>
                  {billet.voyage.villeDarrivee}
                </div>
                <div className="d-flex gap-4">
                  <div>
                    <div style={{ fontSize: '0.7rem', color: '#607D8B', marginBottom: 2 }}>Départ</div>
                    <div style={{ fontWeight: 600, color: '#1B3A5C' }}>{billet.voyage.heureDepart}</div>
                  </div>
                  <div>
                    <div style={{ fontSize: '0.7rem', color: '#607D8B', marginBottom: 2 }}>Arrivée</div>
                    <div style={{ fontWeight: 600, color: '#1B3A5C' }}>{billet.voyage.heureDarrivee}</div>
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
                  style={{ borderRadius: 8, border: '1px solid #E8EDF2' }} />
                <div style={{ fontSize: '0.72rem', color: '#607D8B', marginTop: 8, textAlign: 'center' }}>
                  Présentez ce QR en gare
                </div>
              </div>
            </div>

            {/* Footer billet */}
            <div style={{ background: '#F4F8FC', borderTop: '1px solid #EEF2F6',
              borderRadius: '0 0 11px 11px', padding: '0.6rem 1.5rem',
              display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem' }}>
              <span style={{ color: '#607D8B' }}>
                Réservé le : <strong>{commande.date_comm}</strong>
              </span>
              <span style={{ color: '#2E7D32', fontWeight: 600 }}>
                ✅ Paiement confirmé
              </span>
            </div>
          </div>
        ))
      )}
    </div>
  )
}