package com.wanderlust.controller;

import com.wanderlust.model.Post;
import com.wanderlust.service.PostService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/posts")
public class PostController {

    private final PostService postService;

    public PostController(PostService postService) {
        this.postService = postService;
    }

    /* =====================
       READ ENDPOINTS
       ===================== */

    @GetMapping
    public List<Post> getAllPosts() {
        return postService.getAllPosts();
    }

    @GetMapping("/featured")
    public List<Post> getFeaturedPosts() {
        return postService.getFeaturedPosts();
    }

    @GetMapping("/category/{category}")
    public List<Post> getPostsByCategory(@PathVariable String category) {
        return postService.getPostsByCategory(category);
    }

    @GetMapping("/author/{author}")
    public List<Post> getPostsByAuthor(@PathVariable String author) {
        return postService.getPostsByAuthor(author);
    }

    @GetMapping("/{id}")
    public Post getPostById(@PathVariable String id) {
        return postService.getPostById(id);
    }

    /* =====================
       WRITE ENDPOINTS
       ===================== */

    @PostMapping
    public Post createPost(@RequestBody Post post) {
        return postService.createPost(post);
    }

    @DeleteMapping("/{id}")
    public void deletePost(@PathVariable String id) {
        postService.deletePost(id);
    }
}
