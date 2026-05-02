package com.ecommerce.controller;

import com.ecommerce.dto.*;
import com.ecommerce.service.CartService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/cart")
@RequiredArgsConstructor
public class CartController {
    private final CartService cartService;

    @GetMapping
    public ResponseEntity<ApiResponse<List<CartItemResponse>>> getCart(@AuthenticationPrincipal UserDetails user) {
        return ResponseEntity.ok(ApiResponse.success(cartService.getCart(user.getUsername())));
    }

    @PostMapping("/add")
    public ResponseEntity<ApiResponse<List<CartItemResponse>>> addToCart(
            @AuthenticationPrincipal UserDetails user,
            @RequestParam Long productId,
            @RequestParam(defaultValue = "1") Integer quantity) {
        return ResponseEntity.ok(ApiResponse.success("Added to cart", cartService.addToCart(user.getUsername(), productId, quantity)));
    }

    @PutMapping("/{cartItemId}")
    public ResponseEntity<ApiResponse<List<CartItemResponse>>> updateQuantity(
            @AuthenticationPrincipal UserDetails user,
            @PathVariable Long cartItemId,
            @RequestParam Integer quantity) {
        return ResponseEntity.ok(ApiResponse.success(cartService.updateQuantity(user.getUsername(), cartItemId, quantity)));
    }

    @DeleteMapping("/{cartItemId}")
    public ResponseEntity<ApiResponse<List<CartItemResponse>>> removeItem(
            @AuthenticationPrincipal UserDetails user,
            @PathVariable Long cartItemId) {
        return ResponseEntity.ok(ApiResponse.success(cartService.removeFromCart(user.getUsername(), cartItemId)));
    }
}
