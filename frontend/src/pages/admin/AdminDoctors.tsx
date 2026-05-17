import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { Plus, Pencil, Trash2 } from 'lucide-react';
import { doctorApi, departmentApi } from '../../services/api';
import type { Doctor, Department } from '../../types';

export default function AdminDoctors() {
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [departments, setDepartments] = useState<Department[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);
  const [search, setSearch] = useState('');
  const [form, setForm] = useState({
    name: '', specialization: '', department: '', experience: '0', qualification: '',
    availability: 'Mon-Fri 9-5', consultationFee: '500', biography: '', featured: false,
  });
  const [image, setImage] = useState<File | null>(null);

  const load = () => {
    doctorApi.adminAll({ search }).then((res) => setDoctors(res.data.data)).catch(() => {});
  };

  useEffect(() => {
    load();
    departmentApi.adminAll().then((res) => setDepartments(res.data.data)).catch(() => {});
  }, [search]);

  const reset = () => {
    setForm({ name: '', specialization: '', department: '', experience: '0', qualification: '', availability: 'Mon-Fri 9-5', consultationFee: '500', biography: '', featured: false });
    setImage(null);
    setEditId(null);
    setShowForm(false);
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    const fd = new FormData();
    Object.entries(form).forEach(([k, v]) => fd.append(k, String(v)));
    if (image) fd.append('image', image);
    try {
      if (editId) await doctorApi.update(editId, fd);
      else await doctorApi.create(fd);
      toast.success(editId ? 'Updated' : 'Created');
      reset();
      load();
    } catch {
      toast.error('Operation failed');
    }
  };

  const remove = async (id: string) => {
    if (!confirm('Delete doctor?')) return;
    await doctorApi.remove(id);
    toast.success('Deleted');
    load();
  };

  const edit = (d: Doctor) => {
    setEditId(d._id);
    setForm({
      name: d.name, specialization: d.specialization,
      department: typeof d.department === 'object' ? d.department._id : String(d.department),
      experience: String(d.experience), qualification: d.qualification,
      availability: d.availability, consultationFee: String(d.consultationFee),
      biography: d.biography || '', featured: !!d.featured,
    });
    setShowForm(true);
  };

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h1 className="text-2xl font-bold">Manage Doctors</h1>
        <button type="button" onClick={() => { reset(); setShowForm(true); }} className="btn-primary text-sm"><Plus className="h-4 w-4" /> Add Doctor</button>
      </div>
      <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search..." className="mt-4 rounded-lg border px-4 py-2 dark:border-slate-600 dark:bg-slate-800" />
      {showForm && (
        <form onSubmit={submit} className="glass mt-4 grid gap-3 rounded-2xl p-6 sm:grid-cols-2">
          <input required placeholder="Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="rounded-lg border px-3 py-2 dark:border-slate-600 dark:bg-slate-800" />
          <input required placeholder="Specialization" value={form.specialization} onChange={(e) => setForm({ ...form, specialization: e.target.value })} className="rounded-lg border px-3 py-2 dark:border-slate-600 dark:bg-slate-800" />
          <select required value={form.department} onChange={(e) => setForm({ ...form, department: e.target.value })} className="rounded-lg border px-3 py-2 dark:border-slate-600 dark:bg-slate-800">
            <option value="">Department</option>
            {departments.map((d) => <option key={d._id} value={d._id}>{d.name}</option>)}
          </select>
          <input type="file" accept="image/*" onChange={(e) => setImage(e.target.files?.[0] || null)} className="text-sm" />
          <input placeholder="Qualification" value={form.qualification} onChange={(e) => setForm({ ...form, qualification: e.target.value })} className="rounded-lg border px-3 py-2 dark:border-slate-600 dark:bg-slate-800" />
          <input placeholder="Fee" value={form.consultationFee} onChange={(e) => setForm({ ...form, consultationFee: e.target.value })} className="rounded-lg border px-3 py-2 dark:border-slate-600 dark:bg-slate-800" />
          <textarea placeholder="Biography" value={form.biography} onChange={(e) => setForm({ ...form, biography: e.target.value })} className="col-span-2 rounded-lg border px-3 py-2 dark:border-slate-600 dark:bg-slate-800" rows={2} />
          <label className="flex items-center gap-2"><input type="checkbox" checked={form.featured} onChange={(e) => setForm({ ...form, featured: e.target.checked })} /> Featured</label>
          <div className="col-span-2 flex gap-2">
            <button type="submit" className="btn-primary">Save</button>
            <button type="button" onClick={reset} className="btn-outline">Cancel</button>
          </div>
        </form>
      )}
      <div className="mt-6 overflow-x-auto rounded-2xl glass">
        <table className="w-full text-sm">
          <thead className="border-b dark:border-slate-700">
            <tr className="text-left">
              <th className="p-4">Name</th><th className="p-4">Specialization</th><th className="p-4">Fee</th><th className="p-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {doctors.map((d) => (
              <tr key={d._id} className="border-b dark:border-slate-800">
                <td className="p-4 font-medium">{d.name}</td>
                <td className="p-4">{d.specialization}</td>
                <td className="p-4">₹{d.consultationFee}</td>
                <td className="p-4 flex gap-2">
                  <button type="button" onClick={() => edit(d)} className="text-primary-600"><Pencil className="h-4 w-4" /></button>
                  <button type="button" onClick={() => remove(d._id)} className="text-red-600"><Trash2 className="h-4 w-4" /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
