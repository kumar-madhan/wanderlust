import { useLocation, useParams } from 'react-router-dom';
import type { Post } from '../types';
import formatPostTime from '@/utils/format-post-time';

export default function DetailsPage() {
  const { state } = useLocation();
  const { postId } = useParams();

  const post: Post | undefined = state?.post;

  if (!post) {
  return <div className="p-8 text-center">Please navigate from homepage.</div>;
}

  return (
    <article className="mx-auto max-w-3xl p-6">
      <img
        src={post.imageLink}
        className="mb-6 w-full rounded-xl object-cover"
      />

      <h1 className="mb-2 text-3xl font-bold">
        {post.title}
      </h1>

      <div className="mb-6 text-sm opacity-70">
        {post.authorName} •{' '}
        {formatPostTime(post.timeOfPost)}
      </div>

      <p className="leading-relaxed">
        {post.description}
      </p>
    </article>
  );
}
