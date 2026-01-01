package com.wanderlust.service;

import com.wanderlust.model.Post;
import com.wanderlust.repository.PostRepository;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PostService {

    private final PostRepository postRepo;

    public PostService(PostRepository postRepo) {
        this.postRepo = postRepo;
    }

    /* =====================
       READ OPERATIONS
       ===================== */

    // Existing behavior preserved (first page)
    public List<Post> getAllPosts() {
        return postRepo
            .findAll(PageRequest.of(0, 5))
            .getContent();
    }

    public List<Post> getFeaturedPosts() {
        return postRepo
            .findByFeaturedPostTrue(PageRequest.of(0, 5))
            .getContent();
    }

    public List<Post> getPostsByAuthor(String authorName) {
        return postRepo.findByAuthorNameIgnoreCase(authorName);
    }

    public List<Post> getPostsByCategory(String category) {
        return postRepo
            .findByCategoriesContainingIgnoreCase(
                category,
                PageRequest.of(0, 5)
            )
            .getContent();
    }

    public Post getPostById(String id) {
        return postRepo.findById(id).orElse(null);
    }

    /* =====================
       WRITE OPERATIONS
       ===================== */

    public Post createPost(Post post) {
        return postRepo.save(post);
    }

    public void deletePost(String id) {
        postRepo.deleteById(id);
    }
}
