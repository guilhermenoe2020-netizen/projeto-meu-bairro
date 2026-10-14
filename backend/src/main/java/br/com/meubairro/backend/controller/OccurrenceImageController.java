package br.com.meubairro.backend.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import br.com.meubairro.backend.entity.OccurrenceImage;
import br.com.meubairro.backend.service.OccurrenceImageService;

@RestController
@RequestMapping("/api/occurrences/{occurrenceId}/images")
public class OccurrenceImageController {

    private final OccurrenceImageService imageService;

    public OccurrenceImageController(OccurrenceImageService imageService) {
        this.imageService = imageService;
    }

    @GetMapping
    public List<OccurrenceImage> findByOccurrence(
            @PathVariable Long occurrenceId) {
        return imageService.findByOccurrence(occurrenceId);
    }

    @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    @ResponseStatus(HttpStatus.CREATED)
    public List<OccurrenceImage> upload(
            @PathVariable Long occurrenceId,
            @RequestParam("files") List<MultipartFile> files) {
        return imageService.upload(occurrenceId, files);
    }
}
