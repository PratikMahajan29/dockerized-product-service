import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { productService, ProductRequest } from '@/api/products'
import { ProductForm } from '@/components/ProductForm'
import { ArrowLeft } from 'lucide-react'

interface ProductFormPageProps {
  onToast: (message: string, type: 'success' | 'error') => void
}

export const ProductFormPage: React.FC<ProductFormPageProps> = ({ onToast }) => {
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})

  const handleSubmit = async (data: ProductRequest) => {
    try {
      setIsLoading(true)
      setErrors({})
      await productService.createProduct(data)
      onToast('Product created successfully', 'success')
      navigate('/')
    } catch (error: any) {
      if (error.status === 400) {
        // Handle validation errors from backend
        setErrors({
          general: error.message || 'Validation failed',
        })
      } else {
        onToast(error.message || 'Failed to create product', 'error')
      }
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div>
      <button
        onClick={() => navigate('/')}
        className="flex items-center gap-2 text-blue-600 hover:text-blue-800 mb-6 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Products
      </button>

      <div className="bg-white rounded-lg shadow-md p-6 max-w-2xl">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">Create New Product</h1>

        {errors.general && (
          <div className="mb-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg">
            {errors.general}
          </div>
        )}

        <ProductForm
          isLoading={isLoading}
          onSubmit={handleSubmit}
          onCancel={() => navigate('/')}
          errors={errors}
        />
      </div>
    </div>
  )
}

