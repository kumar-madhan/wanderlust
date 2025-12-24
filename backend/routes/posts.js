import { Router } from 'express';
import {
  createPostHandler,
  deletePostByIdHandler,
  getAllPostsHandler,
  getFeaturedPostsHandler,
  getLatestPostsHandler,
  getPostByCategoryHandler,
  getPostByIdHandler,
  updatePostHandler,
} from '../controllers/posts-controller.js';

const router = Router();

router.post('/', createPostHandler);

// DEV-safe (no cache)
router.get('/', getAllPostsHandler);
router.get('/featured', getFeaturedPostsHandler);
router.get('/latest', getLatestPostsHandler);

router.get('/categories/:category', getPostByCategoryHandler);
router.get('/:id', getPostByIdHandler);
router.patch('/:id', updatePostHandler);
router.delete('/:id', deletePostByIdHandler);

export default router;
