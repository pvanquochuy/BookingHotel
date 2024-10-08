package com.pvanquochuy.booking_hotel.dto;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Data;

import java.util.List;

@Data
@JsonInclude(JsonInclude.Include.NON_NULL)
public class Response {
    private int statusCode;
    private String message;

    private String token;
    private String role;
    private String expirationTime;
    private String bookingConfirmationCode;

    private UserDTO user;
    private RoomDTO room;
    private BookedRoomDTO booking;
    private List<UserDTO> userList;
    private List<RoomDTO> roomList;
    private List<BookedRoomDTO> bookingList;
}
