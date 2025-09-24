package com.personal.stayeasy_backend.service;

import org.springframework.stereotype.Service;

import com.personal.stayeasy_backend.dto.BookingDTO;
import com.personal.stayeasy_backend.entity.Room;
import com.personal.stayeasy_backend.entity.User;
import com.personal.stayeasy_backend.exception.ResourceNotFoundException;
import com.personal.stayeasy_backend.repository.RoomRepository;
import com.personal.stayeasy_backend.repository.UserRepository;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
public class BookingService {

    private final UserRepository userRepository;
    private final RoomRepository roomRepository;

    public BookingService(UserRepository userRepository, RoomRepository roomRepository) {
        this.userRepository = userRepository;
        this.roomRepository = roomRepository;
    }

    public BookingDTO createBooking(BookingDTO bookingDTO) {
        User user = userRepository.findById(bookingDTO.getUserId())
                .orElseThrow(() -> new ResourceNotFoundException("User not found with id: " + bookingDTO.getUserId()));

        Room room = roomRepository.findById(bookingDTO.getRoomId())
                .orElseThrow(() -> new ResourceNotFoundException("Room not found with id: " + bookingDTO.getRoomId()));

        user.setRoom(room);
        room.setBooked(true);

        userRepository.save(user);
        roomRepository.save(room);

        BookingDTO responseDTO = BookingDTO.builder()
                .userId(user.getId())
                .roomId(user.getRoom().getId())
                .build();


        log.info("\nCreated Book Info:\nRoomID: {}\nUserID: {}", responseDTO.getRoomId(), responseDTO.getUserId());
        return responseDTO;
    }

    public BookingDTO cancelBooking(BookingDTO bookingDTO) {

        User user = userRepository.findById(bookingDTO.getUserId())
                .orElseThrow(() -> new ResourceNotFoundException("User not found with id: " + bookingDTO.getUserId()));

        Room room = roomRepository.findById(bookingDTO.getRoomId())
                .orElseThrow(() -> new ResourceNotFoundException("Room not found with id: " + bookingDTO.getRoomId()));

        user.setRoom(null);
        room.setBooked(false);

        userRepository.save(user);
        roomRepository.save(room);

        BookingDTO responseDTO = BookingDTO.builder()
                .userId(user.getId())
                .build();

        log.info("\nCancelled Book Info:\nRoomID: {}\nUserID: {}", responseDTO.getRoomId(), responseDTO.getUserId());

        return responseDTO;
    }

}
