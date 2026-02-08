package com.secure.notes_backend.services;

import com.secure.notes_backend.models.User;
import com.secure.notes_backend.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.ArrayList;

@Service
public class CustomUserDetailsService implements UserDetailsService {

    @Autowired
    private UserRepository userRepository;

    @Override
    public UserDetails loadUserByUsername(String identifier) throws UsernameNotFoundException {
        // 🔍 'identifier' variable me Token se aayi value hoti hai (Jo aapke case me Email hai)

        // 1. Pehle hum ise EMAIL samajh kar dhoondte hain (Sabse Zaroori Step)
        User user = userRepository.findByEmail(identifier);

        // 2. Agar Email se user nahi mila, toh hum USERNAME se try karenge (Backup plan)
        if (user == null) {
            user = userRepository.findByUsername(identifier)
                    .orElseThrow(() -> new UsernameNotFoundException("User not found with email or username: " + identifier));
        }

        // 3. User Mil Gaya! Ab Spring Security ko User return karo
        return new org.springframework.security.core.userdetails.User(
                user.getEmail(), // ✅ Hum system ko bata rahe hain ki Email hi main ID hai
                user.getPassword(),
                new ArrayList<>()
        );
    }
}