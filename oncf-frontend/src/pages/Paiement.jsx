import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { loadStripe } from '@stripe/stripe-js'
import {
  Elements, CardNumberElement, CardExpiryElement,
  CardCvcElement, useStripe, useElements,
} from '@stripe/react-stripe-js'
import api from '../api/axios'
import { useCart } from '../context/CartContext'

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_KEY)

const CARD_STYLE = {
  style: {
    base: { fontSize: '15px', color: '#1A2B3C', '::placeholder': { color: '#adb5bd' } },
    invalid: { color: '#C62828' },
  },
}

function CheckoutForm({ clientSecret, total, onSuccess }) {
  const stripe   = useStripe()
  const elements = useElements()
  const [loading, setLoading] = useState(false)
  const [error, setError]     = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!stripe || !elements) return
    setError('')
    setLoading(true)

    const { error: stripeError, paymentIntent } = await stripe.confirmCardPayment(
      clientSecret,
      { payment_method: { card: elements.getElement(CardNumberElement) } }
    )

    if (stripeError) {
      setError(stripeError.message)
      setLoading(false)
    } else if (paymentIntent.status === 'succeeded') {
      onSuccess(paymentIntent.id)
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="card-oncf p-4 mb-3">
        <div className="d-flex gap-2 mb-4 align-items-center">
          <span className="badge" style={{ background: '#1A1F71', color: 'white', fontSize: '0.85rem', padding: '0.4em 0.8em' }}>VISA</span>
          <span className="badge" style={{ background: '#EB001B', color: 'white', fontSize: '0.85rem', padding: '0.4em 0.8em' }}>Mastercard</span>
          <span className="ms-auto" style={{ color: '#607D8B', fontSize: '0.8rem' }}>🔒 Paiement sécurisé</span>
        </div>

        <div className="mb-3">
          <label className="form-label" style={{ fontWeight: 600, fontSize: '0.85rem', color: '#1A1A2E' }}>
            Numéro de carte
          </label>
          <div className="form-control py-2" style={{ borderRadius: 10, borderColor: '#E0E7EF' }}>
            <CardNumberElement options={CARD_STYLE} />
          </div>
        </div>

        <div className="row g-3">
          <div className="col-md-6">
            <label className="form-label" style={{ fontWeight: 600, fontSize: '0.85rem', color: '#1A1A2E' }}>
              Date d'expiration
            </label>
            <div className="form-control py-2" style={{ borderRadius: 10, borderColor: '#E0E7EF' }}>
              <CardExpiryElement options={CARD_STYLE} />
            </div>
          </div>
          <div className="col-md-6">
            <label className="form-label" style={{ fontWeight: 600, fontSize: '0.85rem', color: '#1A1A2E' }}>
              CVV
            </label>
            <div className="form-control py-2" style={{ borderRadius: 10, borderColor: '#E0E7EF' }}>
              <CardCvcElement options={CARD_STYLE} />
            </div>
          </div>
        </div>
      </div>

      {error && (
        <div className="mb-3 px-3 py-2 rounded-3"
          style={{ background: '#FFEBEE', color: '#C62828', border: '1px solid #FFCDD2', fontSize: '0.875rem' }}>
          ❌ {error}
        </div>
      )}

      <div className="mb-3 px-3 py-2 rounded-3"
        style={{ background: '#FFF4EF', border: '1px solid #FFD5C2', fontSize: '0.825rem', color: '#FF6B35' }}>
        🧪 <strong>Test :</strong> Carte <code>4242 4242 4242 4242</code>, date <code>12/28</code>, CVV <code>123</code>
      </div>

      <button type="submit" className="btn w-100"
        disabled={!stripe || loading}
        style={{
          background: 'linear-gradient(135deg, #FF6B35, #E85A25)',
          color: 'white', border: 'none',
          borderRadius: 10, padding: '0.75rem',
          fontWeight: 700, fontSize: '1rem',
          boxShadow: '0 4px 16px rgba(232,25,44,0.4)',
        }}>
        {loading
          ? <><span className="spinner-border spinner-border-sm me-2" />Traitement…</>
          : `✅ Payer ${total.toFixed(2)} DH`}
      </button>
    </form>
  )
}

export default function Paiement() {
  const { items, total, clearCart } = useCart()
  const navigate                    = useNavigate()
  const [clientSecret, setClientSecret]     = useState('')
  const [creatingIntent, setCreatingIntent] = useState(true)

  useEffect(() => {
    if (total <= 0) { navigate('/panier'); return }
    api.post('/stripe/create-intent', { amount: total })
      .then((res) => { setClientSecret(res.data.clientSecret); setCreatingIntent(false) })
      .catch(() => { alert('Erreur paiement.'); navigate('/panier') })
  }, [])

  const handleSuccess = async (paymentIntentId) => {
    const voyageurs = JSON.parse(sessionStorage.getItem('oncf_voyageurs') || '[]')
    const grouped = {}
    voyageurs.forEach((v) => {
      if (!grouped[v.voyage_id]) {
        grouped[v.voyage_id] = { voyage_id: v.voyage_id, qte: 0, nom_voyageur: v.nom, passport_voyageur: v.passport }
      }
      grouped[v.voyage_id].qte += 1
    })
    try {
      const { data } = await api.post('/commandes', {
        stripe_payment_id: paymentIntentId,
        items: Object.values(grouped),
      })
      clearCart()
      sessionStorage.removeItem('oncf_voyageurs')
      navigate(`/billets/${data.commande_id}`)
    } catch {
      alert('Paiement réussi mais erreur commande. Contactez le support.')
    }
  }

  if (creatingIntent || !clientSecret) return (
    <div className="d-flex justify-content-center align-items-center" style={{ height: '60vh' }}>
      <div className="text-center">
        <div className="spinner-border mb-3" style={{ color: '#FF6B35', width: '3rem', height: '3rem' }} />
        <p style={{ color: '#607D8B' }}>Initialisation du paiement…</p>
      </div>
    </div>
  )

  return (
    <div className="row justify-content-center fade-in">
      <div className="col-md-7">
        <div className="mb-4">
          <h2 style={{ fontFamily: 'Georgia, serif', color: '#1A1A2E', fontWeight: 700, marginBottom: 4 }}>
            💳 Paiement
          </h2>
          <p style={{ color: '#607D8B', margin: 0 }}>Finaliser votre réservation</p>
        </div>

        {/* Récapitulatif */}
        <div className="card-oncf mb-4">
          <div style={{ padding: '0.85rem 1.25rem', background: '#FAFBFC',
            borderBottom: '1px solid #E0E7EF', fontWeight: 700, color: '#1A1A2E', fontSize: '0.9rem' }}>
            📋 Récapitulatif
          </div>
          <div className="p-0">
            <table className="table mb-0" style={{ fontSize: '0.9rem' }}>
              <tbody>
                {items.map(({ voyage, qte }) => (
                  <tr key={voyage.id}>
                    <td className="ps-3 py-3">
                      <span className="badge-oncf me-2">{voyage.code_voyage}</span>
                      {voyage.villeDepart} → {voyage.villeDarrivee}
                    </td>
                    <td className="text-center py-3" style={{ color: '#607D8B' }}>×{qte}</td>
                    <td className="text-end pe-3 py-3" style={{ fontWeight: 700, color: '#1A1A2E' }}>
                      {(voyage.prixVoyage * qte).toFixed(2)} DH
                    </td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr style={{ background: '#FFF4EF', borderTop: '2px solid #FF6B35' }}>
                  <td colSpan="2" className="ps-3 py-3" style={{ fontWeight: 700, color: '#1A1A2E' }}>Total</td>
                  <td className="text-end pe-3 py-3" style={{ fontWeight: 800, color: '#FF6B35', fontSize: '1.2rem' }}>
                    {total.toFixed(2)} DH
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>

        <Elements stripe={stripePromise} options={{ clientSecret }}>
          <CheckoutForm clientSecret={clientSecret} total={total} onSuccess={handleSuccess} />
        </Elements>
      </div>
    </div>
  )
}
