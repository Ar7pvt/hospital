import { Link } from 'react-router-dom';
import { HeartPulse, Phone, Mail, MapPin, Share2 } from 'lucide-react';
import { DEPARTMENT_LINKS, HOSPITAL } from '../../constants/navigation';

export default function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-slate-900 text-slate-300 dark:border-slate-800">
      <div className="mx-auto max-w-7xl px-4 py-16 lg:px-8">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <div className="mb-4 flex items-center gap-2 text-white">
              <HeartPulse className="h-8 w-8 text-primary-400" />
              <span className="text-xl font-bold">{HOSPITAL.fullName}</span>
            </div>
            <p className="text-sm text-slate-400">{HOSPITAL.tagline}</p>
            <div className="mt-4 flex gap-3">
              {[Share2, Share2, Share2, Share2].map((Icon, i) => (
                <a key={i} href="#" className="rounded-lg bg-slate-800 p-2 transition hover:bg-primary-600" aria-label="Social">
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>
          <div>
            <h4 className="mb-4 font-semibold text-white">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/" className="hover:text-primary-400">Home</Link></li>
              <li><Link to="/about/hospital" className="hover:text-primary-400">About Hospital</Link></li>
              <li><Link to="/doctors" className="hover:text-primary-400">Doctors</Link></li>
              <li><Link to="/book-appointment" className="hover:text-primary-400">Book Appointment</Link></li>
              <li><Link to="/patient-corner" className="hover:text-primary-400">Patient Corner</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="mb-4 font-semibold text-white">Departments</h4>
            <ul className="grid grid-cols-2 gap-2 text-sm">
              {DEPARTMENT_LINKS.slice(0, 8).map((d) => (
                <li key={d.slug}><Link to={`/departments/${d.slug}`} className="hover:text-primary-400">{d.name}</Link></li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="mb-4 font-semibold text-white">Contact</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex gap-2"><MapPin className="h-4 w-4 shrink-0 text-primary-400" />{HOSPITAL.address}</li>
              <li className="flex gap-2"><Phone className="h-4 w-4 shrink-0 text-primary-400" />{HOSPITAL.phone}</li>
              <li className="flex gap-2"><Mail className="h-4 w-4 shrink-0 text-primary-400" />{HOSPITAL.email}</li>
            </ul>
            <div className="mt-6 rounded-xl border border-red-500/30 bg-red-600/20 p-4">
              <p className="text-xs uppercase tracking-wide text-red-300">Emergency</p>
              <p className="text-2xl font-bold text-white">Dial {HOSPITAL.emergency}</p>
            </div>
          </div>
        </div>
        <div className="mt-12 border-t border-slate-800 pt-8">
          <h4 className="mb-3 font-semibold text-white">Newsletter</h4>
          <form className="flex max-w-md gap-2" onSubmit={(e) => e.preventDefault()}>
            <input type="email" placeholder="Your email" className="flex-1 rounded-lg border border-slate-700 bg-slate-800 px-4 py-2 text-sm text-white" />
            <button type="submit" className="btn-primary py-2 text-sm">Subscribe</button>
          </form>
        </div>
        <p className="mt-8 text-center text-sm text-slate-500">© {new Date().getFullYear()} {HOSPITAL.fullName}. All rights reserved.</p>
      </div>
    </footer>
  );
}
