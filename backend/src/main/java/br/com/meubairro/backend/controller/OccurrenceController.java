
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

    @GetMapping("/mine")
    public List<Occurrence> findMine() {
        return occurrenceService.findMine();
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

    @PutMapping("/{id}")
    public Occurrence update(
            @PathVariable Long id,
            @RequestBody OccurrenceService.OccurrenceRequest request) {
        return occurrenceService.update(id, request);
    }

    @PatchMapping("/{id}/status")
    public Occurrence updateStatus(
            @PathVariable Long id,
            @RequestBody OccurrenceService.StatusRequest request) {
        return occurrenceService.updateStatus(id, request);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void delete(@PathVariable Long id) {
        occurrenceService.delete(id);
    }
}
