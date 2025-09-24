package com.personal.stayeasy_backend;

import java.util.List;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

import com.personal.stayeasy_backend.dto.RegisterRequestDTO;
import com.personal.stayeasy_backend.dto.RoomDTO;
import com.personal.stayeasy_backend.service.AuthenticationService;
import com.personal.stayeasy_backend.service.RoomService;

@SpringBootApplication
public class StayeasyBackendApplication {

	public static void main(String[] args) {
		SpringApplication.run(StayeasyBackendApplication.class, args);
	}

	@Bean
	public CommandLineRunner loadData(AuthenticationService authenticationService, RoomService roomService) {
		return (args) -> {
			// Create and save 5 mocked users
			RegisterRequestDTO user1 = new RegisterRequestDTO("Guest 1", "guest@example.com", "guest123", "GUEST");
			RegisterRequestDTO user2 = new RegisterRequestDTO("Guest 2", "guest2@example.com", "guest456", "GUEST");
			RegisterRequestDTO user3 = new RegisterRequestDTO("Guest 3", "guest3@example.com", "guest789", "GUEST");
			RegisterRequestDTO user4 = new RegisterRequestDTO("Admin 1", "admin@example.com", "admin123", "ADMIN");
			RegisterRequestDTO user5 = new RegisterRequestDTO("Admin 2", "admin2@example.com", "admin456", "ADMIN");

			authenticationService.register(user1);
			authenticationService.register(user2);
			authenticationService.register(user3);
			authenticationService.register(user4);
			authenticationService.register(user5);

			// Create and save 5 mocked rooms
			RoomDTO room1 = new RoomDTO(0, "Private Twin Room",
					"Comfortable private room with two single beds, perfect for friends traveling together.", 60,
					List.of("Wi-Fi", "Private Bathroom", "TV", "Air Conditioning"), List.of(), "PRIVATE", false, null);

			RoomDTO room2 = new RoomDTO(0, "Deluxe Suite",
					"Spacious suite with a queen bed, private bathroom, and a small sitting area.", 100,
					List.of("Wi-Fi", "Private Bathroom", "TV", "Mini Fridge", "Coffe Maker", "Air Conditioning"), List.of(), "SUITE", false, null);
					
			RoomDTO room3 = new RoomDTO(0, "Budget Single Room",
					"Cozy single room with shared bathroom facilities, perfect for solo travelers on a budget.", 40,
					List.of("Wi-Fi", "Shared Bathroom", "Reading Light"), List.of(), "PRIVATE", false, null);

			roomService.createRoom(room1);
			roomService.createRoom(room2);
			roomService.createRoom(room3);
		};
	}

}
