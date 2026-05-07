package com.valglobal.controller;

import com.valglobal.dto.ApiResponse;
import com.valglobal.model.Product;
import com.valglobal.service.ProductService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/products")
@RequiredArgsConstructor
public class ProductController {

    private final ProductService productService;

    /**
     * GET /api/products
     * Returns all active products — used by the React Products section.
     */
    @GetMapping
    public ResponseEntity<ApiResponse<List<Product>>> getAllProducts() {
        List<Product> products = productService.getAllActiveProducts();
        return ResponseEntity.ok(ApiResponse.success("Products fetched", products));
    }

    /**
     * GET /api/products/category/{key}
     * Filter by category: agri | healthy | masala | lifestyle
     */
    @GetMapping("/category/{key}")
    public ResponseEntity<ApiResponse<List<Product>>> getByCategory(@PathVariable String key) {
        List<Product> products = productService.getByCategory(key);
        return ResponseEntity.ok(ApiResponse.success("Products filtered by: " + key, products));
    }

    /**
     * GET /api/products/{id}
     */
    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<Product>> getById(@PathVariable Long id) {
        return productService.getById(id)
                .map(p -> ResponseEntity.ok(ApiResponse.success("Product found", p)))
                .orElse(ResponseEntity.status(HttpStatus.NOT_FOUND)
                        .body(ApiResponse.error("Product not found")));
    }

    /**
     * POST /api/products
     * Add a new product — admin use.
     */
    @PostMapping
    public ResponseEntity<ApiResponse<Product>> addProduct(@RequestBody Product product) {
        Product saved = productService.saveProduct(product);
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(ApiResponse.success("Product added", saved));
    }

    /**
     * PUT /api/products/{id}
     * Update product — admin use.
     */
    @PutMapping("/{id}")
    public ResponseEntity<ApiResponse<Product>> updateProduct(
            @PathVariable Long id, @RequestBody Product updated) {

        return productService.getById(id).map(existing -> {
            updated.setId(id);
            Product saved = productService.saveProduct(updated);
            return ResponseEntity.ok(ApiResponse.success("Product updated", saved));
        }).orElse(ResponseEntity.status(HttpStatus.NOT_FOUND)
                .body(ApiResponse.error("Product not found")));
    }

    /**
     * DELETE /api/products/{id}
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<Void>> deleteProduct(@PathVariable Long id) {
        if (productService.deleteProduct(id)) {
            return ResponseEntity.ok(ApiResponse.success("Product deleted", null));
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND)
                .body(ApiResponse.error("Product not found"));
    }
}
