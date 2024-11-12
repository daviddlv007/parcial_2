package com.parcial_2.backend.repository;

import com.parcial_2.backend.model.RolPermiso;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

@RepositoryRestResource(path = "rol-permisos") // Exponer la entidad en '/rol-permisos'
public interface RolPermisoRepository extends JpaRepository<RolPermiso, Long> {
    // Aquí puedes agregar consultas personalizadas si es necesario
}
