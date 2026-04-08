import { useCart } from '../context/CartContext'
import { useNavigate, Link } from 'react-router-dom'

export default function Panier() {
  const { items, updateQte, removeFromCart, total, clearCart } = useCart()
  const navigate = useNavigate()

  if (items.length === 0) return (
    <div className="text-center py-5 fade-in">
      <div style={{
        width: 90, height: 90, borderRadius: '50%',
        background: 'linear-gradient(135deg, #FFF4EF, #FFE0D0)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        margin: '0 auto 20px', fontSize: 42,
        border: '2px solid #FFD5C2',
      }}>🛒</div>
      <h4 style={{ color: '#1A1A2E', fontFamily: 'Georgia, serif', marginBottom: 8 }}>
        Votre panier est vide
      </h4>
      <p style={{ color: '#607D8B', fontSize: '0.9rem', marginBottom: 24 }}>
        Recherchez un voyage pour commencer votre réservation.
      </p>
      <Link to="/" className="btn"
        style={{
          background: 'linear-gradient(135deg, #E8192C, #C0142A)',
          color: 'white', borderRadius: 10,
          border: 'none', padding: '0.65rem 1.8rem', fontWeight: 700,
          boxShadow: '0 4px 14px rgba(232,25,44,0.35)',
        }}>
        🔍 Rechercher un voyage
      </Link>
    </div>
  )

  return (
    <div className="fade-in">
      {/* En-tête */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h2 style={{ fontFamily: 'Georgia, serif', color: '#1A1A2E', fontWeight: 700, marginBottom: 2 }}>
            Mon panier
          </h2>
          <span style={{ color: '#607D8B', fontSize: '0.875rem' }}>
            {items.length} voyage(s) sélectionné(s)
          </span>
        </div>
        <button onClick={clearCart}
          style={{ background: 'none', border: '1.5px solid #FFCDD2',
            color: '#C62828', borderRadius: 10, padding: '0.4rem 1.1rem',
            fontSize: '0.875rem', cursor: 'pointer', fontWeight: 500 }}>
          🗑️ Vider le panier
        </button>
      </div>

      <div className="row g-4">
        {/* Liste */}
        <div className="col-lg-8">
          <div className="card-oncf">
            {items.map(({ voyage, qte }, idx) => (
              <div key={voyage.id}
                style={{
                  padding: '1.25rem 1.5rem',
                  borderBottom: idx < items.length - 1 ? '1px solid #F0F4F8' : 'none',
                }}>
                <div className="d-flex justify-content-between align-items-start">
                  <div style={{ flex: 1 }}>
                    <div className="d-flex align-items-center gap-2 mb-1">
                      <span className="badge-oncf">{voyage.code_voyage}</span>
                      <span style={{ fontWeight: 700, color: '#1A1A2E' }}>
                        {voyage.villeDepart} → {voyage.villeDarrivee}
                      </span>
                    </div>
                    <div style={{ color: '#607D8B', fontSize: '0.85rem' }}>
                      🕐 Départ : {voyage.heureDepart} &nbsp;·&nbsp; Arrivée : {voyage.heureDarrivee}
                    </div>
                  </div>
                  <button onClick={() => removeFromCart(voyage.id)}
                    style={{ background: 'none', border: 'none', color: '#BDBDBD',
                      fontSize: '1.2rem', cursor: 'pointer', padding: '0 4px',
                      transition: 'color 0.2s' }}
                    onMouseEnter={(e) => e.target.style.color = '#C62828'}
                    onMouseLeave={(e) => e.target.style.color = '#BDBDBD'}>
                    ✕
                  </button>
                </div>

                <div className="d-flex align-items-center justify-content-between mt-3">
                  <div style={{ color: '#607D8B', fontSize: '0.875rem' }}>
                    Prix unitaire :
                    <strong style={{ color: '#2E7D32', marginLeft: 6 }}>
                      {voyage.prixVoyage} DH
                    </strong>
                  </div>
                  <div className="d-flex align-items-center gap-3">
                    <div className="d-flex align-items-center"
                      style={{ border: '1.5px solid #E0E7EF', borderRadius: 10, overflow: 'hidden' }}>
                      <button onClick={() => updateQte(voyage.id, qte - 1)}
                        style={{ background: '#F5F7FA', border: 'none', padding: '0.3rem 0.85rem',
                          cursor: 'pointer', color: '#E8192C', fontWeight: 700, fontSize: '1rem' }}>−</button>
                      <span style={{ padding: '0.3rem 1rem', fontWeight: 700, color: '#1A1A2E',
                        minWidth: 40, textAlign: 'center' }}>{qte}</span>
                      <button onClick={() => updateQte(voyage.id, qte + 1)}
                        style={{ background: '#F5F7FA', border: 'none', padding: '0.3rem 0.85rem',
                          cursor: 'pointer', color: '#E8192C', fontWeight: 700, fontSize: '1rem' }}>+</button>
                    </div>
                    <span style={{ fontWeight: 800, color: '#1A1A2E', fontSize: '1rem', minWidth: 90, textAlign: 'right' }}>
                      {(voyage.prixVoyage * qte).toFixed(2)} DH
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Récapitulatif */}
        <div className="col-lg-4">
          <div className="card-oncf p-4" style={{ position: 'sticky', top: 20 }}>
            <h6 style={{ color: '#E8192C', textTransform: 'uppercase',
              fontSize: '0.75rem', letterSpacing: '1px', fontWeight: 700, marginBottom: 16 }}>
              Récapitulatif
            </h6>

            {items.map(({ voyage, qte }) => (
              <div key={voyage.id} className="d-flex justify-content-between mb-2"
                style={{ fontSize: '0.875rem' }}>
                <span style={{ color: '#546E7A' }}>{voyage.code_voyage} ×{qte}</span>
                <span style={{ color: '#1A1A2E', fontWeight: 600 }}>
                  {(voyage.prixVoyage * qte).toFixed(2)} DH
                </span>
              </div>
            ))}

            <div style={{ borderTop: '2px solid #E8192C', marginTop: 12, paddingTop: 12 }}
              className="d-flex justify-content-between align-items-center">
              <span style={{ fontWeight: 700, color: '#1A1A2E' }}>Total</span>
              <span style={{ fontWeight: 800, color: '#E8192C', fontSize: '1.4rem' }}>
                {total.toFixed(2)} DH
              </span>
            </div>

            <button onClick={() => navigate('/voyageurs')}
              className="w-100 btn mt-4"
              style={{
                background: 'linear-gradient(135deg, #E8192C, #C0142A)',
                color: 'white', borderRadius: 10, border: 'none',
                padding: '0.7rem', fontWeight: 700,
                boxShadow: '0 4px 14px rgba(232,25,44,0.35)',
              }}>
              Infos voyageurs →
            </button>
            <button onClick={() => navigate('/')}
              className="w-100 btn mt-2"
              style={{ background: 'white', color: '#1A1A2E', borderRadius: 10,
                border: '1.5px solid #E0E7EF', padding: '0.6rem', fontSize: '0.875rem', fontWeight: 500 }}>
              ← Continuer les achats
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
