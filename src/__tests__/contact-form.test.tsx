import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, fireEvent, waitFor, act } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { ContactForm } from '@/components/forms/ContactForm'

vi.mock('motion/react', () => ({
  motion: new Proxy({}, {
    get: (_: unknown, tag: string) => {
      const El = ({ children, ...props }: { children?: React.ReactNode; [key: string]: unknown }) => {
        const clean = Object.fromEntries(
          Object.entries(props).filter(([k]) =>
            !['animate','initial','transition','whileHover','whileTap','exit'].includes(k)
          )
        )
        return require('react').createElement(tag, clean, children)
      }
      return El
    },
  }),
  AnimatePresence: ({ children }: { children: React.ReactNode }) => <>{children}</>,
}))

vi.mock('lucide-react', () => ({
  Send: () => <span data-testid="icon-send" />,
  CheckCircle: () => <span data-testid="icon-check" />,
  AlertCircle: () => <span data-testid="icon-alert" />,
}))

const validData = {
  name: 'Jane Doe',
  email: 'jane@example.com',
  message: 'This is a test message that is long enough.',
}

function fillForm(overrides: Partial<typeof validData> = {}) {
  const data = { ...validData, ...overrides }
  if (data.name !== undefined) {
    fireEvent.change(screen.getByLabelText('Your name'), { target: { value: data.name } })
  }
  if (data.email !== undefined) {
    fireEvent.change(screen.getByLabelText('Your email address'), { target: { value: data.email } })
  }
  if (data.message !== undefined) {
    fireEvent.change(screen.getByLabelText('Project details'), { target: { value: data.message } })
  }
}

describe('ContactForm', () => {
  describe('rendering', () => {
    it('renders name input', () => {
      render(<ContactForm />)
      expect(screen.getByLabelText('Your name')).toBeInTheDocument()
    })

    it('renders email input', () => {
      render(<ContactForm />)
      expect(screen.getByLabelText('Your email address')).toBeInTheDocument()
    })

    it('renders company input as optional', () => {
      render(<ContactForm />)
      expect(screen.getByLabelText('Company name (optional)')).toBeInTheDocument()
    })

    it('renders message textarea', () => {
      render(<ContactForm />)
      expect(screen.getByLabelText('Project details')).toBeInTheDocument()
    })

    it('renders consent checkbox', () => {
      render(<ContactForm />)
      expect(screen.getByRole('checkbox')).toBeInTheDocument()
    })

    it('renders submit button', () => {
      render(<ContactForm />)
      expect(screen.getByRole('button', { name: /send message/i })).toBeInTheDocument()
    })

    it('renders privacy policy link', () => {
      render(<ContactForm />)
      expect(screen.getByRole('link', { name: 'Privacy Policy' })).toHaveAttribute('href', '/privacy')
    })

    it('email input has type="email"', () => {
      render(<ContactForm />)
      expect(screen.getByLabelText('Your email address')).toHaveAttribute('type', 'email')
    })

    it('consent checkbox has type="checkbox"', () => {
      render(<ContactForm />)
      expect(screen.getByRole('checkbox')).toHaveAttribute('type', 'checkbox')
    })
  })

  describe('validation — name', () => {
    it('shows error when name is empty', async () => {
      render(<ContactForm />)
      fireEvent.submit(screen.getByRole('button', { name: /send message/i }).closest('form')!)
      await waitFor(() => {
        expect(screen.getByText(/at least 2 characters/i)).toBeInTheDocument()
      })
    })

    it('shows error when name is 1 character', async () => {
      render(<ContactForm />)
      fireEvent.change(screen.getByLabelText('Your name'), { target: { value: 'A' } })
      fireEvent.submit(screen.getByRole('button', { name: /send message/i }).closest('form')!)
      await waitFor(() => {
        expect(screen.getByText(/at least 2 characters/i)).toBeInTheDocument()
      })
    })

    it('does not show name error for valid name', async () => {
      render(<ContactForm />)
      fireEvent.change(screen.getByLabelText('Your name'), { target: { value: 'Jane Doe' } })
      fireEvent.submit(screen.getByRole('button', { name: /send message/i }).closest('form')!)
      await waitFor(() => {
        expect(screen.queryByText(/at least 2 characters/i)).not.toBeInTheDocument()
      })
    })
  })

  describe('validation — email', () => {
    it('shows error for missing email', async () => {
      render(<ContactForm />)
      fireEvent.submit(screen.getByRole('button', { name: /send message/i }).closest('form')!)
      await waitFor(() => {
        expect(screen.getByText(/valid email/i)).toBeInTheDocument()
      })
    })

    it('shows error for invalid email format', async () => {
      render(<ContactForm />)
      fireEvent.change(screen.getByLabelText('Your email address'), { target: { value: 'not-an-email' } })
      fireEvent.submit(screen.getByRole('button', { name: /send message/i }).closest('form')!)
      await waitFor(() => {
        expect(screen.getByText(/valid email/i)).toBeInTheDocument()
      })
    })

    it('accepts valid email', async () => {
      render(<ContactForm />)
      fireEvent.change(screen.getByLabelText('Your email address'), { target: { value: 'jane@example.com' } })
      fireEvent.submit(screen.getByRole('button', { name: /send message/i }).closest('form')!)
      await waitFor(() => {
        expect(screen.queryByText(/valid email/i)).not.toBeInTheDocument()
      })
    })
  })

  describe('validation — message', () => {
    it('shows error when message is too short', async () => {
      render(<ContactForm />)
      fireEvent.change(screen.getByLabelText('Project details'), { target: { value: 'Short' } })
      fireEvent.submit(screen.getByRole('button', { name: /send message/i }).closest('form')!)
      await waitFor(() => {
        expect(screen.getByText(/at least 10 characters/i)).toBeInTheDocument()
      })
    })

    it('accepts message of 10+ characters', async () => {
      render(<ContactForm />)
      fireEvent.change(screen.getByLabelText('Project details'), { target: { value: 'Long enough message here' } })
      fireEvent.submit(screen.getByRole('button', { name: /send message/i }).closest('form')!)
      await waitFor(() => {
        expect(screen.queryByText(/at least 10 characters/i)).not.toBeInTheDocument()
      })
    })
  })

  describe('validation — consent', () => {
    it('shows error when consent not checked', async () => {
      render(<ContactForm />)
      fillForm()
      fireEvent.submit(screen.getByRole('button', { name: /send message/i }).closest('form')!)
      await waitFor(() => {
        expect(screen.getByText(/must agree/i)).toBeInTheDocument()
      })
    })

    it('clears consent error when checkbox is checked', async () => {
      render(<ContactForm />)
      fillForm()
      fireEvent.submit(screen.getByRole('button', { name: /send message/i }).closest('form')!)
      await waitFor(() => expect(screen.getByText(/must agree/i)).toBeInTheDocument())
      fireEvent.click(screen.getByRole('checkbox'))
      await waitFor(() => {
        expect(screen.queryByText(/must agree/i)).not.toBeInTheDocument()
      })
    })
  })

  describe('aria attributes', () => {
    it('marks name as aria-invalid on error', async () => {
      render(<ContactForm />)
      fireEvent.submit(screen.getByRole('button', { name: /send message/i }).closest('form')!)
      await waitFor(() => {
        expect(screen.getByLabelText('Your name')).toHaveAttribute('aria-invalid', 'true')
      })
    })

    it('name field is not aria-invalid when valid', () => {
      render(<ContactForm />)
      const input = screen.getByLabelText('Your name')
      expect(input).toHaveAttribute('aria-invalid', 'false')
    })

    it('name error has role="alert"', async () => {
      render(<ContactForm />)
      fireEvent.change(screen.getByLabelText('Your name'), { target: { value: 'A' } })
      fireEvent.submit(screen.getByRole('button', { name: /send message/i }).closest('form')!)
      await waitFor(() => {
        const alert = document.getElementById('name-error')
        expect(alert).toHaveAttribute('role', 'alert')
      })
    })
  })

  describe('submission states', () => {
    it('calls onSubmit with correct data', async () => {
      const onSubmit = vi.fn().mockResolvedValue(undefined)
      render(<ContactForm onSubmit={onSubmit} />)
      fillForm()
      fireEvent.click(screen.getByRole('checkbox'))
      fireEvent.submit(screen.getByRole('button', { name: /send message/i }).closest('form')!)
      await waitFor(() => {
        expect(onSubmit).toHaveBeenCalledWith(expect.objectContaining({
          name: 'Jane Doe',
          email: 'jane@example.com',
          message: 'This is a test message that is long enough.',
          consent: true,
        }))
      })
    })

    it('shows Sent! after successful submission', async () => {
      const onSubmit = vi.fn().mockResolvedValue(undefined)
      render(<ContactForm onSubmit={onSubmit} />)
      fillForm()
      fireEvent.click(screen.getByRole('checkbox'))
      fireEvent.submit(screen.getByRole('button', { name: /send message/i }).closest('form')!)
      await waitFor(() => expect(screen.getByText(/sent!/i)).toBeInTheDocument())
    })

    it('disables submit button after success', async () => {
      const onSubmit = vi.fn().mockResolvedValue(undefined)
      render(<ContactForm onSubmit={onSubmit} />)
      fillForm()
      fireEvent.click(screen.getByRole('checkbox'))
      fireEvent.submit(screen.getByRole('button', { name: /send message/i }).closest('form')!)
      await waitFor(() => expect(screen.getByRole('button', { name: /sent!/i })).toBeDisabled())
    })

    it('shows error message when onSubmit throws', async () => {
      const onSubmit = vi.fn().mockRejectedValue(new Error('Network error'))
      render(<ContactForm onSubmit={onSubmit} />)
      fillForm()
      fireEvent.click(screen.getByRole('checkbox'))
      fireEvent.submit(screen.getByRole('button', { name: /send message/i }).closest('form')!)
      await waitFor(() => {
        expect(screen.getByText(/something went wrong/i)).toBeInTheDocument()
      })
    })

    it('shows Send Message again after error', async () => {
      const onSubmit = vi.fn().mockRejectedValue(new Error('fail'))
      render(<ContactForm onSubmit={onSubmit} />)
      fillForm()
      fireEvent.click(screen.getByRole('checkbox'))
      fireEvent.submit(screen.getByRole('button', { name: /send message/i }).closest('form')!)
      await waitFor(() => expect(screen.getByText(/something went wrong/i)).toBeInTheDocument())
      expect(screen.getByText(/send message/i)).toBeInTheDocument()
    })
  })
})
