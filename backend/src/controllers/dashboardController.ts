import { Request, Response, NextFunction } from 'express';
import Appointment from '../models/Appointment';
import Doctor from '../models/Doctor';
import Department from '../models/Department';
import Blog from '../models/Blog';
import Career from '../models/Career';

export const getDashboardStats = async (_req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const [appointments, doctors, departments, blogs, careers, pendingAppointments, recentAppointments] =
      await Promise.all([
        Appointment.countDocuments(),
        Doctor.countDocuments({ isActive: true }),
        Department.countDocuments({ isActive: true }),
        Blog.countDocuments({ published: true }),
        Career.countDocuments({ isActive: true }),
        Appointment.countDocuments({ status: 'pending' }),
        Appointment.find()
          .populate('doctor', 'name')
          .populate('department', 'name')
          .sort({ createdAt: -1 })
          .limit(5),
      ]);

    const statusBreakdown = await Appointment.aggregate([
      { $group: { _id: '$status', count: { $sum: 1 } } },
    ]);

    res.json({
      success: true,
      data: {
        stats: {
          appointments,
          doctors,
          departments,
          blogs,
          careers,
          pendingAppointments,
        },
        statusBreakdown,
        recentAppointments,
      },
    });
  } catch (err) {
    next(err);
  }
};
