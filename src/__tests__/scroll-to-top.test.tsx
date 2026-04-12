import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { render, screen, fireEvent, act } from '@testing-library/react'
import { ScrollToTop } from '@/components/ui/ScrollToTop'

beforeEach(() => {
  Object.defineProperty(window, 'scrollY', { writable: true, configurable: true, value: 0 })
  window.scrollTo = vi.fn()
})

afterEach(() => {
  vi.restoreAllMocks()
})

describe('ScrollToTop', () => {
  describe('rendering', () => {
    it('renders the scroll-to-top button after mount', () => {
      render(<ScrollToTop />)
      expect(screen.getByRole('button', { name: 'Scroll to top' })).toBeInTheDocument()
    })

    it('button contains the up arrow character', () => {
      render(<ScrollToTop />)
      expect(screen.getByRole('button', { name: 'Scroll to top' })).toHaveTextContent('↑')
    })

    it('button has correct aria-label', () => {
      render(<ScrollToTop />)
      expect(screen.getByRole('button', { name: 'Scroll to top' })).toHaveAttribute('aria-label', 'Scroll to top')
    })
  })

  describe('visibility', () => {
    it('is invisible when scrollY <= 400', () => {
      Object.defineProperty(window, 'scrollY', { value: 0 })
      render(<ScrollToTop />)
      const btn = screen.getByRole('button', { name: 'Scroll to top' })
      expect(btn).toHaveStyle({ opacity: '0' })
    })

    it('becomes visible when scrollY > 400', () => {
      render(<ScrollToTop />)
      act(() => {
        Object.defineProperty(window, 'scrollY', { value: 401, configurable: true })
        fireEvent.scroll(window)
      })
      expect(screen.getByRole('button', { name: 'Scroll to top' })).toHaveStyle({ opacity: '1' })
    })

    it('hides again when scrolled back to top', () => {
      render(<ScrollToTop />)
      act(() => {
        Object.defineProperty(window, 'scrollY', { value: 500, configurable: true })
        fireEvent.scroll(window)
      })
      act(() => {
        Object.defineProperty(window, 'scrollY', { value: 100, configurable: true })
        fireEvent.scroll(window)
      })
      expect(screen.getByRole('button', { name: 'Scroll to top' })).toHaveStyle({ opacity: '0' })
    })

    it('has pointerEvents none when hidden', () => {
      Object.defineProperty(window, 'scrollY', { value: 0 })
      render(<ScrollToTop />)
      expect(screen.getByRole('button')).toHaveStyle({ pointerEvents: 'none' })
    })

    it('has pointerEvents auto when visible', () => {
      render(<ScrollToTop />)
      act(() => {
        Object.defineProperty(window, 'scrollY', { value: 500, configurable: true })
        fireEvent.scroll(window)
      })
      expect(screen.getByRole('button')).toHaveStyle({ pointerEvents: 'auto' })
    })
  })

  describe('click behaviour', () => {
    it('calls window.scrollTo with top:0 on click', () => {
      render(<ScrollToTop />)
      act(() => {
        Object.defineProperty(window, 'scrollY', { value: 500, configurable: true })
        fireEvent.scroll(window)
      })
      fireEvent.click(screen.getByRole('button', { name: 'Scroll to top' }))
      expect(window.scrollTo).toHaveBeenCalledWith({ top: 0, behavior: 'smooth' })
    })
  })

  describe('event listener cleanup', () => {
    it('removes scroll listener on unmount', () => {
      const removeSpy = vi.spyOn(window, 'removeEventListener')
      const { unmount } = render(<ScrollToTop />)
      unmount()
      expect(removeSpy).toHaveBeenCalledWith('scroll', expect.any(Function))
    })
  })
})
