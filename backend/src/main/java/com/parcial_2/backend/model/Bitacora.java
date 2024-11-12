package com.parcial_2.backend.model;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "bitacora")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Bitacora {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "usuario_id", nullable = false)
    private Usuario usuario;

    @Column(columnDefinition = "TEXT", nullable = false)
    private String accion;

    @Column(nullable = false)
    private java.time.LocalDateTime fechaHora;

    @Column(length = 50, nullable = false)
    private String ipUsuario;
}
