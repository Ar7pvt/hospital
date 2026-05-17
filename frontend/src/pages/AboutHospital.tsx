import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const sections = [
  { title: 'Hospital Introduction', content: 'MediCare Plus Hospital is a leading multi-specialty healthcare institution committed to excellence in patient care, medical education, and research.' },
  { title: 'Vision & Mission', content: 'Vision: To be the most trusted healthcare provider. Mission: Deliver accessible, affordable, and excellent healthcare with empathy.' },
  { title: 'Infrastructure', content: '500+ bed facility with modular OTs, advanced ICU, digital labs, and smart patient rooms across 2 million sq ft.' },
  { title: 'Facilities', content: 'Pharmacy, cafeteria, prayer room, patient lounge, Wi-Fi, parking, and international patient desk.' },
  { title: 'Achievements', content: 'NABH accredited, ISO certified, 50,000+ successful surgeries, and regional center of excellence awards.' },
  { title: 'Awards', content: 'Best Multi-Specialty Hospital 2024, Patient Safety Excellence Award, Green Hospital Certification.' },
  { title: 'Founder Details', content: 'Founded by Dr. Ramesh Verma in 1990 with a vision to make quality healthcare accessible to all communities.' },
  { title: 'Medical Services', content: 'Comprehensive services across 25+ specialties including emergency, diagnostics, surgery, and rehabilitation.' },
  { title: 'Hospital History', content: 'From a 50-bed clinic in 1990 to a 500-bed tertiary care hospital serving millions across the region.' },
];

export default function AboutHospital() {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <div className="bg-gradient-to-r from-primary-700 to-primary-900 py-20 text-white">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <h1 className="text-4xl font-bold md:text-5xl">About Hospital</h1>
          <p className="mt-2 max-w-2xl text-primary-100">Discover our legacy of healing and innovation</p>
        </div>
      </div>
      <div className="mx-auto max-w-7xl space-y-8 px-4 py-16 lg:px-8">
        {sections.map((s, i) => (
          <motion.section
            key={s.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.05 }}
            className="glass rounded-2xl p-8"
          >
            <h2 className="text-2xl font-bold text-primary-700 dark:text-primary-400">{s.title}</h2>
            <p className="mt-3 text-slate-600 dark:text-slate-400">{s.content}</p>
          </motion.section>
        ))}
        <Link to="/book-appointment" className="btn-primary">Book an Appointment</Link>
      </div>
    </motion.div>
  );
}
