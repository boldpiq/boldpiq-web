import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import { WebGLErrorBoundary } from '@/components/three/WebGLErrorBoundary'

// Suppress console.warn for intentional error boundary tests
beforeEach(() => {
  vi.spyOn(console, 'warn').mockImplementation(() => {})
  vi.spyOn(console, 'error').mockImplementation(() => {})
})

function Bomb({ shouldThrow }: { shouldThrow: boolean }) {
  if (shouldThrow) throw new Error('WebGL context lost')
  return <div data-testid="webgl-content">WebGL Content</div>
}

describe('WebGLErrorBoundary', () => {
  describe('no error', () => {
    it('renders children when no error', () => {
      render(
        <WebGLErrorBoundary>
          <Bomb shouldThrow={false} />
        </WebGLErrorBoundary>
      )
      expect(screen.getByTestId('webgl-content')).toBeInTheDocument()
    })

    it('does not render fallback when no error', () => {
      render(
        <WebGLErrorBoundary fallback={<div data-testid="fallback">Fallback</div>}>
          <Bomb shouldThrow={false} />
        </WebGLErrorBoundary>
      )
      expect(screen.queryByTestId('fallback')).not.toBeInTheDocument()
    })
  })

  describe('with error', () => {
    it('renders default fallback when child throws', () => {
      const { container } = render(
        <WebGLErrorBoundary>
          <Bomb shouldThrow={true} />
        </WebGLErrorBoundary>
      )
      expect(screen.queryByTestId('webgl-content')).not.toBeInTheDocument()
      // Default fallback is an empty div with specific styles
      expect(container.querySelector('div[style*="radial-gradient"]')).toBeInTheDocument()
    })

    it('renders custom fallback when provided and child throws', () => {
      render(
        <WebGLErrorBoundary fallback={<div data-testid="custom-fallback">No WebGL</div>}>
          <Bomb shouldThrow={true} />
        </WebGLErrorBoundary>
      )
      expect(screen.getByTestId('custom-fallback')).toBeInTheDocument()
      expect(screen.queryByTestId('webgl-content')).not.toBeInTheDocument()
    })

    it('renders any custom fallback node', () => {
      render(
        <WebGLErrorBoundary fallback={<p data-testid="text-fallback">WebGL not supported</p>}>
          <Bomb shouldThrow={true} />
        </WebGLErrorBoundary>
      )
      expect(screen.getByTestId('text-fallback')).toHaveTextContent('WebGL not supported')
    })

    it('logs warning via console.warn when error occurs', () => {
      render(
        <WebGLErrorBoundary>
          <Bomb shouldThrow={true} />
        </WebGLErrorBoundary>
      )
      expect(console.warn).toHaveBeenCalledWith(
        expect.stringContaining('[WebGL]'),
        expect.stringContaining('WebGL context lost'),
        expect.anything()
      )
    })
  })

  describe('getDerivedStateFromError', () => {
    it('sets error state from thrown error', () => {
      const error = new Error('test error')
      const state = WebGLErrorBoundary.getDerivedStateFromError(error)
      expect(state).toEqual({ error })
    })
  })
})
