package com.wanderlust.repository;

import com.wanderlust.model.Post;
import org.springframework.data.mongodb.repository.MongoRepository;
import java.util.List;

public interface PostRepository extends MongoRepository<Post, String> {

    List<Post> findByFeaturedPostTrue();

    // Optional additional finders
    List<Post> findByAuthorName(String authorName);
    List<Post> findByCategoriesContaining(String category);
}
