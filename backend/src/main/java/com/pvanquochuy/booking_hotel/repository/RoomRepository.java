package com.pvanquochuy.booking_hotel.repository;

import com.pvanquochuy.booking_hotel.model.Room;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RoomRepository extends JpaRepository<Room, Long> {
}
