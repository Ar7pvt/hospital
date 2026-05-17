import { Request, Response, NextFunction } from 'express';
import Career from '../models/Career';
import { AppError } from '../middleware/errorHandler';

export const getCareers = async (_req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const data = await Career.find({ isActive: true }).sort({ createdAt: -1 });
    res.json({ success: true, data });
  } catch (err) {
    next(err);
  }
};

export const getAllCareersAdmin = async (_req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const data = await Career.find().sort({ createdAt: -1 });
    res.json({ success: true, data });
  } catch (err) {
    next(err);
  }
};

export const createCareer = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const career = await Career.create(req.body);
    res.status(201).json({ success: true, data: career });
  } catch (err) {
    next(err);
  }
};

export const updateCareer = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const career = await Career.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!career) {
      next(new AppError('Career not found', 404));
      return;
    }
    res.json({ success: true, data: career });
  } catch (err) {
    next(err);
  }
};

export const deleteCareer = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    await Career.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: 'Career deleted' });
  } catch (err) {
    next(err);
  }
};
