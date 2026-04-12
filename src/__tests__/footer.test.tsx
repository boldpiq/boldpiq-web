import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import { Footer } from '@/components/layout/Footer'

// Mock Next.js Link and Image — not testing routing or image optimisation
vi.mock('next/link', () => ({
  default: ({ href, children, ...props }: { href: string; children: React.ReactNode; [key: string]: unknown }) => (
    <a href={href} {...props}>{children}</a>
  ),
}))
vi.mock('next/image', () => ({
  default: ({ src, alt, ...props }: { src: string; alt: string; [key: string]: unknown }) => (
    // eslint-disable-next-line @next/next/no-img-element
    <img src={src} alt={alt} {...props} />
  ),
}))
// Mock motion — animations not relevant in unit tests
vi.mock('motion/react', () => ({
  motion: new Proxy({}, {
    get: (_: unknown, tag: string) => {
      const El = ({ children, ...props }: { children?: React.ReactNode; [key: string]: unknown }) => {
        const clean = Object.fromEntries(
          Object.entries(props).filter(([k]) => !['animate','initial','transition','whileHover','whileTap','exit'].includes(k))
        )
        return require('react').createElement(tag, clean, children)
      }
      return El
    },
  }),
  AnimatePresence: ({ children }: { children: React.ReactNode }) => children,
}))

describe('Footer', () => {
  describe('navigation links', () => {
    it('renders Work link', () => {
      render(<Footer />)
      expect(screen.getByRole('link', { name: 'Work' })).toHaveAttribute('href', '/work')
    })

    it('renders Services link', () => {
      render(<Footer />)
      expect(screen.getByRole('link', { name: 'Services' })).toHaveAttribute('href', '/services')
    })

    it('renders About link', () => {
      render(<Footer />)
      expect(screen.getByRole('link', { name: 'About' })).toHaveAttribute('href', '/about')
    })

    it('renders Contact link', () => {
      render(<Footer />)
      const contactLinks = screen.getAllByRole('link', { name: 'Contact' })
      expect(contactLinks.length).toBeGreaterThanOrEqual(1)
    })
  })

  describe('social links', () => {
    it('renders Instagram link', () => {
      render(<Footer />)
      expect(screen.getByRole('link', { name: 'Instagram' })).toHaveAttribute(
        'href', 'https://www.instagram.com/boldpiq/'
      )
    })

    it('renders Facebook link', () => {
      render(<Footer />)
      expect(screen.getByRole('link', { name: 'Facebook' })).toHaveAttribute(
        'href', 'https://www.facebook.com/boldpiq'
      )
    })

    it('renders LinkedIn link', () => {
      render(<Footer />)
      expect(screen.getByRole('link', { name: 'LinkedIn' })).toHaveAttribute(
        'href', 'https://www.linkedin.com/company/boldpiq/'
      )
    })

    it('social links open in new tab with rel="noopener noreferrer"', () => {
      render(<Footer />)
      const instagram = screen.getByRole('link', { name: 'Instagram' })
      expect(instagram).toHaveAttribute('target', '_blank')
      expect(instagram).toHaveAttribute('rel', 'noopener noreferrer')
    })
  })

  describe('legal links', () => {
    it('renders Terms of Service', () => {
      render(<Footer />)
      expect(screen.getByRole('link', { name: 'Terms of Service' })).toHaveAttribute('href', '/terms')
    })

    it('renders Privacy Policy', () => {
      render(<Footer />)
      expect(screen.getByRole('link', { name: 'Privacy Policy' })).toHaveAttribute('href', '/privacy')
    })

    it('renders Refund Policy', () => {
      render(<Footer />)
      expect(screen.getByRole('link', { name: 'Refund Policy' })).toHaveAttribute('href', '/refund')
    })

    it('renders DPA', () => {
      render(<Footer />)
      expect(screen.getByRole('link', { name: 'DPA' })).toHaveAttribute('href', '/dpa')
    })

    it('renders Disclaimers', () => {
      render(<Footer />)
      expect(screen.getByRole('link', { name: 'Disclaimers' })).toHaveAttribute('href', '/disclaimers')
    })
  })

  describe('contact details', () => {
    it('renders support email', () => {
      render(<Footer />)
      expect(screen.getByRole('link', { name: 'support@boldpiq.com' })).toHaveAttribute(
        'href', 'mailto:support@boldpiq.com'
      )
    })

    it('renders team email', () => {
      render(<Footer />)
      expect(screen.getByRole('link', { name: 'team@boldpiq.com' })).toHaveAttribute(
        'href', 'mailto:team@boldpiq.com'
      )
    })

    it('renders phone number', () => {
      render(<Footer />)
      expect(screen.getByRole('link', { name: '+27 21 815 1634' })).toHaveAttribute(
        'href', 'tel:+27218151634'
      )
    })

    it('renders WhatsApp link with correct number', () => {
      render(<Footer />)
      const wa = screen.getByRole('link', { name: 'WhatsApp' })
      expect(wa.getAttribute('href')).toContain('27792115659')
    })
  })

  describe('branding', () => {
    it('renders the BoldPiq logo', () => {
      render(<Footer />)
      expect(screen.getByAltText('BoldPiq')).toBeInTheDocument()
    })

    it('logo links to home page', () => {
      render(<Footer />)
      const logoLink = screen.getByAltText('BoldPiq').closest('a')
      expect(logoLink).toHaveAttribute('href', '/')
    })

    it('renders copyright notice with current year', () => {
      render(<Footer />)
      const year = new Date().getFullYear().toString()
      expect(screen.getByText((_, el) => el?.tagName === 'P' && el.textContent?.includes(year) && el.textContent?.includes('BoldPiq') || false)).toBeInTheDocument()
    })
  })

  describe('accessibility', () => {
    it('has a footer landmark', () => {
      render(<Footer />)
      expect(screen.getByRole('contentinfo')).toBeInTheDocument()
    })

    it('has a navigation landmark with label', () => {
      render(<Footer />)
      expect(screen.getByRole('navigation', { name: 'Footer navigation' })).toBeInTheDocument()
    })

    it('renders Start a Project CTA', () => {
      render(<Footer />)
      expect(screen.getByRole('link', { name: 'Start a Project' })).toHaveAttribute('href', '/contact')
    })
  })
})
