import express from 'express';
const router = express.Router();

import {
  getPosts,
  createPost,
  updatePost,
  deletePost,
  likePost,
} from '../controllers/post-controller.js';

import auth from '../middleware/auth.js';

router.route('/').get(getPosts).post(auth, createPost);
router.route('/:id').delete(auth, deletePost).patch(auth, updatePost);
router.patch('/likepost/:id', auth, likePost);

export default router;
