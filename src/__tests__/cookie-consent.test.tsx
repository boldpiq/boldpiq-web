import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { render, screen, act, fireEvent } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { CookieConsent } from '@/components/ui/CookieConsent'

vi.mock('next/link', () => ({
  default: ({ href, children, ...props }: { href: string; children: React.ReactNode; [key: string]: unknown }) => (
    <a href={href} {...props}>{children}</a>
  ),
}))
vi.mock('motion/react', () => ({
  motion: new Proxy({}, {
    get: (_: unknown, tag: string) => {
      const El = ({ children, ...props }: { children?: React.ReactNode; [key: string]: unknown }) => {
        const filtered = Object.fromEntries(
          Object.entries(props).filter(([k]) =>
            !['animate','initial','transition','whileHover','whileTap','exit'].includes(k)
          )
        )
        return require('react').createElement(tag, filtered, children)
      }
      return El
    },
  }),
  AnimatePresence: ({ children }: { children: React.ReactNode }) => <>{children}</>,
}))

const STORAGE_KEY = 'boldpiq_cookie_consent'

beforeEach(() => {
  vi.useFakeTimers()
  localStorage.clear()
})
afterEach(() => {
  vi.useRealTimers()
  localStorage.clear()
})

/** Helper: render and fast-forward past the 1200ms reveal delay */
function renderVisible() {
  render(<CookieConsent />)
  act(() => { vi.advanceTimersByTime(1500) })
}

describe('CookieConsent', () => {
  describe('visibility', () => {
    it('is hidden initially before delay', () => {
      render(<CookieConsent />)
      expect(screen.queryByText('We value your privacy')).not.toBeInTheDocument()
    })

    it('appears after 1200ms when no consent stored', () => {
      render(<CookieConsent />)
      act(() => { vi.advanceTimersByTime(1200) })
      expect(screen.getByText('We value your privacy')).toBeInTheDocument()
    })

    it('does not appear when consent already stored', () => {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ consent: 'all' }))
      render(<CookieConsent />)
      act(() => { vi.advanceTimersByTime(2000) })
      expect(screen.queryByText('We value your privacy')).not.toBeInTheDocument()
    })
  })

  describe('Accept all', () => {
    it('hides banner on click', () => {
      renderVisible()
      fireEvent.click(screen.getByRole('button', { name: 'Accept all' }))
      expect(screen.queryByText('We value your privacy')).not.toBeInTheDocument()
    })

    it('saves consent=all to localStorage', () => {
      renderVisible()
      fireEvent.click(screen.getByRole('button', { name: 'Accept all' }))
      const stored = JSON.parse(localStorage.getItem(STORAGE_KEY) ?? '{}')
      expect(stored.consent).toBe('all')
      expect(stored.prefs.analytics).toBe(true)
      expect(stored.prefs.marketing).toBe(true)
      expect(stored.prefs.functional).toBe(true)
    })

    it('stores a numeric timestamp', () => {
      renderVisible()
      fireEvent.click(screen.getByRole('button', { name: 'Accept all' }))
      const stored = JSON.parse(localStorage.getItem(STORAGE_KEY) ?? '{}')
      expect(typeof stored.timestamp).toBe('number')
    })
  })

  describe('Essential only', () => {
    it('hides banner on click', () => {
      renderVisible()
      fireEvent.click(screen.getByRole('button', { name: 'Essential only' }))
      expect(screen.queryByText('We value your privacy')).not.toBeInTheDocument()
    })

    it('saves consent=essential with all prefs false', () => {
      renderVisible()
      fireEvent.click(screen.getByRole('button', { name: 'Essential only' }))
      const stored = JSON.parse(localStorage.getItem(STORAGE_KEY) ?? '{}')
      expect(stored.consent).toBe('essential')
      expect(stored.prefs.analytics).toBe(false)
      expect(stored.prefs.marketing).toBe(false)
      expect(stored.prefs.functional).toBe(false)
    })
  })

  describe('Customise panel', () => {
    it('opens customise panel', () => {
      renderVisible()
      fireEvent.click(screen.getByRole('button', { name: 'Customise' }))
      expect(screen.getByText('Cookie preferences')).toBeInTheDocument()
    })

    it('navigates back from customise panel', () => {
      renderVisible()
      fireEvent.click(screen.getByRole('button', { name: 'Customise' }))
      fireEvent.click(screen.getByRole('button', { name: 'Back' }))
      expect(screen.getByText('We value your privacy')).toBeInTheDocument()
    })

    it('renders essential cookies as locked', () => {
      renderVisible()
      fireEvent.click(screen.getByRole('button', { name: 'Customise' }))
      expect(screen.getByText('Always on')).toBeInTheDocument()
    })

    it('essential cookie switch is disabled', () => {
      renderVisible()
      fireEvent.click(screen.getByRole('button', { name: 'Customise' }))
      const switches = screen.getAllByRole('switch')
      expect(switches[0]).toBeDisabled()
    })

    it('analytics switch starts enabled', () => {
      renderVisible()
      fireEvent.click(screen.getByRole('button', { name: 'Customise' }))
      const switches = screen.getAllByRole('switch')
      expect(switches[1]).toHaveAttribute('aria-checked', 'true')
    })

    it('toggles analytics switch off', () => {
      renderVisible()
      fireEvent.click(screen.getByRole('button', { name: 'Customise' }))
      const switches = screen.getAllByRole('switch')
      expect(switches[1]).toHaveAttribute('aria-checked', 'true')
      act(() => { fireEvent.click(switches[1]) })
      expect(screen.getAllByRole('switch')[1]).toHaveAttribute('aria-checked', 'false')
    })

    it('saves custom preferences with analytics disabled', () => {
      renderVisible()
      fireEvent.click(screen.getByRole('button', { name: 'Customise' }))
      const switches = screen.getAllByRole('switch')
      fireEvent.click(switches[1]) // disable analytics
      fireEvent.click(screen.getByRole('button', { name: 'Save preferences' }))
      const stored = JSON.parse(localStorage.getItem(STORAGE_KEY) ?? '{}')
      expect(stored.prefs.analytics).toBe(false)
      expect(stored.prefs.marketing).toBe(true)
    })

    it('Essential only in customise panel clears all prefs', () => {
      renderVisible()
      fireEvent.click(screen.getByRole('button', { name: 'Customise' }))
      const essentialBtns = screen.getAllByRole('button', { name: 'Essential only' })
      fireEvent.click(essentialBtns[0])
      const stored = JSON.parse(localStorage.getItem(STORAGE_KEY) ?? '{}')
      expect(stored.consent).toBe('essential')
    })
  })

  describe('links', () => {
    it('links to Privacy Policy', () => {
      renderVisible()
      const privacyLinks = screen.getAllByRole('link', { name: 'Privacy Policy' })
      expect(privacyLinks[0]).toHaveAttribute('href', '/privacy')
    })

    it('links to Terms', () => {
      renderVisible()
      expect(screen.getByRole('link', { name: 'Terms' })).toHaveAttribute('href', '/terms')
    })
  })
})
