package com.example.productservice.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * Health check controller for the Product Service.
 * Provides a simple endpoint to verify the service is running.
 */
@RestController
@RequestMapping("/api/health")
public class HealthController {

    /**
     * Health check endpoint.
     * GET /api/health
     *
     * @return ResponseEntity with health status message
     */
    @GetMapping
    public ResponseEntity<String> health() {
        return ResponseEntity.ok("Product Service is running");
    }

}

