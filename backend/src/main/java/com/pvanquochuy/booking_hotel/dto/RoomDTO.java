package com.pvanquochuy.booking_hotel.dto;

import java.math.BigDecimal;
import java.sql.Blob;
import java.util.List;

public class RoomDTO {

    private Long id;
    private String roomType;
    private BigDecimal roomPrice;
    private Blob photo;
    private String roomDescription;
    private List<BookedRoomDTO> bookings;
}
