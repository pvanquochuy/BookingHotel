package com.pvanquochuy.booking_hotel.controller;

import com.pvanquochuy.booking_hotel.dto.Response;
import com.pvanquochuy.booking_hotel.exception.InvalidBookingRequestException;
import com.pvanquochuy.booking_hotel.exception.ResourceNotFoundException;
import com.pvanquochuy.booking_hotel.model.BookedRoom;
import com.pvanquochuy.booking_hotel.model.Room;
import com.pvanquochuy.booking_hotel.response.BookingResponse;
import com.pvanquochuy.booking_hotel.response.RoomResponse;
import com.pvanquochuy.booking_hotel.service.IBookingService;
import com.pvanquochuy.booking_hotel.service.IRoomService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;


//@CrossOrigin()
@RequiredArgsConstructor
@RestController
@RequestMapping("/bookings")
public class BookingController {

    private final IBookingService bookingService;
    private final IRoomService roomService;


    @GetMapping("/all-bookings")
    @PreAuthorize("hasAuthority('ADMIN')")
    public ResponseEntity<Response> getAllBookings(){
        Response response =bookingService.getAllBookings();
        return ResponseEntity.status(response.getStatusCode()).body(response);
    }

    @GetMapping("confirmation/{confirmationCode}")
    public ResponseEntity<Response> getBookingByConfirmationCode(@PathVariable String confirmationCode){
        Response response  = bookingService.findByBookingConfirmationCode(confirmationCode);
        return ResponseEntity.status(response.getStatusCode()).body(response);
    }

    @PostMapping("/room/{roomId}/{userId}/booking")
    @PreAuthorize("hasAuthority('ADMIN') or hasAuthority('USER')")
    public ResponseEntity<?> saveBooking(@PathVariable Long roomId,
                                         @PathVariable Long userId,
                                         @RequestBody BookedRoom bookingRequest){
        try{
            String confirmationCode = bookingService.saveBooking(roomId, userId ,bookingRequest);
                return ResponseEntity.ok("Room booked successfully. Your booking confirmation code is :" + confirmationCode);
        }catch (InvalidBookingRequestException e){
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @DeleteMapping("/booking/{bookingId}/delete")
    public void cancelBooking(@PathVariable Long bookingId){
        bookingService.cancelBooking(bookingId);
    }

    private BookingResponse getBookingResponse(BookedRoom booking) {
        Room theRoom = roomService.getRoomById(booking.getRoom().getId()).get();
        RoomResponse room = new RoomResponse(theRoom.getId(), theRoom.getRoomType(), theRoom.getRoomPrice());
        return new BookingResponse(
                booking.getId(), booking.getCheckInDate(),
                booking.getCheckOutDate(), booking.getGuestFullName(),
                booking.getGuestEmail(), booking.getNumOfAdults(),
                booking.getNumOfChildren(), booking.getTotalNumOfGuest(),
                booking.getBookingConfirmationCode(), room);
    }

}
