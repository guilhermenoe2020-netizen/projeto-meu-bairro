
package br.com.meubairro.backend.entity;

import jakarta.persistence.*;

@Entity
@Table(
    name = "tb_confirmation",
    uniqueConstraints = {
        @UniqueConstraint(
            columnNames = {"user_id", "occurrence_id"}
        )
    }
)
public class Confirmation {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(optional = false)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @ManyToOne(optional = false)
    @JoinColumn(name = "occurrence_id", nullable = false)
    private Occurrence occurrence;

    public Confirmation() {
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Occurrence getOccurrence() {
        return occurrence;
    }

    public void setOccurrence(Occurrence occurrence) {
        this.occurrence = occurrence;
    }
}
