import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';
import { connectDB } from '../config/db';
import Admin from '../models/Admin';
import Department from '../models/Department';
import Doctor from '../models/Doctor';
import Blog from '../models/Blog';
import Career from '../models/Career';
import Review from '../models/Review';
import WebsiteContent from '../models/WebsiteContent';
import { slugify } from './slugify';

dotenv.config();

const departments = [
  { name: 'Cardiology', overview: 'Advanced cardiac care with state-of-the-art diagnostics and interventional procedures.', treatments: ['ECG', 'Echocardiography', 'Angioplasty', 'Pacemaker Implant'], equipment: ['Cath Lab', 'Holter Monitor', 'Stress Test System'], workingHours: 'Mon-Sat 8AM-8PM', emergencySupport: '24/7 Cardiac Emergency Unit', featured: true, order: 1 },
  { name: 'Neurology', overview: 'Comprehensive neurological services for brain, spine, and nervous system disorders.', treatments: ['EEG', 'EMG', 'Stroke Care', 'Epilepsy Management'], equipment: ['MRI', 'CT Scan', 'Neuro ICU'], workingHours: 'Mon-Fri 9AM-6PM', emergencySupport: 'Stroke Response Team 24/7', featured: true, order: 2 },
  { name: 'Orthopedics', overview: 'Expert bone and joint care including sports medicine and joint replacement.', treatments: ['Joint Replacement', 'Arthroscopy', 'Fracture Care', 'Spine Surgery'], equipment: ['Digital X-Ray', 'Arthroscopy Suite', 'Physiotherapy Lab'], workingHours: 'Mon-Sat 8AM-7PM', emergencySupport: 'Trauma Care Available', featured: true, order: 3 },
  { name: 'Pediatrics', overview: 'Compassionate healthcare for infants, children, and adolescents.', treatments: ['Vaccination', 'Neonatal Care', 'Growth Monitoring', 'Pediatric Surgery'], equipment: ['NICU', 'Pediatric ICU', 'Child-Friendly Wards'], workingHours: '24/7', emergencySupport: 'Pediatric Emergency 24/7', featured: true, order: 4 },
  { name: 'Oncology', overview: 'Multidisciplinary cancer care with chemotherapy, radiation, and surgical oncology.', treatments: ['Chemotherapy', 'Radiation Therapy', 'Tumor Surgery', 'Palliative Care'], equipment: ['Linear Accelerator', 'PET-CT', 'Oncology Pharmacy'], workingHours: 'Mon-Sat 9AM-5PM', emergencySupport: 'Oncology Helpline', featured: false, order: 5 },
  { name: 'Dermatology', overview: 'Skin, hair, and nail treatments with cosmetic and clinical dermatology.', treatments: ['Laser Therapy', 'Acne Treatment', 'Skin Biopsy', 'Cosmetic Procedures'], equipment: ['Laser Unit', 'Phototherapy', 'Dermoscopy'], workingHours: 'Mon-Sat 10AM-6PM', emergencySupport: 'Same-day urgent skin care', featured: false, order: 6 },
  { name: 'Gynecology', overview: "Women's health services from prenatal care to advanced gynecological surgery.", treatments: ['Prenatal Care', 'Laparoscopy', 'Fertility Treatment', 'Menopause Care'], equipment: ['Ultrasound', 'Fetal Monitor', 'Laparoscopic Suite'], workingHours: 'Mon-Sat 9AM-7PM', emergencySupport: 'Obstetric Emergency 24/7', featured: false, order: 7 },
  { name: 'ENT', overview: 'Ear, nose, and throat care with audiology and speech therapy support.', treatments: ['Hearing Tests', 'Sinus Surgery', 'Tonsillectomy', 'Cochlear Implant'], equipment: ['Audiology Lab', 'Endoscopy', 'Microsurgery Tools'], workingHours: 'Mon-Fri 9AM-6PM', emergencySupport: 'ENT Emergency on call', featured: false, order: 8 },
  { name: 'Emergency Care', overview: 'Round-the-clock emergency and trauma care with rapid response teams.', treatments: ['Trauma Care', 'Critical Care', 'Ambulance Services', 'Toxicology'], equipment: ['Emergency Bay', 'Ventilators', 'Defibrillators'], workingHours: '24/7', emergencySupport: 'Emergency: 108 / +91-1800-XXX-XXXX', featured: true, order: 9 },
  { name: 'Dental', overview: 'Complete dental care from preventive to cosmetic and surgical dentistry.', treatments: ['Root Canal', 'Implants', 'Orthodontics', 'Teeth Whitening'], equipment: ['Digital Dental X-Ray', 'CAD/CAM', 'Sterilization Unit'], workingHours: 'Mon-Sat 9AM-8PM', emergencySupport: 'Dental pain emergency walk-in', featured: false, order: 10 },
  { name: 'ICU', overview: 'Critical care units with advanced monitoring and life support systems.', treatments: ['Ventilator Support', 'Sepsis Management', 'Post-Operative Care', 'Multi-Organ Support'], equipment: ['Ventilators', 'Dialysis', 'Central Monitoring'], workingHours: '24/7', emergencySupport: 'Direct ICU admission via ER', featured: false, order: 11 },
  { name: 'Radiology', overview: 'Advanced imaging and diagnostic radiology services.', treatments: ['MRI', 'CT Scan', 'Ultrasound', 'Mammography'], equipment: ['3T MRI', '128-Slice CT', 'Digital Mammography'], workingHours: '24/7', emergencySupport: 'STAT imaging available', featured: false, order: 12 },
];

const doctorTemplates = [
  { name: 'Dr. Rajesh Kumar', specialization: 'Cardiologist', experience: 18, qualification: 'MD, DM (Cardiology)', fee: 1200 },
  { name: 'Dr. Priya Sharma', specialization: 'Neurologist', experience: 14, qualification: 'MD, DM (Neurology)', fee: 1500 },
  { name: 'Dr. Amit Patel', specialization: 'Orthopedic Surgeon', experience: 16, qualification: 'MS Orthopedics', fee: 1000 },
  { name: 'Dr. Sneha Reddy', specialization: 'Pediatrician', experience: 12, qualification: 'MD Pediatrics', fee: 800 },
  { name: 'Dr. Vikram Singh', specialization: 'Oncologist', experience: 20, qualification: 'MD, DM (Oncology)', fee: 2000 },
  { name: 'Dr. Ananya Iyer', specialization: 'Dermatologist', experience: 10, qualification: 'MD Dermatology', fee: 900 },
  { name: 'Dr. Meera Nair', specialization: 'Gynecologist', experience: 15, qualification: 'MS Obstetrics & Gynecology', fee: 1100 },
  { name: 'Dr. Karan Malhotra', specialization: 'ENT Specialist', experience: 11, qualification: 'MS ENT', fee: 750 },
];

const seed = async () => {
  await connectDB();
  console.log('Clearing existing data...');
  await Promise.all([
    Admin.deleteMany({}),
    Department.deleteMany({}),
    Doctor.deleteMany({}),
    Blog.deleteMany({}),
    Career.deleteMany({}),
    Review.deleteMany({}),
    WebsiteContent.deleteMany({}),
  ]);

  const adminEmail = process.env.ADMIN_EMAIL || 'admin@hospital.com';
  const adminPassword = process.env.ADMIN_PASSWORD || 'Admin@123';
  await Admin.create({
    name: 'Hospital Admin',
    email: adminEmail,
    password: await bcrypt.hash(adminPassword, 10),
    role: 'superadmin',
  });
  console.log(`Admin: ${adminEmail} / ${adminPassword}`);

  const deptDocs = await Department.insertMany(
    departments.map((d) => ({
      ...d,
      slug: slugify(d.name),
      banner: `https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=1200&h=400&fit=crop`,
      icon: '🏥',
    }))
  );

  const doctors = [];
  for (let i = 0; i < doctorTemplates.length; i++) {
    const t = doctorTemplates[i];
    const dept = deptDocs[i % deptDocs.length];
    doctors.push({
      name: t.name,
      slug: slugify(t.name),
      image: `https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400&h=400&fit=crop&sig=${i}`,
      specialization: t.specialization,
      department: dept._id,
      experience: t.experience,
      qualification: t.qualification,
      availability: 'Mon-Fri 9AM-5PM',
      consultationFee: t.fee,
      biography: `${t.name} is a highly experienced ${t.specialization} dedicated to patient-centered care.`,
      expertise: ['Diagnosis', 'Treatment Planning', 'Preventive Care'],
      education: [t.qualification, 'Fellowship - International Hospital'],
      certifications: ['Board Certified', 'Advanced Life Support'],
      languages: ['English', 'Hindi'],
      awards: ['Best Doctor Award 2023'],
      schedule: [
        { day: 'Monday', slots: ['09:00', '10:00', '11:00', '14:00', '15:00'] },
        { day: 'Wednesday', slots: ['09:00', '10:00', '11:00'] },
        { day: 'Friday', slots: ['14:00', '15:00', '16:00'] },
      ],
      featured: i < 4,
      isActive: true,
    });
  }
  const doctorDocs = await Doctor.insertMany(doctors);

  await Review.insertMany(
    doctorDocs.slice(0, 4).map((doc, i) => ({
      doctor: doc._id,
      patientName: ['Rahul M.', 'Sunita K.', 'Arjun P.', 'Deepa L.'][i],
      rating: 5,
      comment: 'Excellent care and very professional. Highly recommended!',
      approved: true,
    }))
  );

  await Blog.insertMany([
    { title: 'Heart Health Tips for a Stronger Life', slug: 'heart-health-tips', excerpt: 'Simple lifestyle changes to protect your heart.', content: 'Regular exercise, balanced diet, and stress management are key to cardiovascular health...', category: 'Health Tips', author: 'Cardiology Team', tags: ['heart', 'wellness'], published: true, image: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=800' },
    { title: 'Understanding Health Insurance', slug: 'health-insurance-guide', excerpt: 'A guide to navigating medical insurance claims.', content: 'Health insurance can be complex. Here is what patients need to know about coverage...', category: 'Insurance', author: 'Patient Services', tags: ['insurance'], published: true, image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800' },
    { title: 'Diabetes Prevention and Management', slug: 'diabetes-prevention', excerpt: 'Early detection and daily habits matter.', content: 'Diabetes affects millions. Learn prevention strategies and management tips...', category: 'Medical Awareness', author: 'Endocrinology', tags: ['diabetes'], published: true, image: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=800' },
  ]);

  await Career.insertMany([
    { title: 'Staff Nurse', department: 'ICU', location: 'Main Campus', type: 'full-time', description: 'Provide critical care nursing support in ICU.', requirements: ['BSc Nursing', '2+ years ICU experience'], salary: 'Competitive', isActive: true },
    { title: 'Radiologist', department: 'Radiology', location: 'Main Campus', type: 'full-time', description: 'Interpret imaging studies and collaborate with clinical teams.', requirements: ['MD Radiology', 'Board certification'], isActive: true },
  ]);

  await WebsiteContent.insertMany([
    { key: 'hospital_info', section: 'general', data: { name: 'MediCare Plus Hospital', tagline: 'Caring for Life, Healing with Excellence', phone: '+91 1800 123 4567', email: 'info@medicareplus.com', address: '123 Healthcare Avenue, Medical District, City 400001', emergency: '108' } },
    { key: 'testimonials', section: 'home', data: { items: [
      { name: 'Anita Desai', role: 'Patient', text: 'Outstanding care during my surgery. The staff was compassionate and professional.', rating: 5 },
      { name: 'Mohit Gupta', role: 'Patient Family', text: 'Emergency team saved my father. We are forever grateful.', rating: 5 },
      { name: 'Lakshmi Rao', role: 'Patient', text: 'Clean facilities and expert doctors. Best hospital experience.', rating: 5 },
    ]}},
    { key: 'stats', section: 'home', data: { patients: 50000, doctors: 120, departments: 25, years: 35 } },
  ]);

  console.log('Seed completed successfully!');
  process.exit(0);
};

seed().catch((e) => {
  console.error(e);
  process.exit(1);
});
