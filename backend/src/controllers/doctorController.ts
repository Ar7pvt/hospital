import { Request, Response, NextFunction } from 'express';
import Doctor from '../models/Doctor';
import Review from '../models/Review';
import { slugify } from '../utils/slugify';
import { getPagination } from '../utils/pagination';
import { AppError } from '../middleware/errorHandler';

export const getDoctors = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { page, limit, search, department, featured } = req.query;
    const { page: p, limit: l, skip } = getPagination(page as string, limit as string);
    const filter: Record<string, unknown> = { isActive: true };
    if (department) filter.department = department;
    if (featured === 'true') filter.featured = true;
    if (search) {
      filter.$or = [
        { name: { $regex: search, $options: 'i' } },
        { specialization: { $regex: search, $options: 'i' } },
      ];
    }
    const [data, total] = await Promise.all([
      Doctor.find(filter).populate('department', 'name slug').skip(skip).limit(l).sort({ name: 1 }),
      Doctor.countDocuments(filter),
    ]);
    res.json({ success: true, data, pagination: { page: p, limit: l, total, pages: Math.ceil(total / l) } });
  } catch (err) {
    next(err);
  }
};

export const getDoctorBySlug = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const doctor = await Doctor.findOne({ slug: req.params.slug, isActive: true }).populate('department');
    if (!doctor) {
      next(new AppError('Doctor not found', 404));
      return;
    }
    const reviews = await Review.find({ doctor: doctor._id, approved: true }).sort({ createdAt: -1 }).limit(10);
    res.json({ success: true, data: doctor, reviews });
  } catch (err) {
    next(err);
  }
};

export const getAllDoctorsAdmin = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { page, limit, search } = req.query;
    const { page: p, limit: l, skip } = getPagination(page as string, limit as string);
    const filter: Record<string, unknown> = {};
    if (search) filter.name = { $regex: search, $options: 'i' };
    const [data, total] = await Promise.all([
      Doctor.find(filter).populate('department', 'name').skip(skip).limit(l).sort({ createdAt: -1 }),
      Doctor.countDocuments(filter),
    ]);
    res.json({ success: true, data, pagination: { page: p, limit: l, total, pages: Math.ceil(total / l) } });
  } catch (err) {
    next(err);
  }
};

export const createDoctor = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const body = { ...req.body };
    if (req.file) body.image = `/uploads/${req.file.filename}`;
    body.slug = slugify(body.name);
    const doctor = await Doctor.create(body);
    res.status(201).json({ success: true, data: doctor });
  } catch (err) {
    next(err);
  }
};

export const updateDoctor = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const body = { ...req.body };
    if (req.file) body.image = `/uploads/${req.file.filename}`;
    if (body.name) body.slug = slugify(body.name);
    const doctor = await Doctor.findByIdAndUpdate(req.params.id, body, { new: true, runValidators: true });
    if (!doctor) {
      next(new AppError('Doctor not found', 404));
      return;
    }
    res.json({ success: true, data: doctor });
  } catch (err) {
    next(err);
  }
};

export const deleteDoctor = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const doctor = await Doctor.findByIdAndDelete(req.params.id);
    if (!doctor) {
      next(new AppError('Doctor not found', 404));
      return;
    }
    res.json({ success: true, message: 'Doctor deleted' });
  } catch (err) {
    next(err);
  }
};
