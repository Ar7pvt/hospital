import { Router } from 'express';
import {
  getCareers,
  getAllCareersAdmin,
  createCareer,
  updateCareer,
  deleteCareer,
} from '../controllers/careerController';
import { protect } from '../middleware/auth';

const router = Router();

router.get('/', getCareers);
router.get('/admin/all', protect, getAllCareersAdmin);
router.post('/', protect, createCareer);
router.put('/:id', protect, updateCareer);
router.delete('/:id', protect, deleteCareer);

export default router;
