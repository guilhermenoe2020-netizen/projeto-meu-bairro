package br.com.meubairro.backend.service;

import java.util.List;
import java.util.Set;

import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.server.ResponseStatusException;

import br.com.meubairro.backend.entity.Occurrence;
import br.com.meubairro.backend.entity.OccurrenceImage;
import br.com.meubairro.backend.repository.OccurrenceImageRepository;
import br.com.meubairro.backend.repository.OccurrenceRepository;

@Service
public class OccurrenceImageService {

    private static final int MAX_IMAGES = 3;
    private static final long MAX_SIZE = 5L * 1024 * 1024;

    private static final Set<String> ALLOWED_TYPES = Set.of(
        "image/jpeg",
        "image/png",
        "image/webp"
    );

    private final OccurrenceRepository occurrenceRepository;
    private final OccurrenceImageRepository imageRepository;
    private final CloudinaryService cloudinaryService;

    public OccurrenceImageService(
            OccurrenceRepository occurrenceRepository,
            OccurrenceImageRepository imageRepository,
            CloudinaryService cloudinaryService) {
        this.occurrenceRepository = occurrenceRepository;
        this.imageRepository = imageRepository;
        this.cloudinaryService = cloudinaryService;
    }

    @Transactional
    public List<OccurrenceImage> upload(Long occurrenceId,
                                        List<MultipartFile> files) {
        Occurrence occurrence = occurrenceRepository.findById(occurrenceId)
            .orElseThrow(() -> new ResponseStatusException(
                HttpStatus.NOT_FOUND, "Ocorrência não encontrada"));

        if (files == null || files.isEmpty()) {
            throw new ResponseStatusException(
                HttpStatus.BAD_REQUEST, "Envie pelo menos uma foto");
        }

        long existing = imageRepository.countByOccurrenceId(occurrenceId);

        if (existing + files.size() > MAX_IMAGES) {
            throw new ResponseStatusException(
                HttpStatus.BAD_REQUEST,
                "Cada ocorrência pode ter no máximo 3 fotos");
        }

        for (MultipartFile file : files) {
            if (file == null || file.isEmpty()) {
                throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST, "Uma das fotos está vazia");
            }

            if (file.getSize() > MAX_SIZE) {
                throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST,
                    "Cada foto deve ter no máximo 5 MB");
            }

            if (!ALLOWED_TYPES.contains(file.getContentType())) {
                throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST,
                    "Formato inválido. Use JPG, PNG ou WebP");
            }
        }

        for (MultipartFile file : files) {
            try {
                String url = cloudinaryService.uploadImage(file.getBytes());
                imageRepository.save(new OccurrenceImage(url, occurrence));
            } catch (Exception e) {
                throw new ResponseStatusException(
                    HttpStatus.BAD_GATEWAY,
                    "Não foi possível enviar uma foto para armazenamento");
            }
        }

        return imageRepository.findByOccurrenceId(occurrenceId);
    }

    public List<OccurrenceImage> findByOccurrence(Long occurrenceId) {
        if (!occurrenceRepository.existsById(occurrenceId)) {
            throw new ResponseStatusException(
                HttpStatus.NOT_FOUND, "Ocorrência não encontrada");
        }

        return imageRepository.findByOccurrenceId(occurrenceId);
    }
}
