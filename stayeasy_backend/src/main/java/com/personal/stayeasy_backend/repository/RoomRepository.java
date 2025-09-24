package com.personal.stayeasy_backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.personal.stayeasy_backend.entity.Room;

public interface RoomRepository extends JpaRepository<Room, Long> {
}
