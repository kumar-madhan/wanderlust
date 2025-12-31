import { useEffect, useState } from 'react';
import {
  getFeaturedPosts,
  getPostsByCategory,
} from '../api/posts.api';
import type { Post } from '../types/post-type';
import PostCard from './post-card';
import Skeleton from './skeleton';
import '../styles/blog.css';

const PAGE_SIZE = 5;

export default function BlogFeed() {
  const [selectedCategory, setSelectedCategory] =
    useState<string>('featured');
  const [posts, setPosts] = useState<Post[]>([]);
  const [page, setPage] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);
  const [hasMore, setHasMore] = useState<boolean>(true);

  useEffect(() => {
    setPosts([]);
    setPage(0);
    setHasMore(true);
  }, [selectedCategory]);

  useEffect(() => {
    async function loadPosts() {
      setLoading(true);

      try {
        const data =
          selectedCategory === 'featured'
            ? await getFeaturedPosts()
            : await getPostsByCategory(selectedCategory);

        // client-side pagination slice
        const start = page * PAGE_SIZE;
        const end = start + PAGE_SIZE;
        const pageData = data.slice(start, end);

        setPosts((prev) =>
          page === 0 ? pageData : [...prev, ...pageData]
        );

        setHasMore(end < data.length);

      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    loadPosts();
  }, [page, selectedCategory]);

  return (
    <div className="blog-container">
      <h2>Blog Feed</h2>

      <div className="blog-actions">
        <button onClick={() => setSelectedCategory('featured')}>
          Featured
        </button>
        <button onClick={() => setSelectedCategory('Adventure')}>
          Adventure
        </button>
        <button onClick={() => setSelectedCategory('Travel')}>
          Travel
        </button>
      </div>

      {posts.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}

      {loading &&
        Array.from({ length: 2 }).map((_, i) => (
          <Skeleton key={i} height={80} />
        ))}

      {!loading && hasMore && (
        <button onClick={() => setPage((p) => p + 1)}>
          Load more
        </button>
      )}
    </div>
  );
}
