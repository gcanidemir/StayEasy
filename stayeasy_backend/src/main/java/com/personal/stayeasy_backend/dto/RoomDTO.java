package com.personal.stayeasy_backend.dto;

import java.util.List;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class RoomDTO {

    private long id;

    @NotBlank(message = "Title is required")
    private String name;

    @NotNull(message = "Description cannot be null")
    private String description;

    @NotNull(message = "Price is required")
    private Integer price;

    @NotNull(message = "Amenities cannot be null")
    private List<String> amenities;

    @NotNull(message = "Images cannot be null")
    private List<String> images;

    @NotBlank(message = "Room Type is required")
    private String type;

    @NotNull(message = "isBooked cannot be null")
    private Boolean isBooked;

    private Long bookedByUserId;
}
