import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { Trash2 } from 'lucide-react';
import { blogApi } from '../../services/api';
import type { Blog } from '../../types';

export default function AdminBlogs() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [form, setForm] = useState({ title: '', excerpt: '', content: '', category: 'Health Tips', published: true });

  const load = () => blogApi.adminAll().then((res) => setBlogs(res.data.data)).catch(() => {});
  useEffect(() => { load(); }, []);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    const fd = new FormData();
    Object.entries(form).forEach(([k, v]) => fd.append(k, String(v)));
    try {
      await blogApi.create(fd);
      toast.success('Blog created');
      load();
    } catch {
      toast.error('Failed');
    }
  };

  const remove = async (id: string) => {
    if (!confirm('Delete?')) return;
    await blogApi.remove(id);
    load();
  };

  return (
    <div>
      <h1 className="text-2xl font-bold">Manage Blogs</h1>
      <form onSubmit={submit} className="glass mt-4 space-y-3 rounded-2xl p-6">
        <input required placeholder="Title" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} className="w-full rounded-lg border px-3 py-2 dark:border-slate-600 dark:bg-slate-800" />
        <input required placeholder="Excerpt" value={form.excerpt} onChange={(e) => setForm({ ...form, excerpt: e.target.value })} className="w-full rounded-lg border px-3 py-2 dark:border-slate-600 dark:bg-slate-800" />
        <textarea required placeholder="Content" value={form.content} onChange={(e) => setForm({ ...form, content: e.target.value })} className="w-full rounded-lg border px-3 py-2 dark:border-slate-600 dark:bg-slate-800" rows={4} />
        <button type="submit" className="btn-primary">Add Blog</button>
      </form>
      <ul className="mt-6 space-y-3">
        {blogs.map((b) => (
          <li key={b._id} className="glass flex items-center justify-between rounded-xl p-4">
            <div><p className="font-medium">{b.title}</p><p className="text-sm text-slate-500">{b.category}</p></div>
            <button type="button" onClick={() => remove(b._id)} className="text-red-600"><Trash2 /></button>
          </li>
        ))}
      </ul>
    </div>
  );
}
