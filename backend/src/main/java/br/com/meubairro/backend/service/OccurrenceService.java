
package br.com.meubairro.backend.service;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

import br.com.meubairro.backend.entity.Category;
import br.com.meubairro.backend.entity.Occurrence;
import br.com.meubairro.backend.entity.User;
import br.com.meubairro.backend.repository.CategoryRepository;
import br.com.meubairro.backend.repository.ConfirmationRepository;
import br.com.meubairro.backend.repository.OccurrenceImageRepository;
import br.com.meubairro.backend.repository.OccurrenceRepository;
import br.com.meubairro.backend.repository.UserRepository;

@Service
public class OccurrenceService {

    private final OccurrenceRepository occurrenceRepository;
    private final CategoryRepository categoryRepository;
    private final UserRepository userRepository;
    private final ConfirmationRepository confirmationRepository;
    private final OccurrenceImageRepository occurrenceImageRepository;

    public OccurrenceService(
            OccurrenceRepository occurrenceRepository,
            CategoryRepository categoryRepository,
            UserRepository userRepository,
            ConfirmationRepository confirmationRepository,
            OccurrenceImageRepository occurrenceImageRepository) {

        this.occurrenceRepository = occurrenceRepository;
        this.categoryRepository = categoryRepository;
        this.userRepository = userRepository;
        this.confirmationRepository = confirmationRepository;
        this.occurrenceImageRepository = occurrenceImageRepository;
    }

    public List<Occurrence> findAll() {
        return occurrenceRepository.findAll();
    }

    public List<Occurrence> findByBairro(String bairro) {
        return occurrenceRepository.findByBairroIgnoreCase(bairro);
    }

    public List<Occurrence> findMine() {
        User user = getAuthenticatedUser();

        return occurrenceRepository.findByUserEmailIgnoreCase(
                user.getEmail());
    }

    public Occurrence findById(Long id) {
        return occurrenceRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.NOT_FOUND,
                        "Ocorrência não encontrada"));
    }

    @Transactional
    public Occurrence create(OccurrenceRequest request) {
        User user = getAuthenticatedUser();

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
        occurrence.setCep(request.getCep());
        occurrence.setComplemento(request.getComplemento());
        occurrence.setEndereco(request.getEndereco());
        occurrence.setCategory(category);
        occurrence.setUser(user);

        return occurrenceRepository.save(occurrence);
    }

    @Transactional
    public Occurrence update(Long id, OccurrenceRequest request) {
        Occurrence occurrence = findById(id);
        verifyOwner(occurrence);

        Category category = categoryRepository.findById(
                request.getCategoryId())
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.NOT_FOUND,
                        "Categoria não encontrada"));

        occurrence.setTitulo(request.getTitulo());
        occurrence.setDescricao(request.getDescricao());
        occurrence.setBairro(request.getBairro());
        occurrence.setRua(request.getRua());
        occurrence.setCep(request.getCep());
        occurrence.setComplemento(request.getComplemento());
        occurrence.setEndereco(request.getEndereco());
        occurrence.setCategory(category);

        return occurrenceRepository.save(occurrence);
    }

    @Transactional
    public Occurrence updateStatus(
            Long id,
            StatusRequest request) {

        Occurrence occurrence = findById(id);
        verifyOwner(occurrence);

        String novoStatus = request.getStatus();

        if (novoStatus == null
                || !("PENDENTE".equals(novoStatus)
                || "RESOLVIDO".equals(novoStatus))) {

            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST,
                    "Status inválido");
        }

        if ("RESOLVIDO".equals(novoStatus)) {

            if (request.getDataResolucao() == null) {
                throw new ResponseStatusException(
                        HttpStatus.BAD_REQUEST,
                        "Informe a data em que a ocorrência foi resolvida");
            }

            if (request.getDataResolucao().isAfter(
                    LocalDateTime.now())) {
                throw new ResponseStatusException(
                        HttpStatus.BAD_REQUEST,
                        "A data de resolução não pode ser futura");
            }

            occurrence.setDataResolucao(
                    request.getDataResolucao());

            String responsavel = request.getResponsavelResolucao();

            if (responsavel == null || responsavel.isBlank()) {
                throw new ResponseStatusException(
                        HttpStatus.BAD_REQUEST,
                        "Informe o responsável pela resolução");
            }

            occurrence.setResponsavel_resolucao(responsavel.trim());

        } else {
            occurrence.setDataResolucao(null);
            occurrence.setResponsavel_resolucao(null);
        }

        occurrence.setStatus(novoStatus);

        return occurrenceRepository.save(occurrence);
    }

    @Transactional
    public void delete(Long id) {
        Occurrence occurrence = findById(id);

        // Apenas o autor pode excluir a ocorrência.
        verifyOwner(occurrence);

        // Remove primeiro as fotos relacionadas no banco.
        occurrenceImageRepository.deleteAllByOccurrenceId(id);

        // Remove as confirmações relacionadas.
        confirmationRepository.deleteAllByOccurrenceId(id);

        // Exclui a ocorrência.
        occurrenceRepository.delete(occurrence);
    }

    private User getAuthenticatedUser() {
        Authentication authentication =
                SecurityContextHolder.getContext().getAuthentication();

        if (authentication == null
                || !authentication.isAuthenticated()
                || authentication.getName() == null
                || authentication.getName().equals("anonymousUser")) {

            throw new ResponseStatusException(
                    HttpStatus.UNAUTHORIZED,
                    "Usuário não autenticado");
        }

        return userRepository.findByEmail(authentication.getName())
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.UNAUTHORIZED,
                        "Usuário autenticado não encontrado"));
    }

    private void verifyOwner(Occurrence occurrence) {
        User user = getAuthenticatedUser();

        if (occurrence.getUser() == null
                || !occurrence.getUser().getEmail()
                        .equalsIgnoreCase(user.getEmail())) {

            throw new ResponseStatusException(
                    HttpStatus.FORBIDDEN,
                    "Você não tem permissão para alterar esta ocorrência");
        }
    }

    public static class OccurrenceRequest {

        private String titulo;
        private String descricao;
        private String bairro;
        private String rua;
        private String cep;
        private String complemento;
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

        public String getCep() {
            return cep;
        }

        public void setCep(String cep) {
            this.cep = cep;
        }

        public String getComplemento() {
            return complemento;
        }

        public void setComplemento(String complemento) {
            this.complemento = complemento;
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


public static class StatusRequest {

    private String status;
    private LocalDateTime dataResolucao;
    private String responsavelResolucao;

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public LocalDateTime getDataResolucao() {
        return dataResolucao;
    }

    public void setDataResolucao(LocalDateTime dataResolucao) {
        this.dataResolucao = dataResolucao;
    }

    public String getResponsavelResolucao() {
        return responsavelResolucao;
    }

    public void setResponsavelResolucao(String responsavelResolucao) {
        this.responsavelResolucao = responsavelResolucao;
    }
}

}