import { useNavigate } from 'react-router-dom';
import type { Post } from '../types';
import { createSlug } from '@/utils/slug-generator';
import CategoryPill from './CategoryPill';

export default function FeaturedPostCard({ post }: { post: Post }) {
  const navigate = useNavigate();
  const slug = createSlug(post.title);

  return (
    <article
      className="cursor-pointer rounded-xl border bg-[var(--card)] p-4 transition-all hover:-translate-y-1 hover:shadow-lg"
      onClick={() =>
        navigate(`/details-page/${slug}/${post._id}`, {
          state: { post },
        })
      }
    >
      <img
        src={post.imageLink}
        className="h-48 w-full rounded-lg object-cover"
      />

      <h3 className="mt-3 font-semibold">{post.title}</h3>

      <div className="my-2 flex flex-wrap gap-1">
        {post.categories.map((cat) => (
          <CategoryPill key={cat} category={cat} />
        ))}
      </div>

      <p className="text-sm opacity-80">{post.description}</p>
    </article>
  );
}
