import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import { CartProvider } from './context/CartContext'
import Navbar          from './components/Navbar'
import ProtectedRoute  from './components/ProtectedRoute'
import Login           from './pages/Login'
import Register        from './pages/Register'
import Recherche       from './pages/Recherche'
import Panier          from './pages/Panier'
import Voyageurs       from './pages/Voyageurs'
import Paiement        from './pages/Paiement'
import Billets         from './pages/Billets'

export default function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <BrowserRouter>
          <Navbar />
          <main className="container py-4">
            <Routes>
              <Route path="/"          element={<Recherche />} />
              <Route path="/login"     element={<Login />} />
              <Route path="/register"  element={<Register />} />
              <Route path="/panier"    element={<ProtectedRoute><Panier /></ProtectedRoute>} />
              <Route path="/voyageurs" element={<ProtectedRoute><Voyageurs /></ProtectedRoute>} />
              <Route path="/paiement"  element={<ProtectedRoute><Paiement /></ProtectedRoute>} />
              <Route path="/billets/:id" element={<ProtectedRoute><Billets /></ProtectedRoute>} />
              <Route path="*"          element={<Navigate to="/" replace />} />
            </Routes>
          </main>
        </BrowserRouter>
      </CartProvider>
    </AuthProvider>
  )
}