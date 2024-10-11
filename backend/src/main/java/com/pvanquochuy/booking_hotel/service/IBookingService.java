package com.pvanquochuy.booking_hotel.service;

import com.pvanquochuy.booking_hotel.dto.Response;
import com.pvanquochuy.booking_hotel.model.Booking;

import java.util.List;

public interface IBookingService {

    Response saveBooking(Long roomId, Long userId, Booking bookingRequest);

    Response findBookingByConfirmationCode(String confirmationCode);

    Response getAllBookings();

    Response cancelBooking(Long bookingId);
}
