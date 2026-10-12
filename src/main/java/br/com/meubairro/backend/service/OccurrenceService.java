
package br.com.meubairro.backend.service;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import br.com.meubairro.backend.entity.Category;
import br.com.meubairro.backend.entity.Occurrence;
import br.com.meubairro.backend.entity.User;
import br.com.meubairro.backend.repository.CategoryRepository;
import br.com.meubairro.backend.repository.OccurrenceRepository;
import br.com.meubairro.backend.repository.UserRepository;

@Service
public class OccurrenceService {

    private final OccurrenceRepository occurrenceRepository;
    private final CategoryRepository categoryRepository;
    private final UserRepository userRepository;

    public OccurrenceService(
            OccurrenceRepository occurrenceRepository,
            CategoryRepository categoryRepository,
            UserRepository userRepository) {
        this.occurrenceRepository = occurrenceRepository;
        this.categoryRepository = categoryRepository;
        this.userRepository = userRepository;
    }

    public List<Occurrence> findAll() {
        return occurrenceRepository.findAll();
    }

    public List<Occurrence> findByBairro(String bairro) {
        return occurrenceRepository.findByBairroIgnoreCase(bairro);
    }

    public Occurrence findById(Long id) {
        return occurrenceRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.NOT_FOUND,
                        "Ocorrência não encontrada"));
    }

    public Occurrence create(OccurrenceRequest request) {

        Authentication authentication =
                SecurityContextHolder.getContext().getAuthentication();

        if (authentication == null
                || !authentication.isAuthenticated()
                || authentication.getName() == null) {
            throw new ResponseStatusException(
                    HttpStatus.UNAUTHORIZED,
                    "Usuário não autenticado");
        }

        String email = authentication.getName();

        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.UNAUTHORIZED,
                        "Usuário autenticado não encontrado"));

        Category category = categoryRepository.findById(
                request.getCategoryId())
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.NOT_FOUND,
                        "Categoria não encontrada"));

        Occurrence occurrence = new Occurrence();

        occurrence.setTitulo(request.getTitulo());
        occurrence.setDescricao(request.getDescricao());
        occurrence.setBairro(request.getBairro());
        occurrence.setRua(request.getRua());
        occurrence.setEndereco(request.getEndereco());
        occurrence.setCategory(category);
        occurrence.setUser(user);

        return occurrenceRepository.save(occurrence);
    }

    public static class OccurrenceRequest {

        private String titulo;
        private String descricao;
        private String bairro;
        private String rua;
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

        public String getBairro() {
            return bairro;
        }

        public void setBairro(String bairro) {
            this.bairro = bairro;
        }

        public String getRua() {
            return rua;
        }

        public void setRua(String rua) {
            this.rua = rua;
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
