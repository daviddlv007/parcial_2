package com.parcial_2.backend.repository;

import com.parcial_2.backend.model.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import java.util.Optional; // Necesario para usar Optional en el método de abajo

@RepositoryRestResource(path = "usuarios") // Exponer la entidad en '/usuarios'
public interface UsuarioRepository extends JpaRepository<Usuario, Long> {
    // Aquí puedes agregar consultas personalizadas si es necesario

    // Agregar este método para encontrar un usuario por correo
    Optional<Usuario> findByCorreo(String correo);
}
