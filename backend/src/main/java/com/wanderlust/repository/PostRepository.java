package com.wanderlust.repository;

import com.wanderlust.model.Post;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface PostRepository extends MongoRepository<Post, String> {

    Page<Post> findAll(Pageable pageable);

    Page<Post> findByFeaturedPostTrue(Pageable pageable);

    Page<Post> findByCategoriesContainingIgnoreCase(
        String category,
        Pageable pageable
    );

    List<Post> findByAuthorNameIgnoreCase(String authorName);
}
