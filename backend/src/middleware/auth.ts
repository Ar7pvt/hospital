import { Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { AuthRequest } from '../interfaces';
import { AppError } from './errorHandler';

export const protect = (req: AuthRequest, _res: Response, next: NextFunction): void => {
  const authHeader = req.headers.authorization;
  if (!authHeader?.startsWith('Bearer ')) {
    next(new AppError('Not authorized', 401));
    return;
  }
  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'fallback_secret') as {
      id: string;
    };
    req.admin = { id: decoded.id } as AuthRequest['admin'];
    next();
  } catch {
    next(new AppError('Invalid token', 401));
  }
};
