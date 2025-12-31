import { useNavigate } from 'react-router-dom';
import type { Post } from '../types/post-type';
import '../styles/blog.css';

interface PostCardProps {
  post: Post;
}

export default function PostCard({ post }: PostCardProps) {
  const navigate = useNavigate();

  return (
    <article
      className="post-card"
      onClick={() => navigate(`/posts/${post.id}`)}
    >
      <h3>{post.title}</h3>

      <p className="post-meta">
        By <strong>{post.authorName}</strong>
      </p>

      <p>{post.description}</p>
    </article>
  );
}
