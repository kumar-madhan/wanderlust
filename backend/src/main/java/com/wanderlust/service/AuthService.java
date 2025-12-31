package com.wanderlust.service;

import com.wanderlust.model.User;
import com.wanderlust.repository.UserRepository;
import com.wanderlust.config.JwtUtil;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtil jwtUtil;

    public AuthService(UserRepository userRepository, PasswordEncoder passwordEncoder, JwtUtil jwtUtil) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtUtil = jwtUtil;
    }

    public User signup(User user) {
        String email = user.getEmail().trim().toLowerCase();

        Optional<User> existing = userRepository.findByEmail(email);
        if (existing.isPresent()) {
            throw new RuntimeException("User already exists with email: " + email);
        }

        user.setEmail(email);
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        user.setName(user.getName() != null ? user.getName().trim() : "Unknown");
        user.setRole("USER");

        return userRepository.save(user);
    }

    public String login(String email, String password) {
        String normalizedEmail = email.trim().toLowerCase();

        User existingUser = userRepository.findByEmail(normalizedEmail)
                .orElseThrow(() -> new RuntimeException("Invalid email or password"));

        if (!passwordEncoder.matches(password, existingUser.getPassword())) {
            throw new RuntimeException("Invalid email or password");
        }

        return jwtUtil.generateToken(existingUser.getEmail());
    }
}
