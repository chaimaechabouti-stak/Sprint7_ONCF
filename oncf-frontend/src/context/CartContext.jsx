import { createContext, useContext, useState } from 'react'

const CartContext = createContext(null)

export function CartProvider({ children }) {
  const [cart, setCart] = useState({})

  const addToCart = (voyage, qte) => {
    const qty = parseInt(qte, 10) || 1
    setCart((prev) => ({
      ...prev,
      [voyage.id]: {
        voyage,
        qte: (prev[voyage.id]?.qte || 0) + qty,
      },
    }))
  }

  const updateQte = (voyageId, qte) => {
    const qty = parseInt(qte, 10)
    if (qty <= 0) {
      removeFromCart(voyageId)
    } else {
      setCart((prev) => ({
        ...prev,
        [voyageId]: { ...prev[voyageId], qte: qty },
      }))
    }
  }

  const removeFromCart = (voyageId) => {
    setCart((prev) => {
      const next = { ...prev }
      delete next[voyageId]
      return next
    })
  }

  const clearCart = () => setCart({})

  const items     = Object.values(cart)
  const total     = items.reduce((sum, { voyage, qte }) => sum + voyage.prixVoyage * qte, 0)
  const itemCount = items.reduce((sum, { qte }) => sum + qte, 0)

  return (
    <CartContext.Provider value={{ cart, items, total, itemCount, addToCart, updateQte, removeFromCart, clearCart }}>
      {children}
    </CartContext.Provider>
  )
}

export const useCart = () => useContext(CartContext)