import { useState } from 'react';
import toast from 'react-hot-toast';
import { Mail, MapPin, Phone, Share2 } from 'lucide-react';
import { HOSPITAL } from '../constants/navigation';

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', subject: '', message: '' });

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success('Message sent! We will contact you soon.');
    setForm({ name: '', email: '', phone: '', subject: '', message: '' });
  };

  return (
    <div>
      <div className="bg-gradient-to-r from-primary-600 to-primary-800 py-16 text-white">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <h1 className="text-4xl font-bold">Contact Us</h1>
          <p className="mt-2 text-primary-100">We are here to help you</p>
        </div>
      </div>
      <div className="mx-auto max-w-7xl px-4 py-12 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-2">
          <form onSubmit={submit} className="glass space-y-4 rounded-2xl p-8">
            <h2 className="text-xl font-bold">Send a Message</h2>
            {(['name', 'email', 'phone', 'subject'] as const).map((field) => (
              <input
                key={field}
                required={field !== 'phone'}
                type={field === 'email' ? 'email' : 'text'}
                placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                value={form[field]}
                onChange={(e) => setForm({ ...form, [field]: e.target.value })}
                className="w-full rounded-lg border border-slate-200 bg-transparent px-4 py-3 dark:border-slate-600"
              />
            ))}
            <textarea
              required
              rows={4}
              placeholder="Message"
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              className="w-full rounded-lg border border-slate-200 bg-transparent px-4 py-3 dark:border-slate-600"
            />
            <button type="submit" className="btn-primary w-full">Send Message</button>
          </form>
          <div className="space-y-6">
            <div className="glass rounded-2xl p-6 space-y-4">
              <p className="flex gap-3"><MapPin className="h-5 w-5 text-primary-600 shrink-0" />{HOSPITAL.address}</p>
              <p className="flex gap-3"><Phone className="h-5 w-5 text-primary-600 shrink-0" />{HOSPITAL.phone}</p>
              <p className="flex gap-3"><Mail className="h-5 w-5 text-primary-600 shrink-0" />{HOSPITAL.email}</p>
              <p className="rounded-lg bg-red-100 p-4 font-bold text-red-700 dark:bg-red-900/30 dark:text-red-300">
                Emergency Helpline: {HOSPITAL.emergency}
              </p>
              <div className="flex gap-3">
                {[Share2, Share2, Share2].map((Icon, i) => (
                  <a key={i} href="#" className="rounded-lg bg-primary-100 p-2 text-primary-700 dark:bg-primary-900/50">
                    <Icon className="h-5 w-5" />
                  </a>
                ))}
              </div>
            </div>
            <div className="overflow-hidden rounded-2xl shadow-lg">
              <iframe
                title="Hospital location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3771.0!2d72.8777!3d19.076!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTnCsDA0JzMzLjYiTiA3MsKwNTInMzkuNyJF!5e0!3m2!1sen!2sin!4v1"
                width="100%"
                height="280"
                style={{ border: 0 }}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}