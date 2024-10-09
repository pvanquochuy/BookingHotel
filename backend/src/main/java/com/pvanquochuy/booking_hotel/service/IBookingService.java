package com.pvanquochuy.booking_hotel.service;

import com.pvanquochuy.booking_hotel.dto.Response;
import com.pvanquochuy.booking_hotel.model.BookedRoom;

import java.util.List;

public interface IBookingService {

    void cancelBooking(Long bookingId);

    String saveBooking(Long roomId, Long userId ,BookedRoom bookingRequest);

    List<BookedRoom> getAllBookingsByRoomId(Long roomId);

    Response getAllBookings();

    Response findByBookingConfirmationCode(String confirmationCode);
}
