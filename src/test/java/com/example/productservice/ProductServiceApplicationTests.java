package com.example.productservice;

import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;

/**
 * Integration tests for the Product Service application.
 */
@SpringBootTest
@ActiveProfiles("test") // Use the 'test' profile for testing
class ProductServiceApplicationTests {

    /**
     * Test that the application context loads successfully.
     */
    @Test
    void contextLoads() {
        // This test verifies that the Spring Boot application context loads successfully
    }

}

