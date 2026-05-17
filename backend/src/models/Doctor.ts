import mongoose, { Document, Schema } from 'mongoose';

export interface IDoctor extends Document {
  name: string;
  slug: string;
  image: string;
  specialization: string;
  department: mongoose.Types.ObjectId;
  experience: number;
  qualification: string;
  availability: string;
  consultationFee: number;
  biography: string;
  expertise: string[];
  education: string[];
  certifications: string[];
  languages: string[];
  awards: string[];
  schedule: { day: string; slots: string[] }[];
  featured: boolean;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const doctorSchema = new Schema<IDoctor>(
  {
    name: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    image: { type: String, default: '' },
    specialization: { type: String, required: true },
    department: { type: Schema.Types.ObjectId, ref: 'Department', required: true },
    experience: { type: Number, default: 0 },
    qualification: { type: String, required: true },
    availability: { type: String, default: 'Mon-Fri 9AM-5PM' },
    consultationFee: { type: Number, default: 500 },
    biography: { type: String, default: '' },
    expertise: [{ type: String }],
    education: [{ type: String }],
    certifications: [{ type: String }],
    languages: [{ type: String }],
    awards: [{ type: String }],
    schedule: [{ day: String, slots: [String] }],
    featured: { type: Boolean, default: false },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export default mongoose.model<IDoctor>('Doctor', doctorSchema);
