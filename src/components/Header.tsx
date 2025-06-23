import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { FaShoppingCart, FaTrashAlt } from 'react-icons/fa'
import { getCartCount, getCartItems, removeFromCart, clearCart } from '../utils/cartDB'

const Header: React.FC = () => {
  const [cartCount, setCartCount] = useState(0)
  const [items, setItems] = useState<any[]>([])
  const [open, setOpen] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)

  const refreshCart = async () => {
    setCartCount(await getCartCount())
    setItems(await getCartItems())
  }

  useEffect(() => {
    if (typeof window === "undefined") return; // Solo en cliente
    refreshCart();
    // Escucha el evento global
    const handler = () => refreshCart();
    window.addEventListener("cart-updated", handler);
    return () => window.removeEventListener("cart-updated", handler);
  }, [])

  // Refresca el carrito cada vez que se abre el dropdown
  useEffect(() => {
    if (open) refreshCart()
  }, [open])

  const handleRemove = async (id: string) => {
    await removeFromCart(id)
    refreshCart()
  }

  const handleBuy = async () => {
    await clearCart()
    setShowConfirm(false)
    setOpen(false)
    refreshCart()
  }

  return (
    <header className="w-full fixed top-0 left-0 z-50 bg-white shadow-md px-6 py-4 flex items-center justify-between">
      {/* Logo Pokémon */}
      <div className="flex items-center">
        <motion.img
          src="/logo.png"
          alt="Logo Pokédex"
          className="w-48 drop-shadow-lg"
          draggable={false}
          animate={{ scale: [1, 1.2, 1] }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            repeatType: 'loop',
            ease: 'easeInOut',
          }}
        />
      </div>

      {/* Carrito */}
      <div className="relative">
        <button
          className="p-2 text-gray-700 hover:text-gray-900 focus:outline-none cursor-pointer"
          aria-label="Ver carrito"
          onClick={() => setOpen((o) => !o)}
        >
          <FaShoppingCart className="w-8 h-8" />
        </button>

        {cartCount > 0 && (
          <span
            className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center
                       rounded-full bg-red-500 text-xs font-bold text-white drop-shadow"
          >
            {cartCount}
          </span>
        )}

        {/* Dropdown del carrito */}
        {open && (
          <div className="absolute right-0 mt-2 w-72 bg-white border rounded-lg shadow-lg z-50">
            <div className="p-4">
              <h4 className="font-bold mb-2">Carrito</h4>
              {items.length === 0 ? (
                <p className="text-gray-500">El carrito está vacío.</p>
              ) : (
                <>
                  <ul>
                    {items.map((item) => (
                      <li key={item.id} className="flex items-center mb-2">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-10 rounded mr-2"
                        />
                        <div className="flex-1">
                          <div className="font-semibold">{item.name}</div>
                          <div className="text-sm text-gray-600">
                            {item.quantity} x ${item.price}
                          </div>
                        </div>
                        <button
                          className="ml-2 text-red-500 hover:text-red-700"
                          title="Eliminar"
                          onClick={() => handleRemove(item.id)}
                        >
                          <FaTrashAlt />
                        </button>
                      </li>
                    ))}
                  </ul>
                  <p className="mt-2 font-bold">Total: ${items.reduce((total, item) => total + item.price * item.quantity, 0)}</p>
                  <button
                    className="mt-4 w-full px-4 py-2 bg-yellow-500 hover:bg-yellow-600 text-white font-bold rounded-full shadow transition-all duration-200"
                    onClick={() => setShowConfirm(true)}
                  >
                    Comprar
                  </button>
                </>
              )}
            </div>
            {/* Modal de confirmación */}
            {showConfirm && (
              <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
                <div className="bg-white rounded-xl shadow-2xl p-6 w-full max-w-md mx-4">
                  <h2 className="text-xl font-bold text-gray-800 mb-4">¿Estás seguro que quieres comprar?</h2>
                  <div className="flex justify-end gap-4">
                    <button
                      className="px-4 py-2 rounded-md bg-gray-200 hover:bg-gray-300 text-gray-700 font-medium"
                      onClick={() => setShowConfirm(false)}
                    >
                      No
                    </button>
                    <button
                      className="px-4 py-2 rounded-md bg-yellow-500 hover:bg-yellow-600 text-white font-bold"
                      onClick={handleBuy}
                    >
                      Sí, comprar
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </header>
  )
}

export default Header
