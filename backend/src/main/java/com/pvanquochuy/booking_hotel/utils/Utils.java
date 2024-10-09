package com.pvanquochuy.booking_hotel.utils;

import com.pvanquochuy.booking_hotel.dto.BookedRoomDTO;
import com.pvanquochuy.booking_hotel.dto.RoomDTO;
import com.pvanquochuy.booking_hotel.dto.UserDTO;
import com.pvanquochuy.booking_hotel.model.BookedRoom;
import com.pvanquochuy.booking_hotel.model.User;
import org.apache.commons.lang3.RandomStringUtils;

import java.security.SecureRandom;
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

    public static BookedRoomDTO mapBookingEntityToBookingDTO(BookedRoom booking) {
        BookedRoomDTO bookingDTO = new BookedRoomDTO();
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

    public static List<BookedRoomDTO> mapBookingListEntityToBookingListDTO(List<BookedRoom> bookingList) {
        return bookingList.stream().map(Utils::mapBookingEntityToBookingDTO).collect(Collectors.toList());
    }

    public static BookedRoomDTO mapBookingEntityToBookingDTOPlusBookedRooms(BookedRoom booking, boolean mapUser) {

        BookedRoomDTO bookingDTO = new BookedRoomDTO();
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
            RoomDTO roomDTO = new RoomDTO();

            roomDTO.setId(booking.getRoom().getId());
            roomDTO.setRoomType(booking.getRoom().getRoomType());
            roomDTO.setRoomPrice(booking.getRoom().getRoomPrice());
            roomDTO.setPhoto(booking.getRoom().getPhoto());
            bookingDTO.setRoom(roomDTO);
        }
        return bookingDTO;
    }
}
