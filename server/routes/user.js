import { Router } from 'express';
import { signup, signin } from '../controllers/user-controller.js';

const router = Router();

router.post('/signin', signin);
router.post('/signup', signup);

export default router;
