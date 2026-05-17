import { useEffect, useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { Search } from 'lucide-react';
import { doctorApi } from '../services/api';
import type { Doctor, Review } from '../types';
import DoctorModal from '../components/doctors/DoctorModal';
import { CardSkeleton } from '../components/ui/Skeleton';

export default function Doctors() {
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [selected, setSelected] = useState<Doctor | null>(null);
  const [reviews, setReviews] = useState<Review[]>([]);

  useEffect(() => {
    const t = setTimeout(() => {
      doctorApi
        .list({ search, limit: '50' })
        .then((res) => setDoctors(res.data.data))
        .catch(() => setDoctors([]))
        .finally(() => setLoading(false));
    }, 300);
    return () => clearTimeout(t);
  }, [search]);

  const openModal = async (doctor: Doctor) => {
    setSelected(doctor);
    try {
      const res = await doctorApi.bySlug(doctor.slug);
      setReviews(res.data.reviews || []);
    } catch {
      setReviews([]);
    }
  };

  return (
    <div>
      <div className="bg-gradient-to-r from-primary-600 to-primary-800 py-16 text-white">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <h1 className="text-4xl font-bold">Our Doctors</h1>
          <p className="mt-2 text-primary-100">Meet our team of expert specialists</p>
          <div className="relative mt-6 max-w-md">
            <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by name or specialization..."
              className="w-full rounded-xl border-0 py-3 pl-10 pr-4 text-slate-900"
            />
          </div>
        </div>
      </div>
      <div className="mx-auto max-w-7xl px-4 py-12 lg:px-8">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {loading
            ? Array.from({ length: 6 }).map((_, i) => <CardSkeleton key={i} />)
            : doctors.map((doc) => (
                <div key={doc._id} className="glass overflow-hidden rounded-2xl transition hover:-translate-y-1 hover:shadow-xl">
                  <img src={doc.image} alt={doc.name} className="h-52 w-full object-cover object-top" />
                  <div className="p-5">
                    <h3 className="text-lg font-bold">{doc.name}</h3>
                    <p className="text-primary-600">{doc.specialization}</p>
                    <p className="mt-2 text-sm text-slate-500">{doc.experience} years · {doc.qualification}</p>
                    <p className="text-sm">Availability: {doc.availability}</p>
                    <p className="mt-1 font-semibold">₹{doc.consultationFee} consultation</p>
                    <button type="button" onClick={() => openModal(doc)} className="btn-primary mt-4 w-full py-2 text-sm">
                      View Details
                    </button>
                  </div>
                </div>
              ))}
        </div>
      </div>
      <AnimatePresence>
        {selected && <DoctorModal doctor={selected} reviews={reviews} onClose={() => setSelected(null)} />}
      </AnimatePresence>
    </div>
  );
}
