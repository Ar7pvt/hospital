import { Request, Response, NextFunction } from 'express';
import Department from '../models/Department';
import Doctor from '../models/Doctor';
import { slugify } from '../utils/slugify';
import { getPagination } from '../utils/pagination';
import { AppError } from '../middleware/errorHandler';

export const getDepartments = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { featured } = req.query;
    const filter: Record<string, unknown> = { isActive: true };
    if (featured === 'true') filter.featured = true;
    const data = await Department.find(filter).sort({ order: 1, name: 1 });
    res.json({ success: true, data });
  } catch (err) {
    next(err);
  }
};

export const getDepartmentBySlug = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const department = await Department.findOne({ slug: req.params.slug, isActive: true });
    if (!department) {
      next(new AppError('Department not found', 404));
      return;
    }
    const doctors = await Doctor.find({ department: department._id, isActive: true });
    res.json({ success: true, data: department, doctors });
  } catch (err) {
    next(err);
  }
};

export const getAllDepartmentsAdmin = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const data = await Department.find().sort({ order: 1 });
    res.json({ success: true, data });
  } catch (err) {
    next(err);
  }
};

export const createDepartment = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const body = { ...req.body };
    if (req.file) body.banner = `/uploads/${req.file.filename}`;
    body.slug = slugify(body.name);
    const department = await Department.create(body);
    res.status(201).json({ success: true, data: department });
  } catch (err) {
    next(err);
  }
};

export const updateDepartment = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const body = { ...req.body };
    if (req.file) body.banner = `/uploads/${req.file.filename}`;
    if (body.name) body.slug = slugify(body.name);
    const department = await Department.findByIdAndUpdate(req.params.id, body, { new: true });
    if (!department) {
      next(new AppError('Department not found', 404));
      return;
    }
    res.json({ success: true, data: department });
  } catch (err) {
    next(err);
  }
};

export const deleteDepartment = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const department = await Department.findByIdAndDelete(req.params.id);
    if (!department) {
      next(new AppError('Department not found', 404));
      return;
    }
    res.json({ success: true, message: 'Department deleted' });
  } catch (err) {
    next(err);
  }
};
