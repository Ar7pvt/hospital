import { Request, Response, NextFunction } from 'express';
import Appointment from '../models/Appointment';
import { getPagination } from '../utils/pagination';
import { AppError } from '../middleware/errorHandler';

export const createAppointment = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const appointment = await Appointment.create(req.body);
    await appointment.populate([
      { path: 'doctor', select: 'name specialization' },
      { path: 'department', select: 'name' },
    ]);
    res.status(201).json({ success: true, data: appointment, message: 'Appointment booked successfully' });
  } catch (err) {
    next(err);
  }
};

export const getAppointments = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { page, limit, status, search } = req.query;
    const { page: p, limit: l, skip } = getPagination(page as string, limit as string);
    const filter: Record<string, unknown> = {};
    if (status) filter.status = status;
    if (search) {
      filter.$or = [
        { patientName: { $regex: search, $options: 'i' } },
        { patientEmail: { $regex: search, $options: 'i' } },
        { patientPhone: { $regex: search, $options: 'i' } },
      ];
    }
    const [data, total] = await Promise.all([
      Appointment.find(filter)
        .populate('doctor', 'name')
        .populate('department', 'name')
        .skip(skip)
        .limit(l)
        .sort({ appointmentDate: -1 }),
      Appointment.countDocuments(filter),
    ]);
    res.json({ success: true, data, pagination: { page: p, limit: l, total, pages: Math.ceil(total / l) } });
  } catch (err) {
    next(err);
  }
};

export const updateAppointmentStatus = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const appointment = await Appointment.findByIdAndUpdate(
      req.params.id,
      { status: req.body.status, notes: req.body.notes },
      { new: true }
    );
    if (!appointment) {
      next(new AppError('Appointment not found', 404));
      return;
    }
    res.json({ success: true, data: appointment });
  } catch (err) {
    next(err);
  }
};

export const deleteAppointment = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const appointment = await Appointment.findByIdAndDelete(req.params.id);
    if (!appointment) {
      next(new AppError('Appointment not found', 404));
      return;
    }
    res.json({ success: true, message: 'Appointment deleted' });
  } catch (err) {
    next(err);
  }
};
