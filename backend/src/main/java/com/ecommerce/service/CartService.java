package com.ecommerce.service;

import com.ecommerce.dto.CartItemResponse;
import com.ecommerce.entity.*;
import com.ecommerce.exception.ResourceNotFoundException;
import com.ecommerce.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import java.math.BigDecimal;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class CartService {
    private final CartItemRepository cartItemRepository;
    private final ProductRepository productRepository;
    private final UserRepository userRepository;

    private User getUser(String email) {
        return userRepository.findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));
    }

    public List<CartItemResponse> getCart(String email) {
        return cartItemRepository.findByUser(getUser(email))
                .stream().map(this::toResponse).collect(Collectors.toList());
    }

    public List<CartItemResponse> addToCart(String email, Long productId, Integer quantity) {
        User user = getUser(email);
        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new ResourceNotFoundException("Product not found"));
        if (product.getStock() < quantity) throw new RuntimeException("Insufficient stock");

        Optional<CartItem> existing = cartItemRepository.findByUserAndProductId(user, productId);
        CartItem item;
        if (existing.isPresent()) {
            item = existing.get();
            item.setQuantity(item.getQuantity() + quantity);
        } else {
            item = new CartItem();
            item.setUser(user);
            item.setProduct(product);
            item.setQuantity(quantity);
        }
        cartItemRepository.save(item);
        return getCart(email);
    }

    public List<CartItemResponse> updateQuantity(String email, Long cartItemId, Integer quantity) {
        CartItem item = cartItemRepository.findById(cartItemId)
                .orElseThrow(() -> new ResourceNotFoundException("Cart item not found"));
        if (quantity <= 0) {
            cartItemRepository.delete(item);
        } else {
            item.setQuantity(quantity);
            cartItemRepository.save(item);
        }
        return getCart(email);
    }

    public List<CartItemResponse> removeFromCart(String email, Long cartItemId) {
        cartItemRepository.deleteById(cartItemId);
        return getCart(email);
    }

    public void clearCart(String email) {
        cartItemRepository.deleteByUser(getUser(email));
    }

    private CartItemResponse toResponse(CartItem item) {
        Product p = item.getProduct();
        CartItemResponse r = new CartItemResponse();
        r.setId(item.getId());
        r.setProductId(p.getId());
        r.setProductName(p.getName());
        r.setImageUrl(p.getImageUrl());
        r.setPrice(p.getPrice());
        r.setQuantity(item.getQuantity());
        r.setSubtotal(p.getPrice().multiply(BigDecimal.valueOf(item.getQuantity())));
        return r;
    }
}
