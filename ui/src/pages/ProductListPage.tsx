import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { productService, ProductResponse } from '@/api/products'
import { ProductTable } from '@/components/ProductTable'
import { ConfirmDeleteModal } from '@/components/ConfirmDeleteModal'
import { Plus, RefreshCw } from 'lucide-react'

interface ProductListPageProps {
  onToast: (message: string, type: 'success' | 'error') => void
}

export const ProductListPage: React.FC<ProductListPageProps> = ({ onToast }) => {
  const [products, setProducts] = useState<ProductResponse[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [deleteModal, setDeleteModal] = useState({
    isOpen: false,
    productId: 0,
    productName: '',
    isDeleting: false,
  })

  useEffect(() => {
    loadProducts()
  }, [])

  const loadProducts = async () => {
    try {
      setIsLoading(true)
      const data = await productService.listProducts()
      setProducts(data)
    } catch (error: any) {
      onToast(error.message || 'Failed to load products', 'error')
    } finally {
      setIsLoading(false)
    }
  }

  const handleDeleteClick = (id: number, name: string) => {
    setDeleteModal({
      isOpen: true,
      productId: id,
      productName: name,
      isDeleting: false,
    })
  }

  const handleConfirmDelete = async () => {
    try {
      setDeleteModal((prev) => ({ ...prev, isDeleting: true }))
      await productService.deleteProduct(deleteModal.productId)
      setProducts((prev) => prev.filter((p) => p.id !== deleteModal.productId))
      onToast('Product deleted successfully', 'success')
      setDeleteModal({ isOpen: false, productId: 0, productName: '', isDeleting: false })
    } catch (error: any) {
      onToast(error.message || 'Failed to delete product', 'error')
      setDeleteModal((prev) => ({ ...prev, isDeleting: false }))
    }
  }

  return (
    <div>
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Products</h1>
        <div className="flex gap-3">
          <button
            onClick={loadProducts}
            disabled={isLoading}
            className="p-2 text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300 transition-colors disabled:opacity-50"
            title="Refresh products"
          >
            <RefreshCw className={`w-5 h-5 ${isLoading ? 'animate-spin' : ''}`} />
          </button>
          <Link
            to="/create"
            className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
          >
            <Plus className="w-4 h-4" />
            Add Product
          </Link>
        </div>
      </div>

      {/* Product Table */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <ProductTable
        products={products}
        isLoading={isLoading}
        onDelete={(id) => {
        const product = products.find((p) => p.id === id)
            if (product) {
            handleDeleteClick(id, product.name)
        }
        }}
        />
      </div>

      {/* Delete Confirmation Modal */}
      <ConfirmDeleteModal
        isOpen={deleteModal.isOpen}
        title="Delete Product"
        message={`Are you sure you want to delete "${deleteModal.productName}"? This action cannot be undone.`}
        isLoading={deleteModal.isDeleting}
        onConfirm={handleConfirmDelete}
        onCancel={() =>
          setDeleteModal({ isOpen: false, productId: 0, productName: '', isDeleting: false })
        }
      />
    </div>
  )
}

