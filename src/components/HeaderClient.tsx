// src/components/HeaderClient.tsx
'use client'
import React, { useEffect, useState } from 'react'
import Header from './Header'

export default function HeaderClient() {
  const [cartCount, setCartCount] = useState(0)

  useEffect(() => {
    const fetchCount = async () => {
      try {
        const { getCartCount } = await import('../utils/cartDB')
        const count = await getCartCount()
        setCartCount(count)
      } catch (err) {
        console.error('Error al cargar el carrito', err)
      }
    }

    fetchCount()
  }, [])

  return <Header cartCount={cartCount} />
}
