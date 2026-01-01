import { useNavigate } from 'react-router-dom';
import type { Post } from '../types';
import { createSlug } from '@/utils/slug-generator';

export default function LatestPostCard({ post }: { post: Post }) {
  const navigate = useNavigate();
  const slug = createSlug(post.title);

  return (
    <div
      className="cursor-pointer rounded-lg px-4 py-3 transition-colors hover:bg-black/5 dark:hover:bg-white/5"
      onClick={() =>
        navigate(`/details-page/${slug}/${post._id}`, {
          state: { post },
        })
      }
    >
      <div className="text-sm font-medium">{post.title}</div>
      <div className="text-xs opacity-70">{post.authorName}</div>
    </div>
  );
}
