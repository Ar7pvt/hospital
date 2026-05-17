import mongoose, { Document, Schema } from 'mongoose';

export interface IDepartment extends Document {
  name: string;
  slug: string;
  banner: string;
  icon: string;
  overview: string;
  treatments: string[];
  equipment: string[];
  workingHours: string;
  emergencySupport: string;
  featured: boolean;
  order: number;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const departmentSchema = new Schema<IDepartment>(
  {
    name: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    banner: { type: String, default: '' },
    icon: { type: String, default: '' },
    overview: { type: String, default: '' },
    treatments: [{ type: String }],
    equipment: [{ type: String }],
    workingHours: { type: String, default: '24/7' },
    emergencySupport: { type: String, default: '' },
    featured: { type: Boolean, default: false },
    order: { type: Number, default: 0 },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export default mongoose.model<IDepartment>('Department', departmentSchema);
