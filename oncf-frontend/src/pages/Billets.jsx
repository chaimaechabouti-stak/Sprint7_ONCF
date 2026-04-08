import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import api from '../api/axios'

const IconTrain = () => (<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="4" y="3" width="16" height="14" rx="3"/><path d="M4 11h16"/><path d="M12 3v8"/><path d="M8 19l-2 2"/><path d="M16 19l2 2"/><path d="M8 17h8"/></svg>)
const IconUser = () => (<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>)
const IconId = () => (<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="5" width="20" height="14" rx="2"/><line x1="2" y1="10" x2="22" y2="10"/></svg>)
const IconClock = () => (<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>)
const IconMapPin = () => (<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>)
const IconCheck = () => (<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>)
const IconPrint = () => (<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 6 2 18 2 18 9"/><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"/><rect x="6" y="14" width="12" height="8"/></svg>)
const IconArrow = () => (<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>)
const IconBack = () => (<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/></svg>)

export default function Billets() {
  const { id } = useParams()
  const [commande, setCommande] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    api.get(`/commandes/${id}/billets`)
      .then((res) => setCommande(res.data))
      .finally(() => setLoading(false))
  }, [id])

  if (loading) return (
    <div className="d-flex justify-content-center align-items-center" style={{ height: '60vh' }}>
      <div className="text-center">
        <div className="spinner-border mb-3" style={{ color: '#FF6B35', width: '3rem', height: '3rem' }} />
        <p style={{ color: 'rgba(255,255,255,0.8)' }}>Chargement des billets...</p>
      </div>
    </div>
  )

  if (!commande) return (
    <div className="px-3 py-2 rounded-3" style={{ background: '#FFEBEE', color: '#C62828', border: '1px solid #FFCDD2' }}>
      Commande introuvable.
    </div>
  )

  return (
    <div className="fade-in">
      <div className="d-flex justify-content-between align-items-center mb-4 no-print">
        <div>
          <h2 style={{ fontFamily: "Raleway, sans-serif", fontWeight: 900, color: 'white', fontSize: '1.8rem', marginBottom: 2, textShadow: '0 2px 8px rgba(0,0,0,0.5)' }}>
            Vos billets
          </h2>
          <span style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.875rem' }}>
            Commande #{commande.id} - {commande.date_comm}
          </span>
        </div>
        <div className="d-flex gap-2">
          <Link to="/" style={{ background: 'rgba(255,255,255,0.15)', backdropFilter: 'blur(8px)', color: 'white', border: '1px solid rgba(255,255,255,0.25)', borderRadius: 10, padding: '0.5rem 1.2rem', fontSize: '0.875rem', textDecoration: 'none', fontWeight: 600, display: 'flex', alignItems: 'center', gap: 6 }}>
            <IconBack /> Nouveau voyage
          </Link>
          <button onClick={() => window.print()} style={{ background: 'linear-gradient(135deg, #FF6B35, #E85A25)', color: 'white', border: 'none', borderRadius: 10, padding: '0.5rem 1.2rem', fontSize: '0.875rem', fontWeight: 700, cursor: 'pointer', boxShadow: '0 4px 12px rgba(255,107,53,0.4)', display: 'flex', alignItems: 'center', gap: 6 }}>
            <IconPrint /> Imprimer
          </button>
        </div>
      </div>

      <div className="no-print mb-4" style={{ background: 'rgba(255,255,255,0.15)', backdropFilter: 'blur(8px)', border: '1px solid rgba(255,255,255,0.25)', borderRadius: 12, padding: '1rem 1.25rem', color: 'white', display: 'flex', alignItems: 'center', gap: 12 }}>
        <div style={{ width: 38, height: 38, borderRadius: '50%', background: '#16A34A', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
          <IconCheck />
        </div>
        <div>
          <div style={{ fontWeight: 700 }}>Paiement confirme avec succes !</div>
          <div style={{ fontSize: '0.82rem', opacity: 0.8 }}>Vos billets sont prets. Presentez-les en gare pour valider votre voyage.</div>
        </div>
      </div>

      {commande.billets.map((billet, billetIdx) =>
        Array.from({ length: billet.qte }).map((_, i) => (
          <div key={`${billetIdx}-${i}`} className="billet-card mb-4">

            <div className="billet-header">
              <div className="d-flex justify-content-between align-items-center">
                <div className="d-flex align-items-center gap-3">
                  <div style={{ width: 48, height: 48, borderRadius: 12, background: 'rgba(255,255,255,0.15)', border: '1.5px solid rgba(255,255,255,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white' }}>
                    <IconTrain />
                  </div>
                  <div>
                    <div style={{ fontWeight: 800, fontSize: '1rem', letterSpacing: '1.5px', fontFamily: 'Raleway, sans-serif' }}>ONCF VOYAGES</div>
                    <div style={{ fontSize: '0.73rem', opacity: 0.65 }}>Office National des Chemins de Fer - Billet electronique</div>
                  </div>
                </div>
                <div style={{ background: 'rgba(255,255,255,0.15)', border: '1px solid rgba(255,255,255,0.3)', borderRadius: 8, padding: '0.35rem 1rem', fontSize: '0.8rem', fontWeight: 700, letterSpacing: '1px' }}>
                  N° {String(commande.id).padStart(4,'0')}-{billetIdx+1}-{i+1}
                </div>
              </div>
            </div>

            <div className="d-flex align-items-center justify-content-center gap-4 py-4 px-4" style={{ background: 'white', borderBottom: '1px solid #F3F4F6' }}>
              <div className="text-center">
                <div style={{ fontSize: '0.68rem', color: '#FF6B35', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1px', marginBottom: 4, display: 'flex', alignItems: 'center', gap: 3, justifyContent: 'center' }}>
                  <IconMapPin /> Depart
                </div>
                <div style={{ fontSize: '1.5rem', fontWeight: 900, color: '#1A1A2E', fontFamily: 'Raleway, sans-serif' }}>{billet.voyage.villeDepart}</div>
                <div style={{ fontSize: '1.1rem', fontWeight: 700, color: '#FF6B35', marginTop: 2 }}>{billet.voyage.heureDepart}</div>
              </div>
              <div className="text-center" style={{ flex: 1, maxWidth: 120 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                  <div style={{ flex: 1, height: 2, background: 'linear-gradient(90deg, #FF6B35, #E85A25)', borderRadius: 2 }} />
                  <div style={{ color: '#FF6B35' }}><IconArrow /></div>
                </div>
                <div style={{ marginTop: 8 }}><span className="badge-oncf" style={{ fontSize: '0.7rem' }}>{billet.voyage.code_voyage}</span></div>
              </div>
              <div className="text-center">
                <div style={{ fontSize: '0.68rem', color: '#FF6B35', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1px', marginBottom: 4, display: 'flex', alignItems: 'center', gap: 3, justifyContent: 'center' }}>
                  <IconMapPin /> Arrivee
                </div>
                <div style={{ fontSize: '1.5rem', fontWeight: 900, color: '#1A1A2E', fontFamily: 'Raleway, sans-serif' }}>{billet.voyage.villeDarrivee}</div>
                <div style={{ fontSize: '1.1rem', fontWeight: 700, color: '#FF6B35', marginTop: 2 }}>{billet.voyage.heureDarrivee}</div>
              </div>
            </div>

            <div className="row g-0" style={{ background: 'white' }}>
              <div className="col-md-4 p-4" style={{ borderRight: '1px dashed #E5E7EB' }}>
                <div style={{ fontSize: '0.68rem', color: '#FF6B35', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: 10, fontWeight: 700, display: 'flex', alignItems: 'center', gap: 5 }}>
                  <IconUser /> Voyageur
                </div>
                <div style={{ fontWeight: 800, fontSize: '1rem', color: '#1A1A2E', marginBottom: 10 }}>{billet.nom_voyageur}</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 5, color: '#6B7280', fontSize: '0.78rem', marginBottom: 6 }}>
                  <IconId /> CIN / Passeport
                </div>
                <div style={{ fontWeight: 700, color: '#FF6B35', fontSize: '0.9rem', background: '#FFF4EF', padding: '0.3rem 0.75rem', borderRadius: 6, display: 'inline-block', border: '1px solid #FFD5C2' }}>
                  {billet.passport_voyageur}
                </div>
              </div>
              <div className="col-md-5 p-4" style={{ borderRight: '1px dashed #E5E7EB' }}>
                <div style={{ fontSize: '0.68rem', color: '#FF6B35', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: 10, fontWeight: 700, display: 'flex', alignItems: 'center', gap: 5 }}>
                  <IconClock /> Horaires et Tarif
                </div>
                <div className="d-flex gap-4 mb-3">
                  <div>
                    <div style={{ fontSize: '0.7rem', color: '#9CA3AF', marginBottom: 2 }}>Depart</div>
                    <div style={{ fontWeight: 700, color: '#1A1A2E' }}>{billet.voyage.heureDepart}</div>
                  </div>
                  <div>
                    <div style={{ fontSize: '0.7rem', color: '#9CA3AF', marginBottom: 2 }}>Arrivee</div>
                    <div style={{ fontWeight: 700, color: '#1A1A2E' }}>{billet.voyage.heureDarrivee}</div>
                  </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <span style={{ fontSize: '0.72rem', color: '#9CA3AF' }}>Prix</span>
                  <span style={{ fontWeight: 800, color: '#16A34A', fontSize: '1.05rem', background: '#F0FDF4', padding: '0.2rem 0.65rem', borderRadius: 6, border: '1px solid #BBF7D0' }}>
                    {billet.voyage.prixVoyage} DH
                  </span>
                </div>
              </div>
              <div className="col-md-3 p-4 d-flex flex-column align-items-center justify-content-center" style={{ background: '#FAFAFA' }}>
                <img
                  src={`https://api.qrserver.com/v1/create-qr-code/?size=120x120&data=ONCF-${commande.id}-${billet.voyage.code_voyage}-${i+1}&color=1A1A2E`}
                  alt="QR"
                  style={{ borderRadius: 10, border: '3px solid #FF6B35', padding: 4, background: 'white' }}
                />
                <div style={{ fontSize: '0.7rem', color: '#9CA3AF', marginTop: 8, textAlign: 'center' }}>Scanner en gare</div>
              </div>
            </div>

            <div style={{ background: 'linear-gradient(135deg, #1A1A2E, #2D2D4E)', borderRadius: '0 0 14px 14px', padding: '0.7rem 1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.8rem' }}>
              <span style={{ color: 'rgba(255,255,255,0.55)' }}>Reserve le : <strong style={{ color: 'white' }}>{commande.date_comm}</strong></span>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, color: '#4ADE80', fontWeight: 700 }}>
                <IconCheck /> Paiement confirme
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  )
}
