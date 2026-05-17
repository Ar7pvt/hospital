import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Download, AlertTriangle, FileText, HelpCircle } from 'lucide-react';
import { blogApi } from '../services/api';
import type { Blog } from '../types';

const forms = [
  { name: 'Patient Registration Form', file: '#' },
  { name: 'Consent Form', file: '#' },
  { name: 'Insurance Claim Form', file: '#' },
  { name: 'Discharge Summary Request', file: '#' },
];

const guidelines = [
  'Arrive 15 minutes before your appointment',
  'Bring valid ID and insurance documents',
  'Inform staff of allergies and current medications',
  'Visitors limited to 2 per patient during visiting hours',
];

export default function PatientCorner() {
  const [blogs, setBlogs] = useState<Blog[]>([]);

  useEffect(() => {
    blogApi.list({ limit: '6' }).then((res) => setBlogs(res.data.data)).catch(() => {});
  }, []);

  return (
    <div>
      <div className="bg-primary-700 py-16 text-white">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <h1 className="text-4xl font-bold">Patient Corner</h1>
          <p className="mt-2 text-primary-100">Resources for patients and families</p>
        </div>
      </div>
      <div className="mx-auto max-w-7xl space-y-16 px-4 py-12 lg:px-8">
        <section>
          <h2 className="section-title">Health Tips & Blogs</h2>
          <div className="mt-6 grid gap-6 md:grid-cols-3">
            {blogs.map((b) => (
              <article key={b._id} className="glass overflow-hidden rounded-2xl">
                {b.image && <img src={b.image} alt="" className="h-40 w-full object-cover" />}
                <div className="p-5">
                  <span className="text-xs font-medium text-primary-600">{b.category}</span>
                  <h3 className="mt-1 font-bold">{b.title}</h3>
                  <p className="mt-2 line-clamp-2 text-sm text-slate-600 dark:text-slate-400">{b.excerpt}</p>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="glass rounded-2xl p-8">
          <h2 className="section-title">Insurance Information</h2>
          <p className="mt-4 text-slate-600 dark:text-slate-400">
            We accept cashless facilities from major insurers including Star Health, HDFC Ergo, ICICI Lombard, and government schemes.
            Present your policy card at admission. For queries, contact our billing desk at +91 1800 123 4567 ext. 201.
          </p>
        </section>

        <section>
          <h2 className="section-title flex items-center gap-2"><HelpCircle /> FAQs</h2>
          <div className="mt-4 space-y-3">
            {[
              'What documents are needed for admission?',
              'What are visiting hours?',
              'How to get lab reports online?',
            ].map((q) => (
              <details key={q} className="glass rounded-xl p-4">
                <summary className="cursor-pointer font-medium">{q}</summary>
                <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">Please contact our front desk or check the patient handbook for details.</p>
              </details>
            ))}
          </div>
        </section>

        <section>
          <h2 className="section-title flex items-center gap-2"><Download /> Download Forms</h2>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            {forms.map((f) => (
              <a key={f.name} href={f.file} className="glass flex items-center gap-3 rounded-xl p-4 hover:bg-primary-50 dark:hover:bg-primary-900/20">
                <FileText className="h-5 w-5 text-primary-600" />
                {f.name}
              </a>
            ))}
          </div>
        </section>

        <section className="rounded-2xl border border-red-200 bg-red-50 p-8 dark:border-red-900 dark:bg-red-950/30">
          <h2 className="flex items-center gap-2 text-xl font-bold text-red-700 dark:text-red-400">
            <AlertTriangle /> Emergency Instructions
          </h2>
          <ul className="mt-4 list-inside list-disc space-y-2 text-slate-700 dark:text-slate-300">
            <li>Call 108 for ambulance or reach our ER directly</li>
            <li>Do not move patients with suspected spinal injuries</li>
            <li>Bring list of medications if possible</li>
            <li>ER entrance open 24/7 on north wing</li>
          </ul>
        </section>

        <section>
          <h2 className="section-title">Patient Guidelines</h2>
          <ul className="mt-4 space-y-2">
            {guidelines.map((g) => (
              <li key={g} className="flex items-start gap-2 text-slate-600 dark:text-slate-400">
                <span className="text-primary-600">✓</span> {g}
              </li>
            ))}
          </ul>
        </section>

        <section>
          <h2 className="section-title">Medical Awareness</h2>
          <p className="mt-4 text-slate-600 dark:text-slate-400">
            Stay informed about seasonal health risks, vaccination schedules, and preventive screenings.
            <Link to="/contact" className="ml-1 font-semibold text-primary-600"> Contact us </Link>
            for community health programs.
          </p>
        </section>
      </div>
    </div>
  );
}