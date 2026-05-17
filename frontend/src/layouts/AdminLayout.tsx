import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  Stethoscope,
  Building2,
  Calendar,
  FileText,
  Briefcase,
  LogOut,
  Menu,
  X,
} from 'lucide-react';
import { useState } from 'react';
import { useAuth } from '../context/AuthContext';

const links = [
  { to: '/admin', end: true, icon: LayoutDashboard, label: 'Dashboard' },
  { to: '/admin/doctors', icon: Stethoscope, label: 'Doctors' },
  { to: '/admin/departments', icon: Building2, label: 'Departments' },
  { to: '/admin/appointments', icon: Calendar, label: 'Appointments' },
  { to: '/admin/blogs', icon: FileText, label: 'Blogs' },
  { to: '/admin/careers', icon: Briefcase, label: 'Careers' },
];

export default function AdminLayout() {
  const { admin, logout } = useAuth();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  return (
    <div className="flex min-h-screen bg-slate-100 dark:bg-slate-950">
      <aside
        className={`fixed inset-y-0 left-0 z-40 w-64 transform bg-slate-900 text-white transition lg:static lg:translate-x-0 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex h-16 items-center justify-between border-b border-slate-800 px-4">
          <span className="font-bold text-primary-400">Admin Panel</span>
          <button type="button" className="lg:hidden" onClick={() => setSidebarOpen(false)}>
            <X />
          </button>
        </div>
        <nav className="space-y-1 p-4">
          {links.map(({ to, end, icon: Icon, label }) => (
            <NavLink
              key={to}
              to={to}
              end={end}
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-lg px-3 py-2 text-sm ${
                  isActive ? 'bg-primary-600 text-white' : 'text-slate-300 hover:bg-slate-800'
                }`
              }
              onClick={() => setSidebarOpen(false)}
            >
              <Icon className="h-5 w-5" />
              {label}
            </NavLink>
          ))}
        </nav>
        <div className="absolute bottom-0 w-full border-t border-slate-800 p-4">
          <p className="truncate text-sm text-slate-400">{admin?.name}</p>
          <button type="button" onClick={handleLogout} className="mt-2 flex items-center gap-2 text-sm text-red-400 hover:text-red-300">
            <LogOut className="h-4 w-4" /> Logout
          </button>
        </div>
      </aside>
      <div className="flex flex-1 flex-col">
        <header className="flex h-16 items-center gap-4 border-b bg-white px-4 dark:border-slate-800 dark:bg-slate-900 lg:px-8">
          <button type="button" className="lg:hidden" onClick={() => setSidebarOpen(true)}>
            <Menu />
          </button>
          <h1 className="text-lg font-semibold">Hospital Management</h1>
        </header>
        <main className="flex-1 overflow-auto p-4 lg:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
