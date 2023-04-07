package com.backend.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import javax.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.backend.Entity.Category;
import com.backend.Entity.Note;
import com.backend.Repository.NoteRepository;

@Service
public class NoteService {
  
  @Autowired
  private NoteRepository noteRepository;

  @Autowired
  private CategoryService categoryService;

  @Transactional
  public List<Note> getAll(){
    try {
      return noteRepository.findAll();
    } catch (Exception e) {
      System.err.println(e.getMessage());
      return null;
    }
  } 

  @Transactional
  public Note getById(Long id){
    try {
      Optional<Note> response = noteRepository.findById(id);
      if (response.isPresent()){
        return response.get();
      }else{
        throw new Exception("No se encontró la nota con el id:" + id);
      }
    } catch (Exception e) {
      return null;
    }
  }

  @Transactional
  public Note createNote(Note note){
    try {

      List<Category> detachedCategories = note.getCategories();

      List<Category> contextCategories = new ArrayList<>();

      for (Category detachedCategory : detachedCategories) {
        Category contextCategory = categoryService.findByName(detachedCategory.getName());
        contextCategories.add(contextCategory);
      }

      note.setCategories(contextCategories);

      for (Category category : contextCategories) {
        category.addNote(note);
      }

      return noteRepository.save(note);
    } catch (Exception e) {
      System.err.println(e.getMessage());
      return null;
    }
  }

  @Transactional
  public Note editNote(Note note, Long id){
    try {
      Optional<Note> response = noteRepository.findById(id);
      if (response.isPresent()){
        note.setId(id);
        return noteRepository.save(note);
      }else{
        throw new Exception("No se encontró la nota con el id:" + id);
      }
    } catch (Exception e) {
      System.err.println(e.getMessage());
      return null;
    }
  }

  @Transactional
  public void deleteNote(Long id){
    try {
      noteRepository.deleteById(id);
    } catch (Exception e) {
      System.err.println(e.getMessage());
    }
  }

}
