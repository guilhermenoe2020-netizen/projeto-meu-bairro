
package br.com.meubairro.backend.controller;

import br.com.meubairro.backend.entity.Category;
import br.com.meubairro.backend.repository.CategoryRepository;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/Categorys")
public class CategoryController {

    private final CategoryRepository CategoryRepository;

    public CategoryController(CategoryRepository CategoryRepository) {
        this.CategoryRepository = CategoryRepository;
    }

    @GetMapping
    public List<Category> listar() {
        return CategoryRepository.findAll();
    }
}
