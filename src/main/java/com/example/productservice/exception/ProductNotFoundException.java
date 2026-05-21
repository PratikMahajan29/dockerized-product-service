package com.example.productservice.exception;

/**
 * Custom exception thrown when a product is not found in the database.
 */
public class ProductNotFoundException extends RuntimeException {

    /**
     * Constructs a new ProductNotFoundException with the specified detail message.
     *
     * @param message the detail message
     */
    public ProductNotFoundException(String message) {
        super(message);
    }

    /**
     * Constructs a new ProductNotFoundException with the specified detail message and cause.
     *
     * @param message the detail message
     * @param cause the cause of the exception
     */
    public ProductNotFoundException(String message, Throwable cause) {
        super(message, cause);
    }

}

