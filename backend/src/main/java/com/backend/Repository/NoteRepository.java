package com.backend.Repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.backend.Entity.Note;

public interface NoteRepository extends JpaRepository<Note, Long>{
  
}
