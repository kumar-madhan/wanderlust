@RestController
@RequestMapping("/api/posts")
@CrossOrigin(origins = "http://localhost")
public class PostController {

    private final PostService postService;

    public PostController(PostService postService) { this.postService = postService; }

    @GetMapping
    public List<Post> getAllPosts() { return postService.getAllPosts(); }

    @PostMapping
    public Post createPost(@RequestBody Post post) { return postService.createPost(post); }

    @GetMapping("/{id}")
    public Post getPost(@PathVariable String id) { return postService.getPostById(id); }

    @DeleteMapping("/{id}")
    public void deletePost(@PathVariable String id) { postService.deletePost(id); }
}
