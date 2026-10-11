
package br.com.meubairro.backend.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import br.com.meubairro.backend.entity.Occurrence;
import br.com.meubairro.backend.service.OccurrenceService;
import br.com.meubairro.backend.service.OccurrenceService.OccurrenceRequest;

@RestController
@RequestMapping("/api/occurrences")
public class OccurrenceController {

    private final OccurrenceService occurrenceService;

    public OccurrenceController(OccurrenceService occurrenceService) {
        this.occurrenceService = occurrenceService;
    }

    @GetMapping
    public List<Occurrence> findAll() {
        return occurrenceService.findAll();
    }

    @GetMapping("/{id}")
    public Occurrence findById(@PathVariable Long id) {
        return occurrenceService.findById(id);
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public Occurrence create(@RequestBody OccurrenceRequest request) {
        return occurrenceService.create(request);
    }
}
