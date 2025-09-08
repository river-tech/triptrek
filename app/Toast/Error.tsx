'use client'

import { useState, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes, faExclamationTriangle } from '@fortawesome/free-solid-svg-icons'

interface ErrorToastProps {
  title: string
  description: string
  isVisible: boolean
  onClose: () => void
  duration?: number // Auto close duration in milliseconds
}

export default function ErrorToast({ 
  title, 
  description, 
  isVisible, 
  onClose, 
  duration = 2000 
}: ErrorToastProps) {
  const [isAnimating, setIsAnimating] = useState(false)
  const [progress, setProgress] = useState(100)

  useEffect(() => {
    if (isVisible) {
      setIsAnimating(true);
      setProgress(100);

      const interval = setInterval(() => {
        setProgress(prev => {
          if (prev <= 1) {
            clearInterval(interval);
            handleClose();
            return 0;
          }
          return prev - 1;
        });
      }, duration / 100);

      return () => clearInterval(interval);
    }
  }, [isVisible, duration]);

 
 

  const handleClose = () => {
    setIsAnimating(false)
    setTimeout(() => {
      onClose()
    }, duration) // Wait for animation to complete
  }

  if (!isVisible && !isAnimating) return null

  return (
    <div className={`
      fixed top-4 right-4 z-50 max-w-sm w-full
      transform transition-all duration-300 ease-in-out
      ${isAnimating ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'}
    `}>
      <div className="bg-red-50 border border-red-200 rounded-lg shadow-lg p-4">
        {/* Header with icon and close button */}
        <div className="flex items-start justify-between mb-2">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <FontAwesomeIcon 
                icon={faExclamationTriangle} 
                className="h-5 w-5 text-red-400"
              />
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-red-800">
                {title}
              </h3>
            </div>
          </div>
          
          {/* Close button */}
          <button
            onClick={handleClose}
            className="flex-shrink-0 ml-4 p-1 rounded-md text-red-400 hover:text-red-600 hover:bg-red-100 transition-colors duration-200"
          >
            <FontAwesomeIcon icon={faTimes} className="h-4 w-4" />
          </button>
        </div>

        {/* Description */}
        <div className="ml-8">
          <p className="text-sm text-red-700">
            {description}
          </p>
        </div>

        {/* Progress bar for auto close */}
        {/* Progress bar with decreasing width over time */}
        <div className="mt-3 ml-8">
          <div className="w-full bg-red-200 rounded-full h-1">
            <div 
              className="bg-red-500 h-1 rounded-full transition-all ease-linear"
              style={{
                width: `${progress}%`,
                
              }}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
