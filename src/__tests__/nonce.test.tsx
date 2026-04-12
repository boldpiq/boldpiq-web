import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { NonceProvider, useNonce } from '@/lib/nonce'

function NonceConsumer() {
  const nonce = useNonce()
  return <div data-testid="nonce">{nonce}</div>
}

describe('NonceProvider', () => {
  it('provides the nonce value to children', () => {
    render(
      <NonceProvider nonce="test-nonce-abc">
        <NonceConsumer />
      </NonceProvider>
    )
    expect(screen.getByTestId('nonce').textContent).toBe('test-nonce-abc')
  })

  it('provides empty string by default (no provider)', () => {
    render(<NonceConsumer />)
    expect(screen.getByTestId('nonce').textContent).toBe('')
  })

  it('renders children correctly', () => {
    render(
      <NonceProvider nonce="abc">
        <span data-testid="child">hello</span>
      </NonceProvider>
    )
    expect(screen.getByTestId('child')).toBeInTheDocument()
  })

  it('updates when nonce prop changes', () => {
    const { rerender } = render(
      <NonceProvider nonce="nonce-1">
        <NonceConsumer />
      </NonceProvider>
    )
    expect(screen.getByTestId('nonce').textContent).toBe('nonce-1')

    rerender(
      <NonceProvider nonce="nonce-2">
        <NonceConsumer />
      </NonceProvider>
    )
    expect(screen.getByTestId('nonce').textContent).toBe('nonce-2')
  })
})
