package com.pvanquochuy.booking_hotel.service.impl;

import com.pvanquochuy.booking_hotel.dto.request.LoginRequest;
import com.pvanquochuy.booking_hotel.dto.Response;
import com.pvanquochuy.booking_hotel.dto.UserDTO;
import com.pvanquochuy.booking_hotel.enums.Role;
import com.pvanquochuy.booking_hotel.exception.UserException;
import com.pvanquochuy.booking_hotel.model.User;
import com.pvanquochuy.booking_hotel.repository.UserRepository;
import com.pvanquochuy.booking_hotel.service.IUserService;
import com.pvanquochuy.booking_hotel.utils.JWTUtils;
import com.pvanquochuy.booking_hotel.utils.Utils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserServiceImpl implements IUserService {
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private PasswordEncoder passwordEncoder;
    @Autowired
    private JWTUtils jwtUtils;
    @Autowired
    private AuthenticationManager authenticationManager;


    @Override
    public Response register(User user) {
        Response response = new Response();
        try {
            if (user.getRole() == null || user.getRole().name().isBlank()) {
                user.setRole(Role.USER);
            }
            if (userRepository.existsByEmail(user.getEmail())) {
                throw new UserException(user.getEmail() + "Already Exists");
            }
            user.setPassword(passwordEncoder.encode(user.getPassword()));
            User savedUser = userRepository.save(user);
            UserDTO userDTO = Utils.mapUserEntityToUserDTO(savedUser);
            response.setStatusCode(200);
            response.setUser(userDTO);
        } catch (UserException e) {
            response.setStatusCode(400);
            response.setMessage(e.getMessage());
        } catch (Exception e) {
            response.setStatusCode(500);
            response.setMessage("Error Occurred During USer Registration " + e.getMessage());

        }
        return response;
    }

    @Override
    public Response login(LoginRequest loginRequest) {
        Response response = new Response();

        try {
            authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(loginRequest.getEmail(), loginRequest.getPassword()));
            var user = userRepository.findByEmail(loginRequest.getEmail()).orElseThrow(() -> new UserException("user Not found"));

            var token = jwtUtils.generateToken(user);
            response.setStatusCode(200);
            response.setToken(token);
            response.setRole(user.getRole().name());
            response.setExpirationTime("7 Days");
            response.setMessage("successful");

        } catch (UserException   e) {
            response.setStatusCode(404);
            response.setMessage(e.getMessage());

        } catch (Exception e) {

            response.setStatusCode(500);
            response.setMessage("Error Occurred During USer Login " + e.getMessage());
        }
        return response;
    }

    @Override
    public Response getAllUsers() {
        return null;
    }

    @Override
    public Response getUserBookingHistory(String userId) {
        return null;
    }

    @Override
    public Response deleteUser(String userId) {
        return null;
    }

    @Override
    public Response getUserById(String userId) {
        return null;
    }

    @Override
    public Response getMyInfo(String email) {
        return null;
    }
}
