package com.example.productservice.controller;

import com.example.productservice.dto.ProductRequest;
import com.example.productservice.dto.ProductResponse;
import com.example.productservice.exception.ProductNotFoundException;
import com.example.productservice.service.ProductService;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

import static org.hamcrest.Matchers.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Controller tests for ProductController.
 * Tests REST API endpoints using MockMvc.
 */
@WebMvcTest(ProductController.class)
class ProductControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    // Use @MockBean so Spring will provide a mock ProductService in the WebMvcTest slice
    @MockBean
    private ProductService productService;

    @Test
    void testCreateProduct_Success() throws Exception {
        // Arrange
        ProductRequest request = ProductRequest.builder()
                .name("Test Product")
                .description("A test product")
                .price(new BigDecimal("29.99"))
                .quantity(10)
                .build();

        ProductResponse response = ProductResponse.builder()
                .id(1L)
                .name("Test Product")
                .description("A test product")
                .price(new BigDecimal("29.99"))
                .quantity(10)
                .createdAt(LocalDateTime.now())
                .updatedAt(LocalDateTime.now())
                .build();

        when(productService.createProduct(any(ProductRequest.class))).thenReturn(response);

        // Act & Assert
        mockMvc.perform(post("/api/products")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.id", is(1)))
                .andExpect(jsonPath("$.name", is("Test Product")))
                .andExpect(jsonPath("$.price", is(29.99)));

        verify(productService, times(1)).createProduct(any(ProductRequest.class));
    }

    @Test
    void testCreateProduct_ValidationFailure_MissingName() throws Exception {
        // Arrange
        ProductRequest request = ProductRequest.builder()
                .name("")  // Empty name should fail validation
                .description("A test product")
                .price(new BigDecimal("29.99"))
                .quantity(10)
                .build();

        // Act & Assert
        mockMvc.perform(post("/api/products")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.status", is(400)))
                .andExpect(jsonPath("$.error", is("Validation Failed")));

        verify(productService, never()).createProduct(any(ProductRequest.class));
    }

    @Test
    void testCreateProduct_ValidationFailure_InvalidPrice() throws Exception {
        // Arrange
        ProductRequest request = ProductRequest.builder()
                .name("Test Product")
                .description("A test product")
                .price(new BigDecimal("0"))  // Price must be greater than 0
                .quantity(10)
                .build();

        // Act & Assert
        mockMvc.perform(post("/api/products")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.status", is(400)));

        verify(productService, never()).createProduct(any(ProductRequest.class));
    }

    @Test
    void testGetAllProducts_Success() throws Exception {
        // Arrange
        ProductResponse product1 = ProductResponse.builder()
                .id(1L)
                .name("Product 1")
                .price(new BigDecimal("19.99"))
                .quantity(5)
                .build();

        ProductResponse product2 = ProductResponse.builder()
                .id(2L)
                .name("Product 2")
                .price(new BigDecimal("29.99"))
                .quantity(10)
                .build();

        when(productService.getAllProducts()).thenReturn(List.of(product1, product2));

        // Act & Assert
        mockMvc.perform(get("/api/products"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$", hasSize(2)))
                .andExpect(jsonPath("$[0].id", is(1)))
                .andExpect(jsonPath("$[1].id", is(2)));

        verify(productService, times(1)).getAllProducts();
    }

    @Test
    void testGetProductById_Success() throws Exception {
        // Arrange
        ProductResponse response = ProductResponse.builder()
                .id(1L)
                .name("Test Product")
                .description("A test product")
                .price(new BigDecimal("29.99"))
                .quantity(10)
                .createdAt(LocalDateTime.now())
                .updatedAt(LocalDateTime.now())
                .build();

        when(productService.getProductById(1L)).thenReturn(response);

        // Act & Assert
        mockMvc.perform(get("/api/products/1"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id", is(1)))
                .andExpect(jsonPath("$.name", is("Test Product")));

        verify(productService, times(1)).getProductById(1L);
    }

    @Test
    void testGetProductById_NotFound() throws Exception {
        // Arrange
        when(productService.getProductById(999L))
                .thenThrow(new ProductNotFoundException("Product not found with id: 999"));

        // Act & Assert
        mockMvc.perform(get("/api/products/999"))
                .andExpect(status().isNotFound())
                .andExpect(jsonPath("$.status", is(404)))
                .andExpect(jsonPath("$.error", is("Not Found")))
                .andExpect(jsonPath("$.message", containsString("Product not found")));

        verify(productService, times(1)).getProductById(999L);
    }

    @Test
    void testUpdateProduct_Success() throws Exception {
        // Arrange
        ProductRequest request = ProductRequest.builder()
                .name("Updated Product")
                .description("Updated description")
                .price(new BigDecimal("39.99"))
                .quantity(20)
                .build();

        ProductResponse response = ProductResponse.builder()
                .id(1L)
                .name("Updated Product")
                .description("Updated description")
                .price(new BigDecimal("39.99"))
                .quantity(20)
                .createdAt(LocalDateTime.now())
                .updatedAt(LocalDateTime.now())
                .build();

        when(productService.updateProduct(eq(1L), any(ProductRequest.class))).thenReturn(response);

        // Act & Assert
        mockMvc.perform(put("/api/products/1")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id", is(1)))
                .andExpect(jsonPath("$.name", is("Updated Product")))
                .andExpect(jsonPath("$.price", is(39.99)));

        verify(productService, times(1)).updateProduct(eq(1L), any(ProductRequest.class));
    }

    @Test
    void testUpdateProduct_NotFound() throws Exception {
        // Arrange
        ProductRequest request = ProductRequest.builder()
                .name("Updated Product")
                .price(new BigDecimal("39.99"))
                .quantity(20)
                .build();

        when(productService.updateProduct(eq(999L), any(ProductRequest.class)))
                .thenThrow(new ProductNotFoundException("Product not found with id: 999"));

        // Act & Assert
        mockMvc.perform(put("/api/products/999")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isNotFound())
                .andExpect(jsonPath("$.status", is(404)));

        verify(productService, times(1)).updateProduct(eq(999L), any(ProductRequest.class));
    }

    @Test
    void testDeleteProduct_Success() throws Exception {
        // Arrange
        doNothing().when(productService).deleteProduct(1L);

        // Act & Assert
        mockMvc.perform(delete("/api/products/1"))
                .andExpect(status().isNoContent());

        verify(productService, times(1)).deleteProduct(1L);
    }

    @Test
    void testDeleteProduct_NotFound() throws Exception {
        // Arrange
        doThrow(new ProductNotFoundException("Product not found with id: 999"))
                .when(productService).deleteProduct(999L);

        // Act & Assert
        mockMvc.perform(delete("/api/products/999"))
                .andExpect(status().isNotFound())
                .andExpect(jsonPath("$.status", is(404)));

        verify(productService, times(1)).deleteProduct(999L);
    }

}
