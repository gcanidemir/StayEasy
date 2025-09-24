# Stayeasy - Hotel Booking Application

Stayeasy is a full-stack web application for booking hotel rooms. It features a Spring Boot backend and a React frontend.

## Features

*   User authentication (login/register)
*   Browse and filter available rooms
*   View room details
*   Book rooms
*   Admin panel for managing rooms

## Technologies Used

### Backend

*   **Java 17**
*   **Spring Boot 3**
*   **Spring Security** (for authentication and authorization)
*   **Maven** (for dependency management)
*   **PostgreSQL** (for the main database)
*   **Redis** (for caching and rate limiting)
*   **Docker Compose** (for running services)

### Frontend

*   **React**
*   **TypeScript**
*   **Vite** (for the build tool)
*   **Tailwind CSS** (for styling)
*   **Shadcn/ui** (for UI components)
*   **Redux Toolkit** (for state management)

## Getting Started

### Prerequisites

*   Java 17 or later
*   Maven
*   Node.js & npm
*   Docker

### Installation & Setup

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/gcanidemir/StayEasy.git
    cd stayeasy
    ```

2.  **Backend Setup:**
    ```bash
    cd stayeasy_backend
    # Start PostgreSQL and Redis containers
    run.bat
    # Run the Spring Boot application
    mvnw spring-boot:run
    ```
    The backend will be running on `http://localhost:8080`.

3.  **Frontend Setup:**
    ```bash
    cd stayeasy_frontend
    # Install dependencies
    npm install
    # Start the development server
    npm run dev
    ```
    The frontend will be running on `http://localhost:5173`.
