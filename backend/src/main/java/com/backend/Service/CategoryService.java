package com.backend.Service;

import java.util.List;
import java.util.Optional;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.backend.Entity.Category;
import com.backend.Repository.CategoryRepository;

@Service
public class CategoryService {

  @Autowired
  private CategoryRepository categoryRepository;

  @Transactional
  public Category findByName(String name){
    try {
      return categoryRepository.findCategoryByName(name);
    } catch (Exception e) {
      System.err.println(e.getMessage());
      return null;
    }
  }

  @Transactional
  public List<Category> getAll() {
    try {
      return categoryRepository.findAll();
    } catch (Exception e) {
      System.err.println(e.getMessage());
      return null;
    }
  }

  @Transactional
  public Category getById(Long id) {
    try {
      Optional<Category> response = categoryRepository.findById(id);
      if (response.isPresent()) {
        return response.get();
      } else {
        throw new Exception("No se encontró la nota con el id:" + id);
      }
    } catch (Exception e) {
      return null;
    }
  }

  @Transactional
  public Category createCategory(Category Category) {
    try {
      
      return categoryRepository.save(Category);
    } catch (Exception e) {
      System.err.println(e.getMessage());
      return null;
    }
  }

  @Transactional
  public Category editCategory(Category Category, Long id) {
    try {
      Optional<Category> response = categoryRepository.findById(id);
      if (response.isPresent()) {
        Category.setId(id);
        return categoryRepository.save(Category);
      } else {
        throw new Exception("No se encontró la nota con el id:" + id);
      }
    } catch (Exception e) {
      System.err.println(e.getMessage());
      return null;
    }
  }

  @Transactional
  public void deleteCategory(Long id) {
    try {
      categoryRepository.deleteById(id);
    } catch (Exception e) {
      System.err.println(e.getMessage());
    }
  }


}
