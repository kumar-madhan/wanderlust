import { useNavigate } from 'react-router-dom';
import type { Post } from '@/types/post-type';
import { createSlug } from '@/utils/slug-generator';

export default function PostCard({ post }: { post: Post }) {
  const navigate = useNavigate();
  const slug = createSlug(post.title);

  return (
    <div
      className="card-base card-interactive group overflow-hidden"
      onClick={() =>
        navigate(`/details-page/${slug}/${post._id}`, { state: { post } })
      }
    >
      <div className="h-48 w-full overflow-hidden">
        <img
          src={post.imageLink}
          alt={post.title}
          className="card-image-hover h-full w-full object-cover"
        />
      </div>

      <div className="p-3">
        <h3 className="line-clamp-1 text-base font-semibold">
          {post.title}
        </h3>

        <p className="mt-1 line-clamp-2 text-sm opacity-80">
          {post.description}
        </p>

        <p className="mt-2 text-xs opacity-70">
          By {post.authorName}
        </p>
      </div>
    </div>
  );
}