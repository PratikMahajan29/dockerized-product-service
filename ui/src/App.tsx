import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Package } from 'lucide-react'
import { useToast, ToastContainer } from '@/components/Toast'
import { HealthStatus } from '@/components/HealthStatus'
import { ProductListPage } from '@/pages/ProductListPage'
import { ProductFormPage } from '@/pages/ProductFormPage'
import { ProductEditPage } from '@/pages/ProductEditPage'
import { ProductDetailPage } from '@/pages/ProductDetailPage'

function App() {
  const { toasts, addToast, removeToast } = useToast()

  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <header className="bg-white shadow-md sticky top-0 z-40">
          <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
            <div className="flex items-center gap-2">
              <Package className="w-6 h-6 text-blue-600" />
              <h1 className="text-2xl font-bold text-gray-900">Product Service</h1>
            </div>
            <HealthStatus />
          </div>
        </header>

        {/* Main Content */}
        <main className="max-w-6xl mx-auto px-4 py-8">
          <Routes>
            <Route
              path="/"
              element={<ProductListPage onToast={addToast} />}
            />
            <Route
              path="/create"
              element={<ProductFormPage onToast={addToast} />}
            />
            <Route
              path="/edit/:id"
              element={<ProductEditPage onToast={addToast} />}
            />
            <Route
              path="/products/:id"
              element={<ProductDetailPage onToast={addToast} />}
            />
            <Route
              path="*"
              element={
                <div className="text-center py-12">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">Page Not Found</h2>
                  <a href="/" className="text-blue-600 hover:text-blue-800">
                    Go back to products
                  </a>
                </div>
              }
            />
          </Routes>
        </main>

        {/* Toast Container */}
        <ToastContainer toasts={toasts} removeToast={removeToast} />
      </div>
    </BrowserRouter>
  )
}

export default App

