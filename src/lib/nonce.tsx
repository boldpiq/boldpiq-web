// src/lib/nonce.tsx
'use client'
import { createContext, useContext, ReactNode } from 'react'

export const NonceContext = createContext<string>('')

export function NonceProvider({
  nonce,
  children,
}: {
  nonce: string
  children: ReactNode
}) {
  return (
    <NonceContext.Provider value={nonce}>
      {children}
    </NonceContext.Provider>
  )
}

export function useNonce() {
  return useContext(NonceContext)
}
