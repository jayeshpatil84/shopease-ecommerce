package com.ecommerce.dto;

import com.ecommerce.entity.Role;
import lombok.*;
import java.time.LocalDateTime;

@Data @Builder @NoArgsConstructor @AllArgsConstructor
public class UserResponse {
    private Long id;
    private String name;
    private String email;
    private Role role;
    private String phone;
    private String address;
    private boolean enabled;
    private LocalDateTime createdAt;
}
