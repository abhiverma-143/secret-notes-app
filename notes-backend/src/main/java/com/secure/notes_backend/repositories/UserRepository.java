package com.secure.notes_backend.repositories;

import com.secure.notes_backend.models.User;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {
    // Ye method database mein username dhoondega
    Optional<User> findByUsername(String username);
    User findByEmail(String email);
}