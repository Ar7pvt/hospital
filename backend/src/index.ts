import express from 'express';
import cors from 'cors';
import path from 'path';
import dotenv from 'dotenv';
import { connectDB } from './config/db';
import { errorHandler, notFound } from './middleware/errorHandler';
import authRoutes from './routes/authRoutes';
import doctorRoutes from './routes/doctorRoutes';
import departmentRoutes from './routes/departmentRoutes';
import appointmentRoutes from './routes/appointmentRoutes';
import blogRoutes from './routes/blogRoutes';
import careerRoutes from './routes/careerRoutes';
import dashboardRoutes from './routes/dashboardRoutes';
import contentRoutes from './routes/contentRoutes';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(
  cors({
    origin: process.env.CLIENT_URL || 'http://localhost:5173',
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/uploads', express.static(path.join(process.cwd(), 'uploads')));

app.use('/api/auth', authRoutes);
app.use('/api/doctors', doctorRoutes);
app.use('/api/departments', departmentRoutes);
app.use('/api/appointments', appointmentRoutes);
app.use('/api/blogs', blogRoutes);
app.use('/api/careers', careerRoutes);
app.use('/api/dashboard', dashboardRoutes);
app.use('/api/content', contentRoutes);

app.get('/api/health', (_req, res) => {
  res.json({ success: true, message: 'Hospital API is running' });
});

app.use(notFound);
app.use(errorHandler);

const start = async () => {
  await connectDB();
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
};

start();
