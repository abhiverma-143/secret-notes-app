package com.secure.notes_backend.controllers;

import com.secure.notes_backend.models.User;
import com.secure.notes_backend.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.HashMap;
import java.util.Map;
import java.util.Random;
import java.util.Optional;

@RestController
@RequestMapping("/auth")
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

    // 👉 2. LOGIN USER (Corrected)
    @PostMapping("/login")
    public ResponseEntity<?> loginUser(@RequestBody Map<String, String> loginData) {
        // Null check add kiya taaki crash na ho
        if (!loginData.containsKey("email") || !loginData.containsKey("password")) {
            return ResponseEntity.badRequest().body("Email and Password are required!");
        }

        String email = loginData.get("email").trim();
        String password = loginData.get("password");

        User user = userRepository.findByEmail(email);

        if (user != null && passwordEncoder.matches(password, user.getPassword())) {
            
            // ✅ Token EMAIL se bana rahe hain (Frontend ko yahi bhejna hoga)
            String token = "Basic " + java.util.Base64.getEncoder()
                    .encodeToString((user.getEmail() + ":" + password).getBytes());

            Map<String, String> response = new HashMap<>();
            response.put("token", token);
            response.put("username", user.getUsername());
            response.put("email", user.getEmail()); // Email bhi bhej diya safe side
            response.put("message", "Login Successful!");

            return ResponseEntity.ok(response);
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
        user.setOtp(null); // OTP use hone ke baad delete karein
        userRepository.save(user);

        return ResponseEntity.ok("Password Reset Successful!");
    }

    // 👉 5. GET CURRENT USER DETAILS (🔥 FIXED THIS PART)
    @GetMapping("/me")
    public ResponseEntity<?> getCurrentUser(Principal principal) {
        if (principal == null) {
            return ResponseEntity.status(401).body("Unauthorized");
        }

        // ⚠️ CRITICAL FIX:
        // Kyunki Token 'Email' se bana hai, principal.getName() humein EMAIL dega.
        // Isliye humein 'findByEmail' use karna padega, na ki 'findByUsername'.
        
        String emailFromToken = principal.getName();
        User user = userRepository.findByEmail(emailFromToken);

        if (user != null) {
            Map<String, String> userData = new HashMap<>();
            userData.put("username", user.getUsername());
            userData.put("email", user.getEmail());
            userData.put("mobile", user.getMobile());
            
            return ResponseEntity.ok(userData);
        }
        
        return ResponseEntity.badRequest().body("User not found");
    }

}