package com.backend.Controller;

import java.util.Collections;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.backend.Entity.Note;
import com.backend.Service.NoteService;

@CrossOrigin(origins = "http://localhost:3000", methods = {RequestMethod.GET,RequestMethod.POST,RequestMethod.DELETE,RequestMethod.PUT,RequestMethod.OPTIONS})
@RestController
@RequestMapping("/api")
public class NoteController {

  @Autowired
  private NoteService noteService;

  @GetMapping("/notes/{id}")
  public ResponseEntity<Note> getById(@PathVariable Long id) {
    try {
      Note note = noteService.getById(id);
      return new ResponseEntity<Note>(note, HttpStatus.CREATED);
    } catch (Exception e) {
      return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @GetMapping("/notes")
  public ResponseEntity<List<Note>> getAll() {
    try {
      List<Note> notes = noteService.getAll();
      return new ResponseEntity<List<Note>>(notes, HttpStatus.OK);
    } catch (Exception e) {
      return new ResponseEntity<List<Note>>(Collections.emptyList(),HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @PostMapping("/notes")
  public ResponseEntity<Note> createNote(@RequestBody Note note){
    try {
      Note newNote = noteService.createNote(note);
      return new ResponseEntity<Note>(newNote,HttpStatus.CREATED);
    } catch (Exception e) {
      return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @PutMapping("/notes/edit/{id}")
  public ResponseEntity<Note> editNote(@RequestBody Note note, @PathVariable Long id) {
    try {
      Note editNote = noteService.editNote(note, id);
      return new ResponseEntity<Note>(editNote, HttpStatus.OK);
    } catch (Exception e) {
      return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @DeleteMapping("/notes/delete/{id}")
  public ResponseEntity<HttpStatus> deleteNote(@PathVariable Long id){
    try {
      noteService.deleteNote(id);
      return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    } catch (Exception e) {
      return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
