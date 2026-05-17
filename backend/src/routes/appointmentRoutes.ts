import { Router } from 'express';
import { body } from 'express-validator';
import {
  createAppointment,
  getAppointments,
  updateAppointmentStatus,
  deleteAppointment,
} from '../controllers/appointmentController';
import { protect } from '../middleware/auth';
import { validate } from '../middleware/validate';

const router = Router();

router.post(
  '/',
  validate([
    body('patientName').notEmpty(),
    body('patientEmail').isEmail(),
    body('patientPhone').notEmpty(),
    body('department').notEmpty(),
    body('doctor').notEmpty(),
    body('appointmentDate').notEmpty(),
    body('timeSlot').notEmpty(),
  ]),
  createAppointment
);
router.get('/', protect, getAppointments);
router.patch('/:id/status', protect, updateAppointmentStatus);
router.delete('/:id', protect, deleteAppointment);

export default router;
