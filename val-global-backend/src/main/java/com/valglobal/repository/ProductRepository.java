package com.valglobal.repository;

import com.valglobal.model.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {

    // Get all active products
    List<Product> findByIsActiveTrueOrderByIdAsc();

    // Filter by category key (agri, healthy, masala, lifestyle)
    List<Product> findByCategoryKeyAndIsActiveTrue(String categoryKey);

    // Search by name
    List<Product> findByNameContainingIgnoreCaseAndIsActiveTrue(String name);
}
