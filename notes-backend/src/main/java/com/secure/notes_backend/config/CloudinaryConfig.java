package com.secure.notes_backend.config;

import com.cloudinary.Cloudinary;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import java.util.HashMap;
import java.util.Map;

@Configuration
public class CloudinaryConfig {

    @Bean
    public Cloudinary cloudinary() {
        Map<String, String> config = new HashMap<>();
        // 🔥 Yahan Apni Cloudinary Details Daalein
        config.put("cloud_name", "debdwrquj"); 
        config.put("api_key", "886411617616819"); 
        config.put("api_secret", "nr-TIZ6AnZadnOs3ZKNgposwh-M"); 
        
        return new Cloudinary(config);
    }
}