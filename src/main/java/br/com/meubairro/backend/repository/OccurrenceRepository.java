
package br.com.meubairro.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import br.com.meubairro.backend.entity.Occurrence;

public interface OccurrenceRepository extends JpaRepository<Occurrence, Long> {

}
