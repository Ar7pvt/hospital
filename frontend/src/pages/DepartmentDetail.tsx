import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Clock, Phone, Stethoscope } from 'lucide-react';
import { departmentApi } from '../services/api';
import type { Department, Doctor } from '../types';
import { CardSkeleton } from '../components/ui/Skeleton';

export default function DepartmentDetail() {
  const { slug } = useParams<{ slug: string }>();
  const [department, setDepartment] = useState<Department | null>(null);
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!slug) return;
    departmentApi
      .bySlug(slug)
      .then((res) => {
        setDepartment(res.data.data);
        setDoctors(res.data.doctors || []);
      })
      .catch(() => setDepartment(null))
      .finally(() => setLoading(false));
  }, [slug]);

  if (loading) return <div className="mx-auto max-w-7xl p-8"><CardSkeleton /></div>;
  if (!department) return <div className="p-16 text-center">Department not found</div>;

  return (
    <div>
      <div className="relative h-64 md:h-80">
        <img src={department.banner} alt={department.name} className="h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 to-transparent" />
        <div className="absolute bottom-0 mx-auto w-full max-w-7xl px-4 pb-8 lg:px-8">
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-4xl font-bold text-white">
            {department.name}
          </motion.h1>
        </div>
      </div>
      <div className="mx-auto max-w-7xl px-4 py-12 lg:px-8">
        <p className="text-lg text-slate-600 dark:text-slate-400">{department.overview}</p>
        <div className="mt-10 grid gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2 space-y-8">
            <section className="glass rounded-2xl p-6">
              <h2 className="text-xl font-bold">Treatments & Services</h2>
              <ul className="mt-4 grid gap-2 sm:grid-cols-2">
                {department.treatments?.map((t) => (
                  <li key={t} className="flex items-center gap-2 text-sm"><Stethoscope className="h-4 w-4 text-primary-500" />{t}</li>
                ))}
              </ul>
            </section>
            <section className="glass rounded-2xl p-6">
              <h2 className="text-xl font-bold">Equipment & Facilities</h2>
              <ul className="mt-4 flex flex-wrap gap-2">
                {department.equipment?.map((e) => (
                  <span key={e} className="rounded-full bg-primary-100 px-3 py-1 text-sm text-primary-800 dark:bg-primary-900/50 dark:text-primary-200">{e}</span>
                ))}
              </ul>
            </section>
            <section>
              <h2 className="text-xl font-bold">Specialist Doctors</h2>
              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                {doctors.map((d) => (
                  <Link key={d._id} to="/doctors" className="glass flex gap-4 rounded-xl p-4 transition hover:shadow-lg">
                    <img src={d.image} alt={d.name} className="h-16 w-16 rounded-lg object-cover" />
                    <div>
                      <p className="font-semibold">{d.name}</p>
                      <p className="text-sm text-primary-600">{d.specialization}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          </div>
          <aside className="space-y-4">
            <div className="glass rounded-2xl p-6">
              <h3 className="font-bold">Working Hours</h3>
              <p className="mt-2 flex items-center gap-2 text-sm"><Clock className="h-4 w-4" />{department.workingHours}</p>
            </div>
            <div className="glass rounded-2xl border border-red-200 p-6 dark:border-red-900">
              <h3 className="font-bold text-red-600">Emergency Support</h3>
              <p className="mt-2 flex items-center gap-2 text-sm"><Phone className="h-4 w-4" />{department.emergencySupport}</p>
            </div>
            <Link to="/book-appointment" className="btn-primary w-full text-center">Book Appointment</Link>
          </aside>
        </div>
      </div>
    </div>
  );
}
