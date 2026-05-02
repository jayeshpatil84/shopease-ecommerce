package com.ecommerce.controller;

import com.ecommerce.dto.*;
import com.ecommerce.service.OrderService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/orders")
@RequiredArgsConstructor
public class OrderController {
    private final OrderService orderService;

    @PostMapping("/checkout")
    public ResponseEntity<ApiResponse<OrderResponse>> checkout(
            @AuthenticationPrincipal UserDetails user,
            @Valid @RequestBody CheckoutRequest request) {
        return ResponseEntity.ok(ApiResponse.success("Order placed successfully", orderService.checkout(user.getUsername(), request)));
    }

    @GetMapping("/my-orders")
    public ResponseEntity<ApiResponse<List<OrderResponse>>> myOrders(@AuthenticationPrincipal UserDetails user) {
        return ResponseEntity.ok(ApiResponse.success(orderService.getUserOrders(user.getUsername())));
    }
}
