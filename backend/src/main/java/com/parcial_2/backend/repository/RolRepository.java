package com.parcial_2.backend.repository;

import com.parcial_2.backend.model.Rol;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

@RepositoryRestResource(path = "roles") // Exponer la entidad en '/roles'
public interface RolRepository extends JpaRepository<Rol, Long> {
    // Aquí puedes agregar consultas personalizadas si es necesario
}
