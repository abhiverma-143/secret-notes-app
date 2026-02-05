package com.secure.notes_backend.repositories;

import com.secure.notes_backend.models.Note;
import com.secure.notes_backend.models.User;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface NoteRepository extends JpaRepository<Note, Long> {
    // 🔥 Ye line missing thi, isliye error aa raha tha
   List<Note> findByUser(User user);
}