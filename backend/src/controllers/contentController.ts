import { Request, Response, NextFunction } from 'express';
import WebsiteContent from '../models/WebsiteContent';
import { AppError } from '../middleware/errorHandler';

export const getContentByKey = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const content = await WebsiteContent.findOne({ key: req.params.key });
    if (!content) {
      res.json({ success: true, data: null });
      return;
    }
    res.json({ success: true, data: content });
  } catch (err) {
    next(err);
  }
};

export const getAllContent = async (_req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const data = await WebsiteContent.find().sort({ section: 1 });
    res.json({ success: true, data });
  } catch (err) {
    next(err);
  }
};

export const upsertContent = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { key, section, data } = req.body;
    const content = await WebsiteContent.findOneAndUpdate(
      { key },
      { key, section, data },
      { new: true, upsert: true, runValidators: true }
    );
    res.json({ success: true, data: content });
  } catch (err) {
    next(err);
  }
};

export const deleteContent = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const content = await WebsiteContent.findOneAndDelete({ key: req.params.key });
    if (!content) {
      next(new AppError('Content not found', 404));
      return;
    }
    res.json({ success: true, message: 'Content deleted' });
  } catch (err) {
    next(err);
  }
};
