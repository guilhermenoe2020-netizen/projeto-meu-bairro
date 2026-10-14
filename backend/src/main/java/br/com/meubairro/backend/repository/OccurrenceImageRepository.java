package br.com.meubairro.backend.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import br.com.meubairro.backend.entity.OccurrenceImage;

public interface OccurrenceImageRepository
        extends JpaRepository<OccurrenceImage, Long> {

    List<OccurrenceImage> findByOccurrenceId(Long occurrenceId);

    long countByOccurrenceId(Long occurrenceId);
}
