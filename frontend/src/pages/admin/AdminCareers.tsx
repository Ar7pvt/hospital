import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { Trash2 } from 'lucide-react';
import { careerApi } from '../../services/api';

interface Career {
  _id: string;
  title: string;
  department: string;
  type: string;
  isActive: boolean;
}

export default function AdminCareers() {
  const [items, setItems] = useState<Career[]>([]);
  const [form, setForm] = useState({ title: '', department: '', description: '', type: 'full-time', location: 'Main Campus' });

  const load = () => careerApi.adminAll().then((res) => setItems(res.data.data)).catch(() => {});
  useEffect(() => { load(); }, []);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await careerApi.create(form);
      toast.success('Job posted');
      load();
    } catch {
      toast.error('Failed');
    }
  };

  const remove = async (id: string) => {
    if (!confirm('Delete?')) return;
    await careerApi.remove(id);
    load();
  };

  return (
    <div>
      <h1 className="text-2xl font-bold">Manage Careers</h1>
      <form onSubmit={submit} className="glass mt-4 grid gap-3 rounded-2xl p-6 sm:grid-cols-2">
        <input required placeholder="Job title" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} className="rounded-lg border px-3 py-2 dark:border-slate-600 dark:bg-slate-800" />
        <input required placeholder="Department" value={form.department} onChange={(e) => setForm({ ...form, department: e.target.value })} className="rounded-lg border px-3 py-2 dark:border-slate-600 dark:bg-slate-800" />
        <textarea required placeholder="Description" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} className="col-span-2 rounded-lg border px-3 py-2 dark:border-slate-600 dark:bg-slate-800" rows={3} />
        <button type="submit" className="btn-primary col-span-2">Post Job</button>
      </form>
      <ul className="mt-6 space-y-3">
        {items.map((c) => (
          <li key={c._id} className="glass flex justify-between rounded-xl p-4">
            <div><p className="font-medium">{c.title}</p><p className="text-sm text-slate-500">{c.department} · {c.type}</p></div>
            <button type="button" onClick={() => remove(c._id)} className="text-red-600"><Trash2 /></button>
          </li>
        ))}
      </ul>
    </div>
  );
}
