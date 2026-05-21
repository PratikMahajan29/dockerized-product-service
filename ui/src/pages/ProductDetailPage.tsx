import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { productService, ProductResponse } from '@/api/products'
import { ArrowLeft, Edit2, Trash2 } from 'lucide-react'
import { ConfirmDeleteModal } from '@/components/ConfirmDeleteModal'

interface ProductDetailPageProps {
  onToast: (message: string, type: 'success' | 'error') => void
}

export const ProductDetailPage: React.FC<ProductDetailPageProps> = ({ onToast }) => {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const [product, setProduct] = useState<ProductResponse | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [deleteModal, setDeleteModal] = useState({
    isOpen: false,
    isDeleting: false,
  })

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

  const handleDelete = async () => {
    try {
      setDeleteModal({ isOpen: false, isDeleting: false })
      await productService.deleteProduct(Number(id))
      onToast('Product deleted successfully', 'success')
      navigate('/')
    } catch (error: any) {
      onToast(error.message || 'Failed to delete product', 'error')
      setDeleteModal({ isOpen: true, isDeleting: false })
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

  const createdDate = new Date(product.createdAt).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })

  const updatedDate = new Date(product.updatedAt).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })

  return (
    <div>
      <button
        onClick={() => navigate('/')}
        className="flex items-center gap-2 text-blue-600 hover:text-blue-800 mb-6 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Products
      </button>

      <div className="bg-white rounded-lg shadow-md p-8 max-w-2xl">
        {/* Header with Actions */}
        <div className="flex justify-between items-start mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">{product.name}</h1>
            <p className="text-gray-600">ID: {product.id}</p>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => navigate(`/edit/${product.id}`)}
              className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
            >
              <Edit2 className="w-4 h-4" />
              Edit
            </button>
            <button
              onClick={() => setDeleteModal({ isOpen: true, isDeleting: false })}
              className="flex items-center gap-2 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
            >
              <Trash2 className="w-4 h-4" />
              Delete
            </button>
          </div>
        </div>

        {/* Product Details */}
        <div className="grid grid-cols-2 gap-6 mb-8">
          <div>
            <label className="text-sm font-medium text-gray-700">Price</label>
            <p className="text-2xl font-bold text-gray-900 mt-1">
              ${product.price.toFixed(2)}
            </p>
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700">Quantity</label>
            <p className="text-2xl font-bold text-gray-900 mt-1">{product.quantity}</p>
          </div>
        </div>

        {/* Description */}
        {product.description && (
          <div className="mb-8">
            <label className="text-sm font-medium text-gray-700 block mb-2">
              Description
            </label>
            <p className="text-gray-700 whitespace-pre-wrap">{product.description}</p>
          </div>
        )}

        {/* Timestamps */}
        <div className="pt-6 border-t border-gray-200 space-y-2 text-sm text-gray-600">
          <p>Created: {createdDate}</p>
          <p>Last Updated: {updatedDate}</p>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      <ConfirmDeleteModal
        isOpen={deleteModal.isOpen}
        title="Delete Product"
        message={`Are you sure you want to delete "${product.name}"? This action cannot be undone.`}
        isLoading={deleteModal.isDeleting}
        onConfirm={async () => {
          setDeleteModal((prev) => ({ ...prev, isDeleting: true }))
          await handleDelete()
        }}
        onCancel={() => setDeleteModal({ isOpen: false, isDeleting: false })}
      />
    </div>
  )
}

