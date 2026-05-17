import mongoose, { Document, Schema } from 'mongoose';

export interface ICareer extends Document {
  title: string;
  department: string;
  location: string;
  type: 'full-time' | 'part-time' | 'contract';
  description: string;
  requirements: string[];
  salary?: string;
  deadline?: Date;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const careerSchema = new Schema<ICareer>(
  {
    title: { type: String, required: true },
    department: { type: String, required: true },
    location: { type: String, default: 'Main Campus' },
    type: { type: String, enum: ['full-time', 'part-time', 'contract'], default: 'full-time' },
    description: { type: String, required: true },
    requirements: [{ type: String }],
    salary: { type: String },
    deadline: { type: Date },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export default mongoose.model<ICareer>('Career', careerSchema);
