
package br.com.meubairro.backend.service;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import br.com.meubairro.backend.entity.Category;
import br.com.meubairro.backend.entity.Occurrence;
import br.com.meubairro.backend.repository.CategoryRepository;
import br.com.meubairro.backend.repository.OccurrenceRepository;

@Service
public class OccurrenceService {

    private final OccurrenceRepository occurrenceRepository;
    private final CategoryRepository categoryRepository;

    public OccurrenceService(
            OccurrenceRepository occurrenceRepository,
            CategoryRepository categoryRepository) {
        this.occurrenceRepository = occurrenceRepository;
        this.categoryRepository = categoryRepository;
    }

    public List<Occurrence> findAll() {
        return occurrenceRepository.findAll();
    }

    public Occurrence findById(Long id) {
        return occurrenceRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.NOT_FOUND,
                        "Ocorrência não encontrada"));
    }

    public Occurrence create(OccurrenceRequest request) {
        Category category = categoryRepository.findById(request.getCategoryId())
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.NOT_FOUND,
                        "Categoria não encontrada"));

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