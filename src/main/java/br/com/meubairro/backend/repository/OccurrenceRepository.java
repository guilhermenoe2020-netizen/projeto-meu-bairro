
package br.com.meubairro.backend.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import br.com.meubairro.backend.entity.Occurrence;

public interface OccurrenceRepository
        extends JpaRepository<Occurrence, Long> {

    List<Occurrence> findByBairroIgnoreCase(String bairro);

    List<Occurrence> findByUserEmailIgnoreCase(String email);
}
