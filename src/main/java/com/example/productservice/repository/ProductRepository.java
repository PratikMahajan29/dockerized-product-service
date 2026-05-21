package com.example.productservice.repository;

import com.example.productservice.entity.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

/**
 * Repository interface for Product entity.
 * Extends JpaRepository to provide CRUD and pagination operations.
 */
@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {

}

