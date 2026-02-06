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

@RestController
@RequestMapping("/notes")
// ❌ @CrossOrigin hata diya kyunki SecurityConfig sambhal raha hai
public class NoteController {

    @Autowired
    private NoteRepository noteRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ImageService imageService;

    // 🔥 1. Get Notes (FIXED: findByEmail)
    @GetMapping
    public List<Note> getNotes(Principal principal) {
        // Token se Email milega, isliye findByEmail use karein
        User user = userRepository.findByEmail(principal.getName());
        return noteRepository.findByUser(user);
    }

    // 🔥 2. Add Note (FIXED: findByEmail)
    @PostMapping
    public ResponseEntity<?> createNote(
            @RequestParam("title") String title,
            @RequestParam("content") String content,
            @RequestParam(value = "file", required = false) MultipartFile file,
            Principal principal
    ) {
        // Yahan bhi fix kiya
        User user = userRepository.findByEmail(principal.getName());

        Note note = new Note();
        note.setTitle(title);
        note.setContent(content);
        note.setUser(user);
        note.setCreatedAt(LocalDateTime.now());

        if (file != null && !file.isEmpty()) {
            String imageUrl = imageService.uploadImage(file);
            note.setAttachmentUrl(imageUrl);
        }

        noteRepository.save(note);
        return ResponseEntity.ok("Note Added!");
    }

    // 🔥 3. Delete Note (Secure Way)
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteNote(@PathVariable Long id, Principal principal) {
        User user = userRepository.findByEmail(principal.getName());
        
        // Check karo note exist karta hai ya nahi
        Note note = noteRepository.findById(id).orElse(null);
        
        if(note == null) {
             return ResponseEntity.badRequest().body("Note not found");
        }

        // 🔒 Security Check: Kya ye note isi user ka hai?
        if (!note.getUser().getId().equals(user.getId())) {
            return ResponseEntity.status(403).body("You can only delete your own notes!");
        }

        noteRepository.delete(note);
        return ResponseEntity.ok("Deleted");
    }
}