import { useParams, useLocation } from 'react-router-dom';
import FormBlog from '../form/FormBlog';
import type { Post } from '../types';

export default function EditBlog() {
  const { postId } = useParams();
  const { state } = useLocation();

  const post = state?.post as Post | undefined;

  if (!post || !postId) {
    return <div>Invalid edit request</div>;
  }

  return (
    <FormBlog
      type="edit"
      postId={postId}
      post={post}
    />
  );
}
