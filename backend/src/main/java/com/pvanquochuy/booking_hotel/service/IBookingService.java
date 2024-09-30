package com.pvanquochuy.booking_hotel.service;

import com.pvanquochuy.booking_hotel.model.BookedRoom;

import java.util.List;

public interface IBookingService {

    void cancelBooking(Long bookingId);

    String saveBooking(Long roomId, BookedRoom bookingRequest);

    List<BookedRoom> getAllBookings();
}
