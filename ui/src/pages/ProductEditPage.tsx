import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { productService, ProductResponse, ProductRequest } from '@/api/products'
import { ProductForm } from '@/components/ProductForm'
import { ArrowLeft } from 'lucide-react'

interface ProductEditPageProps {
  onToast: (message: string, type: 'success' | 'error') => void
}

export const ProductEditPage: React.FC<ProductEditPageProps> = ({ onToast }) => {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const [product, setProduct] = useState<ProductResponse | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})

  useEffect(() => {
    loadProduct()
  }, [id])

  const loadProduct = async () => {
    try {
      setIsLoading(true)
      const data = await productService.getProduct(Number(id))
      setProduct(data)
    } catch (error: any) {
      onToast(error.message || 'Failed to load product', 'error')
      navigate('/')
    } finally {
      setIsLoading(false)
    }
  }

  const handleSubmit = async (data: ProductRequest) => {
    try {
      setIsSubmitting(true)
      setErrors({})
      await productService.updateProduct(Number(id), data)
      onToast('Product updated successfully', 'success')
      navigate('/')
    } catch (error: any) {
      if (error.status === 400) {
        setErrors({
          general: error.message || 'Validation failed',
        })
      } else {
        onToast(error.message || 'Failed to update product', 'error')
      }
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading product...</p>
        </div>
      </div>
    )
  }

  if (!product) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-600 mb-4">Product not found</p>
        <button
          onClick={() => navigate('/')}
          className="text-blue-600 hover:text-blue-800"
        >
          Back to Products
        </button>
      </div>
    )
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
        <h1 className="text-2xl font-bold text-gray-900 mb-6">Edit Product</h1>

        {errors.general && (
          <div className="mb-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg">
            {errors.general}
          </div>
        )}

        <ProductForm
          initialData={product}
          isLoading={isSubmitting}
          onSubmit={handleSubmit}
          onCancel={() => navigate('/')}
          errors={errors}
        />
      </div>
    </div>
  )
}

