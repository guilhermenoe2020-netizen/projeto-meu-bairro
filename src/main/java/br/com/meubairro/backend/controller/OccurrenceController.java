
package br.com.meubairro.backend.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import br.com.meubairro.backend.entity.Occurrence;
import br.com.meubairro.backend.service.OccurrenceService;

@RestController
@RequestMapping("/api/occurrences")
public class OccurrenceController {

    private final OccurrenceService occurrenceService;

    public OccurrenceController(
            OccurrenceService occurrenceService) {
        this.occurrenceService = occurrenceService;
    }

    @GetMapping
    public List<Occurrence> findAll(
            @RequestParam(required = false) String bairro) {

        if (bairro != null && !bairro.isBlank()) {
            return occurrenceService.findByBairro(bairro.trim());
        }

        return occurrenceService.findAll();
    }

    @GetMapping("/{id}")
    public Occurrence findById(@PathVariable Long id) {
        return occurrenceService.findById(id);
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public Occurrence create(
            @RequestBody OccurrenceService.OccurrenceRequest request) {
        return occurrenceService.create(request);
    }
}
