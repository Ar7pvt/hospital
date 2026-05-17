import { motion } from 'framer-motion';

const sections = [
  { title: 'Organisation Overview', content: 'MediCare Health Group operates a network of hospitals and clinics delivering integrated healthcare across the nation.' },
  { title: 'Management Details', content: 'Led by a board of medical directors, administrators, and quality officers ensuring operational excellence.' },
  { title: 'Company Values', content: 'Integrity, Compassion, Innovation, Teamwork, and Patient-First approach in every decision.' },
  { title: 'Healthcare Network', content: '12 hospitals, 40 clinics, 200+ partner labs, and telemedicine reaching rural communities.' },
  { title: 'Branches & Partnerships', content: 'Strategic alliances with international hospitals, universities, and medical device leaders.' },
  { title: 'CSR Activities', content: 'Free health camps, rural outreach, medical scholarships, and disaster relief programs.' },
  { title: 'Future Goals', content: 'Expand to 20 hospitals by 2030, AI-driven diagnostics, and sustainable green healthcare campuses.' },
  { title: 'Leadership Team', content: 'CEO Dr. Anil Mehta, COO Priya Shah, Medical Director Dr. Kavita Rao, and CFO Raj Malhotra.' },
];

export default function AboutOrganisation() {
  return (
    <div>
      <div className="bg-gradient-to-r from-slate-800 to-primary-900 py-20 text-white">
        <motion.div className="mx-auto max-w-7xl px-4 lg:px-8">
          <h1 className="text-4xl font-bold">About Organisation</h1>
          <p className="mt-2 text-slate-300">Building healthier communities together</p>
        </motion.div>
      </div>
      <div className="mx-auto max-w-7xl grid gap-6 px-4 py-16 md:grid-cols-2 lg:px-8">
        {sections.map((s) => (
          <motion.div
            key={s.title}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="glass rounded-2xl p-6"
          >
            <h2 className="text-xl font-bold">{s.title}</h2>
            <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">{s.content}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
