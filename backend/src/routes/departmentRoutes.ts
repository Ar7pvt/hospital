import { Router } from 'express';
import {
  getDepartments,
  getDepartmentBySlug,
  getAllDepartmentsAdmin,
  createDepartment,
  updateDepartment,
  deleteDepartment,
} from '../controllers/departmentController';
import { protect } from '../middleware/auth';
import { upload } from '../middleware/upload';

const router = Router();

router.get('/', getDepartments);
router.get('/admin/all', protect, getAllDepartmentsAdmin);
router.get('/:slug', getDepartmentBySlug);
router.post('/', protect, upload.single('banner'), createDepartment);
router.put('/:id', protect, upload.single('banner'), updateDepartment);
router.delete('/:id', protect, deleteDepartment);

export default router;
