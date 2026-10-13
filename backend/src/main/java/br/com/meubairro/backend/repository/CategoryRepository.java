
package br.com.meubairro.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import br.com.meubairro.backend.entity.Category;

public interface CategoryRepository extends JpaRepository<Category, Long> {
}
