package com.personal.stayeasy_backend.entity;

import java.util.List;

import com.personal.stayeasy_backend.Enums.RoomType;

import jakarta.persistence.Column;
import jakarta.persistence.ElementCollection;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Builder
@Table(name = "rooms")
public class Room {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Column(nullable = false, unique = true)
    private String name;

    @Column(nullable = false)
    private String description;

    @Column(nullable = false)
    private int price;

    @ElementCollection
    @Column(nullable = false)
    private List<String> amenities;

    @ElementCollection
    @Column(nullable = false)
    private List<String> images;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private RoomType type;

    @OneToMany(mappedBy = "room")
    private List<User> users;

    @Column(nullable = false)
    private boolean isBooked;
}
