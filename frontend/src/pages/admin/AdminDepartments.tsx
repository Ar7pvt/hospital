import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { Plus, Trash2 } from 'lucide-react';
import { departmentApi } from '../../services/api';
import type { Department } from '../../types';

export default function AdminDepartments() {
  const [items, setItems] = useState<Department[]>([]);
  const [form, setForm] = useState({ name: '', overview: '', workingHours: '9AM-5PM', emergencySupport: '', featured: false });
  const [banner, setBanner] = useState<File | null>(null);

  const load = () => departmentApi.adminAll().then((res) => setItems(res.data.data)).catch(() => {});

  useEffect(() => { load(); }, []);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    const fd = new FormData();
    Object.entries(form).forEach(([k, v]) => fd.append(k, String(v)));
    if (banner) fd.append('banner', banner);
    try {
      await departmentApi.create(fd);
      toast.success('Department created');
      setForm({ name: '', overview: '', workingHours: '9AM-5PM', emergencySupport: '', featured: false });
      load();
    } catch {
      toast.error('Failed');
    }
  };

  const remove = async (id: string) => {
    if (!confirm('Delete?')) return;
    await departmentApi.remove(id);
    toast.success('Deleted');
    load();
  };

  return (
    <div>
      <h1 className="text-2xl font-bold">Manage Departments</h1>
      <form onSubmit={submit} className="glass mt-4 grid gap-3 rounded-2xl p-6 sm:grid-cols-2">
        <input required placeholder="Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="rounded-lg border px-3 py-2 dark:border-slate-600 dark:bg-slate-800" />
        <input type="file" accept="image/*" onChange={(e) => setBanner(e.target.files?.[0] || null)} />
        <textarea required placeholder="Overview" value={form.overview} onChange={(e) => setForm({ ...form, overview: e.target.value })} className="col-span-2 rounded-lg border px-3 py-2 dark:border-slate-600 dark:bg-slate-800" rows={2} />
        <button type="submit" className="btn-primary col-span-2"><Plus className="h-4 w-4" /> Add Department</button>
      </form>
      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((d) => (
          <div key={d._id} className="glass rounded-xl p-4 flex justify-between">
            <div><p className="font-bold">{d.name}</p><p className="text-sm text-slate-500 line-clamp-2">{d.overview}</p></div>
            <button type="button" onClick={() => remove(d._id)} className="text-red-600"><Trash2 className="h-4 w-4" /></button>
          </div>
        ))}
      </div>
    </div>
  );
}
