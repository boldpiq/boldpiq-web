import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import { LegalNav } from '@/components/legal/LegalNav'

vi.mock('next/link', () => ({
  default: ({ href, children, style }: { href: string; children: React.ReactNode; style?: React.CSSProperties }) => (
    <a href={href} style={style}>{children}</a>
  ),
}))

const mockPathname = vi.fn(() => '/terms')
vi.mock('next/navigation', () => ({
  usePathname: () => mockPathname(),
}))

describe('LegalNav', () => {
  describe('links rendered', () => {
    it('renders Terms of Service link', () => {
      render(<LegalNav />)
      expect(screen.getByRole('link', { name: 'Terms of Service' })).toHaveAttribute('href', '/terms')
    })

    it('renders Privacy Policy link', () => {
      render(<LegalNav />)
      expect(screen.getByRole('link', { name: 'Privacy Policy' })).toHaveAttribute('href', '/privacy')
    })

    it('renders Refund Policy link', () => {
      render(<LegalNav />)
      expect(screen.getByRole('link', { name: 'Refund Policy' })).toHaveAttribute('href', '/refund')
    })

    it('renders PAIA Manual link', () => {
      render(<LegalNav />)
      expect(screen.getByRole('link', { name: 'PAIA Manual' })).toHaveAttribute('href', '/paia')
    })

    it('renders Data Processing Agreement link', () => {
      render(<LegalNav />)
      expect(screen.getByRole('link', { name: 'Data Processing Agreement' })).toHaveAttribute('href', '/dpa')
    })

    it('renders Disclaimers link', () => {
      render(<LegalNav />)
      expect(screen.getByRole('link', { name: 'Disclaimers' })).toHaveAttribute('href', '/disclaimers')
    })

    it('renders exactly 6 links', () => {
      render(<LegalNav />)
      expect(screen.getAllByRole('link')).toHaveLength(6)
    })
  })

  describe('active state', () => {
    it('highlights current page link (Terms of Service)', () => {
      mockPathname.mockReturnValue('/terms')
      render(<LegalNav />)
      const termsLink = screen.getByRole('link', { name: 'Terms of Service' })
      // Active link should have fontWeight 700
      expect(termsLink).toHaveStyle({ fontWeight: '700' })
    })

    it('highlights Privacy Policy when on /privacy', () => {
      mockPathname.mockReturnValue('/privacy')
      render(<LegalNav />)
      const privacyLink = screen.getByRole('link', { name: 'Privacy Policy' })
      expect(privacyLink).toHaveStyle({ fontWeight: '700' })
    })

    it('non-active links have fontWeight 400', () => {
      mockPathname.mockReturnValue('/terms')
      render(<LegalNav />)
      const privacyLink = screen.getByRole('link', { name: 'Privacy Policy' })
      expect(privacyLink).toHaveStyle({ fontWeight: '400' })
    })

    it('active link has accent colour', () => {
      mockPathname.mockReturnValue('/privacy')
      render(<LegalNav />)
      const privacyLink = screen.getByRole('link', { name: 'Privacy Policy' })
      expect(privacyLink).toHaveStyle({ color: '#C4541A' })
    })

    it('no active state when on unrelated path', () => {
      mockPathname.mockReturnValue('/contact')
      render(<LegalNav />)
      screen.getAllByRole('link').forEach(link => {
        expect(link).toHaveStyle({ fontWeight: '400' })
      })
    })
  })
})
