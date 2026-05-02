package com.ecommerce.service;

import com.ecommerce.dto.*;
import com.ecommerce.entity.*;
import com.ecommerce.exception.ResourceNotFoundException;
import com.ecommerce.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.*;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class OrderService {
    private final OrderRepository orderRepository;
    private final CartItemRepository cartItemRepository;
    private final UserRepository userRepository;
    private final ProductRepository productRepository;

    private User getUser(String email) {
        return userRepository.findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));
    }

    @Transactional
    public OrderResponse checkout(String email, CheckoutRequest request) {
        User user = getUser(email);
        List<CartItem> cartItems = cartItemRepository.findByUser(user);
        if (cartItems.isEmpty()) throw new RuntimeException("Cart is empty");

        BigDecimal total = cartItems.stream()
                .map(i -> i.getProduct().getPrice().multiply(BigDecimal.valueOf(i.getQuantity())))
                .reduce(BigDecimal.ZERO, BigDecimal::add);

        Order order = new Order();
        order.setUser(user);
        order.setTotalAmount(total);
        order.setShippingAddress(request.getShippingAddress());
        order.setStatus(OrderStatus.CONFIRMED);
        order.setPaymentStatus(PaymentStatus.COMPLETED);
        order.setPaymentId("PAY-" + UUID.randomUUID().toString().substring(0, 8).toUpperCase());

        Order savedOrder = orderRepository.save(order);

        List<OrderItem> orderItems = new ArrayList<>();
        for (CartItem ci : cartItems) {
            Product product = ci.getProduct();
            product.setStock(product.getStock() - ci.getQuantity());
            productRepository.save(product);

            OrderItem oi = new OrderItem();
            oi.setOrder(savedOrder);
            oi.setProduct(product);
            oi.setQuantity(ci.getQuantity());
            oi.setPrice(product.getPrice());
            orderItems.add(oi);
        }
        savedOrder.setOrderItems(orderItems);
        Order finalOrder = orderRepository.save(savedOrder);
        cartItemRepository.deleteByUser(user);
        return toResponse(finalOrder);
    }

    public List<OrderResponse> getUserOrders(String email) {
        return orderRepository.findByUserOrderByCreatedAtDesc(getUser(email))
                .stream().map(this::toResponse).collect(Collectors.toList());
    }

    public List<OrderResponse> getAllOrders() {
        return orderRepository.findAllByOrderByCreatedAtDesc()
                .stream().map(this::toResponse).collect(Collectors.toList());
    }

    public OrderResponse updateStatus(Long orderId, String status) {
        Order order = orderRepository.findById(orderId)
                .orElseThrow(() -> new ResourceNotFoundException("Order not found"));
        order.setStatus(OrderStatus.valueOf(status));
        order.setUpdatedAt(LocalDateTime.now());
        return toResponse(orderRepository.save(order));
    }

    private OrderResponse toResponse(Order o) {
        List<OrderResponse.OrderItemDto> items = new ArrayList<>();
        if (o.getOrderItems() != null) {
            for (OrderItem i : o.getOrderItems()) {
                OrderResponse.OrderItemDto dto = new OrderResponse.OrderItemDto();
                dto.setProductId(i.getProduct().getId());
                dto.setProductName(i.getProduct().getName());
                dto.setQuantity(i.getQuantity());
                dto.setPrice(i.getPrice());
                items.add(dto);
            }
        }
        OrderResponse r = new OrderResponse();
        r.setId(o.getId());
        r.setTotalAmount(o.getTotalAmount());
        r.setStatus(o.getStatus());
        r.setPaymentStatus(o.getPaymentStatus());
        r.setShippingAddress(o.getShippingAddress());
        r.setPaymentId(o.getPaymentId());
        r.setCreatedAt(o.getCreatedAt());
        r.setItems(items);
        return r;
    }
}
