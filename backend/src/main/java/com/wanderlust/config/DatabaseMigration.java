package com.wanderlust.config;

import com.wanderlust.model.User;
import com.wanderlust.repository.UserRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class DatabaseMigration implements CommandLineRunner {

    private final UserRepository userRepository;

    public DatabaseMigration(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public void run(String... args) {
        List<User> users = userRepository.findAll();
        for (User user : users) {
            if (user.getName() == null || user.getName().isBlank()) {
                user.setName("Unknown");
                userRepository.save(user);
                System.out.println("🩵 Updated user: " + user.getEmail() + " → added default name");
            }
        }
        System.out.println("✅ Database migration complete");
    }
}
