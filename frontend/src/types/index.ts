export interface Department {
  _id: string;
  name: string;
  slug: string;
  banner?: string;
  icon?: string;
  overview: string;
  treatments: string[];
  equipment: string[];
  workingHours: string;
  emergencySupport: string;
  featured?: boolean;
}

export interface Doctor {
  _id: string;
  name: string;
  slug: string;
  image: string;
  specialization: string;
  department: Department | string;
  experience: number;
  qualification: string;
  availability: string;
  consultationFee: number;
  biography?: string;
  expertise?: string[];
  education?: string[];
  certifications?: string[];
  languages?: string[];
  awards?: string[];
  schedule?: { day: string; slots: string[] }[];
  featured?: boolean;
}

export interface Review {
  _id: string;
  patientName: string;
  rating: number;
  comment: string;
}

export interface Blog {
  _id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  image?: string;
  category: string;
  author: string;
  tags: string[];
  createdAt: string;
}

export interface AppointmentPayload {
  patientName: string;
  patientEmail: string;
  patientPhone: string;
  patientAge?: number;
  patientGender?: string;
  symptoms?: string;
  department: string;
  doctor: string;
  appointmentDate: string;
  timeSlot: string;
}

export interface Admin {
  id: string;
  name: string;
  email: string;
  role: string;
}

export interface Pagination {
  page: number;
  limit: number;
  total: number;
  pages: number;
}
