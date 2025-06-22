import React from 'react'
import { motion } from 'framer-motion'
import { FaShoppingCart } from 'react-icons/fa'

interface HeaderProps {
  cartCount?: number
}

const Header: React.FC<HeaderProps> = ({ cartCount = 1 }) => {
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
          className="p-2 text-gray-700 hover:text-gray-900 focus:outline-none"
          aria-label="Ver carrito"
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
      </div>
    </header>
  )
}

export default Header
