package com.parcial_2.backend.security;

import com.auth0.jwt.JWT;
import com.auth0.jwt.interfaces.DecodedJWT;
import com.auth0.jwt.algorithms.Algorithm;
import org.springframework.stereotype.Component;

import java.util.Date;

@Component
public class JwtUtils {

    private final String jwtSecret = "secretkey";  // Esta clave debe ser más segura en producción
    private final int jwtExpirationMs = 86400000; // 1 día

    public String generateJwtToken(String username) {
        Algorithm algorithm = Algorithm.HMAC512(jwtSecret);
        return JWT.create()
                .withSubject(username)
                .withIssuedAt(new Date())
                .withExpiresAt(new Date(System.currentTimeMillis() + jwtExpirationMs))
                .sign(algorithm);
    }

    public String getUserNameFromJwtToken(String token) {
        DecodedJWT decodedJWT = JWT.require(Algorithm.HMAC512(jwtSecret))
                .build()
                .verify(token);
        return decodedJWT.getSubject();
    }

    public boolean validateJwtToken(String authToken) {
        try {
            JWT.require(Algorithm.HMAC512(jwtSecret)).build().verify(authToken);
            return true;
        } catch (Exception e) {
            return false;
        }
    }
}
