package com.wanderlust;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.wanderlust.model.Post;
import com.wanderlust.repository.PostRepository;
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
                try {
                    InputStream is = new ClassPathResource("data.json").getInputStream();
                    ObjectMapper mapper = new ObjectMapper();
                    List<Post> posts = mapper.readValue(is, new TypeReference<>() {});
                    postRepository.saveAll(posts);
                } catch (Exception e) {
                    System.err.println(e.getMessage());
                }
            }
        };
    }
}
