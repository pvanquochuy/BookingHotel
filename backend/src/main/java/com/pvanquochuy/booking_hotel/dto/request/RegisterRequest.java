package com.pvanquochuy.booking_hotel.dto.request;

import lombok.Data;

@Data
public class RegisterRequest {
    private String email;
    private String name;
    private String phoneNumber;
    private String password;
    private String role; // Optional, default to USER nếu không được cung cấp
}
