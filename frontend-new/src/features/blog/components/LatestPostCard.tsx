import { useNavigate } from 'react-router-dom';
import type { Post } from '../types';
import { createSlug } from '@/utils/slug-generator';

export default function LatestPostCard({ post }: { post: Post }) {
  const navigate = useNavigate();
  const slug = createSlug(post.title);

  return (
    <div
      className="card-base card-interactive p-3"
      onClick={() =>
        navigate(`/details-page/${slug}/${post._id}`, { state: { post } })
      }
    >
      <h4 className="line-clamp-1 text-sm font-semibold">
        {post.title}
      </h4>

      <p className="mt-1 text-xs opacity-70">
        By {post.authorName}
      </p>
    </div>
  );
}