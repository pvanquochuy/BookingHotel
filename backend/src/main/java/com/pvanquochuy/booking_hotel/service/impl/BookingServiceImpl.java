package com.pvanquochuy.booking_hotel.service.impl;

import com.pvanquochuy.booking_hotel.exception.InvalidBookingRequestException;
import com.pvanquochuy.booking_hotel.exception.UserException;
import com.pvanquochuy.booking_hotel.model.BookedRoom;
import com.pvanquochuy.booking_hotel.model.Room;
import com.pvanquochuy.booking_hotel.model.User;
import com.pvanquochuy.booking_hotel.repository.BookingRepository;
import com.pvanquochuy.booking_hotel.repository.RoomRepository;
import com.pvanquochuy.booking_hotel.repository.UserRepository;
import com.pvanquochuy.booking_hotel.service.IBookingService;
import com.pvanquochuy.booking_hotel.service.IRoomService;
import com.pvanquochuy.booking_hotel.utils.Utils;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class BookingServiceImpl implements IBookingService {
    private final BookingRepository bookingRepository;
    private final IRoomService roomService;
    private final RoomRepository roomRepository;
    private final UserRepository userRepository;

    @Override
    public List<BookedRoom> getAllBookings() {
        return bookingRepository.findAll();
    }

    @Override
    public void cancelBooking(Long bookingId) {
        bookingRepository.deleteById(bookingId);
    }

    @Override
    public List<BookedRoom> getAllBookingsByRoomId(Long roomId) {
        return bookingRepository.findByRoomId(roomId);
    }

    @Override
    public String saveBooking(Long roomId, Long userId ,BookedRoom bookingRequest) {
        if(bookingRequest.getCheckOutDate().isBefore(bookingRequest.getCheckInDate())){
            throw new InvalidBookingRequestException("Check-in date must come before check-out date");
        }

        Room room = roomRepository.findById(roomId).orElseThrow(() -> new InvalidBookingRequestException("Room Not Found"));
        User user = userRepository.findById(userId).orElseThrow(() -> new UserException("User Not Found"));


        List<BookedRoom> existingBookings = room.getBookings();

        if (!roomIsAvailable(bookingRequest, existingBookings)) {
            throw new InvalidBookingRequestException("Room not Available for selected date range");
        }

        bookingRequest.setRoom(room);
        bookingRequest.setUser(user);
        String bookingConfirmationCode = Utils.generateRandomConfirmationCode(10);
        bookingRequest.setBookingConfirmationCode(bookingConfirmationCode);

        bookingRepository.save(bookingRequest);

        return bookingRequest.getBookingConfirmationCode();
    }

    @Override
    public BookedRoom findByBookingConfirmationCode(String confirmationCode) {
        return bookingRepository.findByBookingConfirmationCode(confirmationCode);
    }



    private boolean roomIsAvailable(BookedRoom bookingRequest, List<BookedRoom> existingBookings) {
        return existingBookings.stream()
                .noneMatch(existingBooking->
                        bookingRequest.getCheckInDate().equals(existingBooking.getCheckInDate())
                        || bookingRequest.getCheckOutDate().isBefore(existingBooking.getCheckOutDate())
                        || (bookingRequest.getCheckInDate().isAfter(existingBooking.getCheckInDate())
                        && bookingRequest.getCheckInDate().isBefore(existingBooking.getCheckInDate()))
                        || (bookingRequest.getCheckInDate().isBefore(existingBooking.getCheckInDate())

                        && bookingRequest.getCheckOutDate().equals(existingBooking.getCheckOutDate()))
                        || (bookingRequest.getCheckOutDate().isBefore(existingBooking.getCheckInDate())

                        && bookingRequest.getCheckOutDate().isAfter(existingBooking.getCheckOutDate()))

                        || (bookingRequest.getCheckOutDate().equals(existingBooking.getCheckOutDate())
                        && bookingRequest.getCheckOutDate().equals(existingBooking.getCheckInDate()))

                        || (bookingRequest.getCheckOutDate().equals(existingBooking.getCheckOutDate())
                        && bookingRequest.getCheckOutDate().equals(existingBooking.getCheckInDate()))
                );
    }



}
