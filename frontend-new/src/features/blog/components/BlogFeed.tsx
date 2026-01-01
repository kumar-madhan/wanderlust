import { useEffect, useState } from 'react';
import FeaturedPostCard from './FeaturedPostCard';
import LatestPostCard from './LatestPostCard';
import CategoryPill from './CategoryPill';
import { FeaturedPostCardSkeleton, LatestPostCardSkeleton } from '../skeletons';
import { categories } from '@/utils/category-colors';
import type { Post } from '@/types/post-type';

export default function BlogFeed() {
  const [selectedCategory, setSelectedCategory] = useState<'Featured'>('Featured');
  const [featuredPosts, setFeaturedPosts] = useState<Post[]>([]);
  const [latestPosts, setLatestPosts] = useState<Post[]>([]);
  const [loadingFeatured, setLoadingFeatured] = useState(true);
  const [loadingLatest, setLoadingLatest] = useState(true);

  // Enhanced mock data for Featured posts
  useEffect(() => {
    setLoadingFeatured(true);
    const mockFeatured: Post[] = [
      {
        _id: '1',
        title: 'Journey Beyond Horizons',
        description: 'Discover breathtaking landscapes and hidden gems. Epic adventures await in untouched wilderness.',
        authorName: 'Alex Wanderer',
        imageLink: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
        timeOfPost: new Date().toISOString(),
        categories: ['Featured', 'Travel']
      },
      {
        _id: '2',
        title: 'Peak Perfection',
        description: 'Scaling majestic mountains, breathing alpine air. Where perseverance meets raw natural beauty.',
        authorName: 'Peak Explorer',
        imageLink: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
        timeOfPost: new Date(Date.now() - 3600000).toISOString(),
        categories: ['Featured', 'Adventure']
      },
      {
        _id: '6',
        title: 'Ocean Odyssey',
        description: 'Diving into vibrant coral reefs and underwater paradises that few have witnessed.',
        authorName: 'Dive Master',
        imageLink: 'https://images.unsplash.com/photo-1578631610572-9e3562b099f4?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
        timeOfPost: new Date(Date.now() - 7200000).toISOString(),
        categories: ['Featured']
      }
    ];
    setTimeout(() => {
      setFeaturedPosts(mockFeatured);
      setLoadingFeatured(false);
    }, 1200);
  }, [selectedCategory]);

  // Enhanced mock data for Latest posts
  useEffect(() => {
    setLoadingLatest(true);
    const mockLatest: Post[] = [
      {
        _id: '3',
        title: 'Forest Whispers',
        description: 'Serene walks through ancient woods reveal nature\'s timeless secrets and hidden trails.',
        authorName: 'Nature Guide',
        imageLink: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
        timeOfPost: new Date().toISOString(),
        categories: ['Nature']
      },
      {
        _id: '4',
        title: 'Urban Nights',
        description: 'Neon-lit streets, rooftop cityscapes, and stories from the heartbeat of the metropolis.',
        authorName: 'City Scout',
        imageLink: 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?ixlib=rb-4.0.3&auto=format&fit=crop&w=2071&q=80',
        timeOfPost: new Date(Date.now() - 86400000).toISOString(),
        categories: ['Travel']
      },
      {
        _id: '5',
        title: 'Desert Dreams',
        description: 'Endless golden dunes under starlit skies create surreal dreamscapes.',
        authorName: 'Desert Nomad',
        imageLink: 'https://images.unsplash.com/photo-1517423440428-d1cf18e8e0d9?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
        timeOfPost: new Date(Date.now() - 172800000).toISOString(),
        categories: ['Adventure']
      },
      {
        _id: '7',
        title: 'Lake Serenity',
        description: 'Mirror-like waters reflecting snow-capped mountains at golden hour.',
        authorName: 'Lake Poet',
        imageLink: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
        timeOfPost: new Date(Date.now() - 259200000).toISOString(),
        categories: ['Nature']
      },
      {
        _id: '8',
        title: 'Island Hopping',
        description: 'Crystal waters and palm-fringed beaches across tropical paradise.',
        authorName: 'Island Hopper',
        imageLink: 'https://images.unsplash.com/photo-1519046904884-53103b34b206?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
        timeOfPost: new Date(Date.now() - 345600000).toISOString(),
        categories: ['Travel']
      }
    ];
    setTimeout(() => {
      setLatestPosts(mockLatest);
      setLoadingLatest(false);
    }, 1800);
  }, []);

  return (
    <section className="mx-auto my-16 max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      {/* Header + Category Filters */}
      <div className="mb-12 flex flex-col lg:flex-row lg:items-center lg:justify-between lg:gap-6">
        <div>
          <h2 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-5xl">
            Featured Posts
          </h2>
          <p className="mt-4 max-w-2xl text-xl text-gray-600 dark:text-gray-300">
            Discover our most captivating stories and breathtaking adventures
          </p>
        </div>
        <div className="mt-8 flex flex-wrap gap-2 lg:mt-0">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat as 'Featured')}
              className="focus:outline-none focus:ring-4 focus:ring-offset-2 focus:ring-indigo-500/20"
              aria-label={`Filter by ${cat}`}
            >
              <CategoryPill category={cat} selected={selectedCategory === cat} />
            </button>
          ))}
        </div>
      </div>

      {/* Featured Posts Grid */}
      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-3">
        {loadingFeatured
          ? Array.from({ length: 6 }).map((_, i) => (
              <FeaturedPostCardSkeleton key={`featured-skel-${i}`} />
            ))
          : featuredPosts.map((post) => (
              <FeaturedPostCard key={post._id} post={post} />
            ))}
      </div>

      {/* Empty Featured State */}
      {featuredPosts.length === 0 && !loadingFeatured && (
        <div className="col-span-full mt-24 flex flex-col items-center py-24">
          <div className="mb-8 h-32 w-32 animate-pulse rounded-2xl bg-gradient-to-br from-blue-400 via-purple-400 to-indigo-500 shadow-2xl" />
          <h3 className="mb-4 text-3xl font-bold text-gray-900 dark:text-white">
            No Featured Adventures Yet
          </h3>
          <p className="max-w-md text-lg text-gray-500 dark:text-gray-400 text-center">
            Our explorers are out discovering the world. 
            Check back soon for breathtaking stories!
          </p>
        </div>
      )}

      {/* Latest Posts Section */}
      <div className="mt-24">
        <div className="mb-12">
          <h3 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
            Latest Posts
          </h3>
          <p className="mt-4 text-xl text-gray-600 dark:text-gray-300">
            Fresh stories from fellow wanderers
          </p>
        </div>
        
        <div className="divide-y divide-gray-200 dark:divide-gray-700 rounded-2xl border border-gray-200 bg-white/50 backdrop-blur-sm dark:border-gray-700 dark:bg-gray-900/30">
          {loadingLatest
            ? Array.from({ length: 6 }).map((_, i) => (
                <LatestPostCardSkeleton key={`latest-skel-${i}`} />
              ))
            : latestPosts.map((post) => (
                <div
                  key={post._id}
                  className="card-hover card-enter rounded-xl bg-gradient-to-br from-slate-900 to-slate-800 p-6 text-white shadow"
                >
                  <h3 className="text-lg font-semibold">
                    {post.title}
                  </h3>
                  <p className="mt-1 text-xs opacity-70">
                    By {post.authorName}
                  </p>
                  <p className="mt-3 text-sm opacity-80">
                    {post.description}
                  </p>
                </div>
              ))}
        </div>
      </div>

      {/* Empty Latest State */}
      {latestPosts.length === 0 && !loadingLatest && (
        <div className="mt-24 flex flex-col items-center py-24">
          <div className="mb-8 h-28 w-28 animate-pulse rounded-xl bg-gradient-to-r from-emerald-400 to-teal-500 shadow-xl" />
          <h4 className="mb-4 text-2xl font-bold text-gray-900 dark:text-white">
            No Recent Posts
          </h4>
          <p className="text-lg text-gray-500 dark:text-gray-400 text-center">
            Be the first explorer to share your journey with our community.
          </p>
        </div>
      )}
    </section>
  );
}
