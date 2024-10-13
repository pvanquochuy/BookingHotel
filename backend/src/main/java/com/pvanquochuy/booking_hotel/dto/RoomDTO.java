package com.pvanquochuy.booking_hotel.dto;

import lombok.Data;

import java.math.BigDecimal;
import java.sql.Blob;
import java.util.List;

@Data
public class RoomDTO {

    private Long id;
    private String roomType;
    private BigDecimal roomPrice;
    private String photo;
    private String roomDescription;
    private List<BookingDTO> bookings;
}
