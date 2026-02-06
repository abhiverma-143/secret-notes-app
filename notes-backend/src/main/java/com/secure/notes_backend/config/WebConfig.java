package com.secure.notes_backend.configuration; // Package ka naam apne hisab se adjust karein

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**") // Saare URLs allow karega
                .allowedOrigins(
                        "http://localhost:3000",                   // Local React
                        "https://secret-notes-frontend.onrender.com" // Render Frontend
                )
                .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS") // Sab methods allow
                .allowedHeaders("*")
                .allowCredentials(true);
    }
}