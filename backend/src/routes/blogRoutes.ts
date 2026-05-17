import { Router } from 'express';
import {
  getBlogs,
  getBlogBySlug,
  getAllBlogsAdmin,
  createBlog,
  updateBlog,
  deleteBlog,
} from '../controllers/blogController';
import { protect } from '../middleware/auth';
import { upload } from '../middleware/upload';

const router = Router();

router.get('/', getBlogs);
router.get('/admin/all', protect, getAllBlogsAdmin);
router.get('/:slug', getBlogBySlug);
router.post('/', protect, upload.single('image'), createBlog);
router.put('/:id', protect, upload.single('image'), updateBlog);
router.delete('/:id', protect, deleteBlog);

export default router;
