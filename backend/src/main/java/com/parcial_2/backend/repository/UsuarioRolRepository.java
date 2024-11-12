package com.parcial_2.backend.repository;

import com.parcial_2.backend.model.UsuarioRol;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

@RepositoryRestResource(path = "usuario-roles") // Exponer la entidad en '/usuario-roles'
public interface UsuarioRolRepository extends JpaRepository<UsuarioRol, Long> {
    // Aquí puedes agregar consultas personalizadas si es necesario
}
