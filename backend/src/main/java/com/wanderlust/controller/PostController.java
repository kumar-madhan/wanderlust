package com.wanderlust.controller;

import com.wanderlust.model.Post;
import com.wanderlust.service.PostService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/posts")
@CrossOrigin(origins = "*")
public class PostController {
    
    private final PostService postService;
    
    public PostController(PostService postService) {
        this.postService = postService;
    }
    
    @GetMapping
    public ResponseEntity<List<Post>> getAllPosts() {
        return ResponseEntity.ok(postService.getAllPosts());
    }
    
    @GetMapping("/featured")
    public ResponseEntity<List<Post>> getFeaturedPosts() {
        return ResponseEntity.ok(postService.getFeaturedPosts());
    }
    
    @GetMapping("/author/{authorName}")
    public ResponseEntity<List<Post>> getPostsByAuthor(@PathVariable String authorName) {
        return ResponseEntity.ok(postService.getPostsByAuthor(authorName));
    }
    
    @GetMapping("/category/{category}")
    public ResponseEntity<List<Post>> getPostsByCategory(@PathVariable String category) {
        return ResponseEntity.ok(postService.getPostsByCategory(category));
    }
    
    @PostMapping
    public ResponseEntity<Post> createPost(@RequestBody Post post) {
        return ResponseEntity.ok(postService.createPost(post));
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<Post> getPostById(@PathVariable String id) {
        return postService.getPostById(id)
                .map(post -> ResponseEntity.ok(post))
                .orElse(ResponseEntity.notFound().build());
    }
    
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletePost(@PathVariable String id) {
        postService.deletePost(id);
        return ResponseEntity.ok().build();
    }
}
