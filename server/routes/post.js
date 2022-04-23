import express from 'express';
const router = express.Router();

import {
  getPosts,
  createPost,
  updatePost,
  deletePost,
  likePost,
} from '../controllers/post-controller.js';

router.route('/posts').get(getPosts).post(createPost);
router.route('/posts/:id').delete(deletePost).patch(updatePost);
router.patch('/posts/likepost/:id', likePost);

export default router;
