import mongoose, { Document, Schema } from 'mongoose';

export interface IAppointment extends Document {
  patientName: string;
  patientEmail: string;
  patientPhone: string;
  patientAge?: number;
  patientGender?: string;
  symptoms?: string;
  department: mongoose.Types.ObjectId;
  doctor: mongoose.Types.ObjectId;
  appointmentDate: Date;
  timeSlot: string;
  status: 'pending' | 'confirmed' | 'cancelled' | 'completed';
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}

const appointmentSchema = new Schema<IAppointment>(
  {
    patientName: { type: String, required: true },
    patientEmail: { type: String, required: true },
    patientPhone: { type: String, required: true },
    patientAge: { type: Number },
    patientGender: { type: String, enum: ['male', 'female', 'other'] },
    symptoms: { type: String },
    department: { type: Schema.Types.ObjectId, ref: 'Department', required: true },
    doctor: { type: Schema.Types.ObjectId, ref: 'Doctor', required: true },
    appointmentDate: { type: Date, required: true },
    timeSlot: { type: String, required: true },
    status: {
      type: String,
      enum: ['pending', 'confirmed', 'cancelled', 'completed'],
      default: 'pending',
    },
    notes: { type: String },
  },
  { timestamps: true }
);

export default mongoose.model<IAppointment>('Appointment', appointmentSchema);
