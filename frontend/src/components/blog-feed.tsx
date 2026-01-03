// src/components/blog-feed.tsx

import { useEffect, useState } from 'react';
import FeaturedPostCard from '@/components/featured-post-card';
import LatestPostCard from '@/components/latest-post-card';
import { FeaturedPostCardSkeleton } from '@/components/skeletons/featured-post-card-skeleton';
import { LatestPostCardSkeleton } from '@/components/skeletons/latest-post-card-skeleton';
import CategoryPill from '@/components/category-pill';
import { categories } from '@/utils/category-colors';
import {
  getAllPosts,
  getFeaturedPosts,
  getPostsByCategory,
} from '@/services/post-service';
import { Post } from '@/types/post-type';

export default function BlogFeed() {
  const [selectedCategory, setSelectedCategory] = useState('featured');
  const [posts, setPosts] = useState<Post[]>([]);
  const [latestPosts, setLatestPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  // Featured / Category posts
  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      try {
        const data =
          selectedCategory === 'featured'
            ? await getFeaturedPosts()
            : await getPostsByCategory(selectedCategory);
        setPosts(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, [selectedCategory]);

  // Latest posts (derived from all posts)
  useEffect(() => {
    const fetchLatestPosts = async () => {
      try {
        const data = await getAllPosts();
        const sorted = [...data].sort(
          (a, b) =>
            new Date(b.timeOfPost).getTime() -
            new Date(a.timeOfPost).getTime()
        );
        setLatestPosts(sorted);
      } catch (error) {
        console.error(error);
      }
    };
    fetchLatestPosts();
  }, []);

  return (
    <div className="mx-auto my-6">
      <div className="-mx-4 flex flex-wrap">
        <div className="w-full p-4 sm:w-2/3">
          <div className="-mb-1 cursor-text text-base tracking-wide text-slate-500 dark:text-dark-tertiary">
            What's hot?
          </div>
          <h1 className="mb-2 cursor-text text-xl font-semibold dark:text-dark-primary">
            {selectedCategory === 'featured'
              ? 'Featured Posts'
              : `Posts related to "${selectedCategory}"`}
          </h1>

          <div className="flex flex-col gap-6">
            {loading
              ? Array.from({ length: 5 }).map((_, index) => (
                  <FeaturedPostCardSkeleton key={index} />
                ))
              : posts.slice(0, 5).map((post) => (
                  <FeaturedPostCard key={post.id} post={post} />
                ))}
          </div>
        </div>

        <div className="w-full p-4 sm:w-1/3">
          <div className="mb-6">
            <div className="-mb-1 cursor-text text-base tracking-wide text-light-tertiary dark:text-dark-tertiary">
              Discover by topic
            </div>
            <h2 className="mb-2 cursor-text text-xl font-semibold dark:text-dark-primary">
              Categories
            </h2>
            <div className="flex flex-wrap gap-3">
              {categories.map((category) => (
                <button
                  key={category}
                  type="button"
                  aria-label={category}
                  onClick={() =>
                    setSelectedCategory(
                      selectedCategory === category ? 'featured' : category
                    )
                  }
                >
                  <CategoryPill
                    category={category}
                    selected={selectedCategory === category}
                  />
                </button>
              ))}
            </div>
          </div>

          <div>
            <div className="-mb-1 cursor-text text-base tracking-wide text-slate-500 dark:text-dark-tertiary">
              What's new?
            </div>
            <h2 className="mb-2 cursor-text text-xl font-semibold dark:text-dark-primary">
              Latest Posts
            </h2>

            <div className="flex flex-col gap-4">
              {latestPosts.length === 0
                ? Array.from({ length: 5 }).map((_, index) => (
                    <LatestPostCardSkeleton key={index} />
                  ))
                : latestPosts.slice(0, 5).map((post) => (
                    <LatestPostCard key={post.id} post={post} />
                  ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
