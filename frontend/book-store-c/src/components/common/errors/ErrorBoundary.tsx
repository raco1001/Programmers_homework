import React from 'react'
import Error from './Error'

interface ErrorBoundaryProps {
  children: React.ReactNode
}

interface ErrorBoundaryState {
  hasError: boolean
  error: Error | null
  errorInfo: React.ErrorInfo | null
}

export class ErrorBoundary extends React.Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  constructor(props: ErrorBoundaryProps) {
    super(props)
    this.state = { hasError: false, error: null, errorInfo: null }
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    this.setState({
      error,
      errorInfo,
    })

    // Only send error to backend if monitoring is enabled
    if (process.env.REACT_APP_ENABLE_ERROR === 'true') {
      const monitoringEndpoint =
        process.env.REACT_APP_MONITORING_ERROR_ENDPOINT || '/client-errors'

      fetch(monitoringEndpoint, {
        method: 'POST',
        body: JSON.stringify({
          error: error.message,
          stack: error.stack,
          componentStack: errorInfo.componentStack,
          timestamp: new Date().toISOString(),
          url: window.location.href,
          userAgent: navigator.userAgent,
        }),
        headers: { 'Content-Type': 'application/json' },
      }).catch((err) => {
        console.error('Failed to send error to backend:', err)
      })
    }
  }

  render() {
    if (this.state.hasError) {
      return <Error />
    }
    return this.props.children
  }
}
