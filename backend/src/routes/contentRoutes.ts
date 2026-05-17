import { Router } from 'express';
import {
  getContentByKey,
  getAllContent,
  upsertContent,
  deleteContent,
} from '../controllers/contentController';
import { protect } from '../middleware/auth';

const router = Router();

router.get('/', protect, getAllContent);
router.get('/:key', getContentByKey);
router.post('/', protect, upsertContent);
router.put('/:key', protect, upsertContent);
router.delete('/:key', protect, deleteContent);

export default router;
