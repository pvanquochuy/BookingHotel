package com.pvanquochuy.booking_hotel.service.impl;

import com.pvanquochuy.booking_hotel.model.BookedRoom;
import com.pvanquochuy.booking_hotel.repository.BookingRepository;
import com.pvanquochuy.booking_hotel.service.IBookingService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class BookingServiceImpl implements IBookingService {
    private final BookingRepository bookingRepository;

    @Override
    public List<BookedRoom> getAllBookings() {
        return bookingRepository.findAll();
    }


    @Override
    public void cancelBooking(Long bookingId) {
        bookingRepository.deleteById(bookingId);
    }

    @Override
    public String saveBooking(Long roomId, BookedRoom bookingRequest) {
        return "";
    }

    public List<BookedRoom> getAllBookingsByRoomId(Long roomId) {
        return null;
    }


}
