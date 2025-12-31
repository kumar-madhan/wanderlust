package com.wanderlust.service;

import com.wanderlust.model.Post;
import com.wanderlust.repository.PostRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class PostService {

    private final PostRepository postRepo;

    public PostService(PostRepository postRepo) {
        this.postRepo = postRepo;
    }

    // ✅ Return all posts
    public List<Post> getAllPosts() {
        return postRepo.findAll();
    }

    // ✅ Return featured posts
    public List<Post> getFeaturedPosts() {
        return postRepo.findByFeaturedPostTrue();
    }

    // ✅ Create new post
    public Post createPost(Post post) {
        return postRepo.save(post);
    }

    // ✅ Get single post by ID
    public Optional<Post> getPostById(String id) {
        return postRepo.findById(id);
    }

    // ✅ Delete a post by ID
    public void deletePost(String id) {
        postRepo.deleteById(id);
    }

    // ✅ Get posts by author
    public List<Post> getPostsByAuthor(String authorName) {
        return postRepo.findByAuthorName(authorName);
    }

    // ✅ Get posts by category
    public List<Post> getPostsByCategory(String category) {
        return postRepo.findByCategoriesContaining(category);
    }
}
