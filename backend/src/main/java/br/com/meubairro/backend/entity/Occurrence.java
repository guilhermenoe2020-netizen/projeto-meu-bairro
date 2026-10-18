
package br.com.meubairro.backend.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;
import java.time.ZoneId;

@Entity
@Table(name = "tb_Occurrence")
public class Occurrence {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String titulo;

    @Column(length = 1000)
    private String descricao;

    private String bairro;

    private String rua;
    
    private String cep;
    
    private String complemento;

    private String endereco;

    private String status = "PENDENTE";
    
    private String responsavel_resolucao;
    
    private LocalDateTime dataResolucao;
    
    private LocalDateTime dataRegistro = LocalDateTime.now(ZoneId.of("America/Manaus"));

    @ManyToOne
    @JoinColumn(name = "category_id")
    private Category category;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    public Occurrence() {
    }

    public Long getId() {
        return id;
    }

    public String getTitulo() {
        return titulo;
    }

    public void setTitulo(String titulo) {
        this.titulo = titulo;
    }

    public String getDescricao() {
        return descricao;
    }

    public void setDescricao(String descricao) {
        this.descricao = descricao;
    }

    public String getBairro() {
        return bairro;
    }

    public void setBairro(String bairro) {
        this.bairro = bairro;
    }

    public String getRua() {
        return rua;
    }

    public void setRua(String rua) {
        this.rua = rua;
    }

    public String getCep() {
        return cep;
    }

    public void setCep(String cep) {
        this.cep = cep;
    }
    
 
    public String getEndereco() {
        return endereco;
    }

    public void setEndereco(String endereco) {
        this.endereco = endereco;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public LocalDateTime getDataRegistro() {
        return dataRegistro;
    }

    public Category getCategory() {
        return category;
    }

    public void setCategory(Category category) {
        this.category = category;
    }
    
    public String getComplemento() {
		return complemento;
	}

	public void setComplemento(String complemento) {
		this.complemento = complemento;
	}

	public String getResponsavel_resolucao() {
		return responsavel_resolucao;
	}

	public void setResponsavel_resolucao(String responsavel_resolucao) {
		this.responsavel_resolucao = responsavel_resolucao;
	}

	public LocalDateTime getDataResolucao() {
		return dataResolucao;
	}

	public void setDataResolucao(LocalDateTime dataResolucao) {
		this.dataResolucao = dataResolucao;
	}

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }
}
