import mongoose, { Document, Schema } from 'mongoose';

export interface IReview extends Document {
  doctor: mongoose.Types.ObjectId;
  patientName: string;
  rating: number;
  comment: string;
  approved: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const reviewSchema = new Schema<IReview>(
  {
    doctor: { type: Schema.Types.ObjectId, ref: 'Doctor', required: true },
    patientName: { type: String, required: true },
    rating: { type: Number, required: true, min: 1, max: 5 },
    comment: { type: String, required: true },
    approved: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export default mongoose.model<IReview>('Review', reviewSchema);
