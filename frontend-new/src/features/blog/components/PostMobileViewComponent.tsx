import { useNavigate } from 'react-router-dom';
import { createSlug } from '@/utils/slug-generator';
import type { Post } from '@/types/post-type';
import CategoryPill from './CategoryPill';
import formatPostTime from '@/utils/format-post-time';

export default function PostMobileViewComponent({
  post,
}: {
  post: Post;
}) {
  const navigate = useNavigate();
  const slug = createSlug(post.title);

  return (
    <div
      className="cursor-pointer rounded-lg border p-3"
      onClick={() =>
        navigate(`/details-page/${slug}/${post._id}`, {
          state: { post },
        })
      }
    >
      <img
        src={post.imageLink}
        className="h-32 w-full rounded-md object-cover"
      />

      <h3 className="mt-2 font-semibold">{post.title}</h3>

      <div className="my-1 flex flex-wrap gap-1">
        {post.categories.map(cat => (
          <CategoryPill key={cat} category={cat} />
        ))}
      </div>

      <p className="text-xs opacity-70">
        {post.authorName} • {formatPostTime(post.timeOfPost)}
      </p>
    </div>
  );
}
