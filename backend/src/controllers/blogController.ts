import { Request, Response, NextFunction } from 'express';
import Blog from '../models/Blog';
import { slugify } from '../utils/slugify';
import { getPagination } from '../utils/pagination';
import { AppError } from '../middleware/errorHandler';

export const getBlogs = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { page, limit, category } = req.query;
    const { page: p, limit: l, skip } = getPagination(page as string, limit as string);
    const filter: Record<string, unknown> = { published: true };
    if (category) filter.category = category;
    const [data, total] = await Promise.all([
      Blog.find(filter).skip(skip).limit(l).sort({ createdAt: -1 }),
      Blog.countDocuments(filter),
    ]);
    res.json({ success: true, data, pagination: { page: p, limit: l, total, pages: Math.ceil(total / l) } });
  } catch (err) {
    next(err);
  }
};

export const getBlogBySlug = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const blog = await Blog.findOne({ slug: req.params.slug, published: true });
    if (!blog) {
      next(new AppError('Blog not found', 404));
      return;
    }
    res.json({ success: true, data: blog });
  } catch (err) {
    next(err);
  }
};

export const getAllBlogsAdmin = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const data = await Blog.find().sort({ createdAt: -1 });
    res.json({ success: true, data });
  } catch (err) {
    next(err);
  }
};

export const createBlog = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const body = { ...req.body };
    if (req.file) body.image = `/uploads/${req.file.filename}`;
    body.slug = slugify(body.title);
    const blog = await Blog.create(body);
    res.status(201).json({ success: true, data: blog });
  } catch (err) {
    next(err);
  }
};

export const updateBlog = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const body = { ...req.body };
    if (req.file) body.image = `/uploads/${req.file.filename}`;
    if (body.title) body.slug = slugify(body.title);
    const blog = await Blog.findByIdAndUpdate(req.params.id, body, { new: true });
    if (!blog) {
      next(new AppError('Blog not found', 404));
      return;
    }
    res.json({ success: true, data: blog });
  } catch (err) {
    next(err);
  }
};

export const deleteBlog = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    await Blog.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: 'Blog deleted' });
  } catch (err) {
    next(err);
  }
};
