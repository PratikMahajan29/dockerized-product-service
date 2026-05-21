import React, { useEffect, useState } from 'react'
import { productService } from '@/api/products'
import { Activity } from 'lucide-react'

export const HealthStatus: React.FC = () => {
  const [status, setStatus] = useState<'checking' | 'running' | 'error'>('checking')
  const [message, setMessage] = useState('')

  useEffect(() => {
    const checkHealth = async () => {
      try {
        const result = await productService.healthCheck()
        setStatus('running')
        setMessage(result)
      } catch {
        setStatus('error')
        setMessage('Service unavailable')
      }
    }

    checkHealth()
    const interval = setInterval(checkHealth, 30000) // Check every 30 seconds

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="flex items-center gap-2 px-3 py-1 bg-white rounded-lg border border-gray-200">
      <Activity
        className={`w-4 h-4 ${
          status === 'running'
            ? 'text-green-500'
            : status === 'checking'
            ? 'text-yellow-500 animate-spin'
            : 'text-red-500'
        }`}
      />
      <span className="text-sm text-gray-700 hidden sm:inline">{message}</span>
    </div>
  )
}

