package com.secure.notes_backend.controllers;

import com.secure.notes_backend.models.Note;
import com.secure.notes_backend.models.User;
import com.secure.notes_backend.repositories.NoteRepository;
import com.secure.notes_backend.repositories.UserRepository;
import com.secure.notes_backend.services.ImageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.security.Principal;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/notes")
// Ab localhost AUR Render wala frontend dono allow honge
@CrossOrigin(origins = { "http://localhost:3000", "https://secret-notes-frontend.onrender.com" })
public class NoteController {

    @Autowired
    private NoteRepository noteRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ImageService imageService; // 🔥 Image Service Joda

    @GetMapping
    public List<Note> getNotes(Principal principal) {
        User user = userRepository.findByUsername(principal.getName()).get();
        return noteRepository.findByUser(user);
    }

    // 🔥 Note Add karne ka Naya Tareeka (With Image)
    @PostMapping
    public ResponseEntity<?> createNote(
            @RequestParam("title") String title,
            @RequestParam("content") String content,
            @RequestParam(value = "file", required = false) MultipartFile file, // File Optional hai
            Principal principal
    ) {
        User user = userRepository.findByUsername(principal.getName()).get();

        Note note = new Note();
        note.setTitle(title);
        note.setContent(content);
        note.setUser(user);
        note.setCreatedAt(LocalDateTime.now());

        // Agar File aayi hai to Upload karo
        if (file != null && !file.isEmpty()) {
            String imageUrl = imageService.uploadImage(file);
            note.setAttachmentUrl(imageUrl); // DB me URL save karo
        }

        noteRepository.save(note);
        return ResponseEntity.ok("Note Added!");
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteNote(@PathVariable Long id, Principal principal) {
        // ... Delete logic waisa hi rahega ...
        noteRepository.deleteById(id);
        return ResponseEntity.ok("Deleted");
    }
}