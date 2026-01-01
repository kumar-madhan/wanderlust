import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'react-toastify';

import axiosInstance from '@/services/axios-instance';
import userState from '@/utils/user-state';
import useAuthData from '@/hooks/useAuthData';

import CategoryPill from '../components/CategoryPill';
import { categories } from '@/utils/category-colors';
import { formBlogSchema, TFormBlogSchema } from '@/lib/types';
import type { Post } from '../types';

interface Props {
  type: 'new' | 'edit';
  postId?: string;
  post?: Post;
}

export default function FormBlog({
  type,
  postId,
  post,
}: Props) {
  const navigate = useNavigate();
  const userData = useAuthData();

  const {
    register,
    handleSubmit,
    setValue,
    trigger,
    watch,
    formState: { errors },
  } = useForm<TFormBlogSchema>({
    resolver: zodResolver(formBlogSchema),
    defaultValues: {
      title: post?.title ?? '',
      description: post?.description ?? '',
      authorName: post?.authorName ?? '',
      imageLink: post?.imageLink ?? '',
      categories: post?.categories ?? [],
      isFeaturedPost: false,
    },
  });

  const formData = watch();

  const isCategoryDisabled = (cat: string) =>
    formData.categories.length >= 3 &&
    !formData.categories.includes(cat);

  const toggleCategory = (cat: string) => {
    if (isCategoryDisabled(cat)) return;

    setValue(
      'categories',
      formData.categories.includes(cat)
        ? formData.categories.filter((c) => c !== cat)
        : [...formData.categories, cat]
    );
    trigger('categories');
  };

  const onSubmit = async () => {
    let request;

    if (type === 'new') {
      request = axiosInstance.post(
        '/api/posts',
        formData
      );
    }

    if (type === 'edit' && postId) {
      request =
        userData.role === 'ADMIN'
          ? axiosInstance.patch(
              `/api/posts/admin/${postId}`,
              formData
            )
          : axiosInstance.patch(
              `/api/posts/${postId}`,
              formData
            );
    }

    if (!request) return;

    toast.promise(request, {
      pending: 'Saving blog...',
      success: () => {
        navigate('/');
        return 'Blog saved successfully';
      },
      error: 'Blog save failed',
    });
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="mx-auto max-w-2xl rounded-xl border bg-[var(--card)] p-6 shadow-sm"
    >
      <input
        {...register('title')}
        placeholder="Blog title"
        className="mb-2 w-full rounded-lg border p-3 outline-none focus:ring-2 focus:ring-indigo-500"
      />

      <textarea
        {...register('description')}
        rows={6}
        placeholder="Write your story..."
        className="mb-2 w-full rounded-lg border p-3 outline-none focus:ring-2 focus:ring-indigo-500"
      />

      <input
        {...register('authorName')}
        placeholder="Author name"
        className="mb-2 w-full rounded-lg border p-3 outline-none focus:ring-2 focus:ring-indigo-500"
      />

      <input
        {...register('imageLink')}
        placeholder="Image URL"
        className="mb-4 w-full rounded-lg border p-3 outline-none focus:ring-2 focus:ring-indigo-500"
      />

      <div className="mb-4 flex flex-wrap gap-2">
        {categories.map((cat) => (
          <span key={cat} onClick={() => toggleCategory(cat)}>
            <CategoryPill
              category={cat}
              selected={formData.categories.includes(cat)}
            />
          </span>
        ))}
      </div>

      <button
        type="submit"
        className="rounded-lg bg-black px-6 py-3 text-white transition-all hover:scale-[1.02] hover:shadow-md active:scale-[0.98]"
      >
        {type === 'new' ? 'Post Blog' : 'Update Blog'}
      </button>
    </form>
  );
}