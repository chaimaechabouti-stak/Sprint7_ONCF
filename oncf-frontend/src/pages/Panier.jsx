import { useCart } from '../context/CartContext'
import { useNavigate, Link } from 'react-router-dom'

export default function Panier() {
  const { items, updateQte, removeFromCart, total, clearCart } = useCart()
  const navigate = useNavigate()

  if (items.length === 0) return (
    <div className="text-center py-5">
      <div style={{
        width: 80, height: 80, borderRadius: '50%',
        background: '#E8F4FD', display: 'flex',
        alignItems: 'center', justifyContent: 'center',
        margin: '0 auto 20px', fontSize: 36,
      }}>🛒</div>
      <h4 style={{ color: '#1B3A5C', fontFamily: 'Georgia, serif' }}>
        Votre panier est vide
      </h4>
      <p style={{ color: '#607D8B', fontSize: '0.9rem' }}>
        Recherchez un voyage pour commencer votre réservation.
      </p>
      <Link to="/" className="btn mt-2"
        style={{ background: '#1B3A5C', color: 'white', borderRadius: 8,
          border: 'none', padding: '0.55rem 1.5rem', fontWeight: 600 }}>
        Rechercher un voyage
      </Link>
    </div>
  )

  return (
    <div>
      {/* En-tête */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h2 style={{ fontFamily: 'Georgia, serif', color: '#1B3A5C', marginBottom: 2 }}>
            Mon panier
          </h2>
          <span style={{ color: '#607D8B', fontSize: '0.875rem' }}>
            {items.length} voyage(s) sélectionné(s)
          </span>
        </div>
        <button onClick={clearCart}
          style={{ background: 'none', border: '1px solid #FFCDD2',
            color: '#C62828', borderRadius: 8, padding: '0.4rem 1rem',
            fontSize: '0.875rem', cursor: 'pointer' }}>
          Vider le panier
        </button>
      </div>

      <div className="row g-4">
        {/* Tableau */}
        <div className="col-lg-8">
          <div className="card-oncf">
            {items.map(({ voyage, qte }, idx) => (
              <div key={voyage.id}
                style={{
                  padding: '1.25rem 1.5rem',
                  borderBottom: idx < items.length - 1 ? '1px solid #EEF2F6' : 'none',
                }}>
                <div className="d-flex justify-content-between align-items-start">
                  <div style={{ flex: 1 }}>
                    <div className="d-flex align-items-center gap-2 mb-1">
                      <span className="badge-oncf">{voyage.code_voyage}</span>
                      <span style={{ fontWeight: 600, color: '#1B3A5C' }}>
                        {voyage.villeDepart} → {voyage.villeDarrivee}
                      </span>
                    </div>
                    <div style={{ color: '#607D8B', fontSize: '0.85rem' }}>
                      Départ : {voyage.heureDepart} &nbsp;·&nbsp; Arrivée : {voyage.heureDarrivee}
                    </div>
                  </div>
                  <button onClick={() => removeFromCart(voyage.id)}
                    style={{ background: 'none', border: 'none', color: '#B0BEC5',
                      fontSize: '1.1rem', cursor: 'pointer', padding: '0 4px' }}>
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
                      style={{ border: '1px solid #D0DCE8', borderRadius: 8, overflow: 'hidden' }}>
                      <button onClick={() => updateQte(voyage.id, qte - 1)}
                        style={{ background: '#F4F6F8', border: 'none', padding: '0.3rem 0.75rem',
                          cursor: 'pointer', color: '#1B3A5C', fontWeight: 600 }}>−</button>
                      <span style={{ padding: '0.3rem 1rem', fontWeight: 600, color: '#1B3A5C',
                        minWidth: 40, textAlign: 'center' }}>{qte}</span>
                      <button onClick={() => updateQte(voyage.id, qte + 1)}
                        style={{ background: '#F4F6F8', border: 'none', padding: '0.3rem 0.75rem',
                          cursor: 'pointer', color: '#1B3A5C', fontWeight: 600 }}>+</button>
                    </div>
                    <span style={{ fontWeight: 700, color: '#1B3A5C', fontSize: '1rem', minWidth: 90, textAlign: 'right' }}>
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
          <div className="card-oncf p-4">
            <h6 style={{ color: '#607D8B', textTransform: 'uppercase',
              fontSize: '0.75rem', letterSpacing: '0.5px', marginBottom: 16 }}>
              Récapitulatif
            </h6>

            {items.map(({ voyage, qte }) => (
              <div key={voyage.id} className="d-flex justify-content-between mb-2"
                style={{ fontSize: '0.875rem' }}>
                <span style={{ color: '#546E7A' }}>
                  {voyage.code_voyage} ×{qte}
                </span>
                <span style={{ color: '#1B3A5C' }}>
                  {(voyage.prixVoyage * qte).toFixed(2)} DH
                </span>
              </div>
            ))}

            <div style={{ borderTop: '2px solid #1B3A5C', marginTop: 12, paddingTop: 12 }}
              className="d-flex justify-content-between align-items-center">
              <span style={{ fontWeight: 700, color: '#1B3A5C' }}>Total</span>
              <span style={{ fontWeight: 700, color: '#1B3A5C', fontSize: '1.3rem' }}>
                {total.toFixed(2)} DH
              </span>
            </div>

            <button onClick={() => navigate('/voyageurs')}
              className="w-100 btn mt-4"
              style={{ background: '#1B3A5C', color: 'white', borderRadius: 8,
                border: 'none', padding: '0.65rem', fontWeight: 600, fontSize: '0.95rem' }}>
              Infos voyageurs →
            </button>
            <button onClick={() => navigate('/')}
              className="w-100 btn mt-2"
              style={{ background: 'white', color: '#1B3A5C', borderRadius: 8,
                border: '1px solid #D0DCE8', padding: '0.55rem', fontSize: '0.875rem' }}>
              ← Continuer les achats
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}