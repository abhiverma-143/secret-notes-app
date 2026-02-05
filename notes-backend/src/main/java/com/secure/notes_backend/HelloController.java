package com.secure.notes_backend;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class HelloController {

    @GetMapping("/")
    public String sayHello() {
        return "🎉 Welcome to Secure Notes App! Login Successful! 🔐";
    }
}