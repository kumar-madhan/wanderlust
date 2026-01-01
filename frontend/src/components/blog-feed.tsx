import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  getFeaturedPosts,
  getPostsByCategory,
} from "../api/posts.api";
import type { Post } from "../types/post-type";
import styles from "../styles/blog-feed.module.css";

const PAGE_SIZE = 5;
const CATEGORIES = ["Featured", "Adventure", "Travel"];

export default function BlogFeed() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [page, setPage] = useState(0);
  const [category, setCategory] = useState("Featured");
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  /* 🔹 Load first page when category changes */
  useEffect(() => {
    resetAndLoad();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [category]);

  async function resetAndLoad() {
    setPosts([]);
    setPage(0);
    setHasMore(true);
    await loadPosts(0, true);
  }

  async function loadPosts(nextPage: number, replace = false) {
    if (loading || !hasMore) return;

    setLoading(true);
    try {
      const data =
        category === "Featured"
          ? await getFeaturedPosts(nextPage, PAGE_SIZE)
          : await getPostsByCategory(category, nextPage, PAGE_SIZE);

      if (data.length < PAGE_SIZE) {
        setHasMore(false);
      }

      setPosts((prev) =>
        replace ? data : [...prev, ...data]
      );
      setPage(nextPage + 1);
    } catch (err) {
      console.error("Failed to load posts", err);
      setHasMore(false);
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className={styles.wrapper}>
      <h2 className={styles.title}>Blog Feed</h2>

      {/* Categories */}
      <div className={styles.tabs}>
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            className={`${styles.tab} ${
              category === cat ? styles.active : ""
            }`}
            onClick={() => setCategory(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Posts */}
      <div className={styles.list}>
        {posts.map((post) => (
          <Link
            key={post.id}
            to={`/posts/${post.id}`}
            className={styles.card}
          >
            <h3>{post.title}</h3>
            <p className={styles.author}>
              By {post.authorName}
            </p>
            <p className={styles.desc}>
              {post.description}
            </p>
          </Link>
        ))}

        {loading && (
          <div className={styles.loading}>Loading…</div>
        )}
      </div>

      {/* Load More */}
      {hasMore && !loading && (
        <div className={styles.loadMore}>
          <button onClick={() => loadPosts(page)}>
            Load more
          </button>
        </div>
      )}
    </section>
  );
}
