package com.ecommerce.dto;

import lombok.*;
import java.math.BigDecimal;

@Getter @Setter @Builder @NoArgsConstructor @AllArgsConstructor
public class DashboardStats {
    private Long totalUsers;
    private Long totalProducts;
    private Long totalOrders;
    private BigDecimal totalRevenue;
}
