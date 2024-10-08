package com.pvanquochuy.booking_hotel.service;

import com.pvanquochuy.booking_hotel.dto.request.LoginRequest;
import com.pvanquochuy.booking_hotel.dto.Response;
import com.pvanquochuy.booking_hotel.model.User;

public interface IUserService {
    Response register(User user);

    Response login(LoginRequest loginRequest);

    Response getAllUsers();

    Response getUserBookingHistory(String userId);

    Response deleteUser(String userId);

    Response getUserById(String userId);

    Response getMyInfo(String email);
}
