package com.wanderlust.controller;

import com.wanderlust.model.User;
import com.wanderlust.service.AuthService;
import org.springframework.web.bind.annotation.*;
import java.util.Map;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost")
public class AuthController {

    private final AuthService authService;

    public AuthController(AuthService authService) { this.authService = authService; }

    @PostMapping("/signup")
    public Map<String, String> signup(@RequestBody User user) {
        String token = authService.register(user);
        return Map.of("token", token, "message", "User registered successfully");
    }

    @PostMapping("/login")
    public Map<String, String> login(@RequestBody Map<String, String> payload) {
        String token = authService.login(payload.get("email"), payload.get("password"));
        return Map.of("token", token, "message", "Login successful");
    }
}
