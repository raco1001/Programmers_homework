import { render, screen } from '@testing-library/react'
import App from './App'

test('renders Book Store link', () => {
  render(<App />)
  const linkElement = screen.getByText(/Book Store/i)
  expect(linkElement).toBeInTheDocument()
})
