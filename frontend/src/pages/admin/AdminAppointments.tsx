import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { appointmentApi } from '../../services/api';

interface AppointmentRow {
  _id: string;
  patientName: string;
  patientEmail: string;
  patientPhone: string;
  appointmentDate: string;
  timeSlot: string;
  status: string;
  doctor?: { name: string };
  department?: { name: string };
}

export default function AdminAppointments() {
  const [items, setItems] = useState<AppointmentRow[]>([]);
  const [status, setStatus] = useState('');
  const [search, setSearch] = useState('');

  const load = () => {
    const params: Record<string, string> = {};
    if (status) params.status = status;
    if (search) params.search = search;
    appointmentApi.list(params).then((res) => setItems(res.data.data)).catch(() => {});
  };

  useEffect(() => { load(); }, [status, search]);

  const updateStatus = async (id: string, newStatus: string) => {
    await appointmentApi.updateStatus(id, newStatus);
    toast.success('Status updated');
    load();
  };

  return (
    <div>
      <h1 className="text-2xl font-bold">Appointments</h1>
      <div className="mt-4 flex flex-wrap gap-3">
        <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search patient..." className="rounded-lg border px-4 py-2 dark:border-slate-600 dark:bg-slate-800" />
        <select value={status} onChange={(e) => setStatus(e.target.value)} className="rounded-lg border px-4 py-2 dark:border-slate-600 dark:bg-slate-800">
          <option value="">All statuses</option>
          <option value="pending">Pending</option>
          <option value="confirmed">Confirmed</option>
          <option value="cancelled">Cancelled</option>
          <option value="completed">Completed</option>
        </select>
      </div>
      <div className="mt-6 overflow-x-auto glass rounded-2xl">
        <table className="w-full text-sm">
          <thead className="border-b dark:border-slate-700">
            <tr className="text-left">
              <th className="p-4">Patient</th><th className="p-4">Doctor</th><th className="p-4">Date</th><th className="p-4">Status</th>
            </tr>
          </thead>
          <tbody>
            {items.map((a) => (
              <tr key={a._id} className="border-b dark:border-slate-800">
                <td className="p-4"><p className="font-medium">{a.patientName}</p><p className="text-xs text-slate-500">{a.patientPhone}</p></td>
                <td className="p-4">{a.doctor?.name}<br /><span className="text-xs">{a.department?.name}</span></td>
                <td className="p-4">{new Date(a.appointmentDate).toLocaleDateString()} {a.timeSlot}</td>
                <td className="p-4">
                  <select value={a.status} onChange={(e) => updateStatus(a._id, e.target.value)} className="rounded border px-2 py-1 text-xs dark:border-slate-600 dark:bg-slate-800">
                    <option value="pending">pending</option>
                    <option value="confirmed">confirmed</option>
                    <option value="cancelled">cancelled</option>
                    <option value="completed">completed</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
