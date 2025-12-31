package com.wanderlust.service;

import com.wanderlust.model.Post;
import com.wanderlust.repository.PostRepository;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.concurrent.TimeUnit;

@Service
public class PostService {
    private final PostRepository postRepo;
    private final RedisTemplate<String, Object> redis;

    public PostService(PostRepository postRepo, RedisTemplate<String, Object> redis) {
        this.postRepo = postRepo;
        this.redis = redis;
    }

    public List<Post> getAllPosts() {
        List<Post> cached = (List<Post>) redis.opsForValue().get("allPosts");
        if (cached != null) return cached;

        List<Post> posts = postRepo.findAll();
        redis.opsForValue().set("allPosts", posts, 10, TimeUnit.MINUTES);
        return posts;
    }

    public Post createPost(Post post) {
        redis.delete("allPosts");
        return postRepo.save(post);
    }

    public Post getPostById(String id) {
        return postRepo.findById(id).orElseThrow(() -> new RuntimeException("Post not found"));
    }

    public void deletePost(String id) {
        redis.delete("allPosts");
        postRepo.deleteById(id);
    }
}
