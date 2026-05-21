package com.example.productservice.mapper;

import com.example.productservice.dto.ProductRequest;
import com.example.productservice.dto.ProductResponse;
import com.example.productservice.entity.Product;

/**
 * Mapper utility class for converting between Product entity and DTOs.
 * Provides static methods for entity and DTO transformations.
 */
public class ProductMapper {

    private ProductMapper() {
        // Private constructor to prevent instantiation of utility class
    }

    /**
     * Converts a ProductRequest DTO to a Product entity.
     *
     * @param request the product request DTO
     * @return a new Product entity
     */
    public static Product toEntity(ProductRequest request) {
        if (request == null) {
            return null;
        }

        return Product.builder()
                .name(request.getName())
                .description(request.getDescription())
                .price(request.getPrice())
                .quantity(request.getQuantity())
                .build();
    }

    /**
     * Converts a Product entity to a ProductResponse DTO.
     *
     * @param product the product entity
     * @return a new ProductResponse DTO
     */
    public static ProductResponse toResponse(Product product) {
        if (product == null) {
            return null;
        }

        return ProductResponse.builder()
                .id(product.getId())
                .name(product.getName())
                .description(product.getDescription())
                .price(product.getPrice())
                .quantity(product.getQuantity())
                .createdAt(product.getCreatedAt())
                .updatedAt(product.getUpdatedAt())
                .build();
    }

    /**
     * Updates a Product entity with values from a ProductRequest DTO.
     *
     * @param product the product entity to update
     * @param request the product request DTO
     * @return the updated product entity
     */
    public static Product updateEntity(Product product, ProductRequest request) {
        if (request == null) {
            return product;
        }

        product.setName(request.getName());
        product.setDescription(request.getDescription());
        product.setPrice(request.getPrice());
        product.setQuantity(request.getQuantity());

        return product;
    }

}

