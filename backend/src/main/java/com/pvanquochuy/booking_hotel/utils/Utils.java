package com.pvanquochuy.booking_hotel.utils;

import com.pvanquochuy.booking_hotel.dto.BookingDTO;
import com.pvanquochuy.booking_hotel.dto.RoomDTO;
import com.pvanquochuy.booking_hotel.dto.UserDTO;
import com.pvanquochuy.booking_hotel.exception.InternalServerException;
import com.pvanquochuy.booking_hotel.model.Booking;
import com.pvanquochuy.booking_hotel.model.Room;
import com.pvanquochuy.booking_hotel.model.User;
import org.apache.commons.lang3.RandomStringUtils;
import org.apache.tomcat.util.codec.binary.Base64;

import java.sql.Blob;
import java.sql.SQLException;
import java.util.List;
import java.util.stream.Collectors;

public class Utils {



    /**
     * Generates a random alphanumeric confirmation code of the specified length.
     *
     * @param length the length of the confirmation code
     * @return a randomly generated confirmation code
     * @throws IllegalArgumentException if length is not positive
     */
    public static String generateRandomConfirmationCode(int length) {
        if (length <= 0) {
            throw new IllegalArgumentException("Length must be positive");
        }
        return RandomStringUtils.randomAlphanumeric(length).toUpperCase();
    }

    /**
     * Converts a Blob to a Base64-encoded string.
     *
     * @param photoBlob the Blob to convert
     * @return the Base64-encoded string, or null if the Blob is null
     */
    public static String convertBlobToBase64(Blob photoBlob) {
        if (photoBlob == null) {
            return null;
        }
        try {
            byte[] photoBytes = photoBlob.getBytes(1, (int) photoBlob.length());
            return Base64.encodeBase64String(photoBytes);
        } catch (SQLException e) {
            throw new InternalServerException("Error converting Blob to Base64 string");
        }
    }

    /**
     * Maps a User entity to a UserDTO.
     *
     * @param user the User entity to map
     * @return the mapped UserDTO, or null if user is null
     */
    public static UserDTO mapUserEntityToUserDTO(User user) {
        UserDTO userDTO = new UserDTO();

        userDTO.setId(user.getId());
        userDTO.setName(user.getName());
        userDTO.setEmail(user.getEmail());
        userDTO.setPhoneNumber(user.getPhoneNumber());
        userDTO.setRole(user.getRole().name());
        return userDTO;
    }

    /**
     * Maps a list of User entities to a list of UserDTOs.
     *
     * @param userList the list of User entities to map
     * @return the list of mapped UserDTOs, or an empty list if userList is null
     */
    public static List<UserDTO> mapUserListEntityToUserListDTO(List<User> userList) {
        return userList.stream().map(Utils::mapUserEntityToUserDTO).collect(Collectors.toList());
    }

    public static BookingDTO mapBookingEntityToBookingDTO(Booking booking) {
        BookingDTO bookingDTO = new BookingDTO();
        // Map simple fields
        bookingDTO.setId(booking.getId());
        bookingDTO.setCheckInDate(booking.getCheckInDate());
        bookingDTO.setCheckOutDate(booking.getCheckOutDate());
        bookingDTO.setNumOfAdults(booking.getNumOfAdults());
        bookingDTO.setNumOfChildren(booking.getNumOfChildren());
        bookingDTO.setTotalNumOfGuest(booking.getTotalNumOfGuest());
        bookingDTO.setBookingConfirmationCode(booking.getBookingConfirmationCode());
        return bookingDTO;
    }

    public static RoomDTO mapRoomEntityToRoomDTO(Room room) {
        RoomDTO roomDTO = new RoomDTO();

        roomDTO.setId(room.getId());
        roomDTO.setRoomType(room.getRoomType());
        roomDTO.setRoomPrice(room.getRoomPrice());
        roomDTO.setRoomDescription(room.getRoomDescription());
        // Chuyển đổi Blob thành Base64 string
        roomDTO.setPhoto(convertBlobToBase64(room.getPhoto()));
        return roomDTO;
    }


    public static RoomDTO mapRoomEntityToRoomDTOPlusBookings(Room room) {
        RoomDTO roomDTO = mapRoomEntityToRoomDTO(room);


        if (room.getBookings() != null) {
            roomDTO.setBookings(room.getBookings().stream().map(Utils::mapBookingEntityToBookingDTO).collect(Collectors.toList()));
        }
        return roomDTO;
    }

    public static List<BookingDTO> mapBookingListEntityToBookingListDTO(List<Booking> bookingList) {
        return bookingList.stream().map(Utils::mapBookingEntityToBookingDTO).collect(Collectors.toList());
    }

    public static BookingDTO mapBookingEntityToBookingDTOPlusBookedRooms(Booking booking, boolean mapUser) {

        BookingDTO bookingDTO = new BookingDTO();
        // Map simple fields
        bookingDTO.setId(booking.getId());
        bookingDTO.setCheckInDate(booking.getCheckInDate());
        bookingDTO.setCheckOutDate(booking.getCheckOutDate());
        bookingDTO.setNumOfAdults(booking.getNumOfAdults());
        bookingDTO.setNumOfChildren(booking.getNumOfChildren());
        bookingDTO.setTotalNumOfGuest(booking.getTotalNumOfGuest());
        bookingDTO.setBookingConfirmationCode(booking.getBookingConfirmationCode());
        if (mapUser) {
            bookingDTO.setUser(Utils.mapUserEntityToUserDTO(booking.getUser()));
        }
        if (booking.getRoom() != null) {
            RoomDTO roomDTO = mapRoomEntityToRoomDTO(booking.getRoom());
            bookingDTO.setRoom(roomDTO);
        }
        return bookingDTO;
    }

    public static UserDTO mapUserEntityToUserDTOPlusUserBookingsAndRoom(User user) {
        UserDTO userDTO = new UserDTO();

        userDTO.setId(user.getId());
        userDTO.setName(user.getName());
        userDTO.setEmail(user.getEmail());
        userDTO.setPhoneNumber(user.getPhoneNumber());
        userDTO.setRole(user.getRole().name());

        if (!user.getBookings().isEmpty()) {
            userDTO.setBookings(user.getBookings().stream().map(booking -> mapBookingEntityToBookingDTOPlusBookedRooms(booking, false)).collect(Collectors.toList()));
        }
        return userDTO;
    }



    public static List<RoomDTO> mapRoomListEntityToRoomListDTO(List<Room> roomList) {
        return roomList.stream().map(Utils::mapRoomEntityToRoomDTO).collect(Collectors.toList());
    }
}
