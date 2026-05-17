import { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import MainLayout from '../components/layout/MainLayout';
import AdminLayout from '../layouts/AdminLayout';
import ProtectedRoute from '../components/admin/ProtectedRoute';

const Home = lazy(() => import('../pages/Home'));
const AboutHospital = lazy(() => import('../pages/AboutHospital'));
const AboutOrganisation = lazy(() => import('../pages/AboutOrganisation'));
const DepartmentDetail = lazy(() => import('../pages/DepartmentDetail'));
const Doctors = lazy(() => import('../pages/Doctors'));
const PatientCorner = lazy(() => import('../pages/PatientCorner'));
const Contact = lazy(() => import('../pages/Contact'));
const BookAppointment = lazy(() => import('../pages/BookAppointment'));
const AdminLogin = lazy(() => import('../pages/admin/Login'));
const Dashboard = lazy(() => import('../pages/admin/Dashboard'));
const AdminDoctors = lazy(() => import('../pages/admin/AdminDoctors'));
const AdminDepartments = lazy(() => import('../pages/admin/AdminDepartments'));
const AdminAppointments = lazy(() => import('../pages/admin/AdminAppointments'));
const AdminBlogs = lazy(() => import('../pages/admin/AdminBlogs'));
const AdminCareers = lazy(() => import('../pages/admin/AdminCareers'));

const Loader = () => (
  <div className="flex min-h-[50vh] items-center justify-center">
    <div className="h-10 w-10 animate-spin rounded-full border-4 border-primary-200 border-t-primary-600" />
  </div>
);

export default function AppRoutes() {
  return (
    <Suspense fallback={<Loader />}>
      <Routes>
        <Route element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="about/hospital" element={<AboutHospital />} />
          <Route path="about/organisation" element={<AboutOrganisation />} />
          <Route path="departments/:slug" element={<DepartmentDetail />} />
          <Route path="doctors" element={<Doctors />} />
          <Route path="patient-corner" element={<PatientCorner />} />
          <Route path="contact" element={<Contact />} />
          <Route path="book-appointment" element={<BookAppointment />} />
        </Route>
        <Route path="admin/login" element={<AdminLogin />} />
        <Route
          path="admin"
          element={
            <ProtectedRoute>
              <AdminLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Dashboard />} />
          <Route path="doctors" element={<AdminDoctors />} />
          <Route path="departments" element={<AdminDepartments />} />
          <Route path="appointments" element={<AdminAppointments />} />
          <Route path="blogs" element={<AdminBlogs />} />
          <Route path="careers" element={<AdminCareers />} />
        </Route>
      </Routes>
    </Suspense>
  );
}
