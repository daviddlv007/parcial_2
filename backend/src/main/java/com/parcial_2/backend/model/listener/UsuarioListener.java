package com.parcial_2.backend.model.listener;

import com.parcial_2.backend.model.Usuario;
import jakarta.persistence.PrePersist;
import jakarta.persistence.PreUpdate;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

public class UsuarioListener {

    private static final PasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    @PrePersist
    @PreUpdate
    public void encriptarContrasena(Usuario usuario) {
        // Verifica si la contraseña no está encriptada aún
        if (usuario.getContrasena() != null && !usuario.getContrasena().startsWith("$2a$")) {
            usuario.setContrasena(passwordEncoder.encode(usuario.getContrasena()));
        }
    }
}
