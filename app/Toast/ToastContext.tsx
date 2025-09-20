'use client'

import { createContext, useContext, useState, ReactNode } from 'react'
import ErrorToast from './Error'
import SuccessToast from './Success'

interface ToastContextType {
  showError: (title?: string, description?: string, duration?: number) => void
  hideError: () => void
  showSuccess: (title?: string, description?: string, duration?: number) => void
  hideSuccess: () => void
}

const ToastContext = createContext<ToastContextType | undefined>(undefined)

interface ToastProviderProps {
  children: ReactNode
}

export function ToastProvider({ children }: ToastProviderProps) {
  const [errorToast, setErrorToast] = useState<{
    isVisible: boolean
    title: string
    description: string
    duration?: number
  }>({
    isVisible: false,
    title: '',
    description: '',
    duration: 5000
  })

  const showError = (title?: string, description?: string, duration = 2000) => {
    setErrorToast({
      isVisible: true,
      title: title || '',
      description: description || '',
      duration,
    })
  }

  const hideError = () => {
    setErrorToast(prev => ({
      ...prev,
      isVisible: false
    }))
  }

  const [successToast, setSuccessToast] = useState<{
    isVisible: boolean
    title: string
    description: string
    duration?: number
  }>({
    isVisible: false,
    title: '',
    description: '',
    duration: 5000
  })

  const showSuccess = (title?: string, description?: string, duration = 2000) => {
    setSuccessToast({
      isVisible: true,
      title: title || '',
      description: description || '',
      duration,
    })
  }

  const hideSuccess = () => {
    setSuccessToast(prev => ({
      ...prev,
      isVisible: false
    }))
  }

  return (
    <ToastContext.Provider value={{ showError, hideError, showSuccess, hideSuccess }}>
      {children}
      
      {/* Error Toast */}
      <ErrorToast
        title={errorToast.title}
        description={errorToast.description}
        isVisible={errorToast.isVisible}
        onClose={hideError}
        duration={errorToast.duration}
      />
      {/* Success Toast */}
      <SuccessToast
        title={successToast.title}
        description={successToast.description}
        isVisible={successToast.isVisible}
        onClose={hideSuccess}
        duration={successToast.duration}
      />
    </ToastContext.Provider>
  )
}

export function useToast() {
  const context = useContext(ToastContext)
  if (context === undefined) {
    throw new Error('useToast must be used within a ToastProvider')
  }
  return context
}
