// src/pages/edit-blog.tsx

import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import FormBlog from '@/components/form-blog';
import { Post } from '@/types/post-type';
import axiosInstance from '@/helpers/axios-instance';
import useAuthData from '@/hooks/useAuthData';

const EditBlog = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { role } = useAuthData();

  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (role !== 'ADMIN') {
      navigate(-1);
      return;
    }

    const fetchPost = async () => {
      try {
        const { data } = await axiosInstance.get(`/posts/${id}`);
        setPost(data);
      } catch {
        navigate('/');
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [id, role, navigate]);

  if (loading) return <h1>Loading...</h1>;
  if (!post) return null;

  return <FormBlog postId={id} type="edit" post={post} />;
};

export default EditBlog;
