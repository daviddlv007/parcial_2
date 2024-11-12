package com.parcial_2.backend.controller;

import com.parcial_2.backend.model.Usuario;
import com.parcial_2.backend.repository.UsuarioRepository;
import com.parcial_2.backend.security.JwtUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private UsuarioRepository usuarioRepository;

    @Autowired
    private JwtUtils jwtUtils;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @PostMapping("/login")
    public String login(@RequestBody Usuario usuario) {
        // Validar si las credenciales son correctas
        Usuario user = usuarioRepository.findByCorreo(usuario.getCorreo())
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));

        // Comparar la contraseña encriptada
        if (!passwordEncoder.matches(usuario.getContrasena(), user.getContrasena())) {
            throw new RuntimeException("Credenciales incorrectas");
        }

        return jwtUtils.generateJwtToken(user.getCorreo()); // Generamos el token JWT
    }
}
