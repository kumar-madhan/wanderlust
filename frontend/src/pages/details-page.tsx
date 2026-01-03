// src/pages/details-page.tsx

import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

import navigateBackWhiteIcon from '@/assets/svg/navigate-back-white.svg';
import arrowRightBlackIcon from '@/assets/svg/arrow-right-black.svg';

import formatPostTime from '@/utils/format-post-time';
import CategoryPill from '@/components/category-pill';
import { Post } from '@/types/post-type';
import axiosInstance from '@/helpers/axios-instance';
import { PostCardSkeleton } from '@/components/skeletons/post-card-skeleton';
import PostCard from '@/components/post-card';
import PostMobileViewComponent from '@/components/PostMobileViewComponent';
import { PostMobileViewCardSkeleton } from '@/components/PostMobileViewCardSkeleton';
import PenIcon from '@/assets/svg/pen-icon';
import TrashIcon from '@/assets/svg/trash-icon';
import { toast } from 'react-toastify';
import useAuthData from '@/hooks/useAuthData';

export default function DetailsPage() {
  const { state } = useLocation();
  const { postId } = useParams<{ title: string; postId: string }>();
  const navigate = useNavigate();
  const userData = useAuthData();

  const [post, setPost] = useState<Post | null>(state?.post ?? null);
  const [loading, setLoading] = useState(!state?.post);
  const [relatedPosts, setRelatedPosts] = useState<Post[]>([]);
  const [relatedLoading, setRelatedLoading] = useState(false);

  useEffect(() => {
    if (!postId || post) return;

    const fetchPost = async () => {
      try {
        const { data } = await axiosInstance.get(`/posts/${postId}`);
        setPost(data);
      } catch {
        toast.error('Post not found');
        navigate('/');
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [postId, post, navigate]);

  useEffect(() => {
    if (!post) return;

    const fetchRelated = async () => {
      try {
        setRelatedLoading(true);
        const { data } = await axiosInstance.get(
          `/posts/category/${post.categories[0]}`
        );
        setRelatedPosts(data.filter((p: Post) => p._id !== post._id));
      } finally {
        setRelatedLoading(false);
      }
    };

    fetchRelated();
  }, [post]);

  const handleDelete = async () => {
    try {
      await axiosInstance.delete(`/posts/${postId}`);
      toast.success('Post deleted');
      navigate('/');
    } catch {
      toast.error('Delete failed');
    }
  };

  if (loading || !post) return <PostCardSkeleton />;

  return (
    <div className="flex-grow bg-light dark:bg-dark">
      <div className="relative">
        <img
          src={post.imageLink}
          alt={post.title}
          className="h-80 w-full object-cover sm:h-96"
        />
        <div className="absolute inset-0 bg-slate-950/60" />

        <div className="absolute top-12 flex w-full justify-between px-4 text-white">
          <img
            src={navigateBackWhiteIcon}
            className="h-5 w-10 cursor-pointer"
            onClick={() => navigate(-1)}
          />

          {userData?.role === 'ADMIN' && (
            <div className="flex gap-4">
              <button onClick={handleDelete}><TrashIcon /></button>
              <button onClick={() => navigate(`/edit-blog/${postId}`, { state: { post } })}>
                <PenIcon />
              </button>
            </div>
          )}
        </div>

        <div className="absolute bottom-6 px-6 text-white">
          <div className="mb-4 flex gap-2">
            {post.categories.map((c) => (
              <CategoryPill key={c} category={c} />
            ))}
          </div>
          <h1 className="mb-2 text-2xl font-semibold">{post.title}</h1>
          <p className="text-sm">{post.authorName}</p>
          <p className="text-xs">{formatPostTime(post.timeOfPost)}</p>
        </div>
      </div>

      <div className="mx-auto max-w-4xl px-4 py-10 text-light-secondary dark:text-dark-secondary">
        <p className="leading-7">{post.description}</p>
      </div>

      <div className="container mx-auto px-4 py-6">
        <div className="flex justify-between text-xl font-semibold text-light-title dark:text-dark-title">
          <span>Related Blogs</span>
          <Link to="/" className="flex items-center gap-1 text-sm text-gray-400">
            see more
            <img
              src={arrowRightBlackIcon}
              className="h-6 w-6 dark:invert"
            />
          </Link>
        </div>

        <div className="block sm:hidden">
          {relatedLoading
            ? <PostMobileViewCardSkeleton />
            : relatedPosts.slice(0, 3).map(p => (
                <PostMobileViewComponent key={p._id} post={p} />
              ))}
        </div>

        <div className="hidden sm:flex flex-wrap">
          {relatedLoading
            ? <PostCardSkeleton />
            : relatedPosts.slice(0, 4).map(p => (
                <PostCard key={p._id} post={p} />
              ))}
        </div>
      </div>
    </div>
  );
}
