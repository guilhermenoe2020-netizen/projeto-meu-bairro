package br.com.meubairro.backend.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "tb_occurrence_image")
public class OccurrenceImage {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 1000)
    private String imageUrl;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "occurrence_id", nullable = false)
    private Occurrence occurrence;

    public OccurrenceImage() {
    }

    public OccurrenceImage(String imageUrl, Occurrence occurrence) {
        this.imageUrl = imageUrl;
        this.occurrence = occurrence;
    }

    public Long getId() {
        return id;
    }

    public String getImageUrl() {
        return imageUrl;
    }

    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
    }

    public Occurrence getOccurrence() {
        return occurrence;
    }

    public void setOccurrence(Occurrence occurrence) {
        this.occurrence = occurrence;
    }
}
