// src/pages/details-page.tsx

import { Link, useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import navigateBackWhiteIcon from '@/assets/svg/navigate-back-white.svg';
import arrowRightWhiteIcon from '@/assets/svg/arrow-right-white.svg';
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
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { role } = useAuthData();

  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);
  const [relatedPosts, setRelatedPosts] = useState<Post[]>([]);
  const [relatedLoading, setRelatedLoading] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    setIsDarkMode(localStorage.getItem('theme') === 'dark');
  }, []);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const { data } = await axiosInstance.get(`/posts/${id}`);
        setPost(data);
      } catch {
        toast.error('Post not found');
        navigate('/');
      } finally {
        setLoading(false);
      }
    };
    fetchPost();
  }, [id, navigate]);

  useEffect(() => {
    if (!post) return;

    const fetchRelated = async () => {
      try {
        setRelatedLoading(true);
        const data = await axiosInstance.get(
          `/posts/category/${post.categories[0]}`
        );
        setRelatedPosts(data.data.filter((p: Post) => p.id !== post.id));
      } finally {
        setRelatedLoading(false);
      }
    };
    fetchRelated();
  }, [post]);

  const handleDelete = async () => {
    try {
      await axiosInstance.delete(`/posts/${id}`);
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
        <img src={post.imageLink} alt={post.title} className="h-80 w-full object-cover sm:h-96" />
        <div className="absolute inset-0 bg-slate-950/60" />

        <div className="absolute top-12 flex w-full justify-between px-4 text-white">
          <img
            src={navigateBackWhiteIcon}
            className="h-5 w-10 cursor-pointer"
            onClick={() => navigate(-1)}
          />

          {role === 'ADMIN' && (
            <div className="flex gap-4">
              <button onClick={handleDelete}><TrashIcon /></button>
              <button onClick={() => navigate(`/edit-blog/${id}`)}><PenIcon /></button>
            </div>
          )}
        </div>

        <div className="absolute bottom-6 px-6 text-white">
          <div className="mb-4 flex gap-2">
            {post.categories.map((c) => <CategoryPill key={c} category={c} />)}
          </div>
          <h1 className="mb-2 text-2xl font-semibold">{post.title}</h1>
          <p className="text-sm">{post.authorName}</p>
          <p className="text-xs">{formatPostTime(post.timeOfPost)}</p>
        </div>
      </div>

      <div className="mx-auto max-w-4xl px-4 py-10">
        <p className="leading-7">{post.description}</p>
      </div>

      <div className="container mx-auto px-4 py-6">
        <div className="flex justify-between text-xl font-semibold">
          <span>Related Blogs</span>
          <Link to="/" className="flex items-center gap-1 text-sm text-gray-400">
            see more
            <img src={isDarkMode ? arrowRightWhiteIcon : arrowRightBlackIcon} className="h-6 w-6" />
          </Link>
        </div>

        <div className="block sm:hidden">
          {relatedLoading
            ? <PostMobileViewCardSkeleton />
            : relatedPosts.slice(0, 3).map(p => (
                <PostMobileViewComponent key={p.id} post={p} />
              ))}
        </div>

        <div className="hidden sm:flex flex-wrap">
          {relatedLoading
            ? <PostCardSkeleton />
            : relatedPosts.slice(0, 4).map(p => (
                <PostCard key={p.id} post={p} />
              ))}
        </div>
      </div>
    </div>
  );
}
