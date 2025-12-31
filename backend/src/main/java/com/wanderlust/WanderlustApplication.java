@Bean
CommandLineRunner init(PostRepository postRepo) {
    return args -> {
        if (postRepo.count() == 0) {
            Post sample = new Post();
            sample.setTitle("Welcome to Wanderlust Blog");
            sample.setAuthorName("Admin");
            sample.setDescription("This is your first post!");
            postRepo.save(sample);
            System.out.println("🌱 Database seeded with a sample post!");
        }
    };
}
