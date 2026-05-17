import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { X, Star } from 'lucide-react';
import type { Doctor, Review } from '../../types';

interface Props {
  doctor: Doctor;
  reviews?: Review[];
  onClose: () => void;
}

export default function DoctorModal({ doctor, reviews = [], onClose }: Props) {
  const deptName = typeof doctor.department === 'object' ? doctor.department?.name : '';

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9 }}
        animate={{ scale: 1 }}
        className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl bg-white dark:bg-slate-900"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative h-48 bg-gradient-to-r from-primary-600 to-primary-800">
          <img src={doctor.image} alt={doctor.name} className="absolute bottom-0 left-6 h-32 w-32 rounded-2xl border-4 border-white object-cover dark:border-slate-900" />
          <button type="button" onClick={onClose} className="absolute right-4 top-4 rounded-full bg-white/20 p-2 text-white">
            <X />
          </button>
        </div>
        <div className="p-6 pt-16">
          <h2 className="text-2xl font-bold">{doctor.name}</h2>
          <p className="text-primary-600">{doctor.specialization} · {deptName}</p>
          <p className="mt-4 text-slate-600 dark:text-slate-300">{doctor.biography}</p>
          {doctor.expertise?.length ? (
            <Section title="Expertise" items={doctor.expertise} />
          ) : null}
          {doctor.education?.length ? <Section title="Education" items={doctor.education} /> : null}
          {doctor.certifications?.length ? <Section title="Certifications" items={doctor.certifications} /> : null}
          {doctor.languages?.length ? <Section title="Languages" items={doctor.languages} /> : null}
          {doctor.awards?.length ? <Section title="Awards" items={doctor.awards} /> : null}
          {doctor.schedule?.length ? (
            <div className="mt-4">
              <h4 className="font-semibold">Schedule</h4>
              <div className="mt-2 grid gap-2 sm:grid-cols-2">
                {doctor.schedule.map((s) => (
                  <div key={s.day} className="rounded-lg bg-slate-50 p-3 text-sm dark:bg-slate-800">
                    <p className="font-medium">{s.day}</p>
                    <p className="text-slate-500">{s.slots.join(', ')}</p>
                  </div>
                ))}
              </div>
            </div>
          ) : null}
          {reviews.length > 0 && (
            <div className="mt-4">
              <h4 className="font-semibold">Reviews</h4>
              {reviews.map((r) => (
                <div key={r._id} className="mt-2 rounded-lg border border-slate-200 p-3 dark:border-slate-700">
                  <div className="flex items-center gap-1">
                    {Array.from({ length: r.rating }).map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <p className="mt-1 text-sm font-medium">{r.patientName}</p>
                  <p className="text-sm text-slate-600 dark:text-slate-400">{r.comment}</p>
                </div>
              ))}
            </div>
          )}
          <Link
            to={`/book-appointment?doctor=${doctor._id}`}
            className="btn-primary mt-6 w-full"
            onClick={onClose}
          >
            Book Appointment
          </Link>
        </div>
      </motion.div>
    </motion.div>
  );
}

function Section({ title, items }: { title: string; items: string[] }) {
  return (
    <div className="mt-4">
      <h4 className="font-semibold">{title}</h4>
      <ul className="mt-1 list-inside list-disc text-sm text-slate-600 dark:text-slate-400">
        {items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </div>
  );
}
