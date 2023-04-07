package com.backend.Entity;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToMany;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;

import lombok.Data;

@Entity
@Data
public class Note {

  @Id
  @GeneratedValue(strategy = GenerationType.AUTO)
  private Long id;

  private String title;

  private String description;

  private boolean archived;

  @JsonIgnore
  @ManyToMany(cascade = {CascadeType.MERGE,CascadeType.PERSIST}, targetEntity = Category.class, fetch = FetchType.LAZY)
  private List<Category> categories = new ArrayList<>();

  public void cleanCategories(){
    categories.clear();
  }

  public void addCategory(Category category){
    if (!categories.contains(category)){
      categories.add(category);
      category.addNote(this);
    }
  }

  public void removeCategory(Category category){
    if (categories.contains(category)){
      categories.remove(category);
      category.removeNote(this);
    }
  }
}
