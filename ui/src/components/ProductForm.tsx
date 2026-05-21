import React, { useState } from 'react'
import { ProductRequest, ProductResponse } from '@/api/products'
import { AlertCircle } from 'lucide-react'

interface ProductFormProps {
  initialData?: ProductResponse
  isLoading: boolean
  onSubmit: (data: ProductRequest) => void
  onCancel: () => void
  errors?: Record<string, string>
}

export const ProductForm: React.FC<ProductFormProps> = ({
  initialData,
  isLoading,
  onSubmit,
  onCancel,
  errors = {},
}) => {
  const [formData, setFormData] = useState<ProductRequest>({
    name: initialData?.name || '',
    description: initialData?.description || '',
    price: initialData?.price || 0,
    quantity: initialData?.quantity || 0,
  })

  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({})

  const validateForm = (): boolean => {
    const errors: Record<string, string> = {}

    if (!formData.name.trim()) {
      errors.name = 'Product name is required'
    } else if (formData.name.length < 2 || formData.name.length > 100) {
      errors.name = 'Product name must be between 2 and 100 characters'
    }

    if (formData.description && formData.description.length > 500) {
      errors.description = 'Product description must not exceed 500 characters'
    }

    if (formData.price === null || formData.price === undefined) {
      errors.price = 'Product price is required'
    } else if (formData.price <= 0) {
      errors.price = 'Product price must be greater than 0'
    }

    if (formData.quantity === null || formData.quantity === undefined) {
      errors.quantity = 'Product quantity is required'
    } else if (formData.quantity < 0) {
      errors.quantity = 'Product quantity must be greater than or equal to 0'
    }

    setValidationErrors(errors)
    return Object.keys(errors).length === 0
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target

    if (name === 'price' || name === 'quantity') {
      setFormData((prev) => ({
        ...prev,
        [name]: value ? parseFloat(value) : 0,
      }))
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }))
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (validateForm()) {
      onSubmit(formData)
    }
  }

  const allErrors = { ...validationErrors, ...errors }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Name */}
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
          Product Name *
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          disabled={isLoading}
          className={`w-full px-4 py-2 rounded-lg border transition-colors ${
            allErrors.name
              ? 'border-red-500 focus:ring-red-500'
              : 'border-gray-300 focus:ring-blue-500'
          } focus:outline-none focus:ring-2 disabled:bg-gray-100 disabled:cursor-not-allowed`}
          placeholder="Enter product name"
        />
        {allErrors.name && (
          <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
            <AlertCircle className="w-4 h-4" />
            {allErrors.name}
          </p>
        )}
      </div>

      {/* Description */}
      <div>
        <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
          Description
        </label>
        <textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          disabled={isLoading}
          rows={4}
          className={`w-full px-4 py-2 rounded-lg border transition-colors ${
            allErrors.description
              ? 'border-red-500 focus:ring-red-500'
              : 'border-gray-300 focus:ring-blue-500'
          } focus:outline-none focus:ring-2 disabled:bg-gray-100 disabled:cursor-not-allowed resize-none`}
          placeholder="Enter product description (max 500 characters)"
        />
        <div className="mt-1 text-sm text-gray-500">
          {(formData.description ?? '').length} / 500 characters
        </div>
        {allErrors.description && (
          <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
            <AlertCircle className="w-4 h-4" />
            {allErrors.description}
          </p>
        )}
      </div>

      {/* Price */}
      <div>
        <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-2">
          Price ($) *
        </label>
        <input
          type="number"
          id="price"
          name="price"
          value={formData.price}
          onChange={handleChange}
          disabled={isLoading}
          step="0.01"
          min="0"
          className={`w-full px-4 py-2 rounded-lg border transition-colors ${
            allErrors.price
              ? 'border-red-500 focus:ring-red-500'
              : 'border-gray-300 focus:ring-blue-500'
          } focus:outline-none focus:ring-2 disabled:bg-gray-100 disabled:cursor-not-allowed`}
          placeholder="0.00"
        />
        {allErrors.price && (
          <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
            <AlertCircle className="w-4 h-4" />
            {allErrors.price}
          </p>
        )}
      </div>

      {/* Quantity */}
      <div>
        <label htmlFor="quantity" className="block text-sm font-medium text-gray-700 mb-2">
          Quantity *
        </label>
        <input
          type="number"
          id="quantity"
          name="quantity"
          value={formData.quantity}
          onChange={handleChange}
          disabled={isLoading}
          min="0"
          className={`w-full px-4 py-2 rounded-lg border transition-colors ${
            allErrors.quantity
              ? 'border-red-500 focus:ring-red-500'
              : 'border-gray-300 focus:ring-blue-500'
          } focus:outline-none focus:ring-2 disabled:bg-gray-100 disabled:cursor-not-allowed`}
          placeholder="0"
        />
        {allErrors.quantity && (
          <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
            <AlertCircle className="w-4 h-4" />
            {allErrors.quantity}
          </p>
        )}
      </div>

      {/* Buttons */}
      <div className="flex gap-4 pt-4">
        <button
          type="submit"
          disabled={isLoading}
          className="flex-1 px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-medium"
        >
          {isLoading ? (
            <span className="flex items-center justify-center gap-2">
              <span className="animate-spin">⌛</span>
              {initialData ? 'Updating...' : 'Creating...'}
            </span>
          ) : initialData ? (
            'Update Product'
          ) : (
            'Create Product'
          )}
        </button>
        <button
          type="button"
          onClick={onCancel}
          disabled={isLoading}
          className="flex-1 px-6 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-medium"
        >
          Cancel
        </button>
      </div>
    </form>
  )
}

