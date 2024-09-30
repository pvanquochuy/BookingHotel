package com.pvanquochuy.booking_hotel.repository;

import com.pvanquochuy.booking_hotel.model.BookedRoom;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BookingRepository extends JpaRepository<BookedRoom, Long> {
}
