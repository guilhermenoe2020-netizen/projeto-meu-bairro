
package br.com.meubairro.backend.controller;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import br.com.meubairro.backend.entity.Confirmation;
import br.com.meubairro.backend.service.ConfirmationService;

import java.util.Map;

@RestController
@RequestMapping("/api/occurrences")
public class ConfirmationController {

    private final ConfirmationService confirmationService;

    public ConfirmationController(
            ConfirmationService confirmationService) {
        this.confirmationService = confirmationService;
    }

    @PostMapping("/{occurrenceId}/confirmations")
    @ResponseStatus(HttpStatus.CREATED)
    public Confirmation confirm(@PathVariable Long occurrenceId) {
        return confirmationService.confirm(occurrenceId);
    }

    @GetMapping("/{occurrenceId}/confirmations/count")
    public Map<String, Object> count(
            @PathVariable Long occurrenceId) {

        long total =
                confirmationService.countByOccurrence(occurrenceId);

        return Map.of(
                "occurrenceId", occurrenceId,
                "totalConfirmations", total
        );
    }
}
