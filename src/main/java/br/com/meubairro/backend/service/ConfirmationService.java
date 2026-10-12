
package br.com.meubairro.backend.service;

import org.springframework.http.HttpStatus;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

import br.com.meubairro.backend.entity.Confirmation;
import br.com.meubairro.backend.entity.Occurrence;
import br.com.meubairro.backend.entity.User;
import br.com.meubairro.backend.repository.ConfirmationRepository;
import br.com.meubairro.backend.repository.OccurrenceRepository;
import br.com.meubairro.backend.repository.UserRepository;

@Service
public class ConfirmationService {

    private final ConfirmationRepository confirmationRepository;
    private final OccurrenceRepository occurrenceRepository;
    private final UserRepository userRepository;

    public ConfirmationService(
            ConfirmationRepository confirmationRepository,
            OccurrenceRepository occurrenceRepository,
            UserRepository userRepository) {
        this.confirmationRepository = confirmationRepository;
        this.occurrenceRepository = occurrenceRepository;
        this.userRepository = userRepository;
    }

    @Transactional
    public Confirmation confirm(Long occurrenceId) {

        Authentication authentication =
                SecurityContextHolder.getContext().getAuthentication();

        if (authentication == null
                || !authentication.isAuthenticated()
                || authentication.getName() == null) {
            throw new ResponseStatusException(
                    HttpStatus.UNAUTHORIZED,
                    "Usuário não autenticado");
        }

        User user = userRepository
                .findByEmail(authentication.getName())
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.UNAUTHORIZED,
                        "Usuário não encontrado"));

        Occurrence occurrence = occurrenceRepository
                .findById(occurrenceId)
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.NOT_FOUND,
                        "Ocorrência não encontrada"));

        boolean alreadyConfirmed =
                confirmationRepository.existsByUserIdAndOccurrenceId(
                        user.getId(),
                        occurrenceId);

        if (alreadyConfirmed) {
            throw new ResponseStatusException(
                    HttpStatus.CONFLICT,
                    "Você já confirmou esta ocorrência");
        }

        Confirmation confirmation = new Confirmation();
        confirmation.setUser(user);
        confirmation.setOccurrence(occurrence);

        return confirmationRepository.save(confirmation);
    }

    public long countByOccurrence(Long occurrenceId) {

        if (!occurrenceRepository.existsById(occurrenceId)) {
            throw new ResponseStatusException(
                    HttpStatus.NOT_FOUND,
                    "Ocorrência não encontrada");
        }

        return confirmationRepository.countByOccurrenceId(occurrenceId);
    }
}
