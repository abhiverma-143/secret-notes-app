package com.secure.notes_backend.controllers;

import com.secure.notes_backend.models.User;
import com.secure.notes_backend.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

// 🔥 Ye Imports Missing The 👇
import java.security.Principal;
import java.util.HashMap;
import java.util.Map;
import java.util.Random;
import java.util.Optional;

@RestController
@RequestMapping("/auth")
@CrossOrigin(origins = "http://localhost:3000")
public class AuthController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private JavaMailSender mailSender;

    // 👉 1. REGISTER USER
    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@RequestBody User user) {
        if (userRepository.findByUsername(user.getUsername()).isPresent()) {
            return ResponseEntity.badRequest().body("❌ Error: Username is already taken!");
        }
        if (userRepository.findByEmail(user.getEmail()) != null) {
            return ResponseEntity.badRequest().body("❌ Error: Email is already registered!");
        }

        user.setPassword(passwordEncoder.encode(user.getPassword()));
        userRepository.save(user);
        
        return ResponseEntity.ok("✅ User Registered Successfully!");
    }

    // 👉 2. LOGIN USER
    @PostMapping("/login")
    public ResponseEntity<?> loginUser(@RequestBody Map<String, String> loginData) {
        String email = loginData.get("email"); // 🔥 Username ki jagah Email
        String password = loginData.get("password");

        // 🔥 Find user by Email now
        User user = userRepository.findByEmail(email);

        if (user != null) {
            // Password Check
            if (passwordEncoder.matches(password, user.getPassword())) {
                // Token Generate (Username abhi bhi token me use kar sakte hain identity ke liye)
                String token = "Basic " + java.util.Base64.getEncoder().encodeToString((user.getUsername() + ":" + password).getBytes());
                return ResponseEntity.ok(token);
            }
        }
        return ResponseEntity.status(401).body("Invalid Email or Password!");
    }
    // 👉 3. FORGOT PASSWORD
    @PostMapping("/forgot-password")
    public ResponseEntity<?> forgotPassword(@RequestBody Map<String, String> request) {
        String email = request.get("email");
        User user = userRepository.findByEmail(email);

        if (user == null) {
            return ResponseEntity.badRequest().body("User not found!");
        }

        String otp = String.valueOf(new Random().nextInt(900000) + 100000);
        user.setOtp(otp);
        userRepository.save(user);

        try {
            SimpleMailMessage message = new SimpleMailMessage();
            message.setTo(email);
            message.setSubject("🔒 Secret Notes - Reset Password OTP");
            message.setText("Hello " + user.getUsername() + ",\n\n" +
                    "Your OTP is: " + otp + "\n\n" +
                    "Valid for 10 minutes.");
            mailSender.send(message);
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body("Error sending email.");
        }

        return ResponseEntity.ok("OTP Sent Successfully!");
    }

    // 👉 4. RESET PASSWORD
    @PostMapping("/reset-password")
    public ResponseEntity<?> resetPassword(@RequestBody Map<String, String> request) {
        String email = request.get("email");
        String otp = request.get("otp");
        String newPassword = request.get("newPassword");

        User user = userRepository.findByEmail(email);

        if (user == null || user.getOtp() == null || !user.getOtp().equals(otp)) {
            return ResponseEntity.badRequest().body("Invalid OTP or Email!");
        }

        user.setPassword(passwordEncoder.encode(newPassword));
        user.setOtp(null);
        userRepository.save(user);

        return ResponseEntity.ok("Password Reset Successful!");
    }

    // 👉 5. GET CURRENT USER DETAILS (Profile Show karne ke liye)
    @GetMapping("/me")
    public ResponseEntity<?> getCurrentUser(Principal principal) {
        if (principal == null) {
            return ResponseEntity.status(401).body("Unauthorized");
        }

        Optional<User> userOpt = userRepository.findByUsername(principal.getName());

        if (userOpt.isPresent()) {
            User user = userOpt.get();
            Map<String, String> userData = new HashMap<>(); // ✅ Ab ye error nahi dega
            userData.put("username", user.getUsername());
            userData.put("email", user.getEmail());
            userData.put("mobile", user.getMobile());
            
            return ResponseEntity.ok(userData);
        }
        return ResponseEntity.badRequest().body("User not found");
    }
}