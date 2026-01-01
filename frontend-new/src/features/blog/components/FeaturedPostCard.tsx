import { useNavigate } from 'react-router-dom';
import type { Post } from '../types';
import { createSlug } from '@/utils/slug-generator';
import CategoryPill from './CategoryPill';

export default function FeaturedPostCard({ post }: { post: Post }) {
  const navigate = useNavigate();
  const slug = createSlug(post.title);

  return (
    <article
      className="card-base card-interactive group flex h-auto flex-col gap-2 sm:h-48 sm:flex-row"
      onClick={() =>
        navigate(`/details-page/${slug}/${post._id}`, { state: { post } })
      }
    >
      <div className="w-full overflow-hidden sm:w-1/3">
        <img
          src={post.imageLink}
          alt={post.title}
          className="card-image-hover h-48 w-full rounded-lg object-cover shadow-lg sm:h-full"
        />
      </div>

      <div className="flex w-full flex-col gap-2 p-3 sm:w-2/3">
        <h3 className="line-clamp-1 text-base font-semibold">
          {post.title}
        </h3>

        <div className="flex flex-wrap gap-2">
          {post.categories.map((cat) => (
            <CategoryPill key={cat} category={cat} />
          ))}
        </div>

        <p className="line-clamp-2 text-sm opacity-80">
          {post.description}
        </p>

        <div className="mt-auto text-xs opacity-70">
          {post.authorName}
        </div>
      </div>
    </article>
  );
}