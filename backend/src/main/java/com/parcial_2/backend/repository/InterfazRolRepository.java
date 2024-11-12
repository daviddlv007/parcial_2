package com.parcial_2.backend.repository;

import com.parcial_2.backend.model.InterfazRol;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

@RepositoryRestResource(path = "interfaz-roles") // Exponer la entidad en '/interfaz-roles'
public interface InterfazRolRepository extends JpaRepository<InterfazRol, Long> {
    // Aquí puedes agregar consultas personalizadas si es necesario
}
