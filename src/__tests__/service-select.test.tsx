import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { ServiceSelect } from '@/components/ui/ServiceSelect'

describe('ServiceSelect', () => {
  describe('initial state', () => {
    it('shows placeholder when nothing selected', () => {
      render(<ServiceSelect />)
      expect(screen.getByRole('button')).toHaveTextContent("Service you're interested in")
    })

    it('dropdown is closed initially', () => {
      render(<ServiceSelect />)
      expect(screen.queryByText('Web Design')).not.toBeInTheDocument()
    })

    it('hidden input has empty value initially', () => {
      const { container } = render(<ServiceSelect name="service" />)
      const hidden = container.querySelector('input[type="hidden"]')
      expect(hidden).toHaveAttribute('value', '')
    })

    it('hidden input uses provided name', () => {
      const { container } = render(<ServiceSelect name="project_type" />)
      const hidden = container.querySelector('input[type="hidden"]')
      expect(hidden).toHaveAttribute('name', 'project_type')
    })

    it('defaults name to "service"', () => {
      const { container } = render(<ServiceSelect />)
      const hidden = container.querySelector('input[type="hidden"]')
      expect(hidden).toHaveAttribute('name', 'service')
    })
  })

  describe('opening/closing', () => {
    it('opens dropdown on button click', () => {
      render(<ServiceSelect />)
      fireEvent.click(screen.getByRole('button'))
      expect(screen.getByText('Web Design')).toBeInTheDocument()
    })

    it('shows all 5 service options when open', () => {
      render(<ServiceSelect />)
      fireEvent.click(screen.getByRole('button'))
      expect(screen.getByText('Web Design')).toBeInTheDocument()
      expect(screen.getByText('Web Development')).toBeInTheDocument()
      expect(screen.getByText('Brand Identity')).toBeInTheDocument()
      expect(screen.getByText('Full Package')).toBeInTheDocument()
      expect(screen.getByText('Not sure yet')).toBeInTheDocument()
    })

    it('closes dropdown when trigger button is clicked again', () => {
      render(<ServiceSelect />)
      const trigger = screen.getByRole('button')
      fireEvent.click(trigger)
      expect(screen.getByText('Web Design')).toBeInTheDocument()
      fireEvent.click(trigger)
      expect(screen.queryByText('Web Design')).not.toBeInTheDocument()
    })

    it('closes dropdown on outside click', () => {
      render(
        <div>
          <ServiceSelect />
          <button data-testid="outside">Outside</button>
        </div>
      )
      fireEvent.click(screen.getAllByRole('button')[0])
      expect(screen.getByText('Web Design')).toBeInTheDocument()
      fireEvent.mouseDown(screen.getByTestId('outside'))
      expect(screen.queryByText('Web Design')).not.toBeInTheDocument()
    })
  })

  describe('selection', () => {
    it('selects Web Design and closes dropdown', () => {
      render(<ServiceSelect />)
      fireEvent.click(screen.getByRole('button'))
      fireEvent.click(screen.getByText('Web Design'))
      expect(screen.queryByText('Web Development')).not.toBeInTheDocument()
    })

    it('shows selected label in trigger button', () => {
      render(<ServiceSelect />)
      fireEvent.click(screen.getByRole('button'))
      fireEvent.click(screen.getByText('Web Design'))
      expect(screen.getByRole('button')).toHaveTextContent('Web Design')
    })

    it('sets hidden input value on selection', () => {
      const { container } = render(<ServiceSelect name="service" />)
      fireEvent.click(screen.getByRole('button'))
      fireEvent.click(screen.getByText('Web Development'))
      const hidden = container.querySelector('input[type="hidden"]')
      expect(hidden).toHaveAttribute('value', 'web-development')
    })

    it('sets correct value for Brand Identity', () => {
      const { container } = render(<ServiceSelect />)
      fireEvent.click(screen.getByRole('button'))
      fireEvent.click(screen.getByText('Brand Identity'))
      expect(container.querySelector('input[type="hidden"]')).toHaveAttribute('value', 'brand-identity')
    })

    it('sets correct value for Full Package', () => {
      const { container } = render(<ServiceSelect />)
      fireEvent.click(screen.getByRole('button'))
      fireEvent.click(screen.getByText('Full Package'))
      expect(container.querySelector('input[type="hidden"]')).toHaveAttribute('value', 'full-package')
    })

    it('sets correct value for Not sure yet', () => {
      const { container } = render(<ServiceSelect />)
      fireEvent.click(screen.getByRole('button'))
      fireEvent.click(screen.getByText('Not sure yet'))
      expect(container.querySelector('input[type="hidden"]')).toHaveAttribute('value', 'not-sure')
    })

    it('can change selection', () => {
      const { container } = render(<ServiceSelect />)
      fireEvent.click(screen.getByRole('button'))
      fireEvent.click(screen.getByText('Web Design'))
      fireEvent.click(screen.getByRole('button'))
      fireEvent.click(screen.getByText('Brand Identity'))
      expect(container.querySelector('input[type="hidden"]')).toHaveAttribute('value', 'brand-identity')
    })
  })

  describe('option buttons', () => {
    it('all option buttons have type="button" (no accidental form submit)', () => {
      render(<ServiceSelect />)
      fireEvent.click(screen.getByRole('button'))
      const allButtons = screen.getAllByRole('button')
      // trigger + 5 options = 6 buttons
      allButtons.slice(1).forEach(btn => {
        expect(btn).toHaveAttribute('type', 'button')
      })
    })
  })
})
