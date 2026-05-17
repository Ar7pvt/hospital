import { Response, NextFunction } from 'express';
import bcrypt from 'bcryptjs';
import Admin from '../models/Admin';
import { generateToken } from '../utils/generateToken';
import { AppError } from '../middleware/errorHandler';
import { AuthRequest } from '../interfaces';

export const login = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { email, password } = req.body;
    const admin = await Admin.findOne({ email }).select('+password');
    if (!admin || !(await bcrypt.compare(password, admin.password))) {
      next(new AppError('Invalid credentials', 401));
      return;
    }
    const token = generateToken(admin._id.toString());
    res.json({
      success: true,
      token,
      admin: { id: admin._id, name: admin.name, email: admin.email, role: admin.role },
    });
  } catch (err) {
    next(err);
  }
};

export const getMe = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const admin = await Admin.findById(req.admin?.id).select('-password');
    if (!admin) {
      next(new AppError('Admin not found', 404));
      return;
    }
    res.json({ success: true, admin });
  } catch (err) {
    next(err);
  }
};
