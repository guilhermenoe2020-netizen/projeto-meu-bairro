package br.com.meubairro.backend.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

import br.com.meubairro.backend.entity.Category;
import br.com.meubairro.backend.entity.Occurrence;
import br.com.meubairro.backend.repository.CategoryRepository;
import br.com.meubairro.backend.repository.OccurrenceRepository;

@RestController
@RequestMapping("/api/occurrences")
public class OccurrenceController {

    private final OccurrenceRepository occurrenceRepository;
    private final CategoryRepository categoryRepository;

    public OccurrenceController(OccurrenceRepository occurrenceRepository,CategoryRepository categoryRepository) {
        this.occurrenceRepository = occurrenceRepository;
        this.categoryRepository = categoryRepository;
    }

    @GetMapping
    public List<Occurrence> findAll() {
        return occurrenceRepository.findAll();
    }
    
    @GetMapping("/{id}")
    public Occurrence findById(@PathVariable Long id) {
        return occurrenceRepository.findById(id).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Ocorrência não encontrada"));
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public Occurrence create(@RequestBody OccurrenceRequest request) {

        Category category = categoryRepository.findById(request.getCategoryId())
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Categoria não encontrada"));

        Occurrence occurrence = new Occurrence();
        occurrence.setTitulo(request.getTitulo());
        occurrence.setDescricao(request.getDescricao());
        occurrence.setEndereco(request.getEndereco());
        occurrence.setCategory(category);

        return occurrenceRepository.save(occurrence);
    }

    public static class OccurrenceRequest {

        private String titulo;
        private String descricao;
        private String endereco;
        private Long categoryId;

        public String getTitulo() {
            return titulo;
        }

        public void setTitulo(String titulo) {
            this.titulo = titulo;
        }

        public String getDescricao() {
            return descricao;
        }

        public void setDescricao(String descricao) {
            this.descricao = descricao;
        }

        public String getEndereco() {
            return endereco;
        }

        public void setEndereco(String endereco) {
            this.endereco = endereco;
        }

        public Long getCategoryId() {
            return categoryId;
        }

        public void setCategoryId(Long categoryId) {
            this.categoryId = categoryId;
        }
    }
}
