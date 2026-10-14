
package br.com.meubairro.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import br.com.meubairro.backend.entity.Confirmation;

public interface ConfirmationRepository
        extends JpaRepository<Confirmation, Long> {

    boolean existsByUserIdAndOccurrenceId(
        Long userId,
        Long occurrenceId
    );

    long countByOccurrenceId(Long occurrenceId);

    void deleteAllByOccurrenceId(Long occurrenceId);
}
