package com.personal.stayeasy_backend.service;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.personal.stayeasy_backend.dto.RoomDTO;
import com.personal.stayeasy_backend.entity.Room;
import com.personal.stayeasy_backend.exception.ResourceNotFoundException;
import com.personal.stayeasy_backend.mapper.RoomMapper;
import com.personal.stayeasy_backend.repository.RoomRepository;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
public class RoomService {

    private final RoomRepository roomRepository;

    public RoomService(RoomRepository roomRepository) {
        this.roomRepository = roomRepository;
    }

    public List<RoomDTO> getAllRoomsForSearch() {
        List<Room> rooms = roomRepository.findAll();
        return rooms.stream().map(RoomMapper::toDTO).toList();
    }

    public Page<RoomDTO> getAllRooms(Pageable pageable) {
        Page<Room> rooms = roomRepository.findAll(pageable);
        return rooms.map(RoomMapper::toDTO);
    }

    public RoomDTO getRoomById(Long id) {
        Room room = roomRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Room not found with id: " + id));

        return RoomMapper.toDTO(room);
    }

    public RoomDTO createRoom(RoomDTO roomDTO) {

        Room room = RoomMapper.toEntity(roomDTO);

        room.setId(0);
        room = roomRepository.save(room);

        roomDTO = RoomMapper.toDTO(room);
        return roomDTO;
    }

    public void deleteRoom(Long id) {
        if (!roomRepository.existsById(id)) {
            throw new ResourceNotFoundException("Room not found with id: " + id);
        }
        roomRepository.deleteById(id);
    }

}
