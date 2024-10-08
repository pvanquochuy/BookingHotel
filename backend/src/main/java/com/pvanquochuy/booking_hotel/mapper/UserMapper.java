package com.pvanquochuy.booking_hotel.mapper;

import com.pvanquochuy.booking_hotel.dto.UserDTO;
import com.pvanquochuy.booking_hotel.dto.request.RegisterRequest;
import com.pvanquochuy.booking_hotel.model.User;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface UserMapper {
    User toUser(RegisterRequest request);
    UserDTO toUserDTO(User user);
//    void updateUser(@MappingTarget User user, UserUpdateRequest request);
}
