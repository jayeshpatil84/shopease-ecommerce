package com.ecommerce.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;

@Getter @Setter
public class CheckoutRequest {
    @NotBlank private String shippingAddress;
    @NotBlank private String paymentMethod;
    private String cardNumber;
}
