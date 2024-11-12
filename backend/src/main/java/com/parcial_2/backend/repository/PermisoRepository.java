package com.parcial_2.backend.repository;

import com.parcial_2.backend.model.Permiso;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

@RepositoryRestResource(path = "permisos") // Exponer la entidad en '/permisos'
public interface PermisoRepository extends JpaRepository<Permiso, Long> {
    // Aquí puedes agregar consultas personalizadas si es necesario
}
