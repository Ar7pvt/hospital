import { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { Calendar, Stethoscope, Building2, Clock } from 'lucide-react';
import { dashboardApi } from '../../services/api';

const COLORS = ['#0891b2', '#06b6d4', '#22d3ee', '#67e8f9'];

export default function Dashboard() {
  const [data, setData] = useState<{
    stats: { appointments: number; doctors: number; departments: number; pendingAppointments: number };
    statusBreakdown: { _id: string; count: number }[];
    recentAppointments: unknown[];
  } | null>(null);

  useEffect(() => {
    dashboardApi.stats().then((res) => setData(res.data.data)).catch(() => {});
  }, []);

  const stats = data?.stats;
  const cards = [
    { label: 'Total Appointments', value: stats?.appointments ?? 0, icon: Calendar, color: 'bg-blue-500' },
    { label: 'Active Doctors', value: stats?.doctors ?? 0, icon: Stethoscope, color: 'bg-emerald-500' },
    { label: 'Departments', value: stats?.departments ?? 0, icon: Building2, color: 'bg-violet-500' },
    { label: 'Pending', value: stats?.pendingAppointments ?? 0, icon: Clock, color: 'bg-amber-500' },
  ];

  const pieData = data?.statusBreakdown?.map((s) => ({ name: s._id, value: s.count })) ?? [];

  return (
    <div>
      <h1 className="text-2xl font-bold">Dashboard</h1>
      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {cards.map(({ label, value, icon: Icon, color }) => (
          <div key={label} className="glass flex items-center gap-4 rounded-2xl p-5">
            <div className={`rounded-xl p-3 text-white ${color}`}>
              <Icon className="h-6 w-6" />
            </div>
            <div>
              <p className="text-2xl font-bold">{value}</p>
              <p className="text-sm text-slate-500">{label}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        <div className="glass rounded-2xl p-6">
          <h2 className="font-semibold">Appointments by Status</h2>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie data={pieData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} label>
                {pieData.map((_, i) => (
                  <Cell key={i} fill={COLORS[i % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="glass rounded-2xl p-6">
          <h2 className="font-semibold">Overview</h2>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={pieData}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="value" fill="#0891b2" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
