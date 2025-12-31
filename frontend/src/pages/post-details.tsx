import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { getPostById } from '../api/posts.api';
import type { Post } from '../types/post-type';
import Skeleton from '../components/skeleton';
import '../styles/blog.css';


export default function PostDetails() {
  const { id } = useParams<{ id: string }>();
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
  if (!id) {
    setLoading(false);
    return;
  }

  const postId = id; // ← narrow to string here

  async function loadPost(postId: string) {
    try {
      const data = await getPostById(postId);
      setPost(data);
    } catch (error) {
      console.error('Failed to load post', error);
      setPost(null);
    } finally {
      setLoading(false);
    }
  }

  loadPost(postId);
}, [id]);


  if (loading) {
    return (
      <div style={{ padding: '1rem' }}>
        <Skeleton height={32} width="70%" />
        <Skeleton height={16} width="30%" />
        <Skeleton height={200} />
        <Skeleton height={16} />
        <Skeleton height={16} width="80%" />
      </div>
    );
  }

  if (!post) {
    return <p>Post not found.</p>;
  }

  return (
    <article className="blog-container">
  <Link to="/" className="post-meta">← Back to posts</Link>

  <h1>{post.title}</h1>

  <p className="post-meta">
    By <strong>{post.authorName}</strong>
  </p>

  <img
    src={post.imageLink}
    alt={post.title}
    className="post-image"
  />

  <p>{post.description}</p>

  <div style={{ marginTop: '1rem' }}>
    {post.categories.map((cat) => (
      <span key={cat} className="category-pill">
        {cat}
      </span>
    ))}
  </div>
</article>

  );
}
