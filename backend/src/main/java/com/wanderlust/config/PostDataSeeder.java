package com.wanderlust.config;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.wanderlust.model.Post;
import com.wanderlust.repository.PostRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.core.io.ClassPathResource;
import org.springframework.stereotype.Component;

import java.io.InputStream;
import java.time.Instant;
import java.util.Date;
import java.util.List;

@Component
public class PostDataSeeder implements CommandLineRunner {

    private final PostRepository postRepository;
    private final ObjectMapper objectMapper;

    public PostDataSeeder(PostRepository postRepository, ObjectMapper objectMapper) {
        this.postRepository = postRepository;
        this.objectMapper = objectMapper;
    }

    @Override
    public void run(String... args) throws Exception {

        postRepository.deleteAll();
        System.out.println("🔥 Existing posts cleared");

        InputStream inputStream =
                new ClassPathResource("data.json").getInputStream();

        List<Post> posts = objectMapper.readValue(
                inputStream,
                new TypeReference<List<Post>>() {}
        );

        posts.forEach(post -> {
            if (post.getTimeOfPost() == null) {
                post.setTimeOfPost(Date.from(Instant.now()));
            }
        });

        postRepository.saveAll(posts);
        System.out.println("✅ Seeded " + posts.size() + " posts");
    }
}