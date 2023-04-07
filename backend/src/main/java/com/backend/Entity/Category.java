package com.backend.Entity;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToMany;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;

import lombok.Data;

@Entity
@Data
public class Category {
  
  @Id
  @GeneratedValue(strategy = GenerationType.AUTO)
  private Long id;

  private String name;
  
  @JsonIgnore
  @ManyToMany(mappedBy = "categories", fetch = FetchType.LAZY)
  private List<Note> notes = new ArrayList<>();

  public void addNote (Note note){
    if(!notes.contains(note)){
      notes.add(note);
      note.addCategory(this);
    }
  }

  public void removeNote (Note note){
    if (notes.contains(note)){
      notes.remove(note);
      note.removeCategory(this);
    }
  }
}
