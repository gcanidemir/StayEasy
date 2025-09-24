package com.personal.stayeasy_backend.mapper;

import com.personal.stayeasy_backend.Enums.RoomType;
import com.personal.stayeasy_backend.dto.RoomDTO;
import com.personal.stayeasy_backend.entity.Room;

public class RoomMapper {

    public static RoomDTO toDTO(Room room) {
        if (room == null) {
            return null;
        }

        RoomDTO roomDTO = RoomDTO.builder()
                .id(room.getId())
                .name(room.getName())
                .description(room.getDescription())
                .price(room.getPrice())
                .amenities(room.getAmenities())
                .images(room.getImages())
                .type(room.getType().name())
                .isBooked(room.isBooked())
                .build();

        if (room.isBooked() && room.getUsers() != null && !room.getUsers().isEmpty()) {
            roomDTO.setBookedByUserId(room.getUsers().get(0).getId());
        }

        return roomDTO;
    }


    public static Room toEntity(RoomDTO roomDTO) {
        if (roomDTO == null) {
            return null;
        }

        return Room.builder()
                .name(roomDTO.getName())
                .description(roomDTO.getDescription())
                .price(roomDTO.getPrice())
                .amenities(roomDTO.getAmenities())
                .images(roomDTO.getImages())
                .type(RoomType.valueOf(roomDTO.getType()))
                .isBooked(roomDTO.getIsBooked())
                .build();
    }
}
