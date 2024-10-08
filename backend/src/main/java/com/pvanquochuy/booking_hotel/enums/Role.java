package com.pvanquochuy.booking_hotel.enums;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonValue;

public enum Role {
    USER,
    ADMIN;

    @JsonCreator
    public static Role fromString(String role) {
        return Role.valueOf(role.toUpperCase());
    }

    @JsonValue
    public String getValue() {
        return this.name();
    }
}
