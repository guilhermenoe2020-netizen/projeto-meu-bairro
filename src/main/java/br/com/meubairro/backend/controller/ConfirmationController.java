
package br.com.meubairro.backend.controller;

import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import br.com.meubairro.backend.entity.Confirmation;
import br.com.meubairro.backend.service.ConfirmationService;

@RestController
@RequestMapping("/api/occurrences")
public class ConfirmationController {

    private final ConfirmationService confirmationService;

    public ConfirmationController(
            ConfirmationService confirmationService) {
        this.confirmationService = confirmationService;
    }

    // Registrar uma confirmação
    @PostMapping("/{occurrenceId}/confirmations")
    @ResponseStatus(HttpStatus.CREATED)
    public Confirmation confirm(
            @PathVariable Long occurrenceId) {

        return confirmationService.confirm(occurrenceId);
    }

    // Consultar a quantidade de confirmações
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

    // Consultar se o usuário autenticado já confirmou
    @GetMapping("/{occurrenceId}/confirmations/me")
    public Map<String, Object> myConfirmation(
            @PathVariable Long occurrenceId) {

        boolean confirmed =
                confirmationService.hasConfirmed(occurrenceId);

        return Map.of(
                "occurrenceId", occurrenceId,
                "confirmed", confirmed
        );
    }
}
