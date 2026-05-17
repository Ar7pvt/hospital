import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ChevronDown, Sun, Moon, HeartPulse } from 'lucide-react';
import { DEPARTMENT_LINKS, HOSPITAL } from '../../constants/navigation';
import { useTheme } from '../../context/ThemeContext';

const aboutLinks = [
  { to: '/about/hospital', label: 'About Hospital' },
  { to: '/about/organisation', label: 'About Organisation' },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [aboutOpen, setAboutOpen] = useState(false);
  const [deptOpen, setDeptOpen] = useState(false);
  const { theme, toggle } = useTheme();

  const navClass = ({ isActive }: { isActive: boolean }) =>
    `px-3 py-2 rounded-lg text-sm font-medium transition ${
      isActive ? 'text-primary-600 bg-primary-50 dark:bg-primary-900/30' : 'text-slate-600 hover:text-primary-600 dark:text-slate-300'
    }`;

  const Dropdown = ({
    label,
    open,
    setOpen,
    children,
  }: {
    label: string;
    open: boolean;
    setOpen: (v: boolean) => void;
    children: React.ReactNode;
  }) => (
    <motion.div className="relative" onMouseEnter={() => setOpen(true)} onMouseLeave={() => setOpen(false)}>
      <button type="button" className="flex items-center gap-1 px-3 py-2 text-sm font-medium text-slate-600 dark:text-slate-300">
        {label} <ChevronDown className={`h-4 w-4 transition ${open ? 'rotate-180' : ''}`} />
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            className="absolute left-0 top-full z-50 mt-1 min-w-[220px] rounded-xl glass p-2 shadow-2xl"
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/80 backdrop-blur-xl dark:border-slate-800 dark:bg-slate-950/80">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 lg:px-8">
        <Link to="/" className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-primary-500 to-primary-700 text-white shadow-lg">
            <HeartPulse className="h-6 w-6" />
          </div>
          <div>
            <p className="text-lg font-bold text-slate-900 dark:text-white">{HOSPITAL.name}</p>
            <p className="hidden text-xs text-slate-500 sm:block">Hospital</p>
          </div>
        </Link>

        <nav className="hidden items-center gap-1 lg:flex">
          <NavLink to="/" end className={navClass}>Home</NavLink>
          <Dropdown label="About Us" open={aboutOpen} setOpen={setAboutOpen}>
            {aboutLinks.map((l) => (
              <Link key={l.to} to={l.to} className="block rounded-lg px-4 py-2 text-sm hover:bg-primary-50 dark:hover:bg-primary-900/30">
                {l.label}
              </Link>
            ))}
          </Dropdown>
          <Dropdown label="Departments" open={deptOpen} setOpen={setDeptOpen}>
            <div className="grid max-h-80 grid-cols-2 gap-1 overflow-y-auto">
              {DEPARTMENT_LINKS.map((d) => (
                <Link key={d.slug} to={`/departments/${d.slug}`} className="rounded-lg px-3 py-2 text-sm hover:bg-primary-50 dark:hover:bg-primary-900/30">
                  {d.name}
                </Link>
              ))}
            </div>
          </Dropdown>
          <NavLink to="/doctors" className={navClass}>Doctors</NavLink>
          <NavLink to="/patient-corner" className={navClass}>Patient Corner</NavLink>
          <NavLink to="/contact" className={navClass}>Contact</NavLink>
        </nav>

        <motion.div className="flex items-center gap-2">
          <button type="button" onClick={toggle} className="rounded-lg p-2 text-slate-600 hover:bg-slate-100 dark:hover:bg-slate-800" aria-label="Toggle theme">
            {theme === 'light' ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
          </button>
          <Link to="/book-appointment" className="hidden btn-primary text-sm sm:inline-flex">Book Appointment</Link>
          <button type="button" className="lg:hidden rounded-lg p-2" onClick={() => setMobileOpen(!mobileOpen)} aria-label="Menu">
            {mobileOpen ? <X /> : <Menu />}
          </button>
        </motion.div>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div initial={{ height: 0 }} animate={{ height: 'auto' }} exit={{ height: 0 }} className="border-t lg:hidden dark:border-slate-800">
            <div className="space-y-1 px-4 py-4">
              <NavLink to="/" end className={navClass} onClick={() => setMobileOpen(false)}>Home</NavLink>
              {aboutLinks.map((l) => (
                <Link key={l.to} to={l.to} className="block px-3 py-2" onClick={() => setMobileOpen(false)}>{l.label}</Link>
              ))}
              {DEPARTMENT_LINKS.map((d) => (
                <Link key={d.slug} to={`/departments/${d.slug}`} className="block px-3 py-2 text-sm" onClick={() => setMobileOpen(false)}>{d.name}</Link>
              ))}
              <NavLink to="/doctors" className={navClass} onClick={() => setMobileOpen(false)}>Doctors</NavLink>
              <NavLink to="/patient-corner" className={navClass} onClick={() => setMobileOpen(false)}>Patient Corner</NavLink>
              <NavLink to="/contact" className={navClass} onClick={() => setMobileOpen(false)}>Contact</NavLink>
              <Link to="/book-appointment" className="btn-primary mt-2 w-full" onClick={() => setMobileOpen(false)}>Book Appointment</Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
