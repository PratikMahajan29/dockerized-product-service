import { Edit2, Trash2, Plus } from 'lucide-react'
import { Link } from 'react-router-dom'
import React from 'react'
import { ProductResponse } from '../api/products'

interface ProductTableProps {
  products: ProductResponse[]
  isLoading: boolean
  onDelete: (id: number) => void
}

export const ProductTable: React.FC<ProductTableProps> = ({
products,
isLoading,
onDelete,
}) => {
  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading products...</p>
        </div>
      </div>
    )
  }

  if (products.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-600 mb-4">No products found</p>
        <Link
          to="/create"
          className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
        >
          <Plus className="w-4 h-4" />
          Create First Product
        </Link>
      </div>
    )
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-gray-100 border-b">
            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Name</th>
            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Description</th>
            <th className="px-6 py-3 text-right text-sm font-semibold text-gray-700">Price</th>
            <th className="px-6 py-3 text-center text-sm font-semibold text-gray-700">Quantity</th>
            <th className="px-6 py-3 text-center text-sm font-semibold text-gray-700">Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id} className="border-b hover:bg-gray-50 transition-colors">
              <td className="px-6 py-4">
                <Link
                  to={`/products/${product.id}`}
                  className="text-blue-600 hover:text-blue-800 font-medium"
                >
                  {product.name}
                </Link>
              </td>
              <td className="px-6 py-4 text-gray-600 truncate max-w-xs">
                {product.description || '-'}
              </td>
              <td className="px-6 py-4 text-right font-semibold">
                ${product.price.toFixed(2)}
              </td>
              <td className="px-6 py-4 text-center">
                <span className="inline-block px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">
                  {product.quantity}
                </span>
              </td>
              <td className="px-6 py-4 text-center">
                <div className="flex gap-2 justify-center">
                  <Link
                    to={`/edit/${product.id}`}
                    className="p-2 text-blue-600 hover:bg-blue-100 rounded-lg transition-colors"
                    title="Edit product"
                  >
                    <Edit2 className="w-4 h-4" />
                  </Link>
                  <button
                    onClick={() => onDelete(product.id)}
                    className="p-2 text-red-600 hover:bg-red-100 rounded-lg transition-colors"
                    title="Delete product"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

