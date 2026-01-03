package com.wanderlust.controller;

import com.wanderlust.model.User;
import com.wanderlust.service.AuthService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "*")
public class AuthController {

    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping("/signup")
    public ResponseEntity<?> signup(@RequestBody Map<String, Object> request) {
        try {
            String email = (String) request.get("email");
            String password = (String) request.get("password");
            String name = (String) request.get("name");

            if (email == null || password == null || name == null) {
                return ResponseEntity.badRequest().body(Map.of("message", "Missing fields: name, email, or password"));
            }

            User user = new User();
            user.setEmail(email.trim().toLowerCase());
            user.setPassword(password);
            user.setName(name.trim());
            user.setRole("USER");

            User saved = authService.signup(user);

            Map<String, Object> response = new HashMap<>();
            response.put("id", saved.getId());
            response.put("email", saved.getEmail());
            response.put("name", saved.getName());
            response.put("role", saved.getRole());

            return ResponseEntity.ok(response);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of("message", e.getMessage()));
        }
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Map<String, Object> request) {
        try {
            String email = (String) request.get("email");
            String password = (String) request.get("password");

            if (email == null || password == null) {
                return ResponseEntity.badRequest().body(Map.of("message", "Missing email or password"));
            }

            String token = authService.login(email, password);

            return ResponseEntity.ok(Map.of("token", token));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of("message", e.getMessage()));
        }
    }
}
