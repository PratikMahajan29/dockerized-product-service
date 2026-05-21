import axios, { AxiosInstance } from 'axios'

export interface ProductRequest {
  name: string
  description?: string
  price: number
  quantity: number
}

export interface ProductResponse extends ProductRequest {
  id: number
  createdAt: string
  updatedAt: string
}

export interface ErrorResponse {
  status: number
  error: string
  message: string
  timestamp: string
}

class ProductService {
  private api: AxiosInstance

  constructor() {
    const baseURL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080'

    this.api = axios.create({
      baseURL: `${baseURL}/api`,
      headers: {
        'Content-Type': 'application/json',
      },
    })

    // Error interceptor
    this.api.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response?.data) {
          return Promise.reject(error.response.data as ErrorResponse)
        }
        return Promise.reject({
          status: error.response?.status || 500,
          error: error.message,
          message: 'An error occurred',
          timestamp: new Date().toISOString(),
        })
      }
    )
  }

  async listProducts(): Promise<ProductResponse[]> {
    const response = await this.api.get<ProductResponse[]>('/products')
    return response.data
  }

  async getProduct(id: number): Promise<ProductResponse> {
    const response = await this.api.get<ProductResponse>(`/products/${id}`)
    return response.data
  }

  async createProduct(product: ProductRequest): Promise<ProductResponse> {
    const response = await this.api.post<ProductResponse>('/products', product)
    return response.data
  }

  async updateProduct(id: number, product: ProductRequest): Promise<ProductResponse> {
    const response = await this.api.put<ProductResponse>(`/products/${id}`, product)
    return response.data
  }

  async deleteProduct(id: number): Promise<void> {
    await this.api.delete(`/products/${id}`)
  }

  async healthCheck(): Promise<string> {
    const response = await this.api.get<string>('/health')
    return response.data
  }
}

export const productService = new ProductService()

