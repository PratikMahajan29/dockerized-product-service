package com.example.productservice.service;

import com.example.productservice.dto.ProductRequest;
import com.example.productservice.dto.ProductResponse;

import java.util.List;

/**
 * Service interface for product management operations.
 * Defines the contract for business logic related to products.
 */
public interface ProductService {

    /**
     * Creates a new product.
     *
     * @param request the product request DTO containing product details
     * @return the created product response
     */
    ProductResponse createProduct(ProductRequest request);

    /**
     * Retrieves all products.
     *
     * @return a list of all product responses
     */
    List<ProductResponse> getAllProducts();

    /**
     * Retrieves a product by its ID.
     *
     * @param id the product ID
     * @return the product response
     * @throws com.example.productservice.exception.ProductNotFoundException if product is not found
     */
    ProductResponse getProductById(Long id);

    /**
     * Updates an existing product.
     *
     * @param id the product ID
     * @param request the product request DTO containing updated details
     * @return the updated product response
     * @throws com.example.productservice.exception.ProductNotFoundException if product is not found
     */
    ProductResponse updateProduct(Long id, ProductRequest request);

    /**
     * Deletes a product by its ID.
     *
     * @param id the product ID
     * @throws com.example.productservice.exception.ProductNotFoundException if product is not found
     */
    void deleteProduct(Long id);

}

