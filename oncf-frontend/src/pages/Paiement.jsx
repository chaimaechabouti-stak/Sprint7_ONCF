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
    base: { fontSize: '16px', color: '#212529', '::placeholder': { color: '#adb5bd' } },
    invalid: { color: '#dc3545' },
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
      <div className="card p-4 mb-3 shadow-sm">
        <div className="d-flex gap-2 mb-3 align-items-center">
          <span className="badge bg-primary fs-6">VISA</span>
          <span className="badge bg-danger fs-6">Mastercard</span>
          <span className="ms-auto text-muted small">🔒 Paiement sécurisé</span>
        </div>
        <div className="mb-3">
          <label className="form-label fw-semibold">Numéro de carte</label>
          <div className="form-control py-2">
            <CardNumberElement options={CARD_STYLE} />
          </div>
        </div>
        <div className="row g-3">
          <div className="col-md-6">
            <label className="form-label fw-semibold">Date d'expiration</label>
            <div className="form-control py-2">
              <CardExpiryElement options={CARD_STYLE} />
            </div>
          </div>
          <div className="col-md-6">
            <label className="form-label fw-semibold">CVV</label>
            <div className="form-control py-2">
              <CardCvcElement options={CARD_STYLE} />
            </div>
          </div>
        </div>
      </div>

      {error && <div className="alert alert-danger">❌ {error}</div>}

      <div className="alert alert-info small">
        🧪 <strong>Test :</strong> Carte <code>4242 4242 4242 4242</code>,
        date <code>12/28</code>, CVV <code>123</code>
      </div>

      <button type="submit" className="btn btn-success btn-lg w-100"
        disabled={!stripe || loading}>
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
        grouped[v.voyage_id] = {
          voyage_id: v.voyage_id, qte: 0,
          nom_voyageur: v.nom, passport_voyageur: v.passport,
        }
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
        <div className="spinner-border text-primary mb-3" />
        <p className="text-muted">Initialisation du paiement…</p>
      </div>
    </div>
  )

  return (
    <div className="row justify-content-center">
      <div className="col-md-7">
        <h2 className="fw-bold mb-1">💳 Paiement</h2>
        <p className="text-muted mb-4">Finaliser votre réservation</p>

        <div className="card mb-4">
          <div className="card-header bg-light fw-semibold">📋 Récapitulatif</div>
          <div className="card-body p-0">
            <table className="table table-sm mb-0">
              <tbody>
                {items.map(({ voyage, qte }) => (
                  <tr key={voyage.id}>
                    <td className="ps-3">
                      {voyage.code_voyage} — {voyage.villeDepart} → {voyage.villeDarrivee}
                    </td>
                    <td className="text-center">×{qte}</td>
                    <td className="text-end pe-3 fw-semibold">
                      {(voyage.prixVoyage * qte).toFixed(2)} DH
                    </td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr className="table-primary">
                  <td colSpan="2" className="ps-3 fw-bold">Total</td>
                  <td className="text-end pe-3 fw-bold fs-5">{total.toFixed(2)} DH</td>
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