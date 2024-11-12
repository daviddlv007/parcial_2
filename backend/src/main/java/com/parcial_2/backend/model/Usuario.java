package com.parcial_2.backend.model;

import jakarta.persistence.*;
import lombok.*;
import com.parcial_2.backend.model.listener.UsuarioListener; // Importación del listener

// Anotacion agregada para vincular este archivo a su listener de encriptacion del listener
@EntityListeners(UsuarioListener.class)


@Entity
@Table(name = "usuario")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Usuario {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(length = 50, nullable = false)
    private String nombre;

    @Column(length = 50, nullable = false)
    private String apellido;

    @Column(length = 100, nullable = false, unique = true)
    private String correo;

    @Column(length = 255, nullable = false)
    private String contrasena;
}
