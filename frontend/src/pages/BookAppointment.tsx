import { useEffect, useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import { CheckCircle } from 'lucide-react';
import { departmentApi, doctorApi, appointmentApi } from '../services/api';
import type { Department, Doctor } from '../types';
import { TIME_SLOTS } from '../constants/navigation';

export default function BookAppointment() {
  const [params] = useSearchParams();
  const [step, setStep] = useState(1);
  const [departments, setDepartments] = useState<Department[]>([]);
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [confirmed, setConfirmed] = useState(false);
  const [form, setForm] = useState({
    department: '',
    doctor: params.get('doctor') || '',
    appointmentDate: '',
    timeSlot: '',
    patientName: '',
    patientEmail: '',
    patientPhone: '',
    patientAge: '',
    patientGender: '',
    symptoms: '',
  });

  useEffect(() => {
    departmentApi.list().then((res) => setDepartments(res.data.data)).catch(() => {});
  }, []);

  useEffect(() => {
    if (!form.department) {
      setDoctors([]);
      return;
    }
    doctorApi.list({ department: form.department, limit: '50' }).then((res) => setDoctors(res.data.data)).catch(() => {});
  }, [form.department]);

  const submit = async () => {
    try {
      await appointmentApi.create({
        ...form,
        patientAge: form.patientAge ? Number(form.patientAge) : undefined,
      });
      setConfirmed(true);
      toast.success('Appointment booked!');
    } catch {
      toast.error('Booking failed. Please try again.');
    }
  };

  if (confirmed) {
    return (
      <div className="mx-auto flex min-h-[60vh] max-w-lg flex-col items-center justify-center px-4 text-center">
        <CheckCircle className="h-20 w-20 text-green-500" />
        <h1 className="mt-4 text-3xl font-bold">Appointment Confirmed!</h1>
        <p className="mt-2 text-slate-600 dark:text-slate-400">
          Thank you, {form.patientName}. We have received your booking and will contact you shortly.
        </p>
        <Link to="/" className="btn-primary mt-8">Back to Home</Link>
      </div>
    );
  }

  return (
    <div>
      <div className="bg-primary-700 py-12 text-white">
        <div className="mx-auto max-w-3xl px-4 text-center">
          <h1 className="text-3xl font-bold">Book Appointment</h1>
          <p className="mt-2 text-primary-100">Step {step} of 3</p>
          <div className="mt-4 flex justify-center gap-2">
            {[1, 2, 3].map((s) => (
              <div key={s} className={`h-2 w-16 rounded-full ${step >= s ? 'bg-white' : 'bg-white/30'}`} />
            ))}
          </div>
        </div>
      </div>
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="mx-auto max-w-2xl px-4 py-10"
      >
        {step === 1 && (
          <div className="glass space-y-4 rounded-2xl p-8">
            <label className="block font-medium">Select Department</label>
            <select
              value={form.department}
              onChange={(e) => setForm({ ...form, department: e.target.value, doctor: '' })}
              className="w-full rounded-lg border border-slate-200 bg-transparent px-4 py-3 dark:border-slate-600"
            >
              <option value="">Choose department</option>
              {departments.map((d) => (
                <option key={d._id} value={d._id}>{d.name}</option>
              ))}
            </select>
            <label className="block font-medium">Select Doctor</label>
            <select
              value={form.doctor}
              onChange={(e) => setForm({ ...form, doctor: e.target.value })}
              disabled={!form.department}
              className="w-full rounded-lg border border-slate-200 bg-transparent px-4 py-3 dark:border-slate-600"
            >
              <option value="">Choose doctor</option>
              {doctors.map((d) => (
                <option key={d._id} value={d._id}>{d.name} - {d.specialization}</option>
              ))}
            </select>
            <button type="button" disabled={!form.doctor} onClick={() => setStep(2)} className="btn-primary w-full">
              Next
            </button>
          </div>
        )}
        {step === 2 && (
          <div className="glass space-y-4 rounded-2xl p-8">
            <label className="block font-medium">Date</label>
            <input
              type="date"
              min={new Date().toISOString().split('T')[0]}
              value={form.appointmentDate}
              onChange={(e) => setForm({ ...form, appointmentDate: e.target.value })}
              className="w-full rounded-lg border border-slate-200 bg-transparent px-4 py-3 dark:border-slate-600"
            />
            <label className="block font-medium">Time Slot</label>
            <div className="grid grid-cols-3 gap-2">
              {TIME_SLOTS.map((slot) => (
                <button
                  key={slot}
                  type="button"
                  onClick={() => setForm({ ...form, timeSlot: slot })}
                  className={`rounded-lg border py-2 text-sm ${
                    form.timeSlot === slot ? 'border-primary-600 bg-primary-600 text-white' : 'border-slate-200 dark:border-slate-600'
                  }`}
                >
                  {slot}
                </button>
              ))}
            </div>
            <div className="flex gap-3">
              <button type="button" onClick={() => setStep(1)} className="btn-outline flex-1">Back</button>
              <button type="button" disabled={!form.appointmentDate || !form.timeSlot} onClick={() => setStep(3)} className="btn-primary flex-1">
                Next
              </button>
            </div>
          </div>
        )}
        {step === 3 && (
          <div className="glass space-y-4 rounded-2xl p-8">
            {[
              { key: 'patientName', label: 'Full Name', type: 'text' },
              { key: 'patientEmail', label: 'Email', type: 'email' },
              { key: 'patientPhone', label: 'Phone', type: 'tel' },
              { key: 'patientAge', label: 'Age', type: 'number' },
            ].map(({ key, label, type }) => (
              <input
                key={key}
                required={key !== 'patientAge'}
                type={type}
                placeholder={label}
                value={form[key as keyof typeof form]}
                onChange={(e) => setForm({ ...form, [key]: e.target.value })}
                className="w-full rounded-lg border border-slate-200 bg-transparent px-4 py-3 dark:border-slate-600"
              />
            ))}
            <select
              value={form.patientGender}
              onChange={(e) => setForm({ ...form, patientGender: e.target.value })}
              className="w-full rounded-lg border border-slate-200 bg-transparent px-4 py-3 dark:border-slate-600"
            >
              <option value="">Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
            <textarea
              placeholder="Symptoms (optional)"
              value={form.symptoms}
              onChange={(e) => setForm({ ...form, symptoms: e.target.value })}
              className="w-full rounded-lg border border-slate-200 bg-transparent px-4 py-3 dark:border-slate-600"
              rows={3}
            />
            <div className="flex gap-3">
              <button type="button" onClick={() => setStep(2)} className="btn-outline flex-1">Back</button>
              <button type="button" onClick={submit} className="btn-primary flex-1">Confirm Booking</button>
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
}
