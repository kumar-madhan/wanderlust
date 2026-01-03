// src/pages/home-page.tsx

import { useEffect, useState } from 'react';
import BlogFeed from '@/components/blog-feed';
import PostCard from '@/components/post-card';
import { Post } from '@/types/post-type';
import { PostCardSkeleton } from '@/components/skeletons/post-card-skeleton';
import Header from '@/layouts/header-layout';
import { getAllPosts } from '@/services/post-service';

function HomePage() {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const data = await getAllPosts();
        setPosts(data);
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };
    fetchPosts();
  }, []);

  return (
    <div className="w-full cursor-default bg-light dark:bg-dark">
      <Header />
      <div className="mx-4 sm:mx-8 lg:mx-16">
        <BlogFeed />
        <h1 className="cursor-text pb-4 text-xl font-semibold dark:text-dark-primary sm:pb-0">
          All Posts
        </h1>
        <div className="flex flex-wrap">
          {posts.length === 0
            ? Array.from({ length: 8 }).map((_, index) => (
                <PostCardSkeleton key={index} />
              ))
            : posts.map((post) => (
                <PostCard key={post.id} post={post} />
              ))}
        </div>
      </div>
    </div>
  );
}

export default HomePage;
