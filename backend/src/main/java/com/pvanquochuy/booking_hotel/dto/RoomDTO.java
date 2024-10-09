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
    private Blob photo;
    private List<BookedRoomDTO> bookings;
}
