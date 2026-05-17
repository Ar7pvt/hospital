import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Ambulance, Award, Users, Building2, ChevronDown } from 'lucide-react';
import { departmentApi, doctorApi, contentApi } from '../services/api';
import type { Department, Doctor } from '../types';
import { HOSPITAL } from '../constants/navigation';
import { CardSkeleton } from '../components/ui/Skeleton';

const fadeUp = { initial: { opacity: 0, y: 24 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true } };

export default function Home() {
  const [departments, setDepartments] = useState<Department[]>([]);
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [testimonials, setTestimonials] = useState<{ name: string; role: string; text: string; rating: number }[]>([]);
  const [stats, setStats] = useState({ patients: 50000, doctors: 120, departments: 25, years: 35 });
  const [loading, setLoading] = useState(true);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  useEffect(() => {
    Promise.all([
      departmentApi.list({ featured: 'true' }),
      doctorApi.list({ featured: 'true', limit: '4' }),
      contentApi.get('testimonials'),
      contentApi.get('stats'),
    ])
      .then(([d, doc, t, s]) => {
        setDepartments(d.data.data);
        setDoctors(doc.data.data);
        if (t.data.data?.data?.items) setTestimonials(t.data.data.data.items);
        if (s.data.data?.data) setStats(s.data.data.data);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const faqs = [
    { q: 'How do I book an appointment?', a: 'Use our online Book Appointment page or call our helpline.' },
    { q: 'Do you accept insurance?', a: 'Yes, we work with major insurance providers. See Patient Corner for details.' },
    { q: 'Is emergency care available 24/7?', a: 'Yes, our emergency department operates round the clock.' },
    { q: 'Can I choose a specific doctor?', a: 'Yes, select your department and preferred doctor when booking.' },
  ];

  const gallery = [
    'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=600',
    'https://images.unsplash.com/photo-1586773860418-d37222d8fce3?w=600',
    'https://images.unsplash.com/photo-1538108149393-fbbd81893a12?w=600',
    'https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=600',
  ];

  return (
    <div>
      <section className="relative min-h-[85vh] overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=1920')] bg-cover bg-center" />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-900/95 via-slate-900/80 to-primary-900/60" />
        <div className="relative mx-auto flex min-h-[85vh] max-w-7xl flex-col justify-center px-4 py-20 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <span className="rounded-full bg-primary-500/20 px-4 py-1 text-sm text-primary-300">Trusted Healthcare Since 1990</span>
            <h1 className="mt-6 max-w-3xl text-4xl font-bold leading-tight text-white md:text-6xl">
              {HOSPITAL.fullName}
            </h1>
            <p className="mt-4 max-w-xl text-lg text-slate-300">{HOSPITAL.tagline}</p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link to="/book-appointment" className="btn-primary">Book Appointment <ArrowRight className="h-4 w-4" /></Link>
              <Link to="/about/hospital" className="btn-outline border-white text-white hover:bg-white/10">Learn More</Link>
            </div>
          </motion.div>
          <ChevronDown className="absolute bottom-8 left-1/2 h-8 w-8 -translate-x-1/2 animate-bounce text-white/50" />
        </div>
      </section>

      <section className="py-16">
        <motion.div {...fadeUp} className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="grid gap-8 lg:grid-cols-2 lg:items-center">
            <div>
              <h2 className="section-title">About Our Hospital</h2>
              <p className="mt-4 text-slate-600 dark:text-slate-400">
                MediCare Plus is a multi-specialty hospital delivering compassionate, world-class healthcare with cutting-edge technology and expert medical professionals.
              </p>
              <Link to="/about/hospital" className="mt-6 inline-flex items-center gap-2 font-semibold text-primary-600">Read More <ArrowRight className="h-4 w-4" /></Link>
            </div>
            <img src="https://images.unsplash.com/photo-1586773860418-d37222d8fce3?w=800" alt="Hospital" className="rounded-2xl shadow-2xl" />
          </div>
        </motion.div>
      </section>

      <section className="bg-gradient-to-br from-primary-600 to-primary-800 py-16 text-white">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 sm:grid-cols-2 lg:grid-cols-4 lg:px-8">
          {[
            { icon: Users, label: 'Patients Served', value: `${stats.patients}+` },
            { icon: Award, label: 'Expert Doctors', value: stats.doctors },
            { icon: Building2, label: 'Departments', value: stats.departments },
            { icon: Ambulance, label: 'Years of Excellence', value: stats.years },
          ].map(({ icon: Icon, label, value }) => (
            <motion.div key={label} {...fadeUp} className="text-center">
              <Icon className="mx-auto h-10 w-10 text-primary-200" />
              <p className="mt-2 text-3xl font-bold">{value}</p>
              <p className="text-primary-100">{label}</p>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <h2 className="section-title text-center">Treatments & Services</h2>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {['Cardiac Care', 'Neuro Surgery', 'Orthopedics', 'Pediatrics', 'Oncology', 'Emergency', 'Radiology', 'Dental'].map((s) => (
              <motion.div key={s} {...fadeUp} className="glass rounded-2xl p-6 text-center transition hover:-translate-y-1 hover:shadow-xl">
                <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-primary-100 text-primary-600 dark:bg-primary-900">+</div>
                <h3 className="font-semibold">{s}</h3>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-slate-100 py-16 dark:bg-slate-900/50">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="grid gap-8 lg:grid-cols-2">
            <motion.div {...fadeUp} className="glass rounded-2xl p-8">
              <h3 className="text-xl font-bold text-primary-600">Our Vision</h3>
              <p className="mt-2 text-slate-600 dark:text-slate-400">To be the most trusted healthcare provider, setting benchmarks in patient care and medical innovation.</p>
            </motion.div>
            <motion.div {...fadeUp} className="glass rounded-2xl p-8">
              <h3 className="text-xl font-bold text-primary-600">Our Mission</h3>
              <p className="mt-2 text-slate-600 dark:text-slate-400">Deliver accessible, affordable, and excellent healthcare with empathy and integrity at every touchpoint.</p>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="border-y border-red-200 bg-red-50 py-12 dark:border-red-900 dark:bg-red-950/30">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-6 px-4 lg:px-8">
          <div>
            <h2 className="text-2xl font-bold text-red-700 dark:text-red-400">24/7 Emergency Support</h2>
            <p className="text-slate-600 dark:text-slate-400">Trauma team ready. Ambulance services available.</p>
          </div>
          <a href={`tel:${HOSPITAL.emergency}`} className="rounded-xl bg-red-600 px-8 py-4 text-xl font-bold text-white shadow-lg hover:bg-red-700">
            Call {HOSPITAL.emergency}
          </a>
        </div>
      </section>

      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <h2 className="section-title">Featured Departments</h2>
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {loading ? Array.from({ length: 4 }).map((_, i) => <CardSkeleton key={i} />) : departments.map((d) => (
              <Link key={d._id} to={`/departments/${d.slug}`} className="glass group overflow-hidden rounded-2xl transition hover:-translate-y-1">
                <img src={d.banner} alt={d.name} className="h-32 w-full object-cover transition group-hover:scale-105" />
                <div className="p-4"><h3 className="font-semibold">{d.name}</h3><p className="mt-1 line-clamp-2 text-sm text-slate-500">{d.overview}</p></div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-slate-100 py-16 dark:bg-slate-900/50">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <h2 className="section-title">Featured Doctors</h2>
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {doctors.map((doc) => (
              <motion.div key={doc._id} {...fadeUp} className="glass overflow-hidden rounded-2xl">
                <img src={doc.image} alt={doc.name} className="h-48 w-full object-cover object-top" />
                <div className="p-4">
                  <h3 className="font-semibold">{doc.name}</h3>
                  <p className="text-sm text-primary-600">{doc.specialization}</p>
                  <Link to="/doctors" className="mt-3 block text-sm font-medium text-primary-600">View Profile →</Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <h2 className="section-title text-center">Patient Testimonials</h2>
          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {(testimonials.length ? testimonials : [
              { name: 'Patient', role: 'Verified', text: 'Excellent care and professional staff.', rating: 5 },
            ]).map((t, i) => (
              <motion.div key={i} {...fadeUp} className="glass rounded-2xl p-6">
                <p className="text-slate-600 dark:text-slate-400">&ldquo;{t.text}&rdquo;</p>
                <p className="mt-4 font-semibold">{t.name}</p>
                <p className="text-sm text-slate-500">{t.role}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="mx-auto max-w-3xl px-4 lg:px-8">
          <h2 className="section-title text-center">FAQ</h2>
          <motion.div className="mt-8 space-y-3">
            {faqs.map((f, i) => (
              <div key={i} className="glass rounded-xl overflow-hidden">
                <button type="button" className="flex w-full items-center justify-between p-4 text-left font-medium" onClick={() => setOpenFaq(openFaq === i ? null : i)}>
                  {f.q}
                  <ChevronDown className={`h-5 w-5 transition ${openFaq === i ? 'rotate-180' : ''}`} />
                </button>
                {openFaq === i && <p className="border-t border-slate-200 px-4 pb-4 text-sm text-slate-600 dark:border-slate-700 dark:text-slate-400">{f.a}</p>}
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <h2 className="section-title text-center">Hospital Gallery</h2>
          <div className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-4">
            {gallery.map((src, i) => (
              <motion.img key={i} {...fadeUp} src={src} alt="" className="h-40 w-full rounded-xl object-cover md:h-52" />
            ))}
          </div>
        </div>
      </section>

      <section className="bg-gradient-to-r from-primary-600 to-primary-800 py-16">
        <div className="mx-auto max-w-7xl px-4 text-center lg:px-8">
          <h2 className="text-3xl font-bold text-white">Ready to Book Your Appointment?</h2>
          <p className="mt-2 text-primary-100">Schedule a visit with our specialists today.</p>
          <Link to="/book-appointment" className="mt-6 inline-flex rounded-xl bg-white px-8 py-3 font-semibold text-primary-700 shadow-lg hover:bg-primary-50">
            Book Now
          </Link>
        </div>
      </section>
    </div>
  );
}
