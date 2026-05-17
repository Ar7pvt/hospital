import { Router } from 'express';
import {
  getDoctors,
  getDoctorBySlug,
  getAllDoctorsAdmin,
  createDoctor,
  updateDoctor,
  deleteDoctor,
} from '../controllers/doctorController';
import { protect } from '../middleware/auth';
import { upload } from '../middleware/upload';

const router = Router();

router.get('/', getDoctors);
router.get('/admin/all', protect, getAllDoctorsAdmin);
router.get('/:slug', getDoctorBySlug);
router.post('/', protect, upload.single('image'), createDoctor);
router.put('/:id', protect, upload.single('image'), updateDoctor);
router.delete('/:id', protect, deleteDoctor);

export default router;
