package com.parcial_2.backend.repository;

import com.parcial_2.backend.model.Bitacora;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

@RepositoryRestResource(path = "bitacoras") // Exponer la entidad en '/bitacoras'
public interface BitacoraRepository extends JpaRepository<Bitacora, Long> {
    // Aquí puedes agregar consultas personalizadas si es necesario
}
