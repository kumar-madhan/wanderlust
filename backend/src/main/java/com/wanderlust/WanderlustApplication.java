package com.wanderlust;

import com.wanderlust.model.Post;
import com.wanderlust.repository.PostRepository;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.core.io.ClassPathResource;

import java.io.InputStream;
import java.util.List;

@SpringBootApplication
public class WanderlustApplication {

    public static void main(String[] args) {
        SpringApplication.run(WanderlustApplication.class, args);
    }

    @Bean
    CommandLineRunner initData(PostRepository postRepository) {
        return args -> {
            if (postRepository.count() == 0) {
                System.out.println("Seeding database from data.json...");
                try {
                    InputStream is = new ClassPathResource("data.json").getInputStream();
                    ObjectMapper mapper = new ObjectMapper();
                    List<Post> posts = mapper.readValue(is, new TypeReference<List<Post>>() {});
                    postRepository.saveAll(posts);
                    System.out.println("✅ Seeded " + posts.size() + " posts into MongoDB.");
                } catch (Exception e) {
                    System.err.println("❌ Error seeding database: " + e.getMessage());
                }
            } else {
                System.out.println("Database already contains posts, skipping seeding.");
            }
        };
    }
}
