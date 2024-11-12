package com.parcial_2.backend.model;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "interfaz_rol")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class InterfazRol {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(length = 50, nullable = false)
    private String nombre;

    @Column(columnDefinition = "TEXT", nullable = false)
    private String descripcion;
}
