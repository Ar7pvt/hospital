import mongoose, { Document, Schema } from 'mongoose';

export interface IWebsiteContent extends Document {
  key: string;
  section: string;
  data: Record<string, unknown>;
  updatedAt: Date;
}

const websiteContentSchema = new Schema<IWebsiteContent>(
  {
    key: { type: String, required: true, unique: true },
    section: { type: String, required: true },
    data: { type: Schema.Types.Mixed, default: {} },
  },
  { timestamps: true }
);

export default mongoose.model<IWebsiteContent>('WebsiteContent', websiteContentSchema);
